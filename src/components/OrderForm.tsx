
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useOrders } from '@/hooks/useOrders';
import { toast } from 'sonner';
import { CalendarDays, Clock, UtensilsCrossed } from 'lucide-react';
import type { OrderType, MealType, DietPreference } from '@/hooks/useOrders';

interface OrderFormProps {
  onSuccess?: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    order_type: 'one-time' as OrderType,
    meal_type: 'breakfast' as MealType,
    diet_preferences: [] as DietPreference[],
    start_date: '',
    delivery_time: '12:00',
    total_amount: 0,
    notes: ''
  });

  const { createOrder, loading } = useOrders();

  const orderTypes: { value: OrderType; label: string }[] = [
    { value: 'one-time', label: 'One-time Order' },
    { value: 'weekly', label: 'Weekly Subscription' },
    { value: 'monthly', label: 'Monthly Subscription' }
  ];

  const mealTypes: { value: MealType; label: string }[] = [
    { value: 'breakfast', label: 'Breakfast Only' },
    { value: 'lunch', label: 'Lunch Only' },
    { value: 'dinner', label: 'Dinner Only' },
    { value: 'breakfast-lunch', label: 'Breakfast + Lunch' },
    { value: 'lunch-dinner', label: 'Lunch + Dinner' },
    { value: 'breakfast-dinner', label: 'Breakfast + Dinner' },
    { value: 'all-meals', label: 'All Meals' }
  ];

  const dietOptions: DietPreference[] = [
    'keto',
    'high-protein',
    'vegan',
    'vegetarian',
    'gluten-free',
    'dairy-free'
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ];

  const handleDietPreferenceChange = (diet: DietPreference, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      diet_preferences: checked
        ? [...prev.diet_preferences, diet]
        : prev.diet_preferences.filter(d => d !== diet)
    }));
  };

  const calculateAmount = () => {
    let basePrice = 0;
    
    switch (formData.meal_type) {
      case 'breakfast':
      case 'lunch':
      case 'dinner':
        basePrice = 25;
        break;
      case 'breakfast-lunch':
      case 'lunch-dinner':
      case 'breakfast-dinner':
        basePrice = 45;
        break;
      case 'all-meals':
        basePrice = 65;
        break;
    }

    if (formData.order_type === 'weekly') {
      basePrice *= 7;
    } else if (formData.order_type === 'monthly') {
      basePrice *= 30;
    }

    return basePrice;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.start_date) {
      toast.error('Please select a start date');
      return;
    }

    const amount = calculateAmount();
    
    try {
      await createOrder({
        ...formData,
        total_amount: amount
      }, []);
      
      toast.success('Order created successfully!');
      onSuccess?.();
      
      // Reset form
      setFormData({
        order_type: 'one-time',
        meal_type: 'breakfast',
        diet_preferences: [],
        start_date: '',
        delivery_time: '12:00',
        total_amount: 0,
        notes: ''
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create order');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <UtensilsCrossed className="h-6 w-6 text-green-600" />
          <span>Create New Order</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Type */}
          <div>
            <Label className="text-base font-medium">Order Type</Label>
            <Select
              value={formData.order_type}
              onValueChange={(value: OrderType) => setFormData(prev => ({ ...prev, order_type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orderTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Meal Type */}
          <div>
            <Label className="text-base font-medium">Meal Plan</Label>
            <Select
              value={formData.meal_type}
              onValueChange={(value: MealType) => setFormData(prev => ({ ...prev, meal_type: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map(meal => (
                  <SelectItem key={meal.value} value={meal.value}>
                    {meal.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Diet Preferences */}
          <div>
            <Label className="text-base font-medium mb-3 block">Diet Preferences (Optional)</Label>
            <div className="grid grid-cols-2 gap-3">
              {dietOptions.map(diet => (
                <div key={diet} className="flex items-center space-x-2">
                  <Checkbox
                    id={diet}
                    checked={formData.diet_preferences.includes(diet)}
                    onCheckedChange={(checked) => handleDietPreferenceChange(diet, checked as boolean)}
                  />
                  <Label htmlFor={diet} className="capitalize text-sm">
                    {diet.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Start Date */}
          <div>
            <Label htmlFor="start_date" className="text-base font-medium flex items-center space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Start Date</span>
            </Label>
            <Input
              id="start_date"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          {/* Delivery Time */}
          <div>
            <Label className="text-base font-medium flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Preferred Delivery Time</span>
            </Label>
            <Select
              value={formData.delivery_time}
              onValueChange={(value) => setFormData(prev => ({ ...prev, delivery_time: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(time => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-base font-medium">Additional Notes (Optional)</Label>
            <Input
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Any special requests or dietary restrictions..."
            />
          </div>

          {/* Price Display */}
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-green-600">{calculateAmount()} SAR</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {formData.order_type === 'weekly' && 'Per week'}
              {formData.order_type === 'monthly' && 'Per month'}
              {formData.order_type === 'one-time' && 'One-time payment'}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
            disabled={loading}
          >
            {loading ? 'Creating Order...' : 'Create Order'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderForm;
