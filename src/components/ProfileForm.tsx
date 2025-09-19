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
  Heart
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
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <LanguageToggle />
      </header>

      {/* Form */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('profile.title')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('profile.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Education Level */}
          <Card className="p-6 shadow-custom-md border-0 bg-gradient-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t('profile.education')}</h3>
            </div>
            <Select
              value={profileData.education}
              onValueChange={(value) => setProfileData(prev => ({ ...prev, education: value }))}
            >
              <SelectTrigger className="w-full h-12 bg-background border-border">
                <SelectValue placeholder={t('profile.education.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-custom-md">
                {educationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Skills */}
          <Card className="p-6 shadow-custom-md border-0 bg-gradient-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t('profile.skills')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map(skill => (
                <Badge
                  key={skill}
                  variant={profileData.skills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    profileData.skills.includes(skill) 
                      ? 'bg-gradient-primary text-primary-foreground shadow-custom-sm' 
                      : 'hover:bg-secondary border-border'
                  }`}
                  onClick={() => handleSkillToggle(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Interests */}
          <Card className="p-6 shadow-custom-md border-0 bg-gradient-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t('profile.interests')}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interestOptions.map(interest => (
                <Badge
                  key={interest}
                  variant={profileData.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    profileData.interests.includes(interest) 
                      ? 'bg-gradient-primary text-primary-foreground shadow-custom-sm' 
                      : 'hover:bg-secondary border-border'
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6 shadow-custom-md border-0 bg-gradient-card">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t('profile.location')}</h3>
            </div>
            <Select
              value={profileData.location}
              onValueChange={(value) => setProfileData(prev => ({ ...prev, location: value }))}
            >
              <SelectTrigger className="w-full h-12 bg-background border-border">
                <SelectValue placeholder={t('profile.location.placeholder')} />
              </SelectTrigger>
              <SelectContent className="bg-card border-border shadow-custom-md">
                {locationOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Card>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!isComplete}
            size="lg"
            className={`w-full py-6 text-lg rounded-xl transition-all duration-300 ${
              isComplete 
                ? 'bg-gradient-primary hover:scale-105 shadow-custom-lg hover:shadow-glow' 
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {t('profile.submit')}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </form>
      </main>
    </div>
  );
};