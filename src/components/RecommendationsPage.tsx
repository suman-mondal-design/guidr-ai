import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
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
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

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
          {t('recommendations.back')}
        </Button>
        <LanguageToggle />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title & Profile Summary */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('recommendations.title')}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            {t('recommendations.subtitle').replace('{count}', recommendations.length.toString())}
          </p>
          
          {/* Profile Summary */}
          <div className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm rounded-xl p-6 shadow-custom-sm border border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Education</div>
                <div className="font-medium text-foreground">{profileData.education}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Location</div>
                <div className="font-medium text-foreground">{profileData.location}</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Skills</div>
                <div className="font-medium text-foreground">{profileData.skills.length} selected</div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Interests</div>
                <div className="font-medium text-foreground">{profileData.interests.length} selected</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        {recommendations.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {recommendations.map((internship) => (
              <RecommendationCard 
                key={internship.id} 
                internship={internship} 
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Recommendations Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find internships matching your criteria. Try adjusting your preferences.
            </p>
            <Button onClick={onBack} variant="outline">
              Update Preferences
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        {recommendations.length > 0 && (
          <div className="flex justify-center gap-4 mt-12">
            <Button 
              onClick={onRefresh}
              variant="outline"
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Get More Recommendations
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};