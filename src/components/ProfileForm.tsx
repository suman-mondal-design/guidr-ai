import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  ArrowRight, 
  GraduationCap,
  MapPin,
  Briefcase,
  Heart,
  Shield,
  CheckCircle,
  Globe
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';

export interface ProfileData {
  education: string;
  skills: string[];
  interests: string[];
  location: string;
}

interface ProfileFormProps {
  onBack: () => void;
  onSubmit: (data: ProfileData) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ onBack, onSubmit }) => {
  const { t } = useLanguage();
  const [profileData, setProfileData] = useState<ProfileData>({
    education: '',
    skills: [],
    interests: [],
    location: ''
  });

  const educationOptions = [
    '10th Pass', '12th Pass', 'Diploma', 'Undergraduate', 'Graduate', 'Post Graduate'
  ];

  const skillOptions = [
    'Computer Skills', 'Communication', 'Accounting', 'Marketing', 'Design', 
    'Writing', 'Teaching', 'Sales', 'Management', 'Research', 'Programming',
    'Data Entry', 'Customer Service', 'Social Media'
  ];

  const interestOptions = [
    'Technology', 'Business', 'Education', 'Healthcare', 'Government', 
    'Non-Profit', 'Media', 'Finance', 'Marketing', 'Design', 'Research',
    'Social Work', 'Environment', 'Agriculture'
  ];

  const locationOptions = [
    'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad',
    'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow', 'Bhopal', 'Patna',
    'Remote/Online', 'Any Location'
  ];

  const handleSkillToggle = (skill: string) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleInterestToggle = (interest: string) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileData.education && profileData.skills.length > 0 && profileData.interests.length > 0 && profileData.location) {
      onSubmit(profileData);
    }
  };

  const isComplete = profileData.education && profileData.skills.length > 0 && profileData.interests.length > 0 && profileData.location;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Official Header */}
      <header className="bg-white border-b-4 border-saffron shadow-official">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="gap-2 border-2 hover:border-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
            
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

      {/* Form Content */}
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-success" />
            <span className="text-success font-medium">Secure Government Portal</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-government bg-clip-text text-transparent">
              {t('profile.title')}
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('profile.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Education Level */}
          <Card className="p-8 shadow-official border-2 border-border hover:border-saffron/30 bg-gradient-card transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-government rounded-2xl flex items-center justify-center shadow-custom-md">
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('profile.education')}</h3>
                <p className="text-muted-foreground">Select your highest qualification</p>
              </div>
            </div>
            <Select
              value={profileData.education}
              onValueChange={(value) => setProfileData(prev => ({ ...prev, education: value }))}
            >
              <SelectTrigger className="w-full h-14 bg-background border-2 border-border hover:border-primary text-lg">
                <SelectValue placeholder={t('profile.education.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border shadow-official">
                {educationOptions.map(option => (
                  <SelectItem key={option} value={option} className="text-lg py-3">{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Skills */}
          <Card className="p-8 shadow-official border-2 border-border hover:border-saffron/30 bg-gradient-card transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-government rounded-2xl flex items-center justify-center shadow-custom-md">
                <Briefcase className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('profile.skills')}</h3>
                <p className="text-muted-foreground">Choose all skills that apply to you</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {skillOptions.map(skill => (
                <Badge
                  key={skill}
                  variant={profileData.skills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 text-sm py-2 px-4 ${
                    profileData.skills.includes(skill) 
                      ? 'bg-gradient-government text-white shadow-custom-sm hover:shadow-glow border-0' 
                      : 'hover:bg-secondary border-2 border-border hover:border-primary'
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {profileData.skills.includes(skill) && <CheckCircle className="h-3 w-3 mr-1" />}
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-8 shadow-official border-2 border-border hover:border-saffron/30 bg-gradient-card transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-government rounded-2xl flex items-center justify-center shadow-custom-md">
                <Heart className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('profile.interests')}</h3>
                <p className="text-muted-foreground">Select sectors that interest you</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {interestOptions.map(interest => (
                <Badge
                  key={interest}
                  variant={profileData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 text-sm py-2 px-4 ${
                    profileData.interests.includes(interest) 
                      ? 'bg-gradient-government text-white shadow-custom-sm hover:shadow-glow border-0' 
                      : 'hover:bg-secondary border-2 border-border hover:border-primary'
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {profileData.interests.includes(interest) && <CheckCircle className="h-3 w-3 mr-1" />}
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Location */}
          <Card className="p-8 shadow-official border-2 border-border hover:border-saffron/30 bg-gradient-card transition-all duration-300">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-government rounded-2xl flex items-center justify-center shadow-custom-md">
                <MapPin className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">{t('profile.location')}</h3>
                <p className="text-muted-foreground">Where would you like to work?</p>
              </div>
            </div>
            <Select
              value={profileData.location}
              onValueChange={(value) => setProfileData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="w-full h-14 bg-background border-2 border-border hover:border-primary text-lg">
                <SelectValue placeholder={t('profile.location.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-2 border-border shadow-official">
                {locationOptions.map(option => (
                  <SelectItem key={option} value={option} className="text-lg py-3">{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Submit Button */}
          <div className="text-center pt-8">
            <Button
              type="submit"
              disabled={!isComplete}
              size="lg"
              className={`text-xl px-16 py-8 rounded-2xl font-bold transition-all duration-300 ${
                isComplete 
                  ? 'bg-gradient-government hover:scale-105 shadow-official hover:shadow-glow' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
              }`}
            >
              {t('profile.submit')}
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            
            {!isComplete && (
              <p className="text-muted-foreground mt-4 text-sm">
                Please complete all sections to continue
              </p>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};