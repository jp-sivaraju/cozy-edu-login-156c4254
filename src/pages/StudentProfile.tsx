
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Award, TrendingUp, Briefcase, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/checkbox';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';

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
        { date: "2021-01", value: 145, classAvg: 143, branchAvg: 142, stateAvg: 141, countryAvg: 140 },
        { date: "2021-06", value: 148, classAvg: 146, branchAvg: 145, stateAvg: 144, countryAvg: 143 },
        { date: "2022-01", value: 152, classAvg: 150, branchAvg: 149, stateAvg: 148, countryAvg: 147 },
        { date: "2022-06", value: 156, classAvg: 154, branchAvg: 153, stateAvg: 152, countryAvg: 151 },
        { date: "2023-01", value: 160, classAvg: 157, branchAvg: 156, stateAvg: 155, countryAvg: 154 },
        { date: "2023-06", value: 164, classAvg: 161, branchAvg: 160, stateAvg: 159, countryAvg: 158 }
      ],
      weight: [
        { date: "2021-01", value: 38, classAvg: 36, branchAvg: 35, stateAvg: 35, countryAvg: 34 },
        { date: "2021-06", value: 40, classAvg: 38, branchAvg: 37, stateAvg: 37, countryAvg: 36 },
        { date: "2022-01", value: 43, classAvg: 41, branchAvg: 40, stateAvg: 40, countryAvg: 39 },
        { date: "2022-06", value: 45, classAvg: 43, branchAvg: 42, stateAvg: 42, countryAvg: 41 },
        { date: "2023-01", value: 48, classAvg: 46, branchAvg: 45, stateAvg: 44, countryAvg: 43 },
        { date: "2023-06", value: 50, classAvg: 48, branchAvg: 47, stateAvg: 46, countryAvg: 45 }
      ],
      bmi: [
        { date: "2021-01", value: 18.1, classAvg: 17.8, branchAvg: 17.6, stateAvg: 17.5, countryAvg: 17.4 },
        { date: "2021-06", value: 18.3, classAvg: 18.0, branchAvg: 17.8, stateAvg: 17.7, countryAvg: 17.6 },
        { date: "2022-01", value: 18.6, classAvg: 18.2, branchAvg: 18.0, stateAvg: 17.9, countryAvg: 17.8 },
        { date: "2022-06", value: 18.5, classAvg: 18.1, branchAvg: 17.9, stateAvg: 17.8, countryAvg: 17.7 },
        { date: "2023-01", value: 18.8, classAvg: 18.4, branchAvg: 18.2, stateAvg: 18.0, countryAvg: 17.9 },
        { date: "2023-06", value: 18.6, classAvg: 18.2, branchAvg: 18.0, stateAvg: 17.9, countryAvg: 17.8 }
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
  const [showClassAvg, setShowClassAvg] = useState(true);
  const [showBranchAvg, setShowBranchAvg] = useState(false);
  const [showStateAvg, setShowStateAvg] = useState(false);
  const [showCountryAvg, setShowCountryAvg] = useState(false);
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
    
    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };
    
    const toggleButtons = (
      <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-lg border border-[#138808]/20">
        <span className="text-sm font-medium mr-2 my-auto text-slate-600">Compare with:</span>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="classAvg" 
            checked={showClassAvg} 
            onChange={() => setShowClassAvg(!showClassAvg)}
            className="w-4 h-4 text-[#000080] bg-gray-100 border-[#138808] rounded"
          />
          <label htmlFor="classAvg" className="text-sm text-[#000080]">Class Avg</label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="branchAvg" 
            checked={showBranchAvg} 
            onChange={() => setShowBranchAvg(!showBranchAvg)}
            className="w-4 h-4 text-[#FF9933] bg-gray-100 border-[#138808] rounded"
          />
          <label htmlFor="branchAvg" className="text-sm text-[#FF9933]">Branch Avg</label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="stateAvg" 
            checked={showStateAvg} 
            onChange={() => setShowStateAvg(!showStateAvg)}
            className="w-4 h-4 text-[#138808] bg-gray-100 border-[#138808] rounded"
          />
          <label htmlFor="stateAvg" className="text-sm text-[#138808]">State Avg</label>
        </div>
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="countryAvg" 
            checked={showCountryAvg} 
            onChange={() => setShowCountryAvg(!showCountryAvg)}
            className="w-4 h-4 text-purple-600 bg-gray-100 border-[#138808] rounded"
          />
          <label htmlFor="countryAvg" className="text-sm text-purple-600">Country Avg</label>
        </div>
      </div>
    );
    
    return (
      <Card className="border-[#138808]/30">
        <CardHeader className="bg-[#FF9933]/10 border-b border-[#138808]/20">
          <CardTitle className="text-[#000080] flex items-center gap-2">
            <TrendingUp className="h-5 w-5" /> Health Trends
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {toggleButtons}
          
          <div className="space-y-12">
            <div>
              <h3 className="font-medium mb-3 text-[#000080] flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> 
                Height (cm) - Current: {healthTrends.height[healthTrends.height.length - 1].value} cm
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthTrends.height.map(item => ({
                    ...item,
                    formattedDate: formatDate(item.date)
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00008020" />
                    <XAxis dataKey="formattedDate" stroke="#000080" />
                    <YAxis stroke="#000080" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #13880830',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Student"
                      stroke="#000080" 
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#000080', strokeWidth: 1, stroke: '#fff' }}
                      activeDot={{ r: 8 }}
                    />
                    {showClassAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="classAvg" 
                        name="Class Avg" 
                        stroke="#000080" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#000080', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showBranchAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="branchAvg" 
                        name="Branch Avg" 
                        stroke="#FF9933" 
                        strokeDasharray="3 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#FF9933', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showStateAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="stateAvg" 
                        name="State Avg" 
                        stroke="#138808" 
                        strokeDasharray="5 2"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#138808', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showCountryAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="countryAvg" 
                        name="Country Avg" 
                        stroke="#9333ea" 
                        strokeDasharray="3 1 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#9333ea', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-[#000080] flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> 
                Weight (kg) - Current: {healthTrends.weight[healthTrends.weight.length - 1].value} kg
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={healthTrends.weight.map(item => ({
                    ...item,
                    formattedDate: formatDate(item.date)
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00008020" />
                    <XAxis dataKey="formattedDate" stroke="#000080" />
                    <YAxis stroke="#000080" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #13880830',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      name="Student"
                      stroke="#FF9933" 
                      strokeWidth={3}
                      fill="#FF993330"
                      dot={{ r: 6, fill: '#FF9933', strokeWidth: 1, stroke: '#fff' }}
                      activeDot={{ r: 8 }}
                    />
                    {showClassAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="classAvg" 
                        name="Class Avg" 
                        stroke="#000080" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#000080', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showBranchAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="branchAvg" 
                        name="Branch Avg" 
                        stroke="#FF9933" 
                        strokeDasharray="3 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#FF9933', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showStateAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="stateAvg" 
                        name="State Avg" 
                        stroke="#138808" 
                        strokeDasharray="5 2"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#138808', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showCountryAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="countryAvg" 
                        name="Country Avg" 
                        stroke="#9333ea" 
                        strokeDasharray="3 1 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#9333ea', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 text-[#000080] flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" /> 
                BMI - Current: {healthTrends.bmi[healthTrends.bmi.length - 1].value}
              </h3>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={healthTrends.bmi.map(item => ({
                    ...item,
                    formattedDate: formatDate(item.date)
                  }))}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#00008020" />
                    <XAxis dataKey="formattedDate" stroke="#000080" />
                    <YAxis stroke="#000080" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '1px solid #13880830',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      name="Student"
                      stroke="#138808" 
                      strokeWidth={3}
                      dot={{ r: 6, fill: '#138808', strokeWidth: 1, stroke: '#fff' }}
                      activeDot={{ r: 8 }}
                    />
                    <ReferenceLine y={18.5} label="Healthy" stroke="#138808" strokeDasharray="3 3" />
                    <ReferenceLine y={25} label="Overweight" stroke="#FF9933" strokeDasharray="3 3" />
                    {showClassAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="classAvg" 
                        name="Class Avg" 
                        stroke="#000080" 
                        strokeDasharray="5 5"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#000080', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showBranchAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="branchAvg" 
                        name="Branch Avg" 
                        stroke="#FF9933" 
                        strokeDasharray="3 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#FF9933', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showStateAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="stateAvg" 
                        name="State Avg" 
                        stroke="#138808" 
                        strokeDasharray="5 2"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#138808', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                    {showCountryAvg && (
                      <Line 
                        type="monotone" 
                        dataKey="countryAvg" 
                        name="Country Avg" 
                        stroke="#9333ea" 
                        strokeDasharray="3 1 3"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#9333ea', strokeWidth: 1, stroke: '#fff' }}
                      />
                    )}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-[#138808]/20">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Note:</span> Health metrics are measured twice a year during 
              routine health check-ups. Comparisons help identify growth patterns relative to peers.
            </p>
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
