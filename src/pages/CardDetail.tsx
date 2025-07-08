
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Star, Calculator, Info } from "lucide-react";

const CardDetail = () => {
  const { id } = useParams();
  const [card, setCard] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd fetch specific card details using the ID
    fetchCardDetail();
  }, [id]);

  const fetchCardDetail = async () => {
    setLoading(true);
    try {
      // Mock card detail - in real implementation, use the card-alias API
      const mockCard = {
        id,
        name: "HDFC Regalia Credit Card",
        bank_name: "HDFC Bank",
        card_network: "Visa",
        annual_fee: "2500",
        joining_fee: "2500",
        rating: "4.2",
        key_features: [
          "4 reward points per ₹150 spent on dining and shopping",
          "2 reward points per ₹150 spent on groceries",
          "Airport lounge access",
          "Complimentary domestic airport transfers"
        ],
        benefits: [
          "Welcome benefit worth ₹2,500",
          "Fuel surcharge waiver",
          "Insurance coverage",
          "24x7 concierge services"
        ]
      };
      
      setCard(mockCard);
    } catch (error) {
      console.error('Error fetching card details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading card details...</p>
        </div>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Card not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Card Header */}
        <Card className="mb-8 shadow-card">
          <CardContent className="p-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-16 bg-gradient-primary rounded-lg flex items-center justify-center">
                <CreditCard className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-foreground mb-2">{card.name}</h1>
                <p className="text-muted-foreground mb-3">{card.bank_name}</p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                    <span className="font-medium">{card.rating}</span>
                  </div>
                  <Badge variant="secondary">{card.card_network}</Badge>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Annual Fee: </span>
                    <span className="font-medium">₹{card.annual_fee}</span>
                  </div>
                </div>
              </div>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Apply Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details" className="flex items-center space-x-2">
              <Info className="h-4 w-4" />
              <span>Details</span>
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Calculator</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Key Features */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {card.key_features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Benefits */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {card.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Reward Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calculator className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Calculate your potential rewards with this card
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Open Calculator
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CardDetail;
