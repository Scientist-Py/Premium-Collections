import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, QrCode, Clock, AlertCircle, CheckCircle2, XCircle, ArrowLeft, MessageCircle } from "lucide-react";
import QRCode from "qrcode";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalityName: string;
  deliveryMethod: 'zip' | 'gdrive';
  price: number;
  onBack: () => void;
}

type PaymentStep = 'details' | 'qr' | 'verifying' | 'failed';

export const PaymentModal = ({ 
  isOpen, 
  onClose, 
  personalityName, 
  deliveryMethod,
  price,
  onBack 
}: PaymentModalProps) => {
  const [step, setStep] = useState<PaymentStep>('details');
  const [timer, setTimer] = useState(0);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'verifying') {
      setTimer(5);
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setStep('failed');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step]);

  const handleProceedToQR = async () => {
    setStep('qr');
    // Generate QR code for UPI payment
    try {
      const upiUrl = `upi://pay?pa=ayushiraoo@axl&pn=Premium%20Collection&am=${price}&cu=INR&tn=${encodeURIComponent(personalityName)}%20Collection`;
      const qrDataUrl = await QRCode.toDataURL(upiUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(qrDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  const handleStartPayment = () => {
    setStep('verifying');
  };

  const handleRetry = () => {
    setStep('qr');
  };

  const renderQRCode = () => {
    return (
      <div className="bg-white p-4 rounded-lg border-2 border-card-border">
        <div className="w-48 h-48 flex items-center justify-center mx-auto rounded">
          {qrCodeUrl ? (
            <img 
              src={qrCodeUrl} 
              alt="UPI QR Code" 
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded">
              <div className="text-center">
                <QrCode className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-xs text-gray-500">Generating QR Code...</p>
              </div>
            </div>
          )}
        </div>
        <p className="text-center text-sm text-foreground font-medium mt-3">
          UPI ID: ayushiraoo@axl
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Amount: ₹{price}
        </p>
        <p className="text-center text-xs text-muted-foreground mt-1">
          Payee: Premium Collection
        </p>
        <div className="mt-3 text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Copy UPI ID to clipboard
              navigator.clipboard.writeText('ayushiraoo@axl');
            }}
            className="text-xs"
          >
            Copy UPI ID
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-card border border-card-border">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {step !== 'details' && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <DialogTitle className="text-xl font-bold text-foreground">
              {step === 'details' && 'Payment Details'}
              {step === 'qr' && 'Scan QR Code'}
              {step === 'verifying' && 'Verifying Payment'}
              {step === 'failed' && 'Payment Failed'}
            </DialogTitle>
          </div>
        </DialogHeader>
        
        {/* Payment Details Step */}
        {step === 'details' && (
          <div className="space-y-6 py-4">
            <Card className="border-card-border">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collection:</span>
                  <span className="font-medium">{personalityName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Videos:</span>
                  <span className="font-medium">15 videos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery:</span>
                  <div className="flex items-center gap-2">
                    {deliveryMethod === 'zip' ? (
                      <Badge variant="secondary">ZIP Download</Badge>
                    ) : (
                      <Badge variant="secondary">Google Drive</Badge>
                    )}
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <Smartphone className="w-5 h-5 text-accent" />
              <div className="flex-1">
                <p className="font-medium text-accent">UPI Payment</p>
                <p className="text-sm text-muted-foreground">Pay securely using any UPI app</p>
              </div>
            </div>

            <Button onClick={handleProceedToQR} className="w-full" variant="default">
              Proceed to Payment
            </Button>
          </div>
        )}

        {/* QR Code Step */}
        {step === 'qr' && (
          <div className="space-y-6 py-4">
            <div className="text-center">
              {renderQRCode()}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <QrCode className="w-4 h-4" />
                <span>Scan the QR code with any UPI app</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Smartphone className="w-4 h-4" />
                <span>Or use UPI ID: ayushiraoo@axl</span>
              </div>
               {/* International Customer Message */}
               <div className="flex items-start gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
                 <MessageCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" />
                 <div>
                   <p className="font-medium text-blue-700">International Customers:</p>
                   <p className="text-blue-600">Please purchase directly via <a href="https://t.me/collection_hub_here" target="_blank" rel="noopener noreferrer" className="font-semibold underline flex items-center gap-1 inline-flex">Telegram <MessageCircle className="w-4 h-4" /></a> for support.</p>
                 </div>
               </div>
            </div>
 
            <div className="flex gap-3">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back
              </Button>
              <Button onClick={handleStartPayment} className="flex-1" variant="default">
                I've Paid ₹{price}
              </Button>
            </div>
          </div>
        )}

        {/* Verifying Step */}
        {step === 'verifying' && (
          <div className="space-y-6 py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-accent animate-pulse-slow" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Verifying Payment</h3>
                <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-accent/60 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
              <p className="text-sm text-muted-foreground">
                Verification will complete in {timer} seconds
              </p>
            </div>
          </div>
        )}

        {/* Failed Step */}
        {step === 'failed' && (
          <div className="space-y-6 py-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                <XCircle className="w-8 h-8 text-destructive" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Payment Failed</h3>
                <p className="text-muted-foreground">We couldn't verify your payment. Please try again.</p>
              </div>
            </div>
            
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-destructive">Payment not received</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you have already paid, please wait a few minutes and try again, or contact support.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-primary mt-0.5" />
                  <div className="text-left">
                    <p className="font-medium text-primary">Need Help?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      If you're facing any issues with payment, DM us on Telegram for instant support.
                    </p>
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          // Open Telegram link
                          window.open('https://t.me/collection_hub_here', '_blank');
                        }}
                        className="text-xs"
                      >
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Contact on Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleRetry} className="flex-1" variant="default">
                Try Again
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};