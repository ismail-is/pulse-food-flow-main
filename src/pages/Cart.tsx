import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '@/contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart, total } = useCart();
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false);
  const [showWhatsAppForm, setShowWhatsAppForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle subscription creation
  const handleCreateSubscription = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some items to your cart first",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Subscription Plan Created!",
      description: "Your custom subscription plan has been created successfully",
    });
    
    setIsCreatingSubscription(true);
    setTimeout(() => {
      navigate('/subscription');
    }, 2000);
  };

  // Generate order details text
  const generateOrderDetails = () => {
    let details = "Order Details:\n";
    items.forEach(item => {
      details += `- ${item.name} x${item.quantity} = ${parseFloat(item.price.replace(' SAR', '')) * item.quantity} SAR\n`;
    });
    details += `\nTotal: ${total.toFixed(2)} SAR`;
    return details;
  };

  // Send order via Interakt API
  const sendWhatsAppOrder = async () => {
    if (!phoneNumber) {
      toast({
        title: "Phone number required",
        description: "Please enter your WhatsApp number",
        variant: "destructive"
      });
      return;
    }
    
    setIsSending(true);

    try {
      // Format phone number (remove non-digits and add +)
      const formattedPhone = `+${phoneNumber.replace(/\D/g, '')}`;
      
      // Create order number
      const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;
      
      // Prepare order items text
      const orderItemsText = items.map(
        item => `• ${item.name} x${item.quantity} - ${item.price}`
      ).join('\n');

      // Interakt API payload
      const payload = {
        to: formattedPhone,
        template: {
          name: "order_confirmation",
          languageCode: "en",
          bodyValues: {
            order_number: orderNumber,
            order_details: orderItemsText,
            total_amount: total.toFixed(2)
          }
        }
      };

      // Call Interakt API (in production, this should go through your backend)
      const response = await fetch('https://api.interakt.ai/v1/public/message/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_INTERAKT_API_KEY` // Replace with your actual key
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to send');

      toast({
        title: "Order Confirmed!",
        description: "We've sent the details to your WhatsApp"
      });
      
      clearCart();
      setShowWhatsAppForm(false);
      setPhoneNumber('');
    } catch (error) {
      toast({
        title: "Failed to send order",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="h-24 w-24 mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Start adding some delicious items to your cart!</p>
            <Link to="/menu">
              <Button className="bg-green-600 hover:bg-green-700">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
            <p className="text-gray-600">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600 capitalize">{item.category}</p>
                      <p className="font-bold text-green-600">{item.price}</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>{parseFloat(item.price.replace(' SAR', '')) * item.quantity} SAR</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-green-600">{total.toFixed(2)} SAR</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => setShowWhatsAppForm(true)}
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleCreateSubscription}
                    disabled={isCreatingSubscription}
                  >
                    {isCreatingSubscription ? 'Creating...' : 'Create Subscription Plan'}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* WhatsApp Order Dialog */}
      <Dialog open={showWhatsAppForm} onOpenChange={() => setShowWhatsAppForm(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Order via WhatsApp</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                WhatsApp Number
              </label>
              <Input
                type="tel"
                placeholder="+966501234567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-xs text-gray-500 mt-1">
                Include country code (e.g., +966 for Saudi Arabia)
              </p>
            </div>
            
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-2">Order Summary:</h4>
              <pre className="text-sm whitespace-pre-wrap">{generateOrderDetails()}</pre>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowWhatsAppForm(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={sendWhatsAppOrder}
                disabled={isSending}
              >
                {isSending ? 'Sending...' : 'Confirm Order'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Cart;