import { useState } from 'react';

type MenuItem = {
  id: number;
  category: string;
  name: string;
  description: string;
  image: string;
};

const MenuSection = () => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const menuData: MenuItem[] = [
    { id: 1, category: 'PASTA', name: 'WHITE SAUCE PASTA', description: 'Creamy, cheesy, and rich with a smooth finish', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/20.png' },
    { id: 2, category: 'PASTA', name: 'RED SAUCE PASTA', description: 'Tangy tomato blend with herbs and seasoning', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/20.png' },
    { id: 3, category: 'PIZZA', name: 'PEPRONI PIZZA', description: 'Crispy pepperoni layered over cheesy perfection', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/20.png' },
    { id: 4, category: 'PIZZA', name: 'MARGARITA PIZZA', description: 'Classic tomato, mozzarella, and fresh basil combo', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/15.png' },
    { id: 5, category: 'SALAD', name: 'HALLOUMI SALAD', description: 'Grilled halloumi on crisp greens and veggies', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/14.png' },
    { id: 6, category: 'SALAD', name: 'ITALIAN SALAD', description: 'Olives, cherry tomatoes, herbs, and vinaigrette dressing', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/8.png' },
    { id: 7, category: 'BREAD TOASTS', name: 'CHICKEN CHEESE GARLIC BREAD', description: 'Cheesy garlic toast topped with tender chicken', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/8.png' },
    { id: 8, category: 'BREAD TOASTS', name: 'CHEESE GARLIC BREAD', description: 'Crispy bread topped with gooey garlic cheese', image: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/8.png' },
  ];

  const menuByCategory: Record<string, MenuItem[]> = {};
  menuData.forEach((item) => {
    if (!menuByCategory[item.category]) menuByCategory[item.category] = [];
    menuByCategory[item.category].push(item);
  });

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-white to-green-50">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-green-900 tracking-wide"> OUR MENU</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(menuByCategory).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-xl sm:text-2xl font-extrabold text-green-800 mb-6 underline underline-offset-4">{category}</h2>
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="relative p-5 bg-white rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition duration-300 hover:border-green-300"
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-green-900">{item.name}</h3>
                    <p className="text-sm text-gray-600 leading-snug">{item.description}</p>
                  </div>

                  {/* Hover Image Preview */}
                  {hoveredItemId === item.id && (
                    <div className="absolute z-50 sm:top-1/2 sm:left-full sm:ml-4 sm:-translate-y-1/2 sm:block hidden">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white transition-transform duration-300 transform scale-100 hover:scale-105 animate-fadeIn">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mobile Version of the image */}
                  <div className="sm:hidden mt-4">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeInScale {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeInScale 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default MenuSection;
