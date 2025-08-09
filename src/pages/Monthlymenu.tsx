import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, UtensilsCrossed, Clock, Flame, Droplet, Wheat } from 'lucide-react';
import { toast } from 'sonner';
import MealPlanSelector from '@/components/MealPlanSelector';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
}

const Monthlymenu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMealPlanSelector, setShowMealPlanSelector] = useState(false);

  const menuItems: MenuItem[] = [
    // Breakfast Items
    {
      id: 1,
      name: 'White Sauce Pasta',
      description: 'Creamy, cheesy, and rich with a smooth finish.',
      price: '35',
      image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
      category: 'breakfast',
      calories: 587,
      protein: 15,
      carbs: 35,
      fat: 43,
      prepTime: '15 min'
    },
    {
      id: 2,
      name: 'Red Sauce Pasta',
      description: 'Tangy tomato blend with herbs and seasoning.',
      price: '32',
      image: '/lovable-uploads/f0278392-1064-40db-9bed-294f071236f5.png',
      category: 'breakfast',
      calories: 520,
      protein: 12,
      carbs: 40,
      fat: 35,
      prepTime: '20 min'
    },
    {
      id: 3,
      name: 'Green Sauce Pasta',
      description: 'Fresh basil pesto with a creamy twist.',
      price: '38',
      image: '/lovable-uploads/48f5989b-acbd-4fee-944a-2567818138cd.png',
      category: 'breakfast',
      calories: 610,
      protein: 18,
      carbs: 38,
      fat: 45,
      prepTime: '18 min'
    },

    // Lunch Items
    {
      id: 4,
      name: 'Beef Bolognese Spaghetti',
      description: 'Slow-cooked minced beef in classic Italian sauce.',
      price: '45',
      image: '/lovable-uploads/00b89983-bc9e-477f-a0c4-203f242b1882.png',
      category: 'lunch',
      calories: 720,
      protein: 25,
      carbs: 45,
      fat: 50,
      prepTime: '25 min'
    },
    {
      id: 5,
      name: 'Mix Sauce Spaghetti',
      description: 'White and red sauces blended for bold flavor.',
      price: '40',
      image: '/lovable-uploads/220c49c0-7ff7-4ae0-b936-346560aabaaf.png',
      category: 'lunch',
      calories: 680,
      protein: 20,
      carbs: 42,
      fat: 48,
      prepTime: '22 min'
    },
    {
      id: 6,
      name: 'Signature Spaghetti',
      description: 'Our chef\'s special recipe with signature spices.',
      price: '42',
      image: '/lovable-uploads/3c56d1e5-b426-48b9-baef-c72c6043524c.png',
      category: 'lunch',
      calories: 650,
      protein: 22,
      carbs: 40,
      fat: 45,
      prepTime: '20 min'
    },

    // Dinner Items
    {
      id: 8,
      name: 'Pepperoni Pizza',
      description: 'Crispy pepperoni layered over cheesy perfection.',
      price: '48',
      image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
      category: 'dinner',
      calories: 850,
      protein: 30,
      carbs: 60,
      fat: 55,
      prepTime: '30 min'
    },
    {
      id: 9,
      name: 'Margherita Pizza',
      description: 'Classic tomato, mozzarella, and fresh basil combo.',
      price: '42',
      image: '/lovable-uploads/f0278392-1064-40db-9bed-294f071236f5.png',
      category: 'dinner',
      calories: 780,
      protein: 28,
      carbs: 55,
      fat: 48,
      prepTime: '25 min'
    },

    // Snack Items
    {
      id: 15,
      name: 'Halloumi Salad',
      description: 'Grilled halloumi on crisp greens and veggies.',
      price: '38',
      image: '/lovable-uploads/a6baeff9-8639-473f-a8e8-1e2baecd1b41.png',
      category: 'snack',
      calories: 320,
      protein: 18,
      carbs: 12,
      fat: 22,
      prepTime: '10 min'
    },
    {
      id: 16,
      name: 'Italian Salad',
      description: 'Olives, cherry tomatoes, herbs, and vinaigrette.',
      price: '35',
      image: '/lovable-uploads/f0278392-1064-40db-9bed-294f071236f5.png',
      category: 'snack',
      calories: 280,
      protein: 8,
      carbs: 15,
      fat: 20,
      prepTime: '8 min'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Weeks', icon: UtensilsCrossed },
    { id: 'breakfast', name: 'Week 1', icon: UtensilsCrossed },
    { id: 'lunch', name: 'Week 2', icon: UtensilsCrossed },
    { id: 'dinner', name: 'Week 3', icon: UtensilsCrossed },
    { id: 'snack', name: 'Week 4', icon: UtensilsCrossed }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: `${item.price} SAR`,
      category: item.category
    });
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with decorative elements */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4 relative z-10">
            Monthly <span className="text-green-600">Menu</span> Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Chef-curated meals for every week of the month, balanced for nutrition and flavor
          </p>
          
          {/* Subscription CTA with animation */}
          <div className="mt-8 relative z-10 hover:scale-105 transition-transform duration-300">
            <Dialog open={showMealPlanSelector} onOpenChange={setShowMealPlanSelector}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg px-8 py-3 shadow-lg">
                  <UtensilsCrossed className="h-5 w-5 mr-2" />
                  Create Subscription Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-center">Create Your Meal Plan</DialogTitle>
                </DialogHeader>
                <MealPlanSelector onComplete={() => setShowMealPlanSelector(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Category Filter with animated tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 transition-all duration-300 ${
                  selectedCategory === category.id ? 'shadow-md scale-105' : 'hover:shadow-sm'
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Menu Items Grid with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 rounded-xl"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <Badge variant="secondary" className="absolute top-2 right-2 capitalize">
                  {item.category}
                </Badge>
                {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-md text-sm flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.prepTime}
                </div> */}
              </div>
              
              <CardContent className="p-4">
                {/* <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold">{item.name}</CardTitle>
                  <span className="text-lg font-bold text-green-600">{item.price} SAR</span>
                </div> */}
                
                <p className="text-gray-600 text-sm mb-4 text-center">{item.description}</p>
                
                {/* Nutrition Info */}
                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                    <Flame className="h-5 w-5 text-red-500 mb-1" />
                    <span className="font-medium">{item.calories}</span>
                    <span className="text-xs text-gray-500">Calories</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                    <Droplet className="h-5 w-5 text-blue-500 mb-1" />
                    <span className="font-medium">{item.protein}g</span>
                    <span className="text-xs text-gray-500">Protein</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                    <Wheat className="h-5 w-5 text-yellow-500 mb-1" />
                    <span className="font-medium">{item.carbs}g</span>
                    <span className="text-xs text-gray-500">Carbs</span>
                  </div>
                  <div className="flex flex-col items-center p-2 bg-gray-50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    <span className="font-medium">{item.fat}g</span>
                    <span className="text-xs text-gray-500">Fat</span>
                  </div>
                </div>
                
                {/* <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700 transition-colors duration-300"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Weekly Plan
                </Button> */}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <UtensilsCrossed className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different weekly plan</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monthlymenu;