import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, ExternalLink, Clock, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface TelegramSupportProps {
  telegramUsername?: string;
  telegramLink?: string;
}

export const TelegramSupport = ({ 
  telegramUsername = "@collection_hub_here", 
  telegramLink = "https://t.me/collection_hub_here" 
}: TelegramSupportProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleTelegramClick = () => {
    // Open Telegram link in new tab
    window.open(telegramLink, '_blank');
    
    // Show success toast
    toast({
      title: "Telegram Support",
      description: "Opening Telegram support chat. We'll respond within 24 hours!",
    });
    
    // Close the support panel
    setIsOpen(false);
  };

  const toggleSupport = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeSupport = () => {
    setIsMinimized(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 p-0 shadow-lg"
        >
          <MessageCircle className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <Card className="w-80 mb-4 shadow-xl border-primary/20 bg-background/95 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </div>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={minimizeSupport}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <span className="sr-only">Minimize</span>
                  <div className="w-3 h-0.5 bg-muted-foreground" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSupport}
                  className="h-8 w-8 p-0 hover:bg-muted"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Response within 24 hours</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 Support Available</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Having issues with your order? Need help with payment or delivery?
              </p>
              <Badge variant="secondary" className="text-xs">
                {telegramUsername}
              </Badge>
            </div>

            <Button 
              onClick={handleTelegramClick}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat on Telegram
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>

            <div className="text-xs text-muted-foreground text-center">
              Click to open Telegram and start chatting with our support team
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={toggleSupport}
        className="bg-primary hover:bg-primary/90 text-white rounded-full w-12 h-12 p-0 shadow-lg"
      >
        <MessageCircle className="w-5 h-5" />
      </Button>
    </div>
  );
}; 