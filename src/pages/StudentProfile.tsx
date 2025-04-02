
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Award, TrendingUp, Briefcase } from 'lucide-react';

// Mock API call for student details
const fetchStudentProfile = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  return {
    details: {
      name: "Ravi Sharma",
      class: "VIII-A",
      rollNumber: "A2023-08-12",
      dateOfBirth: "2010-05-15",
      gender: "Male",
      bloodGroup: "B+",
      admissionDate: "2020-04-10",
      address: "123 Green Park, New Delhi",
      parentName: "Rajesh Sharma",
      parentContact: "+91-9876543210",
      parentEmail: "rajesh.sharma@example.com"
    },
    achievements: [
      { id: 1, title: "Science Project Winner", date: "2023-08-15", category: "academic" },
      { id: 2, title: "Perfect Attendance", date: "2023-07-01", category: "discipline" },
      { id: 3, title: "District Chess Champion", date: "2023-05-20", category: "sports" },
      { id: 4, title: "Mathematical Olympiad - Silver", date: "2022-12-10", category: "academic" },
    ],
    healthTrends: {
      height: [
        { date: "2021-01", value: 145 },
        { date: "2021-06", value: 148 },
        { date: "2022-01", value: 152 },
        { date: "2022-06", value: 156 },
        { date: "2023-01", value: 160 },
        { date: "2023-06", value: 164 }
      ],
      weight: [
        { date: "2021-01", value: 38 },
        { date: "2021-06", value: 40 },
        { date: "2022-01", value: 43 },
        { date: "2022-06", value: 45 },
        { date: "2023-01", value: 48 },
        { date: "2023-06", value: 50 }
      ],
      bmi: [
        { date: "2021-01", value: 18.1 },
        { date: "2021-06", value: 18.3 },
        { date: "2022-01", value: 18.6 },
        { date: "2022-06", value: 18.5 },
        { date: "2023-01", value: 18.8 },
        { date: "2023-06", value: 18.6 }
      ]
    },
    careerPredictions: {
      primary: {
        career: "Engineering",
        confidence: 85,
        strengths: ["Mathematics", "Problem Solving", "Logical Thinking"],
        suggestedFields: ["Computer Science", "Mechanical Engineering", "Robotics"]
      },
      secondary: {
        career: "Scientific Research",
        confidence: 70,
        strengths: ["Analytical Skills", "Attention to Detail", "Scientific Curiosity"],
        suggestedFields: ["Physics", "Material Science", "Biotechnology"]
      },
      tertiary: {
        career: "Digital Arts",
        confidence: 45,
        strengths: ["Creativity", "Visual Design", "Technical Skills"],
        suggestedFields: ["Digital Animation", "Game Design", "UI/UX Design"]
      }
    }
  };
};

