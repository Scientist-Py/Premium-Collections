import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Archive, Cloud, CheckCircle } from "lucide-react";

interface DeliveryMethodModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalityName: string;
  onSelectDelivery: (method: 'zip' | 'gdrive') => void;
}

export const DeliveryMethodModal = ({ 
  isOpen, 
  onClose, 
  personalityName, 
  onSelectDelivery 
}: DeliveryMethodModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<'zip' | 'gdrive' | null>(null);

  const handleSelect = (method: 'zip' | 'gdrive') => {
    setSelectedMethod(method);
  };

  const handleContinue = () => {
    if (selectedMethod) {
      onSelectDelivery(selectedMethod);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border border-card-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-foreground">
            Choose Delivery Method
          </DialogTitle>
          <p className="text-center text-muted-foreground">
            How would you like to receive {personalityName} collection?
          </p>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* ZIP File Option */}
          <Card 
            className={`cursor-pointer transition-smooth hover:shadow-card ${
              selectedMethod === 'zip' 
                ? 'border-primary bg-primary/5 shadow-primary' 
                : 'border-card-border hover:border-primary/30'
            }`}
            onClick={() => handleSelect('zip')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Archive className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">ZIP File Download</CardTitle>
                    <p className="text-sm text-muted-foreground">Direct download link</p>
                  </div>
                </div>
                {selectedMethod === 'zip' && (
                  <CheckCircle className="w-5 h-5 text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Instant</Badge>
                  <Badge variant="secondary" className="text-xs">One-time download</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get an instant download link for a compressed ZIP file containing all videos.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Google Drive Option */}
          <Card 
            className={`cursor-pointer transition-smooth hover:shadow-card ${
              selectedMethod === 'gdrive' 
                ? 'border-accent bg-accent/5 shadow-accent' 
                : 'border-card-border hover:border-accent/30'
            }`}
            onClick={() => handleSelect('gdrive')}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <Cloud className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Google Drive Link</CardTitle>
                    <p className="text-sm text-muted-foreground">Cloud storage access</p>
                  </div>
                </div>
                {selectedMethod === 'gdrive' && (
                  <CheckCircle className="w-5 h-5 text-accent" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">Cloud Access</Badge>
                  <Badge variant="secondary" className="text-xs">No Download Required</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get access to a Google Drive folder with all videos organized and ready to stream.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant={selectedMethod === 'zip' ? 'default' : selectedMethod === 'gdrive' ? 'accent' : 'default'}
            onClick={handleContinue}
            disabled={!selectedMethod}
            className="flex-1"
          >
            Continue to Payment
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};