
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { FileText, Plus, Save, AlertCircle, Check } from 'lucide-react';

interface LessonPlanItem {
  id: string;
  topic: string;
  description: string;
  completed: boolean;
}

interface DiaryEntryFormProps {
  date: Date;
  className: string;
  subject: string;
  lessonPlan?: LessonPlanItem[];
  onSave: (diaryData: any) => void;
}

const DiaryEntryForm = ({ 
  date, 
  className, 
  subject, 
  lessonPlan = [], 
  onSave 
}: DiaryEntryFormProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(
    lessonPlan.filter(item => item.completed).map(item => item.id)
  );
  const [notes, setNotes] = useState('');
  const [homework, setHomework] = useState('');
  const [smartAlerts, setSmartAlerts] = useState<string[]>([]);
  const [customAlert, setCustomAlert] = useState('');
  const { toast } = useToast();

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics(prev => 
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleAddCustomAlert = () => {
    if (customAlert.trim()) {
      setSmartAlerts(prev => [...prev, customAlert.trim()]);
      setCustomAlert('');
    }
  };

  const handleRemoveAlert = (index: number) => {
    setSmartAlerts(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const diaryData = {
      date,
      class: className,
      subject,
      topics: selectedTopics.map(id => lessonPlan.find(item => item.id === id)),
      notes,
      homework,
      alerts: smartAlerts
    };
    
    onSave(diaryData);
    
    toast({
      title: "Diary entry saved",
      description: `Diary entry for ${subject} on ${date.toLocaleDateString()} has been recorded.`,
    });
  };

  // Predefined smart alerts based on context
  const suggestedAlerts = [
    "Multiple students struggling with the concept",
    "Class completed ahead of schedule",
    "Need more practice exercises for next class",
    "Additional materials required for next session",
    "Class test scheduled for next week"
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-[#000080] text-xl">
          {subject} Diary Entry for {className} - {date.toLocaleDateString()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-[#000080] mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Topics Covered (from Lesson Plan)
          </h3>
          
          <div className="grid grid-cols-1 gap-2 mb-4">
            {lessonPlan.length > 0 ? (
              lessonPlan.map(item => (
                <div 
                  key={item.id} 
                  className={`p-3 border rounded-md ${
                    selectedTopics.includes(item.id)
                      ? 'bg-[#138808]/5 border-[#138808]/20'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Checkbox 
                      id={`topic-${item.id}`} 
                      checked={selectedTopics.includes(item.id)}
                      onCheckedChange={() => handleTopicToggle(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`topic-${item.id}`} 
                        className="font-medium cursor-pointer block"
                      >
                        {item.topic}
                      </label>
                      <p className="text-sm text-slate-500 mt-1">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center p-4 border rounded-md bg-slate-50">
                <p className="text-slate-500">No lesson plan items available for this class.</p>
              </div>
            )}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-[#000080] mb-2">Notes</h3>
          <Textarea 
            placeholder="Enter any additional notes about today's class..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[100px] resize-none"
          />
        </div>
        
        <div>
          <h3 className="font-medium text-[#000080] mb-2">Homework Assigned</h3>
          <Textarea 
            placeholder="Enter homework details for students..."
            value={homework}
            onChange={(e) => setHomework(e.target.value)}
            className="min-h-[80px] resize-none"
          />
        </div>
        
        <div>
          <h3 className="font-medium text-[#000080] mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            Smart Alerts
          </h3>
          
          <div className="mb-3">
            <Select onValueChange={(value) => setCustomAlert(value)}>
              <SelectTrigger className="w-full border-[#138808]/30">
                <SelectValue placeholder="Choose a predefined alert or type custom" />
              </SelectTrigger>
              <SelectContent>
                {suggestedAlerts.map((alert, index) => (
                  <SelectItem key={index} value={alert}>
                    {alert}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-2 mt-2">
              <Input 
                placeholder="Or type a custom alert..." 
                value={customAlert}
                onChange={(e) => setCustomAlert(e.target.value)}
                className="flex-1 border-[#138808]/30"
              />
              <Button 
                type="button" 
                onClick={handleAddCustomAlert}
                variant="outline"
                className="border-[#138808]/30 text-[#138808]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
          
          {smartAlerts.length > 0 ? (
            <div className="space-y-2">
              {smartAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-2 p-2 border border-[#FF9933]/30 bg-[#FF9933]/5 rounded-md text-sm"
                >
                  <AlertCircle className="h-4 w-4 flex-shrink-0 text-[#FF9933]" />
                  <span className="flex-1">{alert}</span>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                    onClick={() => handleRemoveAlert(index)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500 italic">No alerts added yet.</p>
          )}
        </div>
        
        <div className="flex justify-end pt-2">
          <Button 
            onClick={handleSubmit}
            className="bg-[#138808] hover:bg-[#138808]/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Diary Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiaryEntryForm;