const StudentProfile = () => {
  const [activeTab, setActiveTab] = useState("details");
  const { user } = useAuth();

  const { data, isLoading, error } = useQuery({
    queryKey: ['studentProfile'],
    queryFn: fetchStudentProfile,
  });

  const renderDetails = () => {
    if (!data) return null;
    const { details } = data;
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080]">Student Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p className="font-medium">{details.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Class</p>
                <p className="font-medium">{details.class}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Roll Number</p>
                <p className="font-medium">{details.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Date of Birth</p>
                <p className="font-medium">{new Date(details.dateOfBirth).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Gender</p>
                <p className="font-medium">{details.gender}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Blood Group</p>
                <p className="font-medium">{details.bloodGroup}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-500">Admission Date</p>
                <p className="font-medium">{new Date(details.admissionDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Address</p>
                <p className="font-medium">{details.address}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Parent/Guardian Name</p>
                <p className="font-medium">{details.parentName}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Contact Number</p>
                <p className="font-medium">{details.parentContact}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email Address</p>
                <p className="font-medium">{details.parentEmail}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderAchievements = () => {
    if (!data) return null;
    const { achievements } = data;
    
    const badgeColor = (category: string) => {
      switch (category) {
        case 'academic':
          return 'bg-[#000080] text-white';
        case 'discipline':
          return 'bg-[#FF9933] text-white';
        case 'sports':
          return 'bg-[#138808] text-white';
        default:
          return 'bg-slate-200 text-slate-800';
      }
    };
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080] flex items-center gap-2">
            <Award className="h-5 w-5" /> Achievements & Badges
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex justify-between items-center p-4 border border-[#138808]/20 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-[#FF9933]/10 flex items-center justify-center mr-4">
                    <Award className="h-5 w-5 text-[#FF9933]" />
                  </div>
                  <div>
                    <p className="font-medium">{achievement.title}</p>
                    <p className="text-sm text-slate-500">
                      {new Date(achievement.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <Badge className={badgeColor(achievement.category)}>
                  {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderHealthTrends = () => {
    if (!data) return null;
    const { healthTrends } = data;
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080] flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-medium">Height (cm)</p>
                <p className="text-[#138808] font-semibold">
                  {healthTrends.height[healthTrends.height.length - 1].value} cm
                </p>
              </div>
              <div className="h-8 bg-[#138808]/10 rounded-full w-full overflow-hidden">
                {healthTrends.height.map((entry, index) => (
                  <div 
                    key={index}
                    className="h-full bg-gradient-to-r from-[#138808]/60 to-[#138808] rounded-full relative"
                    style={{ 
                      width: `${(index + 1) * (100 / healthTrends.height.length)}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{new Date(healthTrends.height[0].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span>{new Date(healthTrends.height[healthTrends.height.length - 1].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-medium">Weight (kg)</p>
                <p className="text-[#000080] font-semibold">
                  {healthTrends.weight[healthTrends.weight.length - 1].value} kg
                </p>
              </div>
              <div className="h-8 bg-[#000080]/10 rounded-full w-full overflow-hidden">
                {healthTrends.weight.map((entry, index) => (
                  <div 
                    key={index}
                    className="h-full bg-gradient-to-r from-[#000080]/60 to-[#000080] rounded-full"
                    style={{ 
                      width: `${(index + 1) * (100 / healthTrends.weight.length)}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{new Date(healthTrends.weight[0].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span>{new Date(healthTrends.weight[healthTrends.weight.length - 1].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <p className="font-medium">BMI</p>
                <p className="text-[#FF9933] font-semibold">
                  {healthTrends.bmi[healthTrends.bmi.length - 1].value}
                </p>
              </div>
              <div className="h-8 bg-[#FF9933]/10 rounded-full w-full overflow-hidden">
                {healthTrends.bmi.map((entry, index) => (
                  <div 
                    key={index}
                    className="h-full bg-gradient-to-r from-[#FF9933]/60 to-[#FF9933] rounded-full"
                    style={{ 
                      width: `${(index + 1) * (100 / healthTrends.bmi.length)}%`,
                      transition: 'width 1s ease-in-out'
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>{new Date(healthTrends.bmi[0].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                <span>{new Date(healthTrends.bmi[healthTrends.bmi.length - 1].date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  const renderCareerPredictions = () => {
    if (!data) return null;
    const { careerPredictions } = data;
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080] flex items-center gap-2">
            <Briefcase className="h-5 w-5" /> AI Career Predictions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-sm text-slate-500 mb-6">
            Based on academic performance, strengths, and interests, our AI predicts the following potential career paths:
          </p>
          
          <div className="space-y-8">
            <div className="border border-[#000080]/30 rounded-lg p-5 bg-[#000080]/5">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">#1: {careerPredictions.primary.career}</h3>
                <span className="text-[#000080] font-bold">{careerPredictions.primary.confidence}%</span>
              </div>
              <Progress value={careerPredictions.primary.confidence} className="h-2 mb-4" />
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Key Strengths:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.primary.strengths.map((strength, index) => (
                    <Badge key={index} className="bg-[#000080]">{strength}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Suggested Fields:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.primary.suggestedFields.map((field, index) => (
                    <Badge key={index} variant="outline" className="border-[#000080] text-[#000080]">{field}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border border-[#138808]/30 rounded-lg p-5 bg-[#138808]/5">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">#2: {careerPredictions.secondary.career}</h3>
                <span className="text-[#138808] font-bold">{careerPredictions.secondary.confidence}%</span>
              </div>
              <Progress value={careerPredictions.secondary.confidence} className="h-2 mb-4 bg-[#138808]/20" />
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Key Strengths:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.secondary.strengths.map((strength, index) => (
                    <Badge key={index} className="bg-[#138808]">{strength}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Suggested Fields:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.secondary.suggestedFields.map((field, index) => (
                    <Badge key={index} variant="outline" className="border-[#138808] text-[#138808]">{field}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="border border-[#FF9933]/30 rounded-lg p-5 bg-[#FF9933]/5">
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold text-lg">#3: {careerPredictions.tertiary.career}</h3>
                <span className="text-[#FF9933] font-bold">{careerPredictions.tertiary.confidence}%</span>
              </div>
              <Progress value={careerPredictions.tertiary.confidence} className="h-2 mb-4 bg-[#FF9933]/20" />
              
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Key Strengths:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.tertiary.strengths.map((strength, index) => (
                    <Badge key={index} className="bg-[#FF9933]">{strength}</Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Suggested Fields:</p>
                <div className="flex flex-wrap gap-2">
                  {careerPredictions.tertiary.suggestedFields.map((field, index) => (
                    <Badge key={index} variant="outline" className="border-[#FF9933] text-[#FF9933]">{field}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-xs text-slate-500 mt-6">
            Note: These predictions are based on academic performance, observed aptitudes, and interests. They are meant as guidance and not definitive career paths.
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Student Profile</h1>
        <p className="text-slate-500 mb-6">
          View detailed information, achievements, health trends, and career predictions
        </p>
        
        <Tabs defaultValue="details" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="details"
              className={`flex-1 ${activeTab === "details" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <BookOpen className="h-4 w-4 mr-2" /> Details
            </TabsTrigger>
            <TabsTrigger 
              value="achievements"
              className={`flex-1 ${activeTab === "achievements" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Award className="h-4 w-4 mr-2" /> Achievements
            </TabsTrigger>
            <TabsTrigger 
              value="health"
              className={`flex-1 ${activeTab === "health" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <TrendingUp className="h-4 w-4 mr-2" /> Health Trends
            </TabsTrigger>
            <TabsTrigger 
              value="career"
              className={`flex-1 ${activeTab === "career" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Briefcase className="h-4 w-4 mr-2" /> Career Predictions
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive">
              <AlertDescription>
                Failed to load profile data. Please try again later.
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="details" className="mt-0">
                {renderDetails()}
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-0">
                {renderAchievements()}
              </TabsContent>
              
              <TabsContent value="health" className="mt-0">
                {renderHealthTrends()}
              </TabsContent>
              
              <TabsContent value="career" className="mt-0">
                {renderCareerPredictions()}
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfile;
