import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  GraduationCap, 
  MapPin, 
  Users, 
  Briefcase,
  ArrowRight,
  Target,
  Heart,
  Award
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Target,
      title: 'Personalized Matches',
      description: 'AI-powered recommendations based on your profile'
    },
    {
      icon: Heart,
      title: 'Simple & Easy',
      description: 'Designed for everyone, no technical knowledge needed'
    },
    {
      icon: Award,
      title: 'Quality Opportunities',
      description: 'Curated internships from trusted organizations'
    }
  ];

  const stats = [
    { icon: Users, number: '10,000+', label: 'Students Helped' },
    { icon: Briefcase, number: '500+', label: 'Internships Available' },
    { icon: MapPin, number: '28', label: 'States Covered' },
    { icon: GraduationCap, number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="text-xl font-bold text-primary">{t('landing.title')}</div>
        </div>
        <LanguageToggle />
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-accent/20 text-accent-foreground rounded-full text-sm font-medium mb-6">
            {t('landing.tagline')}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('landing.subtitle')}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('landing.description')}
          </p>
          
          <Button 
            onClick={onGetStarted}
            size="lg"
            className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-custom-lg hover:shadow-glow text-lg px-8 py-6 rounded-xl"
          >
            {t('landing.cta')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 bg-gradient-card">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-6 text-center border-0 shadow-custom-sm bg-card/80 backdrop-blur-sm">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <stat.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.number}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};