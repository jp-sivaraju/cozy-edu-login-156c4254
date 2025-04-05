
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Users, TrendingUp, AlertTriangle, Award } from 'lucide-react';

const mockClasses = [
  { id: '1', name: '8A', section: 'Science' },
  { id: '2', name: '8B', section: 'Science' },
  { id: '3', name: '9A', section: 'Commerce' },
];

const mockStudents = [
  { id: '1', name: 'Aarav Patel', rollNo: '8A01', performanceIndex: 85, attendance: 92, improvement: 5 },
  { id: '2', name: 'Diya Sharma', rollNo: '8A02', performanceIndex: 78, attendance: 88, improvement: -2 },
  { id: '3', name: 'Ishaan Singh', rollNo: '8A03', performanceIndex: 92, attendance: 96, improvement: 8 },
  { id: '4', name: 'Ananya Gupta', rollNo: '8A04', performanceIndex: 65, attendance: 78, improvement: 10 },
  { id: '5', name: 'Veer Kumar', rollNo: '8A05', performanceIndex: 70, attendance: 85, improvement: 3 },
];

const mockPerformanceData = [
  { month: 'Apr', 'Class Average': 72, 'School Average': 68 },
  { month: 'May', 'Class Average': 75, 'School Average': 70 },
  { month: 'Jun', 'Class Average': 73, 'School Average': 69 },
  { month: 'Jul', 'Class Average': 78, 'School Average': 71 },
  { month: 'Aug', 'Class Average': 82, 'School Average': 73 },
  { month: 'Sep', 'Class Average': 80, 'School Average': 74 },
];

const mockSubjectPerformance = [
  { subject: 'Math', score: 78 },
  { subject: 'Science', score: 82 },
  { subject: 'English', score: 75 },
  { subject: 'Social', score: 68 },
  { subject: 'Language', score: 85 },
];

