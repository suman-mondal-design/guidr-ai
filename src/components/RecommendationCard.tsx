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
  Lightbulb
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
    window.open(internship.apply_link, '_blank');
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
    <Card className="p-6 shadow-custom-md hover:shadow-custom-lg transition-all duration-300 border-0 bg-gradient-card group hover:scale-[1.02]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{getSectorIcon(internship.sector)}</span>
            <Badge variant="outline" className="text-xs bg-secondary/50 border-border">
              {internship.sector}
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {internship.title}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground mb-2">
            <Building className="h-4 w-4" />
            <span className="text-sm">{internship.organization}</span>
          </div>
        </div>
      </div>

      {/* Key Info */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-foreground">{internship.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-primary" />
          <span className="text-foreground">{internship.duration}</span>
        </div>
      </div>

      {/* Stipend */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 bg-success/10 text-success px-3 py-1 rounded-full">
          <IndianRupee className="h-4 w-4" />
          <span className="font-semibold">{internship.stipend.toLocaleString()}/month</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {internship.description}
      </p>

      {/* Skills */}
      {internship.skills_required.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {internship.skills_required.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-accent/20 text-accent-foreground">
                {skill}
              </Badge>
            ))}
            {internship.skills_required.length > 3 && (
              <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                +{internship.skills_required.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Why Recommended */}
      <div className="bg-accent/10 border border-accent/20 rounded-lg p-3 mb-4">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-xs font-medium text-accent-foreground mb-1">
              Why recommended?
            </div>
            <div className="text-xs text-muted-foreground">
              {internship.reason}
            </div>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <Button 
        onClick={handleApply}
        className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-custom-sm hover:shadow-custom-md"
        size="lg"
      >
        {t('recommendations.apply')}
        <ExternalLink className="ml-2 h-4 w-4" />
      </Button>
    </Card>
  );
};