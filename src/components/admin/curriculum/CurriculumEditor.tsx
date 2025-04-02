
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus, Save, XCircle } from 'lucide-react';

interface CurriculumEditorProps {
  curriculum: {
    curriculum_id: string;
    student_id: string;
    content: Array<{
      subject: string;
      topics: string[];
      difficulty: string;
    }>;
  };
  onSave: (content: any) => void;
  onCancel: () => void;
}

export const CurriculumEditor: React.FC<CurriculumEditorProps> = ({ curriculum, onSave, onCancel }) => {
  const [content, setContent] = useState([...curriculum.content]);
  
  // Add a new subject
  const addSubject = () => {
    setContent([
      ...content,
      { subject: '', topics: [''], difficulty: 'intermediate' }
    ]);
  };
  
  // Remove a subject
  const removeSubject = (index: number) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };
  
  // Update subject
  const updateSubject = (index: number, field: string, value: any) => {
    const newContent = [...content];
    (newContent[index] as any)[field] = value;
    setContent(newContent);
  };
  
  // Add topic to subject
  const addTopicToSubject = (subjectIndex: number) => {
    const newContent = [...content];
    newContent[subjectIndex].topics.push('');
    setContent(newContent);
  };
  
  // Remove topic from subject
  const removeTopicFromSubject = (subjectIndex: number, topicIndex: number) => {
    const newContent = [...content];
    newContent[subjectIndex].topics.splice(topicIndex, 1);
    setContent(newContent);
  };
  
  // Update topic
  const updateTopic = (subjectIndex: number, topicIndex: number, value: string) => {
    const newContent = [...content];
    newContent[subjectIndex].topics[topicIndex] = value;
    setContent(newContent);
  };
  
  // Handle save
  const handleSave = () => {
    onSave(content);
  };

  return (
    <Card className="shadow-md border-2 border-[#138808]/30 animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-[#FF9933]/10 to-[#FF9933]/5 rounded-t-xl border-b border-[#138808]/20">
        <CardTitle className="text-[#FF9933] text-xl flex items-center">
          Edit Curriculum
          <span className="ml-2 text-sm text-gray-500">
            Curriculum ID: {curriculum.curriculum_id}
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="space-y-6">
          {content.map((subject, subjectIndex) => (
            <div 
              key={subjectIndex} 
              className="border-2 border-[#138808]/30 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-[#000080]">Subject {subjectIndex + 1}</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => removeSubject(subjectIndex)}
                  className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-[#000080] font-medium mb-1 text-sm">Subject Name</label>
                  <Input 
                    value={subject.subject}
                    onChange={(e) => updateSubject(subjectIndex, 'subject', e.target.value)}
                    className="border-2 border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20 text-[#000080]"
                  />
                </div>
                
                <div>
                  <label className="block text-[#000080] font-medium mb-1 text-sm">Difficulty Level</label>
                  <Select 
                    value={subject.difficulty}
                    onValueChange={(value) => updateSubject(subjectIndex, 'difficulty', value)}
                  >
                    <SelectTrigger className="border-2 border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20 text-[#000080]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-[#000080] font-medium mb-2 text-sm">Topics</label>
                {subject.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="flex items-center mb-2">
                    <div className="flex-1 mr-2">
                      <Input 
                        value={topic}
                        onChange={(e) => updateTopic(subjectIndex, topicIndex, e.target.value)}
                        className="border-2 border-[#138808]/30 focus:border-[#138808] focus:ring-[#138808]/20 text-[#000080]"
                        placeholder={`Topic ${topicIndex + 1}`}
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => removeTopicFromSubject(subjectIndex, topicIndex)}
                      className="border-red-300 text-red-500 hover:bg-red-50 hover:text-red-600 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => addTopicToSubject(subjectIndex)}
                  className="mt-2 border-[#138808]/50 text-[#138808] hover:bg-[#138808]/10"
                >
                  <Plus className="h-4 w-4 mr-1" /> Add Topic
                </Button>
              </div>
            </div>
          ))}
          
          <Button 
            variant="outline" 
            onClick={addSubject}
            className="w-full border-dashed border-2 border-[#FF9933]/50 text-[#FF9933] hover:bg-[#FF9933]/5 py-6"
          >
            <Plus className="h-5 w-5 mr-2" /> Add New Subject
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-[#138808]/20 p-6 bg-[#138808]/5">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="border-gray-300"
        >
          <XCircle className="h-4 w-4 mr-2" /> Cancel
        </Button>
        
        <Button 
          variant="green" 
          onClick={handleSave}
        >
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
};
