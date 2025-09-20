import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Building, 
  ExternalLink,
  Lightbulb,
  CheckCircle,
  Award,
  Shield
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';

export interface InternshipData {
  id: number;
  title: string;
  organization: string;
  sector: string;
  location: string;
  stipend: number;
  duration: string;
  description: string;
  reason: string;
  apply_link: string;
  skills_required: string[];
}

interface RecommendationCardProps {
  internship: InternshipData;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({ internship }) => {
  const { t } = useLanguage();

  const handleApply = () => {
    // Open the official PM Internship portal page
    window.open(internship.apply_link, '_blank', 'noopener,noreferrer');
  };

  const getSectorIcon = (sector: string) => {
    switch (sector.toLowerCase()) {
      case 'technology':
      case 'it':
        return '💻';
      case 'finance':
      case 'banking':
        return '💰';
      case 'education':
      case 'teaching':
        return '📚';
      case 'healthcare':
      case 'medical':
        return '🏥';
      case 'government':
      case 'public sector':
        return '🏛️';
      case 'non-profit':
      case 'ngo':
        return '🤝';
      case 'media':
      case 'journalism':
        return '📺';
      case 'design':
      case 'creative':
        return '🎨';
      default:
        return '💼';
    }
  };

  return (
    <Card className="group relative p-8 shadow-official hover:shadow-glow transition-all duration-500 border-2 border-border hover:border-saffron/50 bg-gradient-card hover:scale-[1.02] overflow-hidden">
      {/* Government Verified Badge */}
      <div className="absolute top-4 right-4">
        <div className="flex items-center gap-1 px-2 py-1 bg-success/10 border border-success/30 rounded-full">
          <Shield className="h-3 w-3 text-success" />
          <span className="text-xs text-success font-medium">Verified</span>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-government rounded-2xl flex items-center justify-center shadow-custom-md group-hover:shadow-glow transition-all duration-300">
          <span className="text-3xl">{getSectorIcon(internship.sector)}</span>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs bg-secondary/80 border-border font-medium">
              {internship.sector}
            </Badge>
            <Badge variant="outline" className="text-xs bg-green/10 border-green/30 text-green font-medium">
              <Award className="h-3 w-3 mr-1" />
              Certified
            </Badge>
          </div>
          
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {internship.title}
          </h3>
          
          <div className="flex items-center gap-2 text-muted-foreground">
            <Building className="h-4 w-4" />
            <span className="text-sm font-medium">{internship.organization}</span>
          </div>
        </div>
      </div>

      {/* Key Information Grid */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Location</div>
            <div className="font-semibold text-foreground">{internship.location}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Duration</div>
            <div className="font-semibold text-foreground">{internship.duration}</div>
          </div>
        </div>
      </div>

      {/* Stipend Highlight */}
      <div className="bg-gradient-to-r from-success/10 to-success/20 border border-success/30 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5 text-success" />
            <span className="text-success font-bold text-lg">₹{internship.stipend.toLocaleString()}</span>
            <span className="text-success-foreground text-sm">/month</span>
          </div>
          <div className="text-xs text-success bg-success/20 px-2 py-1 rounded-full">
            Monthly Stipend
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
        {internship.description}
      </p>

      {/* Skills Required */}
      {internship.skills_required.length > 0 && (
        <div className="mb-6">
          <div className="text-xs text-muted-foreground mb-3 font-medium">Required Skills</div>
          <div className="flex flex-wrap gap-2">
            {internship.skills_required.slice(0, 4).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="text-xs bg-accent/20 text-accent-foreground border border-accent/30 hover:bg-accent/30 transition-colors"
              >
                <CheckCircle className="h-3 w-3 mr-1" />
                {skill}
              </Badge>
            ))}
            {internship.skills_required.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                +{internship.skills_required.length - 4} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Why Recommended */}
      <div className="bg-gradient-to-r from-saffron/10 to-saffron/20 border border-saffron/30 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-saffron mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-semibold text-foreground mb-1">
              Perfect Match for You
            </div>
            <div className="text-sm text-muted-foreground">
              {internship.reason}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button 
        onClick={handleApply}
        className="w-full bg-gradient-government hover:scale-105 transition-all duration-300 shadow-custom-md hover:shadow-glow text-lg py-6 rounded-xl font-bold"
        size="lg"
      >
        {t('recommendations.apply')}
        <ExternalLink className="ml-3 h-5 w-5" />
      </Button>
    </Card>
  );
};