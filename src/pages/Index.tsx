import { useState } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SearchBar } from "@/components/SearchBar";
import { PersonalityCard } from "@/components/PersonalityCard";
import { DeliveryMethodModal } from "@/components/DeliveryMethodModal";
import { PaymentModal } from "@/components/PaymentModal";
import { TelegramSupport } from "@/components/TelegramSupport";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { TrendingUp, Users, Video, Star, Gift, ArrowRight, Eye, MessageCircle } from "lucide-react";

// Import personality images
import uma from "@/assets/uma.jpeg";
import molvala from "@/assets/molvala.jpg";
import dani from "@/assets/DANI.jpg";
import lana from "@/assets/lana.jpg";
import mia from "@/assets/mia.jpg";
import julia from "@/assets/julia.jpg";
import blake from "@/assets/blake.jpg";
import alyx from "@/assets/alyx.jpg";
import adria from "@/assets/adria.jpg";

const personalities = [
  {
    id: "uma-north",
    name: "Uma North",
    image: uma,
    videoCount: 42,
    rating: 4.9,
    isPopular: true,
    orders: 2100,
    repeatRate: 48,
    price: 389,
  },
  {
    id: "mia-molvaka",
    name: "Mia Molvaka",
    image: molvala,
    videoCount: 38,
    rating: 4.8,
    isPopular: false,
    orders: 1550,
    repeatRate: 39,
    price: 229,
  },
  {
    id: "dani-daniels",
    name: "Dani Daniels",
    image: dani,
    videoCount: 45,
    rating: 4.9,
    isPopular: true,
    orders: 1980,
    repeatRate: 45,
    price: 449,
  },
  {
    id: "lana-rohdes",
    name: "Lana Rohdes",
    image: lana,
    videoCount: 41,
    rating: 4.7,
    isPopular: false,
    orders: 1320,
    repeatRate: 33,
    price: 239,
  },
  {
    id: "mia-khalifa",
    name: "Mia Khalifa",
    image: mia,
    videoCount: 37,
    rating: 4.8,
    isPopular: false,
    orders: 1180,
    repeatRate: 37,
    price: 349,
  },
  {
    id: "julia-ann",
    name: "Julia Ann",
    image: julia,
    videoCount: 43,
    rating: 4.9,
    isPopular: true,
    orders: 2040,
    repeatRate: 44,
    price: 289,
  },
  {
    id: "blake-bloosm",
    name: "Blake Bloosm",
    image: blake,
    videoCount: 36,
    rating: 4.7,
    isPopular: false,
    orders: 960,
    repeatRate: 31,
    price: 449,
  },
  {
    id: "alyx-star",
    name: "Alyx Star",
    image: alyx,
    videoCount: 39,
    rating: 4.8,
    isPopular: false,
    orders: 1270,
    repeatRate: 36,
    price: 229,
  },
  {
    id: "adria-rea",
    name: "Adria Rea",
    image: adria,
    videoCount: 40,
    rating: 4.8,
    isPopular: true,
    orders: 1850,
    repeatRate: 42,
    price: 289,
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPersonalities, setFilteredPersonalities] = useState(personalities);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPersonality, setSelectedPersonality] = useState<string>("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'zip' | 'gdrive'>('zip');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = personalities.filter((personality) =>
      personality.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPersonalities(filtered);
  };

  const handleBuyNow = (personalityId: string) => {
    setSelectedPersonality(personalityId);
    setShowDeliveryModal(true);
    
    const personality = personalities.find(p => p.id === personalityId);
    toast({
      title: "Starting Purchase",
      description: `Initiating purchase for ${personality?.name} collection`,
    });
  };

  const handleSelectDelivery = (method: 'zip' | 'gdrive') => {
    setSelectedDeliveryMethod(method);
    setShowDeliveryModal(false);
    setShowPaymentModal(true);
  };

  const handleBackToDelivery = () => {
    setShowPaymentModal(false);
    setShowDeliveryModal(true);
  };

  const handleCloseModals = () => {
    setShowDeliveryModal(false);
    setShowPaymentModal(false);
    setSelectedPersonality("");
  };

  const totalVideos = personalities.reduce((sum, p) => sum + p.videoCount, 0);
  const selectedPersonalityData = personalities.find(p => p.id === selectedPersonality);

  // Order-focused KPIs (static demo values)
  const totalOrders = 12600;
  const repeatCustomersPct = 42;
  const avgDeliveryTimeMin = 2;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection />

      {/* Special Offer Banner */}
      <section className="py-6 bg-gradient-to-r from-success/10 via-accent/5 to-primary/10 border-y border-card-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 text-center">
            <Gift className="w-6 h-6 text-success" />
            <p className="text-lg font-semibold text-foreground">
              Why struggle finding the best videos? We've curated the ultimate collections for your climax • Choose ZIP download or Google Drive access
            </p>
            <ArrowRight className="w-6 h-6 text-primary animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">15M+</div>
              <div className="text-muted-foreground">Total Views</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-accent" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">{totalVideos}</div>
              <div className="text-muted-foreground">Total Videos</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">4.8</div>
              <div className="text-muted-foreground">Avg Rating</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="flex justify-center mb-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground">Best Value</div>
              <div className="text-muted-foreground">One-time price per bundle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Orders & Customers KPIs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/60 border border-card-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-4xl font-bold text-foreground mt-2">{totalOrders.toLocaleString()}+</p>
                <p className="text-xs text-muted-foreground mt-2">All-time orders placed</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 border border-card-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Repeat Customers</p>
                <p className="text-4xl font-bold text-foreground mt-2">{repeatCustomersPct}%</p>
                <p className="text-xs text-muted-foreground mt-2">Returning buyer rate</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 border border-card-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Premium Quality</p>
                <p className="text-4xl font-bold text-foreground mt-2">4K</p>
                <p className="text-xs text-muted-foreground mt-2">Ultra High Definition Content</p>
              </CardContent>
            </Card>
            <Card className="bg-card/60 border border-card-border">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                <p className="text-4xl font-bold text-foreground mt-2">{avgDeliveryTimeMin}m</p>
                <p className="text-xs text-muted-foreground mt-2">From payment to access</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 animate-fade-in">
              Premium Collections
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
              Choose Your Favorite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in">
              Each collection contains up to 15 high-quality videos. Officially licensed content with instant delivery.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Personality Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPersonalities.map((personality) => (
              <PersonalityCard
                key={personality.id}
                {...personality}
                onBuyNow={handleBuyNow}
              />
            ))}
          </div>

          {/* No Results */}
          {filteredPersonalities.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No personalities found matching "{searchQuery}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => handleSearch("")}
                className="mt-4"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary/20 via-transparent to-primary-light/20" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers. Choose your delivery method, pay via UPI, get instant access.
          </p>
          <Button variant="accent" size="lg" className="text-xl px-8 py-4" onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse All Collections
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background-secondary border-t border-card-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-semibold text-foreground mb-4">Premium Collections</h3>
              <p className="text-sm text-muted-foreground">
                Officially licensed content with instant delivery and secure UPI payments.
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Browse Collections</div>
                <div>Payment Methods</div>
                <div>Delivery Options</div>
                <div>Terms & Conditions</div>
              </div>
            </div>

            {/* Support */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-foreground mb-4">24/7 Support</h3>
              <div className="space-y-2 text-sm">
                <div className="text-muted-foreground">Need help? Contact us on</div>
                <div className="flex items-center justify-center md:justify-end gap-2">
                  <MessageCircle className="w-4 h-4 text-primary" />
                  <span className="text-primary font-medium">@collection_hub_here</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('https://t.me/collection_hub_here', '_blank')}
                  className="mt-2"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat on Telegram
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4 border-t border-card-border pt-8">
            <p className="text-muted-foreground">
              © 2024 Premium Collections. All content is officially licensed and authentic.
            </p>
            <div className="flex justify-center gap-6 text-sm text-muted-foreground">
              <span>Secure UPI Payments</span>
              <span>•</span>
              <span>Instant Delivery</span>
              <span>•</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DeliveryMethodModal
        isOpen={showDeliveryModal}
        onClose={handleCloseModals}
        personalityName={selectedPersonalityData?.name || ""}
        onSelectDelivery={handleSelectDelivery}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleCloseModals}
        personalityName={selectedPersonalityData?.name || ""}
        deliveryMethod={selectedDeliveryMethod}
        price={selectedPersonalityData?.price || 0}
        onBack={handleBackToDelivery}
      />

      {/* Telegram Support */}
      <TelegramSupport 
        telegramUsername="@collection_hub_here"
        telegramLink="https://t.me/collection_hub_here"
      />
    </div>
  );
};

export default Index;