const StudentPerformancePage = () => {
  const [selectedClass, setSelectedClass] = useState('1');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['studentPerformance', selectedClass],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      return {
        className: mockClasses.find(c => c.id === selectedClass)?.name || '',
        classSection: mockClasses.find(c => c.id === selectedClass)?.section || '',
        students: mockStudents,
        performanceTrend: mockPerformanceData,
        subjectPerformance: mockSubjectPerformance,
      };
    }
  });

  const getImprovementColor = (improvement: number) => {
    if (improvement > 0) return 'text-green-600';
    if (improvement < 0) return 'text-red-600';
    return 'text-yellow-600';
  };

  const getImprovementIcon = (improvement: number) => {
    if (improvement > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (improvement < 0) return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <div className="h-4 w-4">—</div>;
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-[#138808] mb-2">Student Performance</h1>
        <p className="text-slate-500 mb-6">Analyze and track student performance metrics</p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-64">
            <label className="block text-[#000080] font-medium mb-2">Class</label>
            <Select
              value={selectedClass}
              onValueChange={setSelectedClass}
            >
              <SelectTrigger className="w-full border-[#138808]/30">
                <SelectValue placeholder="Select Class" />
              </SelectTrigger>
              <SelectContent>
                {mockClasses.map(classItem => (
                  <SelectItem key={classItem.id} value={classItem.id}>
                    {classItem.name} ({classItem.section})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedStudent && (
            <div className="ml-auto">
              <Button 
                variant="outline" 
                onClick={() => setSelectedStudent(null)}
                className="mt-8"
              >
                Back to Class Overview
              </Button>
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 border-4 border-t-[#138808] border-[#138808]/20 rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {!selectedStudent ? (
              <>
                <Tabs 
                  value={activeTab} 
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-6 bg-slate-100">
                    <TabsTrigger 
                      value="overview"
                      className={`flex-1 ${activeTab === "overview" ? "bg-[#FF9933] text-white" : ""}`}
                    >
                      Class Overview
                    </TabsTrigger>
                    <TabsTrigger 
                      value="trends"
                      className={`flex-1 ${activeTab === "trends" ? "bg-[#FF9933] text-white" : ""}`}
                    >
                      Performance Trends
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <Card className="border-[#138808]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[#000080] flex items-center">
                            <Users className="h-5 w-5 mr-2 text-[#FF9933]" />
                            Class Strength
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{data?.students.length}</div>
                          <p className="text-sm text-slate-500">{data?.className} ({data?.classSection})</p>
                        </CardContent>
                      </Card>
                      <Card className="border-[#138808]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[#000080] flex items-center">
                            <Award className="h-5 w-5 mr-2 text-[#FF9933]" />
                            Average Performance
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">78%</div>
                          <p className="text-sm text-slate-500">Class average performance index</p>
                        </CardContent>
                      </Card>
                      <Card className="border-[#138808]/20">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-[#000080] flex items-center">
                            <AlertTriangle className="h-5 w-5 mr-2 text-[#FF9933]" />
                            At Risk
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">2</div>
                          <p className="text-sm text-slate-500">Students below 70% performance</p>
                        </CardContent>
                      </Card>
                    </div>

                    <Card className="border-[#138808]/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-[#000080]">
                          Student List ({data?.className} {data?.classSection})
                        </CardTitle>
                        <CardDescription>
                          Click on a student to view detailed performance
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b border-[#138808]/20">
                                <th className="text-left p-3">Roll No</th>
                                <th className="text-left p-3">Name</th>
                                <th className="text-center p-3">Performance Index</th>
                                <th className="text-center p-3">Attendance</th>
                                <th className="text-center p-3">Trend</th>
                                <th className="text-right p-3">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data?.students.map(student => (
                                <tr key={student.id} className="border-b border-[#138808]/10 hover:bg-slate-50">
                                  <td className="p-3">{student.rollNo}</td>
                                  <td className="p-3 font-medium">{student.name}</td>
                                  <td className="p-3 text-center">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100">
                                      <span className={student.performanceIndex >= 75 ? "text-green-600" : student.performanceIndex >= 60 ? "text-yellow-600" : "text-red-600"}>
                                        {student.performanceIndex}%
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-3 text-center">{student.attendance}%</td>
                                  <td className="p-3 text-center">
                                    <div className="flex justify-center items-center gap-1">
                                      {getImprovementIcon(student.improvement)}
                                      <span className={getImprovementColor(student.improvement)}>
                                        {student.improvement > 0 ? '+' : ''}{student.improvement}%
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-3 text-right">
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => setSelectedStudent(student.id)}
                                      className="border-[#138808]/30 text-[#000080]"
                                    >
                                      View Details
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="trends" className="mt-0">
                    <Card className="border-[#138808]/20">
                      <CardHeader>
                        <CardTitle className="text-[#000080]">Performance Trends</CardTitle>
                        <CardDescription>
                          Class performance over the last 6 months
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={data?.performanceTrend}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="Class Average" stroke="#138808" activeDot={{ r: 8 }} />
                              <Line type="monotone" dataKey="School Average" stroke="#FF9933" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-[#138808]/20 mt-6">
                      <CardHeader>
                        <CardTitle className="text-[#000080]">Subject Performance</CardTitle>
                        <CardDescription>
                          Average performance by subject
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={data?.subjectPerformance}
                              margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="subject" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar dataKey="score" fill="#138808" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <Card className="border-[#138808]/20">
                <CardHeader>
                  <CardTitle className="text-[#000080]">
                    {data?.students.find(s => s.id === selectedStudent)?.name} - Performance Details
                  </CardTitle>
                  <CardDescription>
                    Detailed view of student performance metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-slate-500 py-4">
                    Detailed student performance view would be displayed here, including:
                  </p>
                  <ul className="list-disc pl-10 space-y-2 text-slate-600">
                    <li>Subject-wise performance breakdown</li>
                    <li>Attendance details and trends</li>
                    <li>Assignment completion statistics</li>
                    <li>Test scores and comparisons to class averages</li>
                    <li>Personalized improvement suggestions</li>
                    <li>Parent communication history</li>
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentPerformancePage;
