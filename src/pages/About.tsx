import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Truck, Clock, Shield, Utensils, Leaf, Heart, ChevronRight, MapPin, Calendar, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const About = () => {
  const [stats, setStats] = useState({
    customers: 0,
    dishes: 0,
    awards: 0
  });

  // Animation for counting stats
  useEffect(() => {
    const animateStats = () => {
      const duration = 2000;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setStats({
          customers: Math.floor(progress * 12500),
          dishes: Math.floor(progress * 87),
          awards: Math.floor(progress * 12)
        });

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    animateStats();
  }, []);

  const handleReservationClick = () => {
    toast.success("Reservation link clicked! (This would open booking modal)");
  };

  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: "Farm to Table",
      description: "We source 95% of our ingredients from local organic farms"
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "Healthy Choices",
      description: "Nutritionist-approved meals with balanced macros"
    },
    {
      icon: <Utensils className="w-8 h-8 text-yellow-600" />,
      title: "Chef Crafted",
      description: "Recipes created by our award-winning culinary team"
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "Quality Guarantee",
      description: "We stand behind every dish we serve"
    }
  ];

  const teamMembers = [
    {
      name: "Maria Konstantinos",
      role: "Founder & Head Chef",
      bio: "Third-generation chef from Crete with 25 years of Mediterranean culinary experience.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      specialties: ["Mediterranean Cuisine", "Family Recipes", "Olive Oil Mastery"]
    },
    {
      name: "Omar Al-Farsi",
      role: "Executive Chef",
      bio: "Specializes in fusion cuisine blending Levantine and North African flavors.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      specialties: ["Fusion Dishes", "Spice Blending", "Slow Cooking"]
    },
    {
      name: "Leila Nassar",
      role: "Pastry Chef",
      bio: "Creates our signature desserts using traditional techniques with modern twists.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      specialties: ["Baklava", "Modern Confections", "Sugar Art"]
    },
    {
      name: "Carlos Mendoza",
      role: "Mixologist",
      bio: "Crafts our signature cocktails with Mediterranean-inspired ingredients.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      specialties: ["Cocktail Pairing", "Local Ingredients", "Presentation"]
    }
  ];

  const timeline = [
    {
      year: "2010",
      event: "Founded in a small coastal village in Greece",
      description: "Started with just 5 tables and a dream to share authentic Mediterranean flavors"
    },
    {
      year: "2013",
      event: "First expansion in Athens",
      description: "Opened our first city location, introducing urban diners to traditional recipes"
    },
    {
      year: "2016",
      event: "First culinary award",
      description: "Recognized by Mediterranean Culinary Association for excellence"
    },
    {
      year: "2019",
      event: "International expansion",
      description: "Brought our flavors to Riyadh with a modern twist on tradition"
    },
    {
      year: "2023",
      event: "Sustainability certification",
      description: "Achieved Green Restaurant certification for our eco-friendly practices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section with Parallax Effect */}
      <section 
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)`,
          backgroundPosition: "center 30%",
          backgroundAttachment: 'fixed'
        }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white max-w-4xl px-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight font-serif">
            About  <span className="text-green-600">Us</span>
          </h1>
          {/* <p className="text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            Where Mediterranean tradition meets modern culinary passion
          </p> */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8"
          >
            {/* <Button 
              onClick={handleReservationClick}
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 text-lg rounded-full shadow-lg"
            >
              Book Your Table <ChevronRight className="ml-2" />
            </Button> */}
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Origin Story */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-block bg-orange-100 text-orange-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Heritage
            </div>
            <h2 className="text-4xl font-bold text-gray-900">From Humble Beginnings</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Pulse began as a dream shared around our family table in a small coastal village in Greece. 
                Three generations of recipes, passed down through weathered hands and whispered secrets, 
                found their way to our hearts—and now to yours.
              </p>
              <p>
                When we opened our doors in 2010, we brought more than just recipes. We brought the warmth of 
                summer evenings spent on terraces overlooking the Mediterranean, the laughter that echoes 
                through olive groves, and the simple joy of sharing a meal with people you love.
              </p>
              <p>
                Every dish we serve carries this heritage—the pulse of our homeland, beating strong 
                in every carefully crafted bite.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Button variant="outline" className="border-orange-300 text-orange-600">
                View Our Menu
              </Button>
              <Button variant="outline" className="border-green-300 text-green-600">
                Seasonal Specials
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-0 bg-white shadow-xl overflow-hidden">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                  alt="Our chef team" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <blockquote className="text-xl italic leading-relaxed text-white">
                    "Food is the thread that weaves families together, and every meal is a story waiting to be shared."
                  </blockquote>
                  <cite className="block mt-4 text-orange-300 font-medium">
                    — Maria Konstantinos, Founder
                  </cite>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-3xl p-12 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: stats.customers.toLocaleString(), label: "Satisfied Customers", suffix: "+" },
              { value: stats.dishes, label: "Signature Dishes", suffix: "" },
              { value: stats.awards, label: "Culinary Awards", suffix: "" }
            ].map((stat, index) => (
              <div key={index} className="p-6">
                <div className="text-6xl font-bold mb-2 font-serif">
                  {stat.value}
                  <span className="text-orange-300">{stat.suffix}</span>
                </div>
                <p className="text-xl">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Food Philosophy */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <img 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" 
              alt="Fresh ingredients" 
              className="w-full h-auto rounded-3xl shadow-2xl transform hover:scale-[1.01] transition-transform duration-300"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <div className="inline-block bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Promise
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Culinary Philosophy</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-green-50 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                      <p className="text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Timeline Section */}
        {/* <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Journey
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Milestones Along the Way</h2>
          </motion.div>
          
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 h-full w-1 bg-gradient-to-b from-green-500 to-orange-500 -ml-0.5"></div>
            
            <div className="space-y-12 md:space-y-0">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="hidden md:flex absolute left-1/2 -ml-3 h-6 w-6 rounded-full bg-gradient-to-r from-orange-500 to-green-500 border-4 border-white z-10"></div>
                  
                  <div className={`md:w-5/12 p-6 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8'}`}>
                    <div className="md:hidden w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-green-500 mb-4 mx-auto"></div>
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                      <div className="text-orange-600 font-bold text-lg mb-2">{item.year}</div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.event}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:block md:w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section> */}

        {/* Team Section */}
        {/* <section>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
              Meet the Team
            </div>
            <h2 className="text-4xl font-bold text-gray-900">Our Culinary Artists</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
              Passionate professionals dedicated to creating unforgettable dining experiences
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="overflow-hidden shadow-lg border-0 transition-all duration-300 group-hover:shadow-xl">
                  <div className="relative overflow-hidden h-80">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-white text-xl font-bold">{member.name}</h3>
                        <p className="text-orange-300">{member.role}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {member.specialties.map((specialty, i) => (
                            <span key={i} className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-white">
                    <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors">{member.name}</h3>
                    <p className="text-orange-600 mb-3">{member.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* Online Ordering Section */}
     <motion.section
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="bg-gradient-to-r from-green-700 to-green-600 rounded-3xl p-12 text-white shadow-2xl"
>
  <div className="grid lg:grid-cols-2 gap-12 items-stretch">
    {/* Left Side */}
    <div className="flex flex-col justify-center h-full">
      <h2 className="text-4xl font-bold mb-6">Experience Pulse at Home</h2>
      <p className="text-xl mb-8 leading-relaxed">
        Can't visit us in person? Enjoy our Mediterranean flavors delivered fresh to your door with our convenient online ordering.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {[
          { icon: <Clock className="w-6 h-6 text-yellow-300" />, text: "Fast 30-min delivery" },
          { icon: <Truck className="w-6 h-6 text-yellow-300" />, text: "Real-time tracking" },
          { icon: <Shield className="w-6 h-6 text-yellow-300" />, text: "Secure payment" },
          { icon: <Smartphone className="w-6 h-6 text-yellow-300" />, text: "Easy mobile ordering" }
        ].map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            {item.icon}
            <span className="font-medium">{item.text}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-4 mt-auto">
        <Button className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg">
          Start Ordering
        </Button>
        <Button variant="outline" className="border-white text-green-700 hover:bg-white/10 px-8 py-4 text-lg rounded-full">
          View Menu
        </Button>
      </div>
    </div>

    {/* Right Side */}
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-8 -left-8 z-10"
      ></motion.div>

      <video
        src="/img/all img/vedio/vedio.mp4"
        className="rounded-2xl shadow-2xl w-full max-w-md mx-auto border-8 border-white/20 h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  </div>
