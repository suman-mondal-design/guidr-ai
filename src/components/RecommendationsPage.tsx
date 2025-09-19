import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw, Shield, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageProvider';
import { LanguageToggle } from './LanguageToggle';
import { RecommendationCard, InternshipData } from './RecommendationCard';
import { ProfileData } from './ProfileForm';

interface RecommendationsPageProps {
  profileData: ProfileData;
  recommendations: InternshipData[];
  onBack: () => void;
  onRefresh: () => void;
  loading?: boolean;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ 
  profileData, 
  recommendations, 
  onBack, 
  onRefresh,
  loading = false
}) => {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center">
        <div className="text-center bg-card rounded-3xl p-12 shadow-official border-2 border-border">
          <div className="w-16 h-16 bg-gradient-government rounded-full flex items-center justify-center mx-auto mb-6">
            <RefreshCw className="h-8 w-8 animate-spin text-white" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">Finding Perfect Matches</h3>
          <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
          <div className="mt-4 text-sm text-muted-foreground">
            Analyzing your profile with AI recommendations...
          </div>
        </div>
      </div>
    );
  }

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
              {t('recommendations.back')}
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

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Government Verified Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Shield className="h-6 w-6 text-success" />
            <span className="text-success font-semibold">Government Verified Recommendations</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            <span className="bg-gradient-government bg-clip-text text-transparent">
              {t('recommendations.title')}
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            {t('recommendations.subtitle').replace('{count}', recommendations.length.toString())}
          </p>
          
          {/* Enhanced Profile Summary */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 shadow-official border-2 border-border">
            <h3 className="text-lg font-bold text-foreground mb-6">Your Profile Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-muted-foreground text-sm mb-1">Education</div>
                <div className="font-bold text-foreground">{profileData.education}</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-muted-foreground text-sm mb-1">Location</div>
                <div className="font-bold text-foreground">{profileData.location}</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-muted-foreground text-sm mb-1">Skills</div>
                <div className="font-bold text-foreground">{profileData.skills.length} selected</div>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="text-muted-foreground text-sm mb-1">Interests</div>
                <div className="font-bold text-foreground">{profileData.interests.length} selected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        {recommendations.length > 0 ? (
          <>
            {/* Recommendations Count and Filter Info */}
            <div className="bg-gradient-to-r from-saffron/10 to-saffron/20 border border-saffron/30 rounded-2xl p-6 mb-8 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">
                🎯 {recommendations.length} Perfect Matches Found
              </h3>
              <p className="text-muted-foreground">
                Based on your profile, skills, and preferences. All internships are government verified.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-8xl mx-auto">
              {recommendations.map((internship) => (
                <RecommendationCard 
                  key={internship.id} 
                  internship={internship} 
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-government rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">No Recommendations Found</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn't find internships matching your criteria. Try adjusting your preferences to discover more opportunities.
            </p>
            <Button 
              onClick={onBack} 
              className="bg-gradient-government hover:scale-105 transition-all duration-300 shadow-custom-md hover:shadow-glow"
              size="lg"
            >
              Update Preferences
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        {recommendations.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
            <Button 
              onClick={onRefresh}
              variant="outline"
              className="gap-2 border-2 hover:border-primary px-8 py-4 text-lg"
              size="lg"
            >
              <RefreshCw className="h-5 w-5" />
              Get More Recommendations
            </Button>
            
            <Button 
              onClick={onBack}
              className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-custom-md hover:shadow-glow px-8 py-4 text-lg"
              size="lg"
            >
              Refine My Profile
            </Button>
          </div>
        )}

        {/* Government Footer Notice */}
        <div className="mt-16 text-center bg-secondary/50 rounded-2xl p-8 border border-border">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-success" />
            <span className="font-semibold text-foreground">Official Government Portal</span>
          </div>
          <p className="text-muted-foreground text-sm max-w-3xl mx-auto">
            All recommendations are generated through government-verified algorithms and match official PM Internship Scheme criteria. 
            Your data is secure and processed according to government privacy standards.
          </p>
        </div>
      </main>
    </div>
  );
};