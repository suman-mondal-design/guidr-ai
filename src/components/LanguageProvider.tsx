import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    'landing.title': 'PM Internship Scheme',
    'landing.subtitle': 'Find Perfect Internships Made For You',
    'landing.description': 'Get personalized internship recommendations based on your skills, interests, and location. Simple, fast, and designed for everyone.',
    'landing.cta': 'Get My Recommendations',
    'landing.tagline': 'Connecting Youth to Opportunities',
    
    // Profile Form
    'profile.title': 'Tell Us About Yourself',
    'profile.subtitle': 'Help us find the best internships for you',
    'profile.education': 'Education Level',
    'profile.education.placeholder': 'Select your education level',
    'profile.skills': 'Skills',
    'profile.skills.placeholder': 'Select your skills',
    'profile.interests': 'Interests',
    'profile.interests.placeholder': 'What interests you?',
    'profile.location': 'Preferred Location',
    'profile.location.placeholder': 'Select location',
    'profile.submit': 'Find Internships',
    
    // Recommendations
    'recommendations.title': 'Recommended for You',
    'recommendations.subtitle': 'We found {count} internships perfect for your profile',
    'recommendations.apply': 'Apply Now',
    'recommendations.stipend': '₹{amount}/month',
    'recommendations.reason': 'Why recommended: {reason}',
    'recommendations.back': 'Edit Profile',
    
    // Common
    'common.language': 'Language',
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong. Please try again.',
  },
  hi: {
    // Landing Page
    'landing.title': 'पीएम इंटर्नशिप योजना',
    'landing.subtitle': 'आपके लिए बनाई गई सही इंटर्नशिप खोजें',
    'landing.description': 'अपने कौशल, रुचियों और स्थान के आधार पर व्यक्तिगत इंटर्नशिप सिफारिशें प्राप्त करें। सरल, तेज़, और सभी के लिए डिज़ाइन किया गया।',
    'landing.cta': 'मेरी सिफारिशें पाएं',
    'landing.tagline': 'युवाओं को अवसरों से जोड़ना',
    
    // Profile Form
    'profile.title': 'अपने बारे में बताएं',
    'profile.subtitle': 'आपके लिए सबसे अच्छी इंटर्नशिप खोजने में हमारी मदद करें',
    'profile.education': 'शिक्षा स्तर',
    'profile.education.placeholder': 'अपना शिक्षा स्तर चुनें',
    'profile.skills': 'कौशल',
    'profile.skills.placeholder': 'अपने कौशल चुनें',
    'profile.interests': 'रुचियां',
    'profile.interests.placeholder': 'आपकी रुचि किसमें है?',
    'profile.location': 'पसंदीदा स्थान',
    'profile.location.placeholder': 'स्थान चुनें',
    'profile.submit': 'इंटर्नशिप खोजें',
    
    // Recommendations
    'recommendations.title': 'आपके लिए सुझाव',
    'recommendations.subtitle': 'हमने आपकी प्रोफाइल के लिए {count} इंटर्नशिप पाई',
    'recommendations.apply': 'आवेदन करें',
    'recommendations.stipend': '₹{amount}/महीना',
    'recommendations.reason': 'क्यों सुझाया गया: {reason}',
    'recommendations.back': 'प्रोफाइल संपादित करें',
    
    // Common
    'common.language': 'भाषा',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key as keyof typeof translations[typeof language]] || key;
    
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, String(value));
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};