</motion.section>


        {/* Visit Us Section */}
        {/* <section className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-orange-600 to-orange-500 rounded-3xl p-12 text-white shadow-xl"
          >
            <h3 className="text-3xl font-bold mb-6">Visit Our Restaurant</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">123 Mediterranean Way</p>
                  <p className="text-orange-100">Riyadh, Saudi Arabia</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Open Hours</p>
                  <p className="text-orange-100">Daily 11AM - 11PM</p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={handleReservationClick}
                className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full shadow-lg"
              >
                <Calendar className="mr-2" /> Make a Reservation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full">
                Get Directions
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-12 shadow-xl"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900">Follow Our Journey</h3>
            <p className="text-gray-700 mb-8 text-lg">
              Join our community on social media for daily specials, behind-the-scenes content, and culinary inspiration.
            </p>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: <Instagram className="w-5 h-5" />, name: "Instagram" },
                { icon: <Twitter className="w-5 h-5" />, name: "Twitter" },
                { icon: <Facebook className="w-5 h-5" />, name: "Facebook" },
                { icon: <Youtube className="w-5 h-5" />, name: "YouTube" }
              ].map((social, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  className="border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-full flex items-center gap-2"
                >
                  {social.icon}
                  {social.name}
                </Button>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Subscribe to Our Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <Button className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-r-full -ml-1">
                  Subscribe
                </Button>
              </div>
            </div>
          </motion.div>
        </section> */}
      </div>
    </div>
  );
};

export default About;