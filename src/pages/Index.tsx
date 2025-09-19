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

  // Mock recommendation data (in real app, this would come from API)
  const generateMockRecommendations = (profile: ProfileData): InternshipData[] => {
    const mockInternships: InternshipData[] = [
      {
        id: 1,
        title: "Software Development Intern",
        organization: "Tech Solutions India",
        sector: "Technology",
        location: "Bangalore",
        stipend: 15000,
        duration: "3 months",
        description: "Work on cutting-edge web applications using modern technologies. Perfect for computer science students.",
        reason: "Matches your Programming and Computer Skills expertise",
        apply_link: "https://pminternship.gov.in/listing/1",
        skills_required: ["Programming", "Computer Skills", "Web Development"]
      },
      {
        id: 2,
        title: "Digital Marketing Intern",
        organization: "Growth Marketing Agency",
        sector: "Marketing",
        location: "Delhi",
        stipend: 12000,
        duration: "4 months",
        description: "Learn digital marketing strategies, social media management, and campaign optimization.",
        reason: "Perfect match for your Marketing and Social Media interests",
        apply_link: "https://pminternship.gov.in/listing/2",
        skills_required: ["Marketing", "Social Media", "Communication"]
      },
      {
        id: 3,
        title: "Financial Analyst Intern",
        organization: "National Banking Corporation",
        sector: "Finance",
        location: "Mumbai",
        stipend: 18000,
        duration: "6 months",
        description: "Assist in financial analysis, report preparation, and data management for banking operations.",
        reason: "Great fit for your Accounting skills and Business interests",
        apply_link: "https://pminternship.gov.in/listing/3",
        skills_required: ["Accounting", "Data Entry", "Research"]
      },
      {
        id: 4,
        title: "Content Writing Intern",
        organization: "Educational Content Hub",
        sector: "Education",
        location: "Remote/Online",
        stipend: 8000,
        duration: "3 months",
        description: "Create educational content, blogs, and learning materials for students across India.",
        reason: "Matches your Writing skills and Education sector interest",
        apply_link: "https://pminternship.gov.in/listing/4",
        skills_required: ["Writing", "Communication", "Research"]
      },
      {
        id: 5,
        title: "Healthcare Assistant Intern",
        organization: "Community Health Foundation",
        sector: "Healthcare",
        location: "Chennai",
        stipend: 10000,
        duration: "4 months",
        description: "Support healthcare initiatives in rural communities, data collection, and patient interaction.",
        reason: "Aligns with your interest in Healthcare and Social Work",
        apply_link: "https://pminternship.gov.in/listing/5",
        skills_required: ["Communication", "Customer Service", "Research"]
      }
    ];

    // Filter and score based on profile
    return mockInternships
      .filter(internship => {
        // Location filter
        if (profile.location !== 'Any Location' && profile.location !== 'Remote/Online') {
          if (internship.location !== profile.location && internship.location !== 'Remote/Online') {
            return false;
          }
        }
        
        // Skills/interests match
        const hasSkillMatch = profile.skills.some(skill => 
          internship.skills_required.some(required => 
            required.toLowerCase().includes(skill.toLowerCase()) || 
            skill.toLowerCase().includes(required.toLowerCase())
          )
        );
        
        const hasInterestMatch = profile.interests.some(interest =>
          internship.sector.toLowerCase().includes(interest.toLowerCase()) ||
          interest.toLowerCase().includes(internship.sector.toLowerCase())
        );
        
        return hasSkillMatch || hasInterestMatch;
      })
      .slice(0, 5); // Return top 5 matches
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
      
      const mockRecommendations = generateMockRecommendations(data);
      setRecommendations(mockRecommendations);
      setCurrentState('recommendations');
      
      toast({
        title: "Recommendations Ready!",
        description: `Found ${mockRecommendations.length} internships matching your profile.`,
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
      const newRecommendations = generateMockRecommendations(profileData);
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
