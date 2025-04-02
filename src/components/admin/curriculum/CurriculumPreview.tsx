
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Book, Award, Clock } from 'lucide-react';

interface CurriculumPreviewProps {
  curriculum: {
    curriculum_id: string;
    student_id: string;
    content: Array<{
      subject: string;
      topics: string[];
      difficulty: string;
    }>;
  };
}

export const CurriculumPreview: React.FC<CurriculumPreviewProps> = ({ curriculum }) => {
  // Helper function to get badge color based on difficulty
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Beginner</Badge>;
      case 'intermediate':
        return <Badge className="bg-[#FF9933]/20 text-[#FF9933] hover:bg-[#FF9933]/30">Intermediate</Badge>;
      case 'advanced':
        return <Badge className="bg-[#000080]/20 text-[#000080] hover:bg-[#000080]/30">Advanced</Badge>;
      default:
        return <Badge>{difficulty}</Badge>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="mb-4">
        <h3 className="text-[#000080] font-semibold mb-2 flex items-center">
          <Award className="h-5 w-5 mr-2 text-[#FF9933]" />
          Personalized Learning Path
        </h3>
        <p className="text-gray-600">
          This curriculum is tailored to the student's performance, attendance records, and personal interests.
        </p>
      </div>

      <div className="border-2 border-[#138808]/30 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-[#138808]/10">
            <TableRow>
              <TableHead className="text-[#000080] font-medium">Subject</TableHead>
              <TableHead className="text-[#000080] font-medium">Difficulty</TableHead>
              <TableHead className="text-[#000080] font-medium">Topics Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curriculum.content.map((subject, index) => (
              <TableRow key={index} className="hover:bg-[#FF9933]/5">
                <TableCell className="font-medium text-[#000080]">
                  {subject.subject}
                </TableCell>
                <TableCell>
                  {getDifficultyBadge(subject.difficulty)}
                </TableCell>
                <TableCell className="text-gray-700">
                  {subject.topics.length} topics
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-8">
        <h3 className="text-[#000080] font-semibold mb-4 flex items-center">
          <Book className="h-5 w-5 mr-2 text-[#FF9933]" />
          Detailed Subject Breakdown
        </h3>

        <Accordion type="single" collapsible className="border-2 border-[#138808]/30 rounded-lg overflow-hidden bg-white">
          {curriculum.content.map((subject, index) => (
            <AccordionItem value={`subject-${index}`} key={index} className="border-b border-[#138808]/20 last:border-0">
              <AccordionTrigger className="px-4 py-3 hover:bg-[#FF9933]/5 text-[#000080] font-medium">
                {subject.subject}
                <span className="ml-2">
                  {getDifficultyBadge(subject.difficulty)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-1 pb-3">
                <div className="space-y-2">
                  <div className="text-sm text-gray-500 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Recommended learning path:
                  </div>
                  <ul className="pl-6 space-y-2">
                    {subject.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="text-[#000080]/80 flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF9933] mr-2"></span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};
