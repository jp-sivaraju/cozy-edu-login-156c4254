
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar, Download, X, ZoomIn, ZoomOut } from 'lucide-react';
import { format, parseISO } from 'date-fns';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  date: string;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl, title, date }) => {
  const [scale, setScale] = useState(1);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `diary-photo-${format(parseISO(date), 'yyyy-MM-dd')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[80vw] max-h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex justify-between items-center w-full">
            <div>
              <DialogTitle className="text-[#000080]">{title}</DialogTitle>
              <div className="text-sm text-slate-500 flex items-center mt-1">
                <Calendar className="w-3 h-3 mr-1" />
                {format(parseISO(date), 'MMM d, yyyy')}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleZoomOut} 
                disabled={scale <= 0.5}
                className="h-8 w-8"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleZoomIn} 
                disabled={scale >= 3}
                className="h-8 w-8"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleDownload}
                className="h-8 w-8"
              >
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onClose}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="overflow-auto p-4 flex justify-center items-center bg-slate-100 max-h-[70vh]">
          <div 
            className="border-4 border-[#138808] rounded-lg overflow-hidden bg-white"
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-in-out' }}
          >
            <img 
              src={imageUrl} 
              alt="Diary entry photo" 
              className="max-w-full h-auto"
              style={{ maxHeight: 'calc(70vh - 2rem)' }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
