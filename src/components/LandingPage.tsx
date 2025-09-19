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
  Shield,
  Award,
  CheckCircle,
  IndianRupee,
  Globe
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
      icon: Shield,
      title: 'Government Verified',
      description: 'Official internships from trusted government and partner organizations'
    },
    {
      icon: Target,
      title: 'AI-Powered Matching',
      description: 'Advanced algorithms to find the perfect internship for your profile'
    },
    {
      icon: Award,
      title: 'Skill Development',
      description: 'Build practical skills and gain real-world work experience'
    }
  ];

  const stats = [
    { icon: Users, number: '50,000+', label: 'Students Benefited' },
    { icon: Briefcase, number: '1,200+', label: 'Active Internships' },
    { icon: MapPin, number: '28', label: 'States & UTs' },
    { icon: IndianRupee, number: '₹15,000', label: 'Average Stipend' }
  ];

  const benefits = [
    'Direct access to government internship programs',
    'Personalized recommendations based on your profile',
    'Easy application process with government portal integration',
    'Skills certification and work experience certificates',
    'Career guidance and mentorship opportunities'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Official Header with Government Branding */}
      <header className="bg-white border-b-4 border-saffron shadow-official">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Government Emblem */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-government rounded-full flex items-center justify-center shadow-official">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-saffron rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">{t('landing.title')}</div>
                <div className="text-sm text-muted-foreground">Government of India</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green/10 text-green rounded-full text-sm">
                <Globe className="h-4 w-4" />
                <span>भारत सरकार</span>
              </div>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Official Government Styling */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-5xl mx-auto mb-20">
          {/* Government Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-tricolor rounded-full text-white font-semibold mb-8 shadow-official">
            <Shield className="h-5 w-5" />
            <span className="text-primary-dark">{t('landing.tagline')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-8 leading-tight">
            <span className="bg-gradient-government bg-clip-text text-transparent">
              {t('landing.subtitle')}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            {t('landing.description')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-government hover:scale-105 transition-all duration-300 shadow-official hover:shadow-glow text-xl px-12 py-8 rounded-2xl font-semibold"
            >
              {t('landing.cta')}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span>100% Free & Government Verified</span>
            </div>
          </div>

          {/* Key Benefits List */}
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-official border border-border/50 max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-6">Why Choose PM Internship Scheme?</h3>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features with Government Styling */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card key={index} className="group p-8 border-2 border-border hover:border-saffron/50 shadow-custom-md hover:shadow-official transition-all duration-300 bg-gradient-card hover:scale-105">
              <div className="w-16 h-16 bg-gradient-government rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Government Statistics */}
        <div className="bg-white rounded-3xl p-12 shadow-official border-t-4 border-saffron mb-16">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">Our Impact Across India</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Empowering youth nationwide through quality internship opportunities</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center border-0 shadow-custom-sm bg-gradient-card hover:shadow-custom-md transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>

        {/* Official Government Footer Notice */}
        <div className="text-center bg-secondary/50 rounded-2xl p-8 border border-border">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-success" />
            <span className="font-semibold text-foreground">Official Government Initiative</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
            This portal is an official initiative under the PM Internship Scheme by the Government of India. 
            All internships are verified and comply with government standards for youth development and skill building.
          </p>
        </div>
      </main>
    </div>
  );
};