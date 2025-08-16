import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Star, 
  Video, 
  ShoppingCart, 
  Repeat, 
  Download, 
  Shield, 
  CheckCircle,
  Play,
  Users,
  TrendingUp,
  Clock
} from "lucide-react";
import { DeliveryMethodModal } from "@/components/DeliveryMethodModal";
import { PaymentModal } from "@/components/PaymentModal";
import { TelegramSupport } from "@/components/TelegramSupport";

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
import lenalovings from "@/assets/lenalovings.jpg";
import agieFaith from "@/assets/angie faith.jpg";
import chloeSurreal from "@/assets/Chloe Surreal.jpg";
import abellaDanger from "@/assets/Abella Danger.jpg";
import brandiLove from "@/assets/Brandi Love.jpg";

const personalities = [
  {
    id: "uma-north",
    name: "Uma North",
    image: uma,
    videoCount: 48,
    rating: 4.9,
    isPopular: true,
    orders: 2100,
    repeatRate: 48,
    price: 389,
    description: "Uma North is a premium content creator known for her exceptional quality and diverse range of videos. This exclusive collection features professionally produced content with high-resolution video quality and crystal-clear audio.",
    features: [
      "HD & 4K Quality Videos",
      "Professional Audio",
      "Multiple Scenes & Settings",
      "Extended Runtime Content",
      "Behind-the-Scenes Footage"
    ],
    stats: {
      totalViews: "2.4M+",
      avgRating: 4.9,
      deliveryTime: "2-5 minutes",
      fileSize: "8.5 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "mia-molvaka",
    name: "Mia Molvaka",
    image: molvala,
    videoCount: 45,
    rating: 4.8,
    isPopular: false,
    orders: 1550,
    repeatRate: 39,
    price: 329,
    description: "Mia Molvaka brings a unique style and energy to every video. This collection showcases her versatility across different themes and settings, all captured with professional-grade equipment.",
    features: [
      "Studio Quality Production",
      "Multiple Outfits & Themes",
      "High-Quality Audio",
      "Various Locations",
      "Bonus Content Included"
    ],
    stats: {
      totalViews: "1.8M+",
      avgRating: 4.8,
      deliveryTime: "1-3 minutes",
      fileSize: "7.2 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "dani-daniels",
    name: "Dani Daniels",
    image: dani,
    videoCount: 52,
    rating: 4.9,
    isPopular: true,
    orders: 1980,
    repeatRate: 45,
    price: 449,
    description: "Dani Daniels is a legendary performer with an extensive collection of premium content. This bundle includes her most popular and highest-rated videos with exceptional production quality.",
    features: [
      "Award-Winning Content",
      "Cinematic Quality",
      "Professional Lighting",
      "Multiple Camera Angles",
      "Director's Cut Versions"
    ],
    stats: {
      totalViews: "3.1M+",
      avgRating: 4.9,
      deliveryTime: "2-4 minutes",
      fileSize: "9.8 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "lana-rohdes",
    name: "Lana Rohdes",
    image: lana,
    videoCount: 47,
    rating: 4.7,
    isPopular: false,
    orders: 1320,
    repeatRate: 33,
    price: 389,
    description: "Lana Rohdes delivers authentic and engaging content with a focus on quality and viewer satisfaction. This collection features her best work with professional editing and sound.",
    features: [
      "Authentic Content",
      "Professional Editing",
      "High-Quality Sound",
      "Diverse Scenarios",
      "Exclusive Access"
    ],
    stats: {
      totalViews: "1.5M+",
      avgRating: 4.7,
      deliveryTime: "1-3 minutes",
      fileSize: "6.9 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "mia-khalifa",
    name: "Mia Khalifa",
    image: mia,
    videoCount: 43,
    rating: 4.8,
    isPopular: false,
    orders: 1180,
    repeatRate: 37,
    price: 349,
    description: "Mia Khalifa's collection features her most iconic and popular content. Each video is carefully selected and remastered for the best possible viewing experience.",
    features: [
      "Iconic Content",
      "Remastered Quality",
      "Professional Audio",
      "Multiple Scenes",
      "Bonus Features"
    ],
    stats: {
      totalViews: "2.8M+",
      avgRating: 4.8,
      deliveryTime: "2-5 minutes",
      fileSize: "7.8 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "julia-ann",
    name: "Julia Ann",
    image: julia,
    videoCount: 49,
    rating: 4.9,
    isPopular: true,
    orders: 2040,
    repeatRate: 44,
    price: 369,
    description: "Julia Ann's premium collection showcases her legendary career with the highest quality videos available. This bundle includes her most celebrated performances.",
    features: [
      "Legendary Content",
      "Award-Winning Quality",
      "Professional Production",
      "Multiple Formats",
      "Exclusive Bonus"
    ],
    stats: {
      totalViews: "2.9M+",
      avgRating: 4.9,
      deliveryTime: "2-4 minutes",
      fileSize: "8.9 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "blake-bloosm",
    name: "Blake Bloosm",
    image: blake,
    videoCount: 42,
    rating: 4.7,
    isPopular: false,
    orders: 960,
    repeatRate: 31,
    price: 449,
    description: "Blake Bloosm brings energy and creativity to every video. This collection features her most popular content with professional production values and engaging scenarios.",
    features: [
      "Energetic Content",
      "Creative Scenarios",
      "Professional Quality",
      "Multiple Themes",
      "Bonus Material"
    ],
    stats: {
      totalViews: "1.2M+",
      avgRating: 4.7,
      deliveryTime: "1-3 minutes",
      fileSize: "6.5 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "alyx-star",
    name: "Alyx Star",
    image: alyx,
    videoCount: 44,
    rating: 4.8,
    isPopular: false,
    orders: 1270,
    repeatRate: 36,
    price: 459,
    description: "Alyx Star's collection features her most engaging and high-quality content. Each video is professionally produced with attention to detail and viewer satisfaction.",
    features: [
      "Engaging Content",
      "Professional Detail",
      "High-Quality Production",
      "Diverse Scenarios",
      "Premium Access"
    ],
    stats: {
      totalViews: "1.6M+",
      avgRating: 4.8,
      deliveryTime: "2-4 minutes",
      fileSize: "7.1 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "adria-rea",
    name: "Adria Rea",
    image: adria,
    videoCount: 46,
    rating: 4.8,
    isPopular: true,
    orders: 1850,
    repeatRate: 42,
    price: 349,
    description: "Adria Rea delivers exceptional content with a focus on quality and authenticity. This collection includes her best work with professional production and editing.",
    features: [
      "Exceptional Quality",
      "Authentic Content",
      "Professional Editing",
      "Multiple Scenes",
      "Exclusive Bonus"
    ],
    stats: {
      totalViews: "2.1M+",
      avgRating: 4.8,
      deliveryTime: "2-4 minutes",
      fileSize: "8.2 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "lena-lovings",
    name: "Lena Lovings",
    image: lenalovings,
    videoCount: 41,
    rating: 4.6,
    isPopular: false,
    orders: 850,
    repeatRate: 28,
    price: 559,
    description: "Lena Lovings offers a fresh perspective with her captivating content. This collection features her unique style and high-quality visuals, perfect for a new viewing experience.",
    features: [
      "Captivating Content",
      "Unique Style",
      "High-Quality Visuals",
      "Engaging Scenarios",
      "Bonus Behind-the-Scenes"
    ],
    stats: {
      totalViews: "1.0M+",
      avgRating: 4.6,
      deliveryTime: "1-3 minutes",
      fileSize: "6.0 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "agie-faith",
    name: "Agie Faith",
    image: agieFaith,
    videoCount: 43,
    rating: 4.7,
    isPopular: false,
    orders: 950,
    repeatRate: 30,
    price: 349,
    description: "Agie Faith brings a vibrant and dynamic energy to her collection. Enjoy professionally produced videos with crisp visuals and immersive sound, highlighting her best performances.",
    features: [
      "Vibrant & Dynamic",
      "Professionally Produced",
      "Crisp Visuals",
      "Immersive Sound",
      "Exclusive Performances"
    ],
    stats: {
      totalViews: "1.1M+",
      avgRating: 4.7,
      deliveryTime: "1-3 minutes",
      fileSize: "6.3 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "chloe",
    name: "Chloe",
    image: chloeSurreal,
    videoCount: 38,
    rating: 4.5,
    isPopular: false,
    orders: 700,
    repeatRate: 25,
    price: 379,
    description: "Chloe's collection offers a fresh and exciting array of content, showcasing her unique charm and creativity. Each video is designed to provide an engaging and memorable viewing experience.",
    features: [
      "Fresh & Exciting Content",
      "Unique Charm",
      "Creative Scenarios",
      "High-Definition Quality",
      "Exclusive Behind-the-Scenes"
    ],
    stats: {
      totalViews: "900K+",
      avgRating: 4.5,
      deliveryTime: "1-2 minutes",
      fileSize: "5.8 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "abella-danger",
    name: "Abella Danger",
    image: abellaDanger,
    videoCount: 44,
    rating: 4.9,
    isPopular: true,
    orders: 2200,
    repeatRate: 47,
    price: 439,
    description: "Abella Danger is a dynamic performer known for her intense energy and captivating presence. This exclusive collection features her most popular and highest-rated content with exceptional production quality and engaging scenarios.",
    features: [
      "Intense Energy & Performance",
      "High-Quality Production",
      "Multiple Scenes & Themes",
      "Professional Audio",
      "Exclusive Behind-the-Scenes"
    ],
    stats: {
      totalViews: "2.7M+",
      avgRating: 4.9,
      deliveryTime: "2-4 minutes",
      fileSize: "9.2 GB",
      format: "MP4/1080p"
    }
  },
  {
    id: "brandi-love",
    name: "Brandi Love",
    image: brandiLove,
    videoCount: 41,
    rating: 4.8,
    isPopular: false,
    orders: 1680,
    repeatRate: 41,
    price: 329,
    description: "Brandi Love brings sophistication and experience to every video. This collection showcases her legendary career with the highest quality videos available, featuring professional production and engaging content.",
    features: [
      "Sophisticated Content",
      "Legendary Career Highlights",
      "Professional Production",
      "Multiple Formats",
      "Exclusive Bonus Material"
    ],
    stats: {
      totalViews: "2.1M+",
      avgRating: 4.8,
      deliveryTime: "2-4 minutes",
      fileSize: "8.7 GB",
      format: "MP4/1080p"
    }
  },
];

const ModelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState<'zip' | 'gdrive'>('zip');

  const personality = personalities.find(p => p.id === id);

  if (!personality) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Model Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Collections</Button>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    setShowDeliveryModal(true);
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
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary py-6">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-primary-foreground hover:bg-primary-foreground/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collections
          </Button>
          
          <div className="flex items-center gap-4">
            <img 
              src={personality.image} 
              alt={personality.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary-foreground/20"
            />
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground">{personality.name}</h1>
              <div className="flex items-center gap-4 text-primary-foreground/90">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{personality.rating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Video className="w-4 h-4" />
                  <span>{personality.videoCount} videos</span>
                </div>
                {personality.isPopular && (
                  <Badge className="bg-success/90 text-success-foreground">
                    Popular
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card className="border-card-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">About This Collection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {personality.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {personality.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-card-border bg-card/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{personality.stats.totalViews}</p>
                  <p className="text-xs text-muted-foreground">Total Views</p>
                </CardContent>
              </Card>
              
              <Card className="border-card-border bg-card/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{personality.stats.avgRating}</p>
                  <p className="text-xs text-muted-foreground">Avg Rating</p>
                </CardContent>
              </Card>
              
              <Card className="border-card-border bg-card/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Clock className="w-6 h-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{personality.stats.deliveryTime}</p>
                  <p className="text-xs text-muted-foreground">Delivery Time</p>
                </CardContent>
              </Card>
              
              <Card className="border-card-border bg-card/60 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Download className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{personality.stats.fileSize}</p>
                  <p className="text-xs text-muted-foreground">File Size</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="border-card-border bg-card/60 backdrop-blur-sm sticky top-6">
              <CardHeader>
                <CardTitle className="text-foreground">Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">₹{personality.price}</p>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Videos Included:</span>
                    <span className="font-medium">{personality.videoCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Format:</span>
                    <span className="font-medium">{personality.stats.format}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Orders:</span>
                    <span className="font-medium">{personality.orders.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Repeat Rate:</span>
                    <span className="font-medium">{personality.repeatRate}%</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    variant="buy" 
                    size="lg" 
                    className="w-full"
                    onClick={handleBuyNow}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Buy Now - ₹{personality.price}
                  </Button>
                  

                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    <span>Secure UPI Payment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-card-border bg-card/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Collection Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-medium">{personality.rating}/5</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Views</span>
                  <span className="font-medium">{personality.stats.totalViews}</span>
                </div>
                                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Video Quality</span>
                    <span className="font-medium text-primary">4K</span>
                  </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeliveryMethodModal
        isOpen={showDeliveryModal}
        onClose={handleCloseModals}
        personalityName={personality.name}
        onSelectDelivery={handleSelectDelivery}
      />

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={handleCloseModals}
        personalityName={personality.name}
        deliveryMethod={selectedDeliveryMethod}
        price={personality.price}
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

export default ModelDetail;
