
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Camera, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import ImageModal from './ImageModal';

// Mock API function to fetch today's diary entry
const fetchTodayEntry = async () => {
  // In a real app, this would call the backend API
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  return {
    entry_id: "ENTRY001",
    student_id: "STU001",
    date: new Date().toISOString(),
    title: "Today's Activities",
    content: "Ravi participated actively in the science class today. He completed his project on renewable energy and presented it to the class. His model of a solar panel was particularly impressive.",
    photo_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1476&auto=format&fit=crop",
    teacher_name: "Mrs. Sharma",
    subject: "Science"
  };
};

const TodayDiary = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const { data: entry, isLoading, error } = useQuery({
    queryKey: ['diary', 'today', user?.id],
    queryFn: fetchTodayEntry,
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200 mb-6">
        <CardContent className="pt-6">
          <p className="text-red-600">Failed to load today's entry. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in">
      <Card className="mb-6 bg-white shadow-md">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : entry ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#000080]">{entry.title}</h2>
                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="w-4 h-4 mr-1" />
                  {format(new Date(entry.date), 'MMM d, yyyy')}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed mb-4">{entry.content}</p>
                <div className="text-sm text-slate-600 italic">
                  - {entry.teacher_name}, {entry.subject} Teacher
                </div>
              </div>

              {entry.photo_url && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 text-[#000080]">Today's Photo</h3>
                  <div 
                    className="relative rounded-lg overflow-hidden border-2 border-[#138808] cursor-pointer"
                    onClick={() => setImageModalOpen(true)}
                  >
                    <img 
                      src={entry.photo_url} 
                      alt="Daily activity" 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all flex items-center justify-center">
                      <div className="opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="outline" className="bg-white text-[#000080]">
                          <Camera className="mr-2 h-4 w-4" /> View Full Size
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-500 italic">No diary entry for today yet.</p>
          )}
        </CardContent>
      </Card>

      {entry && entry.photo_url && (
        <ImageModal 
          isOpen={imageModalOpen} 
          onClose={() => setImageModalOpen(false)} 
          imageUrl={entry.photo_url}
          title={entry.title}
          date={entry.date}
        />
      )}
    </div>
  );
};

export default TodayDiary;
