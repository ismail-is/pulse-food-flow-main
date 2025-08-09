
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { ChevronLeft, ChevronRight, Leaf, Heart, Clock, Star, Plus, Minus, ShoppingCart, Utensils } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { toast } from 'sonner';
import { FaUtensils, FaHeartbeat, FaClock, FaAppleAlt } from 'react-icons/fa';
import MenuSection from '@/components/MenuSection';

const Index = () => {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [quantities, setQuantities] = useState<{[key: number]: number}>({});

const features = [
  {
    icon: <FaUtensils size={28} />,
    title: 'Chef-Crafted, Nutrition-Backed',
    description: 'Delicious meals designed by chefs and approved by experts.',
  },
  {
    icon: <FaHeartbeat size={28} />,
    title: 'Tailored for Your Lifestyle',
    description: 'Meal plans that match your goals and routine.',
  },
  {
    icon: <FaAppleAlt size={28} />,
    title: 'Freshness You Can Taste',
    description: 'Prepared daily using real, high-quality ingredients.',
  },
  {
    icon: <FaClock size={28} />,
    title: 'Convenience Without Compromise',
    description: 'Healthy food delivered on time, every time.',
  },
];


const cardData = [
  {
    title: 'BURGER',
    image: 'https://ismail-is.github.io/pulse-webiste/assets/images/offer/offer-card1.png',
    items: '7+ PASTA MENU ITEMS',
    bgColor: 'bg-green-900',
    logo: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/logo/pulslogo.png',
  },
  {
    title: 'PIZZA',
    image: 'https://ismail-is.github.io/pulse-webiste/assets/images/offer/offer-card2.png',
    items: '7+ BURGER MENU ITEMS',
    bgColor: 'bg-lime-400',
    logo: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/logo/pulslogo.png',
  },
  {
    title: 'SALAD',
    image: 'https://ismail-is.github.io/pulse-webiste/assets/images/offer/offer-card5.png',
    items: '5+ BURGER MENU ITEMS',
    bgColor: 'bg-green-900',
    logo: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/logo/pulslogo.png',
  },
  {
    title: 'CHICKENS',
    image: 'https://ismail-is.github.io/pulse-webiste/assets/images/offer/offer-card4.png',
    items: '2+ BURGER MENU ITEMS',
    bgColor: 'bg-lime-400',
    logo: 'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/logo/pulslogo.png',
  },
];
  // Featured menu items with images and descriptions
  const featuredItems = [
    {
      id: 1,
      name: "White Sauce Pasta",
      description: "Creamy, cheesy, and rich with a smooth finish.",
      price: "45 SAR",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
      category: "Pasta",
      popular: true
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Crispy pepperoni layered over cheesy perfection.",
      price: "65 SAR",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "Pizza",
      popular: true
    },
    {
      id: 3,
      name: "Halloumi Salad",
      description: "Grilled halloumi on crisp greens and veggies.",
      price: "35 SAR",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
      category: "Salad",
      popular: false
    },
    {
      id: 4,
      name: "Beef Bolognese Spaghetti",
      description: "Slow-cooked minced beef in classic Italian sauce.",
      price: "55 SAR",
      image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f?w=400&h=300&fit=crop",
      category: "Pasta",
      popular: true
    },
    {
      id: 5,
      name: "Margherita Pizza",
      description: "Classic tomato, mozzarella, and fresh basil combo.",
      price: "50 SAR",
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
      category: "Pizza",
      popular: false
    },
    {
      id: 6,
      name: "Chicken Cheese Garlic Bread",
      description: "Cheesy garlic toast topped with tender chicken.",
      price: "25 SAR",
      image: "https://images.unsplash.com/photo-1619740455991-7c5fb77d8943?w=400&h=300&fit=crop",
      category: "Bread",
      popular: false
    }
  ];

  const testimonials = [
    {
      name: "Sarah Ahmed",
      text: "Pulse Food has transformed my eating habits. The meals are incredibly fresh and delicious!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Mohammed Al-Rashid", 
      text: "Amazing service and quality. I've lost 10kg in 3 months with their balanced meal plans.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Fatima Hassan",
      text: "The convenience is unmatched. Perfect for my busy lifestyle as a working mother.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  const faqs = [
    {
      question: "How does the subscription work?",
      answer: "Choose your meal plan, select your preferences, and we'll deliver fresh meals to your door weekly or monthly based on your subscription."
    },
    {
      question: "Can I customize my meals?",
      answer: "Yes! You can filter by diet type, calorie range, and exclude ingredients you don't like. Our chefs will craft meals according to your preferences."
    },
    {
      question: "What areas do you deliver to?",
      answer: "We currently deliver to Riyadh, Jeddah, and Dammam. We're expanding to more cities soon!"
    },
    {
      question: "How fresh are the ingredients?",
      answer: "All ingredients are sourced locally and prepared fresh daily. Meals are delivered within 24 hours of preparation."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const updateQuantity = (itemId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + change)
    }));
  };

  const handleAddToCart = (item: typeof featuredItems[0]) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: item.id,
        name: item.name,
        image: item.image,
        price: item.price,
        category: item.category
      });
    }
    setQuantities(prev => ({ ...prev, [item.id]: 0 }));
    toast.success(`Added ${quantity} ${item.name}(s) to cart!`);
  };
