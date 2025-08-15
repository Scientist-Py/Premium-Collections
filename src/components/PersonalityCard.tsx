import { Play, Star, Video, ShoppingCart, Repeat } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface PersonalityCardProps {
  id: string;
  name: string;
  image: string;
  videoCount: number;
  rating: number;
  isPopular?: boolean;
  orders: number;
  repeatRate: number; // percent
  price: number;
  onBuyNow: (id: string) => void;
}

export const PersonalityCard = ({
  id,
  name,
  image,
  videoCount,
  rating,
  isPopular,
  orders,
  repeatRate,
  price,
  onBuyNow,
}: PersonalityCardProps) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate(`/model/${id}`);
  };

  return (
    <Card className="group overflow-hidden bg-card border border-card-border hover:shadow-card transition-smooth hover:scale-[1.02]">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-contain transition-smooth group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        <div className="absolute top-3 left-3">
          {isPopular && (
            <Badge className="bg-success/90 text-success-foreground font-semibold border border-success/20">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Popular
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
            <Play className="w-5 h-5 text-primary" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-5">
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">{name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4" />
                <span>{videoCount} videos</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span>{rating}/5</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 gap-3 text-xs mt-2">
            <div className="flex items-center gap-1.5 rounded-md border border-card-border bg-card/50 px-2 py-1">
              <ShoppingCart className="w-3.5 h-3.5 text-primary" />
              <span className="text-foreground font-medium">{orders.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-card-border bg-card/50 px-2 py-1">
              <Repeat className="w-3.5 h-3.5 text-accent" />
              <span className="text-foreground font-medium">{repeatRate}%</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-primary">₹{price}</p>
                <p className="text-xs text-muted-foreground">One-time payment</p>
              </div>
              <Button 
                variant="buy" 
                size="lg"
                onClick={handleBuyClick}
                className="transition-bounce font-bold"
              >
                Buy Now
              </Button>
            </div>
            

          </div>
        </div>
      </CardContent>
    </Card>
  );
};