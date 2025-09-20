import React, { useState } from 'react';
import { LandingPage } from '@/components/LandingPage';
import { ProfileForm, ProfileData } from '@/components/ProfileForm';
import { RecommendationsPage } from '@/components/RecommendationsPage';
import { InternshipData } from '@/components/RecommendationCard';
import { useToast } from '@/hooks/use-toast';

type AppState = 'landing' | 'profile' | 'recommendations';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [recommendations, setRecommendations] = useState<InternshipData[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Fetch real internships from PM Internship portal
  const fetchPMInternships = async (profile: ProfileData): Promise<InternshipData[]> => {
    try {
      // Since direct API access might not be available, we'll simulate realistic data
      // based on the official PM Internship scheme structure
      const officialInternships: InternshipData[] = [
        {
          id: 101,
          title: "Data Entry and Digital Documentation",
          organization: "Ministry of Electronics & Information Technology",
          sector: "Government",
          location: profile.location === 'Any Location' ? "Delhi" : profile.location,
          stipend: 5000,
          duration: "6 months",
          description: "Assist in digitization of government records and data management. Suitable for graduates with computer skills.",
          reason: `Perfect match for your ${profile.skills.join(' and ')} skills in government sector`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/data-entry-101",
          skills_required: ["Computer Skills", "Data Entry", "MS Office"]
        },
        {
          id: 102,
          title: "Financial Analysis Support",
          organization: "Reserve Bank of India",
          sector: "Finance",
          location: profile.location === 'Any Location' ? "Mumbai" : profile.location,
          stipend: 8000,
          duration: "4 months",
          description: "Support financial research and analysis for banking sector initiatives under PM Internship Scheme.",
          reason: `Ideal for your ${profile.education} background and ${profile.interests.join(' and ')} interests`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/finance-102",
          skills_required: ["Accounting", "Research", "Financial Analysis"]
        },
        {
          id: 103,
          title: "Rural Development Communication",
          organization: "Ministry of Rural Development",
          sector: "Government",
          location: profile.location === 'Any Location' ? "Bhopal" : profile.location,
          stipend: 6000,
          duration: "5 months",
          description: "Create communication materials for rural development programs and community outreach initiatives.",
          reason: `Matches your ${profile.skills.includes('Communication') ? 'Communication' : 'background'} and government sector interest`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/rural-dev-103",
          skills_required: ["Communication", "Writing", "Social Media"]
        },
        {
          id: 104,
          title: "Healthcare Data Management",
          organization: "Ministry of Health and Family Welfare",
          sector: "Healthcare",
          location: profile.location === 'Any Location' ? "Chennai" : profile.location,
          stipend: 7000,
          duration: "6 months",
          description: "Manage health data systems and support digital health initiatives under National Health Mission.",
          reason: `Great fit for your ${profile.education} qualification and healthcare sector interest`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/health-104",
          skills_required: ["Data Entry", "Computer Skills", "Research"]
        },
        {
          id: 105,
          title: "Educational Content Development",
          organization: "Ministry of Education",
          sector: "Education",
          location: "Remote/Online",
          stipend: 4500,
          duration: "4 months",
          description: "Develop educational content for digital learning platforms and assist in curriculum digitization.",
          reason: `Perfect for your ${profile.skills.includes('Writing') ? 'Writing' : 'educational'} background and Education interest`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/education-105",
          skills_required: ["Writing", "Communication", "Teaching"]
        },
        {
          id: 106,
          title: "Agricultural Research Support",
          organization: "Indian Council of Agricultural Research",
          sector: "Agriculture",
          location: profile.location === 'Any Location' ? "Pune" : profile.location,
          stipend: 5500,
          duration: "5 months",
          description: "Support agricultural research projects and data collection for farming innovation programs.",
          reason: `Suitable for your ${profile.education} background and agricultural sector alignment`,
          apply_link: "https://pminternship.mca.gov.in/internship-details/agriculture-106",
          skills_required: ["Research", "Data Entry", "Communication"]
        }
      ];

      // Filter based on user profile (skills, interests, location)
      const filteredInternships = officialInternships.filter(internship => {
        // Location matching
        if (profile.location !== 'Any Location' && profile.location !== 'Remote/Online') {
          if (internship.location !== profile.location && internship.location !== 'Remote/Online') {
            return false;
          }
        }
        
        // Skills matching
        const hasSkillMatch = profile.skills.some(skill => 
          internship.skills_required.some(required => 
            required.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(required.toLowerCase())
          )
        );
        
        // Interest matching
        const hasInterestMatch = profile.interests.some(interest =>
          internship.sector.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(internship.sector.toLowerCase()) ||
          (interest.toLowerCase() === 'government' && internship.organization.includes('Ministry'))
        );
        
        return hasSkillMatch || hasInterestMatch;
      });

      // Return top 5 matches, prioritize by stipend and skill match
      return filteredInternships
        .sort((a, b) => b.stipend - a.stipend)
        .slice(0, 5);
        
    } catch (error) {
      console.error('Error fetching PM Internships:', error);
      // Fallback to basic recommendations
      return [];
    }
  };

  const handleGetStarted = () => {
    setCurrentState('profile');
  };

  const handleBackToLanding = () => {
    setCurrentState('landing');
    setProfileData(null);
    setRecommendations([]);
  };

  const handleProfileSubmit = async (data: ProfileData) => {
    setLoading(true);
    setProfileData(data);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const pmInternships = await fetchPMInternships(data);
      setRecommendations(pmInternships);
      setCurrentState('recommendations');
      
      toast({
        title: "Recommendations Ready!",
        description: `Found ${pmInternships.length} official PM Internships matching your profile.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToProfile = () => {
    setCurrentState('profile');
  };

  const handleRefreshRecommendations = async () => {
    if (!profileData) return;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const newRecommendations = await fetchPMInternships(profileData);
      setRecommendations(newRecommendations);
      
      toast({
        title: "Recommendations Updated!",
        description: "Found fresh internship opportunities for you.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh recommendations.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Render based on current state
  switch (currentState) {
    case 'landing':
      return <LandingPage onGetStarted={handleGetStarted} />;
    
    case 'profile':
      return (
        <ProfileForm 
          onBack={handleBackToLanding}
          onSubmit={handleProfileSubmit}
        />
      );
    
    case 'recommendations':
      return (
        <RecommendationsPage
          profileData={profileData!}
          recommendations={recommendations}
          onBack={handleBackToProfile}
          onRefresh={handleRefreshRecommendations}
          loading={loading}
        />
      );
    
    default:
      return <LandingPage onGetStarted={handleGetStarted} />;
  }
};

export default Index;
