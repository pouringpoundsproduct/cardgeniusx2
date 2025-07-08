
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Eye, CreditCard, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface CardItemProps {
  card: any;
  index: number;
  onAskAI: (cardName: string) => void;
}

export const CardItem = ({ card, index, onAskAI }: CardItemProps) => {
  return (
    <Card 
      className="hover-lift shadow-card animate-slide-up"
      style={{animationDelay: `${index * 50}ms`}}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          {/* Card Info */}
          <div className="flex items-center space-x-6 flex-1">
            {/* Card Icon */}
            <div className="w-20 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <CreditCard className="h-6 w-6 text-white" />
            </div>

            {/* Card Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-foreground text-lg leading-tight">
                    {card.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{card.bank_name}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium">{card.rating || '4.0'}</span>
                </div>
              </div>

              {/* Tags and Fees */}
              <div className="flex items-center space-x-4 mb-3">
                <Badge variant="secondary" className="text-xs">
                  {card.card_network}
                </Badge>
                {card.key_features?.[0] && (
                  <Badge className="bg-accent/10 text-accent text-xs">
                    {card.key_features[0]}
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div>
                  <span className="text-muted-foreground">Joining Fee: </span>
                  <span className="font-medium">
                    {card.joining_fee ? `₹${card.joining_fee}` : 'Free'}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Annual Fee: </span>
                  <span className="font-medium">
                    {card.annual_fee ? `₹${card.annual_fee}` : 'Free'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-shrink-0 ml-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onAskAI(card.name)}
              className="border-primary text-primary hover:bg-primary/5"
            >
              <Brain className="h-4 w-4 mr-2" />
              Ask AI
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90"
              asChild
            >
              <Link to={`/card/${card.id}`}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
