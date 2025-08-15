import { CheckCircle, Download, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
  const scrollToCollections = () => {
    const element = document.getElementById('collections');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative container mx-auto px-4 text-center">
        <Badge className="mb-8 bg-success/10 text-success border-success/20 text-lg px-6 py-3 animate-fade-in">
          <Zap className="w-5 h-5 mr-2" />
                      Why struggle finding the best videos? We've curated the ultimate collections for your climax
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight animate-fade-in">
          Premium Video
          <span className="bg-gradient-primary bg-clip-text text-transparent"> Collections</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto animate-fade-in">
          Access premium personality collections with{" "}
          <span className="text-primary font-bold">high-quality content</span> at a one-time price per bundle
        </p>
        

        
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span>Officially Licensed Content</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span>Multiple Delivery Options</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-success" />
            <span>Secure UPI Payments</span>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button variant="hero" onClick={scrollToCollections} className="text-xl px-8 py-4">
            Browse Collections
          </Button>
          <Button variant="outline" size="lg" className="text-xl px-8 py-4">
            Learn More
          </Button>
        </div>
        
        <div className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-2xl backdrop-blur-sm max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-2">Special Launch Price</h3>
          <p className="text-lg text-muted-foreground">
            One-time payment • Choose ZIP or Google Drive • Lifetime access
          </p>
        </div>
      </div>
    </section>
  );
};