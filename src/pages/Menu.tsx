
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';
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
}

const Menu = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showMealPlanSelector, setShowMealPlanSelector] = useState(false);

  const menuItems: MenuItem[] = [
    // Breakfast Items
    {
      id: 1,
      name: 'Chicken Quesadilla with Basil and Cheese',
      description: 'Creamy, cheesy, and rich with a smooth finish.',
      price: '23',
      image: '/img/menu/1.webp',
      category: 'breakfast'
    },
    {
      id: 2,
      name: 'Egg Quesadilla with Cheese',
      description: 'Tangy tomato blend with herbs and seasoning.',
      price: '18',
            image: '/img/menu/2.webp',
      category: 'breakfast'
    },
    {
      id: 3,
      name: 'Omelette',
      description: 'Fresh basil pesto with a creamy twist.',
      price: '11',
      image: '/img/menu/3.webp',
      category: 'breakfast'
    },

    // Lunch Items
    {
      id: 4,
      name: 'Omelette Whites ',
      description: 'Slow-cooked minced beef in classic Italian sauce.',
      price: '11',
     image: '/img/menu/4.webp',
     category: 'breakfast'
    },
    {
      id: 5,
      name: 'Eggs Benedict',
      description: 'White and red sauces blended for bold flavor.',
      price: '11',
           image: '/img/menu/5.webp',
      category: 'breakfast'
    },
    {
      id: 6,
      name: 'Halloumi Sandwich',
      description: 'Our chef\'s special recipe with signature spices.',
      price: '14',
         image: '/img/menu/6.webp',
       category: 'breakfast'
    },
    {
      id: 7,
      name: 'Wraps (-Chicken)',
      description: 'A surprise mix of sauces and bold flavors.',
      price: '21',
          image: '/img/menu/7.webp',
       category: 'breakfast'
    },

    // Dinner Items
    {
      id: 8,
      name: 'Beef Shawarma',
      description: 'Crispy pepperoni layered over cheesy perfection.',
      price: '26',
           image: '/img/menu/8.webp',
     category: 'breakfast'
    },
    {
      id: 9,
      name: 'Chicken with Balsamic Vinaigrette',
      description: 'Classic tomato, mozzarella, and fresh basil combo.',
      price: '23',
           image: '/img/menu/9.webp',
     category: 'breakfast'
    },
    {
      id: 10,
      name: 'Egg ',
      description: 'Creamy Alfredo base topped with juicy toppings.',
      price: '18',
            image: '/img/menu/10.webp',
     category: 'breakfast'
    },
    {
      id: 11,
      name: 'Turkey',
      description: 'Loaded with spicy beef and bold flavors.',
      price: '21',
            image: '/img/menu/11.webp',
      category: 'breakfast'
    },
    {
      id: 12,
      name: 'Tuna',
      description: 'Our house favorite with a secret twist.',
      price: '21',
           image: '/img/menu/12.webp',
      category: 'breakfast'
    },
    {
      id: 13,
      name: 'Chicken',
      description: 'Grilled chicken with a punch of garlic.',
      price: '23',
           image: '/img/menu/13.webp',
     category: 'breakfast'
    },
    {
      id: 14,
      name: 'Grilled Beef',
      description: 'A colorful mix of seasoned, fresh vegetables.',
      price: '30',
           image: '/img/menu/14.webp',
     category: 'breakfast'
    },

    // Snack Items
    {
      id: 15,
      name: 'Fish & Shrimp',
      description: 'Grilled halloumi on crisp greens and veggies.',
      price: '39',
            image: '/img/menu/15.webp',
      category: 'breakfast'
    },
    {
      id: 16,
      name: 'Thai Shrimp ',
      description: 'Olives, cherry tomatoes, herbs, and vinaigrette dressing.',
      price: '39',
          image: '/img/menu/16.webp',
     category: 'breakfast'
    },
    {
      id: 17,
      name: 'Shrimp with BBQ Sauce',
      description: 'Fresh arugula tossed with tangy dressing.',
      price: '39',
           image: '/img/menu/17.webp',
   category: 'breakfast'
    },
    {
      id: 18,
      name: 'Salmon Teriyaki ',
      description: 'Seasonal vegetables with a light citrus dressing.',
      price: '42',
           image: '/img/menu/18.webp',
    category: 'breakfast'
    },
    {
      id: 19,
      name: 'Salmon with Lemon Sauce Garlic',
      description: 'Creamy malai chicken on a fresh salad bed.',
      price: '42',
           image: '/img/menu/19.webp',
      category: 'breakfast'
    },
    {
      id: 20,
      name: 'Grilled Salmon with Herbs',
      description: 'Cheesy garlic toast topped with tender chicken.',
      price: '42',
           image: '/img/menu/20.webp',
    category: 'breakfast'
    },
    {
      id: 21,
      name: 'Grilled Fish with Lemon and Dill',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '27',
           image: '/img/menu/21.webp',
     category: 'breakfast'
    },


    // salads
    {
      id: 23,
      name: 'Quinoa Salad with Chicken ',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '19',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 24,
      name: 'Caesar Salad ',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '19',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 25,
      name: 'Arugula and Beetroot Salad',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 26,
      name: 'Orange and Arugula Salad ',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 27,
      name: 'Greek Salad',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '14',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 28,
      name: 'Shrimp Salad',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '23',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 29,
      name: 'Green Salad ',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '9',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 30,
      name: 'Chicken and Oat Soup',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },


    {
      id: 31,
      name: 'Chicken and Corn',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },


    {
      id: 32,
      name: 'Chicken with Mushrooms',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 33,
      name: 'Mushroom Soup',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 34,
      name: 'Broccoli Soup',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 35,
      name: 'Zucchini and Mint Soup',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },
    {
      id: 36,
      name: 'Lentils',
      description: 'Crispy bread topped with gooey garlic cheese.',
      price: '13',
           image: '/img/menu/21.webp',
     category: 'salads'
    },

    


    // salads
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: UtensilsCrossed },
    { id: 'breakfast', name: 'Breakfast', icon: UtensilsCrossed },
    { id: 'lunch', name: 'Lunch', icon: UtensilsCrossed },
    { id: 'dinner', name: 'Dinner', icon: UtensilsCrossed },
    { id: 'snack', name: 'Snacks', icon: UtensilsCrossed },
    { id: 'salads', name: 'Salads', icon: UtensilsCrossed }
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our delicious selection of fresh, healthy meals prepared with the finest ingredients
          </p>
          
          {/* Order Subscription Button */}
          <div className="mt-8">
            <Dialog open={showMealPlanSelector} onOpenChange={setShowMealPlanSelector}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  <UtensilsCrossed className="h-5 w-5 mr-2" />
                  Create Subscription Order
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create Your Meal Plan</DialogTitle>
                </DialogHeader>
                <MealPlanSelector onComplete={() => setShowMealPlanSelector(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center space-x-2"
              >
                <IconComponent className="h-4 w-4" />
                <span>{category.name}</span>
              </Button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full "
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1 capitalize">
                      {item.category}
                    </Badge>
                  </div>
                  <span className="text-xl font-bold text-green-600">{item.price} SAR</span>
                </div>
              </CardHeader>
              <CardContent>
                {/* <p className="text-gray-600 mb-4">{item.description}</p> */}
                <Button
                  onClick={() => handleAddToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
