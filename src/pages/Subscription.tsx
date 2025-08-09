import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check, Star, Calendar, Users, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import SubscriptionMealPlans from '@/components/SubscriptionMealPlans';

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState('balanced');
  const [selectedDuration, setSelectedDuration] = useState('weekly');
  const [mealsPerDay, setMealsPerDay] = useState([3]);
  const [daysPerWeek, setDaysPerWeek] = useState([5]);
  const [addons, setAddons] = useState({
    snacks: false,
    detox: false,
    supplements: false
  });

  const navigate = useNavigate();
  const { addToCart } = useCart();

  const plans = [
    {
      id: 'weight-loss',
      name: 'Weight Loss',
      calories: '1200-1400 kcal',
      description: 'Designed for healthy weight management with portion-controlled, nutrient-dense meals',
      meals: [
        'Breakfast: Halloumi Salad',
        'Lunch: Chicken Cheese Garlic Bread',
        'Dinner: Mix Veg Salad'
      ],
      basePrice: 299,
      popular: false
    },
    {
      id: 'balanced',
      name: 'Balanced Nutrition',
      calories: '1500-1800 kcal',
      description: 'Perfect for maintaining a healthy lifestyle with well-balanced, delicious meals',
      meals: [
        'Breakfast: Italian Salad',
        'Lunch: Special Sauce Pasta',
        'Dinner: Pepperoni Pizza'
      ],
      basePrice: 349,
      popular: true
    },
    {
      id: 'muscle-gain',
      name: 'Muscle Gain',
      calories: '2000-2500 kcal',
      description: 'High-protein meals designed to support muscle building and recovery',
      meals: [
        'Breakfast: Egg Toast and Garlic Bread',
        'Lunch: Beef Ballistic Pizza',
        'Dinner: Beef Bolognese Spaghetti Pasta'
      ],
      basePrice: 399,
      popular: false
    }
  ];

  const addonOptions = [
    {
      id: 'snacks',
      name: 'Healthy Snacks',
      description: '2 nutritious snacks per day',
      price: 89
    },
    {
      id: 'detox',
      name: 'Detox Drinks',
      description: 'Daily cold-pressed juices',
      price: 129
    },
    {
      id: 'supplements',
      name: 'Daily Supplements',
      description: 'Vitamins and minerals pack',
      price: 159
    }
  ];

  const calculatePrice = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    if (!selectedPlanData) return 0;

    let basePrice = selectedPlanData.basePrice;
    
    // Adjust for meals per day
    const mealMultiplier = mealsPerDay[0] / 3;
    basePrice *= mealMultiplier;
    
    // Adjust for days per week
    const dayMultiplier = daysPerWeek[0] / 5;
    basePrice *= dayMultiplier;
    
    // Add addons
    let addonPrice = 0;
    Object.entries(addons).forEach(([key, value]) => {
      if (value) {
        const addon = addonOptions.find(a => a.id === key);
        if (addon) addonPrice += addon.price;
      }
    });

    // Duration multiplier
    const durationMultiplier = selectedDuration === 'monthly' ? 4 : 1;
    const discount = selectedDuration === 'monthly' ? 0.9 : 1; // 10% discount for monthly

    return Math.round((basePrice + addonPrice) * durationMultiplier * discount);
  };

  const handleContinueToCheckout = () => {
    const selectedPlanData = plans.find(p => p.id === selectedPlan);
    if (!selectedPlanData) return;

    // Add subscription plan to cart with detailed meal information
    const subscriptionItem = {
      id: Date.now(),
      name: `${selectedPlanData.name} Subscription`,
      image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
      price: `${calculatePrice()} SAR`,
      category: 'subscription',
      quantity: 1,
      details: {
        plan: selectedPlanData.name,
        planId: selectedPlan,
        duration: selectedDuration,
        mealsPerDay: mealsPerDay[0],
        daysPerWeek: daysPerWeek[0],
        addons: Object.entries(addons)
          .filter(([_, value]) => value)
          .map(([key, _]) => addonOptions.find(a => a.id === key)?.name)
          .filter(Boolean),
        // Add specific meal plan details
        mealPlan: getMealPlanForSubscription(selectedPlan)
      }
    };

    addToCart(subscriptionItem);
    toast.success('Subscription plan added to cart!');
    navigate('/checkout');
  };

  const getMealPlanForSubscription = (planId: string) => {
    const mealPlans = {
      'weight-loss': {
        breakfast: 'Halloumi Salad',
        lunch: 'Chicken Cheese Garlic Bread',
        dinner: 'Mix Veg Salad'
      },
      'balanced': {
        breakfast: 'Italian Salad',
        lunch: 'Special Sauce Pasta',
        dinner: 'Pepperoni Pizza'
      },
      'muscle-gain': {
        breakfast: 'Egg Toast and Garlic Bread',
        lunch: 'Beef Ballistic Pizza',
        dinner: 'Beef Bolognese Spaghetti Pasta'
      }
    };
    return mealPlans[planId] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Meal Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Customize your perfect meal plan with our flexible options designed to fit your lifestyle and goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Plan Selection */}
          <div className="lg:col-span-2">
            {/* Duration Toggle */}
            <div className="bg-white rounded-lg p-6 mb-8 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Subscription Duration</h3>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={selectedDuration === 'weekly' ? 'default' : 'ghost'}
                  onClick={() => setSelectedDuration('weekly')}
                  className="flex-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Weekly
                </Button>
                <Button
                  variant={selectedDuration === 'monthly' ? 'default' : 'ghost'}
                  onClick={() => setSelectedDuration('monthly')}
                  className="flex-1"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Monthly (10% off)
                </Button>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="space-y-6 mb-8">
              {plans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedPlan === plan.id 
                      ? 'ring-2 ring-green-500 bg-green-50' 
                      : 'hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <CardHeader className="relative">
                    {plan.popular && (
                      <Badge className="absolute -top-2 -right-2 bg-green-600">
                        <Star className="h-3 w-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <p className="text-green-600 font-semibold">{plan.calories}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">{plan.basePrice} SAR</p>
                        <p className="text-sm text-gray-600">per week (base)</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="grid grid-cols-1 gap-2">
                      {plan.meals.map((meal, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-700">
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {meal}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Show meal plan for selected subscription */}
            <SubscriptionMealPlans selectedPlan={selectedPlan} />

            {/* Customization Options */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Customize Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Meals per day */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    <Utensils className="h-4 w-4 inline mr-2" />
                    Meals per day: {mealsPerDay[0]}
                  </Label>
                  <Slider
                    value={mealsPerDay}
                    onValueChange={setMealsPerDay}
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 meal</span>
                    <span>2 meals</span>
                    <span>3 meals</span>
                    <span>4 meals</span>
                  </div>
                </div>

                {/* Days per week */}
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    <Users className="h-4 w-4 inline mr-2" />
                    Days per week: {daysPerWeek[0]}
                  </Label>
                  <Slider
                    value={daysPerWeek}
                    onValueChange={setDaysPerWeek}
                    max={7}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>3 days</span>
                    <span>5 days</span>
                    <span>7 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons */}
            <Card>
              <CardHeader>
                <CardTitle>Add-ons</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {addonOptions.map((addon) => (
                  <div key={addon.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{addon.name}</h4>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="font-semibold">+{addon.price} SAR</span>
                      <Switch
                        checked={addons[addon.id]}
                        onCheckedChange={(checked) => 
                          setAddons(prev => ({ ...prev, [addon.id]: checked }))
                        }
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">
                      {plans.find(p => p.id === selectedPlan)?.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium capitalize">{selectedDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Meals/day:</span>
                    <span className="font-medium">{mealsPerDay[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days/week:</span>
                    <span className="font-medium">{daysPerWeek[0]}</span>
                  </div>
                </div>

                {Object.entries(addons).some(([_, value]) => value) && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Add-ons:</h4>
                    {Object.entries(addons).map(([key, value]) => {
                      if (!value) return null;
                      const addon = addonOptions.find(a => a.id === key);
                      return (
                        <div key={key} className="flex justify-between text-sm">
                          <span>{addon?.name}</span>
                          <span>+{addon?.price} SAR</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">{calculatePrice()} SAR</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    per {selectedDuration === 'weekly' ? 'week' : 'month'}
                  </p>
                  {selectedDuration === 'monthly' && (
                    <p className="text-sm text-green-600">10% monthly discount applied!</p>
                  )}
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700" 
                  size="lg"
                  onClick={handleContinueToCheckout}
                >
                  Continue to Checkout
                </Button>

                <div className="text-xs text-gray-600 space-y-1">
                  <p>✓ Cancel anytime</p>
                  <p>✓ Pause or skip deliveries</p>
                  <p>✓ Modify your plan weekly</p>
                  <p>✓ Free delivery included</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-8">Why Choose Our Subscription?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Chef-Crafted Meals</h3>
              <p className="text-gray-600 text-sm">Every meal is prepared by professional chefs using fresh, premium ingredients</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Nutrition Experts</h3>
              <p className="text-gray-600 text-sm">All plans are designed by certified nutritionists to meet your health goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Scheduling</h3>
              <p className="text-gray-600 text-sm">Pause, skip, or modify your deliveries anytime to fit your schedule</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
