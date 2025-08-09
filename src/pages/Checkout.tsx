
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { CreditCard, Truck, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { toast } from 'sonner';
import type { OrderType, MealType, DietPreference } from '@/hooks/useOrders';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isProcessing, setIsProcessing] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    phone: '',
    notes: ''
  });

  const { items, clearCart, total } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!deliveryInfo.address || !deliveryInfo.phone) {
      toast.error('Please fill in all delivery information');
      return;
    }

    setIsProcessing(true);
    
    try {
      // Determine order type and meal type based on cart contents
      let orderType: OrderType = 'one-time';
      let mealType: MealType = 'breakfast';
      
      // Check if this is a subscription order
      const subscriptionItem = items.find(item => item.category === 'subscription');
      if (subscriptionItem && subscriptionItem.details) {
        orderType = subscriptionItem.details.duration === 'monthly' ? 'monthly' : 'weekly';
        
        // Determine meal type based on meals per day
        const mealsPerDay = subscriptionItem.details.mealsPerDay || 1;
        if (mealsPerDay === 1) {
          mealType = 'breakfast';
        } else if (mealsPerDay === 2) {
          mealType = 'breakfast-lunch';
        } else if (mealsPerDay === 3) {
          mealType = 'all-meals';
        }
      }

      const dietPreferences: DietPreference[] = ['none'];

      // Create detailed order notes with meal plan information
      let orderNotes = `Payment: ${paymentMethod}, Address: ${deliveryInfo.address}, Phone: ${deliveryInfo.phone}`;
      if (deliveryInfo.notes) {
        orderNotes += `, Notes: ${deliveryInfo.notes}`;
      }
      if (subscriptionItem?.details?.mealPlan) {
        const mealPlan = subscriptionItem.details.mealPlan;
        orderNotes += ` | Meal Plan - Breakfast: ${mealPlan.breakfast}, Lunch: ${mealPlan.lunch}, Dinner: ${mealPlan.dinner}`;
      }

      const orderData = {
        meal_type: mealType,
        order_type: orderType,
        delivery_time: '12:00',
        start_date: new Date().toISOString().split('T')[0],
        total_amount: total,
        notes: orderNotes,
        diet_preferences: dietPreferences
      };

      console.log('Creating order with data:', orderData);
      console.log('Cart items:', items);

      // Create the order
      const order = await createOrder(orderData, items);

      if (order) {
        console.log('Order created successfully:', order);
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/dashboard');
      } else {
        throw new Error('Failed to create order');
      }
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect to login if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-gray-600 mb-4">Please login to continue with checkout</p>
            <Button onClick={() => navigate('/login')} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Delivery Information Form */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Delivery Information</h3>
              <div>
                <Label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Enter your delivery address"
                  value={deliveryInfo.address}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                  <Truck className="h-4 w-4 inline mr-2" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={deliveryInfo.phone}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="notes" className="block text-gray-700 text-sm font-bold mb-2">
                  Notes
                </Label>
                <Input
                  id="notes"
                  type="text"
                  placeholder="Any delivery notes? (Optional)"
                  value={deliveryInfo.notes}
                  onChange={(e) => setDeliveryInfo({ ...deliveryInfo, notes: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            {/* Payment Method Selection */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Payment Method</h3>
              <RadioGroup defaultValue="cod" className="flex flex-col space-y-2" onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" disabled />
                  <Label htmlFor="credit-card" className="cursor-not-allowed">
                    Credit Card <Badge className="ml-2">Coming Soon</Badge>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Order Summary</h3>
              <div className="rounded-md border">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold">{item.price}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{total} SAR</span>
              </div>
            </div>

            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  Placing Order...
                </>
              ) : (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Place Order
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
