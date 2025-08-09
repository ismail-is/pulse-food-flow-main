
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, User, LogOut, Globe, ShoppingCart } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  // Get user display name from metadata or email
  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.name || user.email?.split('@')[0] || 'User';
  };

  return (
    
    <nav className="bg-[#25AC55] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src='img/all img/logo/P whitelog.png' className="text-2xl font-bold h-36 "></img>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-[#bfff00] transition-colors">
              {t('nav.home')}
            </Link>
             <Link to="/about" className="text-white hover:text-[#bfff00] transition-colors">
            About
            </Link>
            <Link to="/menu" className="text-white hover:text-[#bfff00] transition-colors">
              {t('nav.menu')}
            </Link>
            <Link to="/subscription" className="text-white hover:text-[#bfff00] transition-colors">
              {t('nav.subscription')}
            </Link>
            <Link to="/contact" className="text-white hover:text-[#bfff00] transition-colors">
            Contact
            </Link>
            
            <Link to="/cart" className="relative text-white hover:text-green-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
{/*             
            <Button variant="ghost" onClick={toggleLanguage} size="sm">
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'العربية' : 'English'}
            </Button> */}

            {/* {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{getUserDisplayName()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    {t('nav.dashboard')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="ghost">{t('nav.login')}</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-green-600 hover:bg-green-700">{t('nav.register')}</Button>
                </Link>
              </div>
            )} */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link to="/cart" className="relative text-gray-700 hover:text-green-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/menu"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.menu')}
              </Link>
              <Link
                to="/subscription"
                className="block px-3 py-2 text-gray-700 hover:text-green-600"
                onClick={() => setIsOpen(false)}
              >
                {t('nav.subscription')}
              </Link>
              
              <div className="border-t pt-2">
                <Button variant="ghost" onClick={toggleLanguage} size="sm" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'العربية' : 'English'}
                </Button>
              </div>

              {isAuthenticated ? (
                <div className="border-t pt-2">
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 text-gray-700 hover:text-green-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              ) : (
                <div className="border-t pt-2 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full">{t('nav.login')}</Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-green-600 hover:bg-green-700">{t('nav.register')}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      


      
    </nav>
  );
};

export default Navbar;
