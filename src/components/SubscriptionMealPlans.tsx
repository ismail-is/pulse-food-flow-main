
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
}

interface SubscriptionMealPlansProps {
  selectedPlan: string;
}

const SubscriptionMealPlans: React.FC<SubscriptionMealPlansProps> = ({ selectedPlan }) => {
  const mealPlans: Record<string, MealPlan> = {
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

  const currentPlan = mealPlans[selectedPlan];

  if (!currentPlan) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Your Meal Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
            <div>
              <Badge variant="secondary" className="mb-1">Breakfast</Badge>
              <p className="font-medium">{currentPlan.breakfast}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <div>
              <Badge variant="secondary" className="mb-1">Lunch</Badge>
              <p className="font-medium">{currentPlan.lunch}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div>
              <Badge variant="secondary" className="mb-1">Dinner</Badge>
              <p className="font-medium">{currentPlan.dinner}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionMealPlans;