const [src, setSrc] = useState(
    'https://ismail-is.github.io/pulse-webiste/assets/images/allimg/home/mainbg1.png',
  );

  useEffect(() => {
    // 2️⃣ …then switch to the local image after 4 000 ms
    const id = setTimeout(() => {
      setSrc('https://ismail-is.github.io/pulse-webiste/assets/images/allimg/dishpng/rotate/3.png');
    }, 2000);

    // 👉 good habit: clear the timeout if the component unmounts
    return () => clearTimeout(id);
  }, []);

  const [satisfaction, setSatisfaction] = useState(0);
  const [deliveries, setDeliveries] = useState(0);
  const [recipes, setRecipes] = useState(0);
    useEffect(() => {
    const animate = (end: number, setter: (val: number) => void) => {
      let start = 0;
      const duration = 3000;
      const stepTime = 30;
      const step = end / (duration / stepTime);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          start = end;
          clearInterval(timer);
        }
        setter(Math.floor(start));
      }, stepTime);
    };

    animate(98, setSatisfaction);
    animate(95, setDeliveries);
    animate(100, setRecipes);
  }, []);
  return (
    <div className="min-h-screen">
     
      {/* Hero Section with Quick Order */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Order Fresh & Healthy Meals
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-lg">
                Choose from our delicious menu and get your favorite dishes delivered fresh to your door
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Start Ordering
                </Button>
                <Link to="/menu">
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-green-600 text-green-600 hover:bg-green-50">
                    <Utensils className="mr-2 h-5 w-5" />
                    View Full Menu
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
             <div className="relative z-10 shadow-2xl">
      <img
        alt="Healthy meal bowl"
        src={src}
        className="w-full object-cover rounded-2xl drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
        style={{
          animation: 'spin 30s linear infinite',
          transformOrigin: 'center',
        }}
      />
    </div>
              <div className="absolute top-4 right-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-sm font-semibold">400 kcal</span>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <span className="text-sm font-semibold">Organic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


<style>
  {`
    @keyframes marqueeLoop {
      0% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
  `}
</style>

<div className="relative overflow-hidden bg-white py-6">
  <div
    className="flex whitespace-nowrap animate-marquee"
    style={{
      animation: "marqueeLoop 15s linear infinite",
    }}
  >
    <div className="flex items-center gap-12 text-3xl font-bold px-4">
      {/* 1st Item */}
      <div className="flex items-center gap-3">
        <span className="text-orange-400">★</span>
        <span className="text-green-900">NUTRITIOUS</span>
      </div>

      {/* 2nd Item */}
      <div className="flex items-center gap-3">
        <span className="text-green-700">★</span>
        <span className="text-orange-400">DELICIOUS</span>
      </div>

      {/* 3rd Item */}
      <div className="flex items-center gap-3 text-green-700 px-4 py-1 rounded">
        <span className="text-orange-400">★</span>
        <span>FRESHNESS</span>
      </div>

      {/* Repeat items for smooth looping */}
      <div className="flex items-center gap-3">
        <span className="text-orange-400">★</span>
        <span className="text-green-900">NUTRITIOUS</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-green-700">★</span>
        <span className="text-orange-400">DELICIOUS</span>
      </div>

      <div className="flex items-center gap-3  text-green-700 px-4 py-1 rounded">
        <span className="text-orange-400">★</span>
        <span>FRESHNESS</span>
      </div>
    </div>
  </div>
</div>




  

 <div className="py-10 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`relative flex flex-col items-center justify-center text-center text-white p-6  ${card.bgColor}`}
          >
            <div className="mb-4">
              <img src={card.logo} alt="Logo" width={50} height={50} />
            </div>
            <div className="relative z-10 w-full max-w-[220px]">
              <img
                src={card.image}
                alt={card.title}
                width={300}
                height={300}
                className="mx-auto object-contain "
              />
            </div>
            <h2 className="text-4xl font-extrabold mt-6">{card.title}</h2>
            <span className="mt-2 text-sm bg-white text-green-800 px-4 py-1 rounded-md font-semibold">
              {card.items}
            </span>
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/10 uppercase">
              {card.title}   {card.title}    {card.title}    {card.title}
            </div>
          </div>
        ))}
      </div>
    </div>


    {/* count */}
