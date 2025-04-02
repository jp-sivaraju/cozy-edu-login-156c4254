
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { FileText, TrendingUp, Heart, Download, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock API call
const fetchReports = async () => {
  // In a real app, this would be an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock data
  return {
    current: {
      id: 'report001',
      term: 'Term 1 - 2023-24',
      subjects: [
        { name: 'Mathematics', grade: 'A', marks: 92, teacherRemarks: 'Excellent performance. Shows great analytical skills.' },
        { name: 'Science', grade: 'A-', marks: 87, teacherRemarks: 'Good understanding of concepts. Needs to improve in practical applications.' },
        { name: 'English', grade: 'B+', marks: 85, teacherRemarks: 'Good writing skills. Should focus more on grammar.' },
        { name: 'Social Studies', grade: 'A', marks: 90, teacherRemarks: 'Excellent grasp of historical concepts and current affairs.' },
        { name: 'Hindi', grade: 'B', marks: 82, teacherRemarks: 'Good vocabulary. Needs to improve writing skills.' }
      ],
      attendance: 92, // percentage
      healthMetrics: {
        height: 152, // cm
        weight: 45, // kg
        bmi: 19.5,
        eyesight: '6/6',
        lastCheckup: '2023-07-15'
      },
      teacherComments: 'Ravi is a diligent student who shows great potential. He is active in class discussions and completes assignments on time. He should focus on improving his time management for better results.',
      principalComments: 'Ravi has shown good progress this term. Keep up the good work!',
      reportUrl: '#' // In a real app, this would be a URL to the PDF report
    },
    trends: {
      academic: [
        { term: 'Term 1 2022', mathematics: 78, science: 82, english: 75, social: 80, hindi: 76 },
        { term: 'Term 2 2022', mathematics: 82, science: 85, english: 79, social: 83, hindi: 78 },
        { term: 'Term 3 2022', mathematics: 85, science: 84, english: 80, social: 86, hindi: 79 },
        { term: 'Term 1 2023', mathematics: 92, science: 87, english: 85, social: 90, hindi: 82 }
      ],
      health: [
        { month: 'Jan', height: 148, weight: 42, bmi: 19.2 },
        { month: 'Mar', height: 149, weight: 43, bmi: 19.4 },
        { month: 'May', height: 150, weight: 44, bmi: 19.6 },
        { month: 'Jul', height: 152, weight: 45, bmi: 19.5 }
      ],
      predictions: {
        academicGrowth: 'Based on current performance, Ravi is expected to show significant improvement in Mathematics and Social Studies in the coming term. His consistent progress in Science is commendable.',
        areasOfImprovement: 'English grammar and Hindi writing skills need attention. Consider additional practice in these areas.',
        careerAptitude: 'Ravi shows strong analytical skills which suggest potential in fields like Engineering, Data Science, or Research.'
      }
    }
  };
};

const Reports = () => {
  const [activeTab, setActiveTab] = useState("current");
  const { user } = useAuth();
  
  const { data: reports, isLoading, error } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports
  });

  const handleDownloadReport = () => {
    // In a real app, this would download the PDF report
    alert("In a real app, this would download the PDF report");
  };

  return (
    <DashboardLayout>
      <div className="container p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Progress Reports</h1>
        <p className="text-slate-500 mb-6">
          View academic reports and performance trends
        </p>
        
        <Tabs defaultValue="current" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6 bg-slate-100">
            <TabsTrigger 
              value="current"
              className={`flex-1 ${activeTab === "current" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <FileText className="h-4 w-4 mr-2" /> Current Report
            </TabsTrigger>
            <TabsTrigger 
              value="trends"
              className={`flex-1 ${activeTab === "trends" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <TrendingUp className="h-4 w-4 mr-2" /> Performance Trends
            </TabsTrigger>
            <TabsTrigger 
              value="health"
              className={`flex-1 ${activeTab === "health" ? "bg-[#FF9933] text-white" : ""}`}
            >
              <Heart className="h-4 w-4 mr-2" /> Health Card
            </TabsTrigger>
          </TabsList>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="h-12 w-12 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="my-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Failed to load reports. Please try again.</AlertDescription>
            </Alert>
          ) : reports ? (
            <>
              <TabsContent value="current" className="mt-0">
                <Card>
                  <CardHeader className="bg-[#FF9933]/10">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>Current Report Card</CardTitle>
                        <CardDescription>{reports.current.term}</CardDescription>
                      </div>
                      <Button 
                        onClick={handleDownloadReport} 
                        className="bg-[#000080] hover:bg-[#000080]/90"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download PDF
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Academic Performance</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-slate-100">
                              <th className="border border-[#138808]/20 p-2 text-left">Subject</th>
                              <th className="border border-[#138808]/20 p-2 text-left">Grade</th>
                              <th className="border border-[#138808]/20 p-2 text-left">Marks</th>
                              <th className="border border-[#138808]/20 p-2 text-left">Teacher's Remarks</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.current.subjects.map((subject, index) => (
                              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                                <td className="border border-[#138808]/20 p-2">{subject.name}</td>
                                <td className="border border-[#138808]/20 p-2 font-medium">
                                  <span className={`
                                    ${subject.grade.startsWith('A') ? 'text-[#138808]' : 
                                      subject.grade.startsWith('B') ? 'text-[#FF9933]' : 
                                      'text-red-500'}
                                  `}>
                                    {subject.grade}
                                  </span>
                                </td>
                                <td className="border border-[#138808]/20 p-2">{subject.marks}/100</td>
                                <td className="border border-[#138808]/20 p-2 text-sm">{subject.teacherRemarks}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Attendance</h3>
                        <div className="flex items-center">
                          <div className="w-20 h-20 rounded-full flex items-center justify-center border-4 border-[#138808] text-xl font-bold">
                            {reports.current.attendance}%
                          </div>
                          <div className="ml-4">
                            <p className="text-sm text-slate-500">
                              {reports.current.attendance >= 90 
                                ? 'Excellent attendance record!' 
                                : reports.current.attendance >= 80
                                  ? 'Good attendance record.'
                                  : 'Attendance needs improvement.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Health Summary</h3>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-sm text-slate-500">Height</p>
                            <p className="font-medium">{reports.current.healthMetrics.height} cm</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Weight</p>
                            <p className="font-medium">{reports.current.healthMetrics.weight} kg</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">BMI</p>
                            <p className="font-medium">{reports.current.healthMetrics.bmi}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Eyesight</p>
                            <p className="font-medium">{reports.current.healthMetrics.eyesight}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-2">Teacher's Comments</h3>
                      <p className="text-slate-700 border-l-4 border-[#FF9933] pl-4 py-2">
                        {reports.current.teacherComments}
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Principal's Comments</h3>
                      <p className="text-slate-700 border-l-4 border-[#000080] pl-4 py-2">
                        {reports.current.principalComments}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="trends" className="mt-0">
                <Card>
                  <CardHeader className="bg-[#FF9933]/10">
                    <CardTitle>Performance Trends</CardTitle>
                    <CardDescription>AI analysis of academic performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Academic Progress</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={reports.trends.academic}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="term" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Area type="monotone" dataKey="mathematics" name="Mathematics" stackId="1" stroke="#FF9933" fill="#FF9933" fillOpacity={0.8} />
                            <Area type="monotone" dataKey="science" name="Science" stackId="2" stroke="#138808" fill="#138808" fillOpacity={0.6} />
                            <Area type="monotone" dataKey="english" name="English" stackId="3" stroke="#000080" fill="#000080" fillOpacity={0.4} />
                            <Area type="monotone" dataKey="social" name="Social Studies" stackId="4" stroke="#9c59b6" fill="#9c59b6" fillOpacity={0.4} />
                            <Area type="monotone" dataKey="hindi" name="Hindi" stackId="5" stroke="#e74c3c" fill="#e74c3c" fillOpacity={0.4} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
                      
                      <Card className="mb-4 bg-[#FF9933]/5 border-[#FF9933]/20">
                        <CardHeader>
                          <CardTitle className="text-base text-[#000080]">Academic Growth Prediction</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-700">{reports.trends.predictions.academicGrowth}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="mb-4 bg-[#138808]/5 border-[#138808]/20">
                        <CardHeader>
                          <CardTitle className="text-base text-[#000080]">Areas for Improvement</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-700">{reports.trends.predictions.areasOfImprovement}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-[#000080]/5 border-[#000080]/20">
                        <CardHeader>
                          <CardTitle className="text-base text-[#000080]">Career Aptitude Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-slate-700">{reports.trends.predictions.careerAptitude}</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="health" className="mt-0">
                <Card>
                  <CardHeader className="bg-[#FF9933]/10">
                    <CardTitle>Health Card</CardTitle>
                    <CardDescription>Track health metrics over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-4">Health Metrics Trends</h3>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={reports.trends.health}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <Tooltip />
                            <Area yAxisId="left" type="monotone" dataKey="height" name="Height (cm)" stroke="#138808" fill="#138808" fillOpacity={0.6} />
                            <Area yAxisId="right" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#FF9933" fill="#FF9933" fillOpacity={0.6} />
                            <Area yAxisId="right" type="monotone" dataKey="bmi" name="BMI" stroke="#000080" fill="#000080" fillOpacity={0.4} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <Card className="bg-[#138808]/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Current Height</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">{reports.current.healthMetrics.height} <span className="text-base font-normal text-slate-500">cm</span></p>
                          <p className="text-sm text-slate-500 mt-1">Last measured: {reports.current.healthMetrics.lastCheckup}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-[#FF9933]/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Current Weight</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">{reports.current.healthMetrics.weight} <span className="text-base font-normal text-slate-500">kg</span></p>
                          <p className="text-sm text-slate-500 mt-1">Last measured: {reports.current.healthMetrics.lastCheckup}</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-[#000080]/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">BMI</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-3xl font-bold">{reports.current.healthMetrics.bmi}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            Status: {
                              reports.current.healthMetrics.bmi < 18.5 ? 'Underweight' :
                              reports.current.healthMetrics.bmi < 25 ? 'Normal weight' :
                              reports.current.healthMetrics.bmi < 30 ? 'Overweight' : 'Obese'
                            }
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-slate-50 border rounded-lg p-4">
                      <h3 className="text-lg font-semibold mb-2">Health Recommendations</h3>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#138808] text-white flex items-center justify-center mr-2 mt-0.5">✓</div>
                          <p>Maintain a balanced diet with adequate protein for growth.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#138808] text-white flex items-center justify-center mr-2 mt-0.5">✓</div>
                          <p>Ensure 60 minutes of physical activity daily.</p>
                        </li>
                        <li className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-[#138808] text-white flex items-center justify-center mr-2 mt-0.5">✓</div>
                          <p>Schedule the next health checkup in January 2024.</p>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          ) : null}
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
