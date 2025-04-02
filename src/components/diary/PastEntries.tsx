
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Camera, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { format, parseISO } from 'date-fns';
import ImageModal from './ImageModal';

// Mock API function to fetch past diary entries
const fetchPastEntries = async () => {
  // In a real app, this would call the backend API
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  
  return [
    {
      entry_id: "ENTRY002",
      student_id: "STU001",
      date: "2023-11-15T10:30:00Z",
      title: "Mathematics Achievement",
      content: "Ravi scored full marks in today's mathematics quiz. He demonstrated excellent problem-solving skills and helped his classmates understand the concepts too.",
      photo_url: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?q=80&w=1470&auto=format&fit=crop",
      teacher_name: "Mr. Patel",
      subject: "Mathematics"
    },
    {
      entry_id: "ENTRY003",
      student_id: "STU001",
      date: "2023-11-14T09:45:00Z",
      title: "Art Class",
      content: "Ravi created a beautiful landscape painting in art class today. His use of colors was exceptional and the teacher displayed his work on the classroom wall.",
      photo_url: "https://images.unsplash.com/photo-1577769403083-125214b51113?q=80&w=1528&auto=format&fit=crop",
      teacher_name: "Mrs. Gupta",
      subject: "Art"
    },
    {
      entry_id: "ENTRY004",
      student_id: "STU001",
      date: "2023-11-13T14:20:00Z",
      title: "Physical Education",
      content: "Ravi participated in the relay race today and showed great team spirit. His team came in second place, and he was recognized for his sportsmanship.",
      photo_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1470&auto=format&fit=crop",
      teacher_name: "Mr. Singh",
      subject: "Physical Education"
    }
  ];
};

const PastEntries = () => {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string, date: string} | null>(null);

  const { data: entries, isLoading, error } = useQuery({
    queryKey: ['diary', 'past', user?.id],
    queryFn: fetchPastEntries,
    enabled: !!user?.id,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  const handleViewImage = (entry: any) => {
    setSelectedImage({
      url: entry.photo_url,
      title: entry.title,
      date: entry.date
    });
  };

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200 mb-6">
        <CardContent className="pt-6">
          <p className="text-red-600">Failed to load past entries. Please try again later.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h2 className="text-lg font-medium text-slate-800">Previous Diary Entries</h2>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="mb-4">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : entries && entries.length > 0 ? (
        <div className="space-y-6">
          {entries.map((entry: any) => (
            <Card 
              key={entry.entry_id} 
              className="mb-4 overflow-hidden border border-[#138808]/30 hover:shadow-md transition-shadow"
            >
              <div className="bg-[#FF9933]/10 px-4 py-2 border-b border-[#FF9933]/20">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#FF9933]">
                    {format(parseISO(entry.date), 'EEEE, MMMM d, yyyy')}
                  </span>
                  <span className="text-xs text-slate-500">{entry.subject}</span>
                </div>
              </div>

              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold mb-2 text-[#000080]">{entry.title}</h3>
                <p className="text-gray-700 mb-4 line-clamp-3">{entry.content}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">
                    - {entry.teacher_name}
                  </span>
                  
                  {entry.photo_url && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[#000080] hover:text-[#000080]/80 p-0"
                      onClick={() => handleViewImage(entry)}
                    >
                      <Camera className="mr-1 h-4 w-4" />
                      View Photo
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-slate-50">
          <CardContent className="pt-6">
            <p className="text-center text-slate-500 py-8">No past entries found.</p>
          </CardContent>
        </Card>
      )}

      {selectedImage && (
        <ImageModal 
          isOpen={!!selectedImage} 
          onClose={() => setSelectedImage(null)} 
          imageUrl={selectedImage.url}
          title={selectedImage.title}
          date={selectedImage.date}
        />
      )}
    </div>
  );
};

export default PastEntries;
