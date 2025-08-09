
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface MealItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface MealPlanSelectorProps {
  onComplete: () => void;
}

const MealPlanSelector = ({ onComplete }: MealPlanSelectorProps) => {
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    dinner: false
  });
  
  const [selectedItems, setSelectedItems] = useState<{
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
  }>({
    breakfast: [],
    lunch: [],
    dinner: []
  });

  const { addToCart } = useCart();

  const mealItems = {
    breakfast: [
      {
        id: 1,
        name: 'White Sauce Pasta',
        description: 'Creamy, cheesy, and rich with a smooth finish.',
        price: 35,
        image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
        category: 'breakfast'
      },
      {
        id: 2,
        name: 'Red Sauce Pasta',
        description: 'Tangy tomato blend with herbs and seasoning.',
        price: 32,
        image: '/lovable-uploads/f0278392-1064-40db-9bed-294f071236f5.png',
        category: 'breakfast'
      },
      {
        id: 3,
        name: 'Green Sauce Pasta',
        description: 'Fresh basil pesto with a creamy twist.',
        price: 38,
        image: '/lovable-uploads/48f5989b-acbd-4fee-944a-2567818138cd.png',
        category: 'breakfast'
      }
    ],
    lunch: [
      {
        id: 4,
        name: 'Beef Bolognese Spaghetti Pasta',
        description: 'Slow-cooked minced beef in classic Italian sauce.',
        price: 45,
        image: '/lovable-uploads/00b89983-bc9e-477f-a0c4-203f242b1882.png',
        category: 'lunch'
      },
      {
        id: 5,
        name: 'Mix Sauce Spaghetti Pasta',
        description: 'White and red sauces blended for bold flavor.',
        price: 40,
        image: '/lovable-uploads/220c49c0-7ff7-4ae0-b936-346560aabaaf.png',
        category: 'lunch'
      },
      {
        id: 6,
        name: 'Signature Spaghetti Pasta',
        description: 'Our chef\'s special recipe with signature spices.',
        price: 42,
        image: '/lovable-uploads/3c56d1e5-b426-48b9-baef-c72c6043524c.png',
        category: 'lunch'
      }
    ],
    dinner: [
      {
        id: 8,
        name: 'Pepperoni Pizza',
        description: 'Crispy pepperoni layered over cheesy perfection.',
        price: 48,
        image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
        category: 'dinner'
      },
      {
        id: 9,
        name: 'Margherita Pizza',
        description: 'Classic tomato, mozzarella, and fresh basil combo.',
        price: 42,
        image: '/lovable-uploads/f0278392-1064-40db-9bed-294f071236f5.png',
        category: 'dinner'
      },
      {
        id: 10,
        name: 'Alfredo Pizza',
        description: 'Creamy Alfredo base topped with juicy toppings.',
        price: 46,
        image: '/lovable-uploads/48f5989b-acbd-4fee-944a-2567818138cd.png',
        category: 'dinner'
      }
    ]
  };

  const handleMealToggle = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedMeals(prev => ({
      ...prev,
      [mealType]: !prev[mealType]
    }));
    
    // Clear selected items if meal is deselected
    if (selectedMeals[mealType]) {
      setSelectedItems(prev => ({
        ...prev,
        [mealType]: []
      }));
    }
  };

  const handleItemSelect = (mealType: 'breakfast' | 'lunch' | 'dinner', item: MealItem) => {
    setSelectedItems(prev => {
      const currentItems = prev[mealType];
      const itemExists = currentItems.find(i => i.id === item.id);
      
      if (itemExists) {
        return {
          ...prev,
          [mealType]: currentItems.filter(i => i.id !== item.id)
        };
      } else {
        return {
          ...prev,
          [mealType]: [...currentItems, item]
        };
      }
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.values(selectedItems).forEach(items => {
      items.forEach(item => {
        total += item.price;
      });
    });
    return total;
  };

  const handleAddToCart = () => {
    let itemsAdded = 0;
    
    Object.values(selectedItems).forEach(items => {
      items.forEach(item => {
        addToCart({
          id: item.id,
          name: item.name,
          image: item.image,
          price: `${item.price} SAR`,
          category: item.category
        });
        itemsAdded++;
      });
    });

    if (itemsAdded > 0) {
      toast.success(`${itemsAdded} items added to cart!`);
      onComplete();
    } else {
      toast.error('Please select at least one item');
    }
  };

  const renderMealSection = (mealType: 'breakfast' | 'lunch' | 'dinner', title: string) => (
    <Card key={mealType} className="mb-6">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <Checkbox
            id={mealType}
            checked={selectedMeals[mealType]}
            onCheckedChange={() => handleMealToggle(mealType)}
          />
          <CardTitle className="text-lg capitalize">{title}</CardTitle>
          <Badge variant="outline">
            {selectedItems[mealType].length} selected
          </Badge>
        </div>
      </CardHeader>
      
      {selectedMeals[mealType] && (
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mealItems[mealType].map((item) => {
              const isSelected = selectedItems[mealType].find(i => i.id === item.id);
              return (
                <Card
                  key={item.id}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'ring-2 ring-green-500 bg-green-50' : 'hover:shadow-md'
                  }`}
                  onClick={() => handleItemSelect(mealType, item)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-green-600">{item.price} SAR</span>
                      {isSelected && (
                        <Badge className="bg-green-500">Selected</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Meal Plan</h2>
        <p className="text-gray-600">Select the meals you want to include in your subscription</p>
      </div>

      {renderMealSection('breakfast', 'Breakfast')}
      {renderMealSection('lunch', 'Lunch')}
      {renderMealSection('dinner', 'Dinner')}

      <Separator />

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">Total Selected Items:</span>
          <span className="text-xl font-bold text-green-600">{getTotalPrice()} SAR</span>
        </div>
        
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          {Object.entries(selectedItems).map(([mealType, items]) => (
            items.length > 0 && (
              <div key={mealType} className="flex justify-between">
                <span className="capitalize">{mealType}:</span>
                <span>{items.length} items</span>
              </div>
            )
          ))}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          Add Selected Items to Cart
        </Button>
      </div>
    </div>
  );
};

export default MealPlanSelector;
