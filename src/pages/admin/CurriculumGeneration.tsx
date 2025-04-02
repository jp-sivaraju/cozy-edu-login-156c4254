
import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Download, FileEdit, ArrowRight, BookOpen } from 'lucide-react';
import { Spinner } from '@/components/Spinner';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { CurriculumEditor } from '@/components/admin/curriculum/CurriculumEditor';
import { CurriculumPreview } from '@/components/admin/curriculum/CurriculumPreview';
import { fetchStudents, generateCurriculum, fetchCurriculum, downloadCurriculum } from '@/api/curriculum';
import confetti from 'canvas-confetti';

const CurriculumGeneration = () => {
  const { toast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentCurriculum, setCurrentCurriculum] = useState<any>(null);

  // Fetch all students
  const { data: students, isLoading: studentsLoading } = useQuery({
    queryKey: ['students'],
    queryFn: fetchStudents
  });

  // Fetch curriculum for a specific student
  const { 
    data: curriculum, 
    isLoading: curriculumLoading,
    refetch: refetchCurriculum
  } = useQuery({
    queryKey: ['curriculum', selectedStudent],
    queryFn: () => fetchCurriculum(selectedStudent),
    enabled: !!selectedStudent,
    onSuccess: (data) => {
      setCurrentCurriculum(data);
    }
  });

  // Generate curriculum mutation
  const { mutate: generateMutation, isPending: isGenerating } = useMutation({
    mutationFn: generateCurriculum,
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Curriculum generated successfully",
        variant: "default",
        className: "bg-[#138808] text-white border-[#FF9933]",
      });
      setCurrentCurriculum(data);
      refetchCurriculum();
      
      // Show confetti animation
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF9933', '#FFFFFF', '#138808']
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate curriculum",
        variant: "destructive"
      });
    }
  });

  // Download curriculum mutation
  const { mutate: downloadMutation, isPending: isDownloading } = useMutation({
    mutationFn: downloadCurriculum,
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Curriculum downloaded successfully",
        variant: "default",
        className: "bg-[#138808] text-white border-[#FF9933]",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to download curriculum",
        variant: "destructive"
      });
    }
  });

  // Handle student selection
  const handleStudentChange = (value: string) => {
    setSelectedStudent(value);
  };

  // Handle generate curriculum
  const handleGenerateCurriculum = () => {
    if (!selectedStudent) {
      toast({
        title: "Error",
        description: "Please select a student first",
        variant: "destructive"
      });
      return;
    }
    
    generateMutation({ student_id: selectedStudent });
  };

  // Handle download curriculum
  const handleDownloadCurriculum = () => {
    if (!currentCurriculum?.curriculum_id) {
      toast({
        title: "Error",
        description: "No curriculum available to download",
        variant: "destructive"
      });
      return;
    }
    
    downloadMutation(currentCurriculum.curriculum_id);
  };

  // Handle edit curriculum
  const handleEditCurriculum = () => {
    setIsEditing(true);
  };

  // Handle save curriculum
  const handleSaveCurriculum = (updatedContent: any) => {
    // Logic to save curriculum would go here
    setCurrentCurriculum({
      ...currentCurriculum,
      content: updatedContent
    });
    setIsEditing(false);
    toast({
      title: "Success!",
      description: "Curriculum updated successfully",
      variant: "default",
      className: "bg-[#138808] text-white border-[#FF9933]",
    });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#FF9933] mb-2">
            <BookOpen className="inline-block mr-2 text-[#FF9933]" />
            Curriculum Generation
          </h1>
          <p className="text-[#000080] text-lg">Generate personalized AI-driven curricula for students</p>
          <Separator className="my-4" />
        </div>

        <Card className="mb-8 shadow-md border-2 border-[#138808]/30">
          <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-[#FF9933]/5 rounded-t-xl border-b border-[#138808]/20">
            <CardTitle className="text-[#FF9933] text-2xl">Generate New Curriculum</CardTitle>
            <CardDescription className="text-[#000080]">Select a student and generate a personalized curriculum based on their performance and interests</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="w-full md:w-1/2">
                <label className="block text-[#000080] font-medium mb-2">Select Student</label>
                <Select onValueChange={handleStudentChange} value={selectedStudent}>
                  <SelectTrigger className="border-2 border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20 text-[#000080]">
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentsLoading ? (
                      <SelectItem value="loading" disabled>Loading students...</SelectItem>
                    ) : (
                      students?.map((student: any) => (
                        <SelectItem key={student.student_id} value={student.student_id}>
                          {student.name} ({student.student_id})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">The curriculum will be generated based on student's marks, attendance, and interests.</p>
              </div>
              <div className="mt-4 md:mt-0 w-full md:w-1/2 flex justify-start md:justify-end">
                <Button 
                  variant="saffron" 
                  size="lg"
                  onClick={handleGenerateCurriculum}
                  disabled={!selectedStudent || isGenerating}
                  className="font-medium text-lg hover:shadow-lg transition-all duration-300"
                >
                  {isGenerating ? <Spinner className="mr-2" /> : <ArrowRight className="mr-2" />}
                  {isGenerating ? 'Generating...' : 'Generate Curriculum'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {(curriculumLoading && selectedStudent) ? (
          <div className="flex justify-center my-12">
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 border-4 border-t-[#FF9933] border-[#FF9933]/30 rounded-full animate-spin"></div>
              <p className="text-[#000080] mt-4">Analyzing student data and generating curriculum...</p>
            </div>
          </div>
        ) : currentCurriculum ? (
          <div className="space-y-8 animate-fade-in">
            {isEditing ? (
              <CurriculumEditor 
                curriculum={currentCurriculum} 
                onSave={handleSaveCurriculum}
                onCancel={handleCancelEdit}
              />
            ) : (
              <>
                <Card className="shadow-md border-2 border-[#138808]/30">
                  <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-[#FF9933]/5 rounded-t-xl border-b border-[#138808]/20 flex flex-row justify-between items-center">
                    <div>
                      <CardTitle className="text-[#FF9933] text-xl">
                        Curriculum for {students?.find((s: any) => s.student_id === selectedStudent)?.name || selectedStudent}
                      </CardTitle>
                      <CardDescription className="text-[#000080]">
                        Generated on {new Date().toLocaleString()}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleEditCurriculum}
                        className="border-[#138808] text-[#138808] hover:bg-[#138808]/5 hover:text-[#138808]"
                      >
                        <FileEdit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="green" 
                        size="sm" 
                        onClick={handleDownloadCurriculum}
                        disabled={isDownloading}
                      >
                        {isDownloading ? <Spinner className="mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CurriculumPreview curriculum={currentCurriculum} />
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        ) : selectedStudent ? (
          <Card className="shadow-md border-2 border-[#138808]/30 bg-[#FF9933]/5">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-[#138808]/50 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-[#000080] mb-2">No Curriculum Found</h3>
              <p className="text-gray-600 mb-6">No curriculum has been generated for this student yet. Click the button below to generate one.</p>
              <Button 
                variant="saffron" 
                onClick={handleGenerateCurriculum}
                disabled={isGenerating}
              >
                {isGenerating ? <Spinner className="mr-2" /> : <ArrowRight className="mr-2" />}
                {isGenerating ? 'Generating...' : 'Generate Curriculum'}
              </Button>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default CurriculumGeneration;
