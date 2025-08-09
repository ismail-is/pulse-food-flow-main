
import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'nav.home': 'Home',
    'nav.menu': 'Menu',
    'nav.subscription': 'Subscription',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.dashboard': 'Dashboard',
    'nav.logout': 'Logout',
    'hero.title': 'Fresh, Healthy Meals Delivered to Your Door',
    'hero.subtitle': 'Join thousands who trust Pulse Food for nutritious, delicious meals crafted by professional chefs',
    'hero.cta': 'Start Your Journey',
    'features.title': 'Why Choose Pulse Food?',
    'features.fresh': 'Fresh Ingredients',
    'features.fresh.desc': 'Locally sourced, organic ingredients delivered fresh daily',
    'features.nutrition': 'Nutritionally Balanced',
    'features.nutrition.desc': 'Every meal is carefully crafted by nutritionists and chefs',
    'features.flexible': 'Flexible Plans',
    'features.flexible.desc': 'Choose from various meal plans that fit your lifestyle',
    'testimonials.title': 'What Our Customers Say',
    'faq.title': 'Frequently Asked Questions',
    'footer.description': 'Delivering fresh, healthy meals to fuel your lifestyle.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact Us',
    'footer.follow': 'Follow Us'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.menu': 'القائمة',
    'nav.subscription': 'الاشتراك',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب',
    'nav.dashboard': 'لوحة التحكم',
    'nav.logout': 'تسجيل الخروج',
    'hero.title': 'وجبات طازجة وصحية تُسلم إلى باب منزلك',
    'hero.subtitle': 'انضم إلى الآلاف الذين يثقون في بولس فود للحصول على وجبات مغذية ولذيذة من إعداد طهاة محترفين',
    'hero.cta': 'ابدأ رحلتك',
    'features.title': 'لماذا تختار بولس فود؟',
    'features.fresh': 'مكونات طازجة',
    'features.fresh.desc': 'مكونات محلية وعضوية تُسلم طازجة يومياً',
    'features.nutrition': 'متوازن غذائياً',
    'features.nutrition.desc': 'كل وجبة مُعدة بعناية من قبل أخصائيي التغذية والطهاة',
    'features.flexible': 'خطط مرنة',
    'features.flexible.desc': 'اختر من خطط وجبات متنوعة تناسب نمط حياتك',
    'testimonials.title': 'ماذا يقول عملاؤنا',
    'faq.title': 'الأسئلة الشائعة',
    'footer.description': 'توصيل وجبات طازجة وصحية لتغذية نمط حياتك.',
    'footer.links': 'روابط سريعة',
    'footer.contact': 'اتصل بنا',
    'footer.follow': 'تابعنا'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