<section
  className="relative py-24 px-4 lg:px-16 z-10"
  style={{
    background: '#fff',
    overflow: 'hidden'
  }}
>
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute left-0 top-0 w-72 h-72"
      style={{
        background: 'radial-gradient(circle, #15954577 38%, transparent 85%)',
        borderRadius: '9999px',
        opacity: 0.40,
        zIndex: 0,
        filter: 'blur(44px)'
      }}
    />
    <div
      className="absolute right-0 bottom-0 w-80 h-80"
      style={{
        background: 'radial-gradient(circle, #15954599 60%, transparent 100%)',
        borderRadius: '9999px',
        opacity: 0.22,
        zIndex: 0,
        filter: 'blur(48px)'
      }}
    />
  </div>
  <div className="container mx-auto max-w-7xl relative z-10">
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* Left */}
      <div>
        <h2 className="text-4xl md:text-5xl font-extrabold leading-snug text-black mb-6 tracking-tight">
          Why Choose{' '}
          <span
            style={{
              background: 'linear-gradient(90deg, #159545 60%, #000 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Pulse?
          </span>
        </h2>
        <p className="text-lg text-black mb-4 leading-relaxed font-medium">
          At Pulse, we believe eating healthy should be{' '}
          <span style={{ color: '#159545', fontWeight: 800 }}>simple</span>,
          <span className="font-semibold" style={{ color: '#159545' }}>satisfying</span>,
          and <span className="font-semibold" style={{ color: '#159545' }}>sustainable</span>.
          Our meals are crafted by expert chefs, blending nutritional science with delicious flavor for real life.
        </p>
        <p className="text-lg text-black mb-8 leading-relaxed">
          Whether you're chasing fitness goals or want a daily boost—Pulse delivers{' '}
          <span style={{ color: '#159545', fontWeight: 700 }}>fresh, wholesome meals</span> with vibrant taste every time.
        </p>
        <button
          className="px-10 py-3 rounded-full shadow-lg font-semibold text-base tracking-wide transition-all duration-300 hover:scale-105 focus:outline-none"
          style={{
            background: '#159545',
            color: '#fff'
          }}
        >
          Learn More About Us
        </button>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          {[
            { value: satisfaction, label: "Customer Satisfaction" },
            { value: deliveries, label: "On-Time Deliveries" },
            { value: recipes, label: "Chef-Crafted Recipes" }
          ].map(({ value, label }, i) => (
            <div
              key={label}
              className="rounded-xl bg-white px-4 py-5 shadow-lg flex flex-col items-center border hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              style={{
                borderColor: '#159545',
                borderWidth: 2
              }}
            >
              <span
                style={{
                  color: '#159545',
                  fontWeight: 800,
                  fontSize: '2.4rem'
                }}
              >
                {value}%
              </span>
              <span className="text-xs md:text-base text-black font-medium mt-1 text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Right Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 z-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white shadow-2xl p-7 border border-white/90 backdrop-blur-xl hover:border-[#159545] hover:-translate-y-1 transition-all duration-300"
            style={{
              minHeight: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              boxShadow: `0 8px 32px #15954522`
            }}
          >
            <div
              className="mb-4 w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              style={{
                background: '#159545',
                color: '#fff'
              }}
            >
              {feature.icon}
            </div>
            <h4 className="text-xl font-semibold text-black mb-2">{feature.title}</h4>
            <p className="text-black leading-relaxed font-medium">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>



    {/* count */}
 {/* <MenuSection/> */}


      {/* Featured Menu Items with Ordering */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Dishes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Order your favorite dishes with just a few clicks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredItems.map((item) => (
              <Card key={item.id} className="group hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.popular && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Popular
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  <p className="text-2xl font-bold text-green-600 mb-4">{item.price}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!quantities[item.id]}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-semibold w-8 text-center">
                        {quantities[item.id] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => handleAddToCart(item)}
                    disabled={!quantities[item.id]}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu">
              <Button size="lg" variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                View Complete Menu
              </Button>
            </Link>
          </div>
        </div>
      </section> */}

      {/* Features Section */}
   <section className="py-20 bg-[#159545]  relative overflow-hidden m-3 rounded-xl  " >
  {/* Decorative elements */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10">
    <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#1EAD53] blur-xl"></div>
    <div className="absolute bottom-10 right-20 w-40 h-40 rounded-full bg-[#159545] blur-xl"></div>
  </div>
  
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Why Choose <span className="text-white">Pulse Food ?</span>
      </h2>
      <p className="text-xl text-gray-100 max-w-2xl mx-auto">
        Discover what makes us the perfect choice for your healthy lifestyle
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <CardContent className="p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1EAD53]"></div>
          <div className="bg-[#1EAD53] bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-all">
            <Leaf className="h-10 w-10 text-[#1EAD53]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Fresh Ingredients</h3>
          <p className="text-gray-600">All ingredients sourced locally and prepared fresh daily</p>
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-[#1EAD53] bg-opacity-10 text-[#1EAD53] rounded-full text-sm font-medium group-hover:bg-opacity-20 transition-colors">
              Learn more →
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <CardContent className="p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#159545]"></div>
          <div className="bg-[#159545] bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-all">
            <Heart className="h-10 w-10 text-[#159545]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Nutritious & Balanced</h3>
          <p className="text-gray-600">Carefully crafted meals with perfect nutritional balance</p>
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-[#159545] bg-opacity-10 text-[#159545] rounded-full text-sm font-medium group-hover:bg-opacity-20 transition-colors">
              Learn more →
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white border border-gray-100 rounded-xl overflow-hidden">
        <CardContent className="p-8 text-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#1EAD53]"></div>
          <div className="bg-[#1EAD53] bg-opacity-10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-all">
            <Clock className="h-10 w-10 text-[#1EAD53]" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
          <p className="text-gray-600">Quick and reliable delivery to your doorstep</p>
          <div className="mt-6">
            <span className="inline-block px-4 py-2 bg-[#1EAD53] bg-opacity-10 text-[#1EAD53] rounded-full text-sm font-medium group-hover:bg-opacity-20 transition-colors">
              Learn more →
            </span>
          </div>
        </CardContent>
      </Card>
    </div>

    <div className="mt-16 text-center">
      <button className="px-8 py-3 bg-[#1EAD53] text-white font-medium rounded-full hover:bg-[#159545] transition-colors shadow-lg hover:shadow-xl">
        Start Your Healthy Journey Today
      </button>
    </div>
  </div>
</section>





      {/* Testimonials */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
          </div>

          <div className="relative">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                    <p className="text-gray-600">Verified Customer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full p-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full p-2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our service
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg border">
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-green-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
<section className="relative py-28 bg-green-700 overflow-hidden " style={{borderRadius:'80px 80px 0 0'}}>
  {/* Animated gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-600 to-green-500 opacity-80 animate-gradient-move z-0"></div>

  {/* Floating food-themed blobs or shapes */}
  <div className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
  <div className="absolute bottom-10 right-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce-slow"></div>
  <div className="absolute top-1/3 right-8 w-20 h-20 bg-green-300/20 rounded-full blur-xl animate-spin-slow"></div>

  <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
    {/* Top creative badge */}
    <div className="inline-block bg-white text-green-700 px-4 py-2 rounded-full font-semibold mb-6 shadow-lg animate-fade-in">
      🥗 Daily Nutrition Made Delightful!
    </div>

    {/* Main heading */}
    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
      Ready to Order Your Favorite Meal?
    </h2>

    {/* Subheading */}
    <p className="text-xl md:text-2xl text-green-100 mb-10 max-w-3xl mx-auto animate-fade-in-up delay-100">
      Trusted by thousands, <span className="font-semibold text-white">Pulse Food</span> fuels your day with wholesome and tasty meals.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
      <Link to="/menu">
        <Button
          size="lg"
          className="bg-white text-green-700 hover:bg-green-100 hover:shadow-xl px-8 py-4 text-lg font-semibold flex items-center transition-all duration-300"
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          Order Now
        </Button>
      </Link>
      <Link to="/subscription">
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-green-700 hover:shadow-xl px-8 py-4 text-lg font-semibold transition-all duration-300"
        >
          View Meal Plans
        </Button>
      </Link>
    </div>
  </div>
</section>


    </div>
  );
};

export default Index;
