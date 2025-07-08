
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Brain, MessageCircle, Eye, Search, CreditCard, Star } from "lucide-react";
import { Link } from "react-router-dom";

const AllCards = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAIWidget, setShowAIWidget] = useState(false);

  useEffect(() => {
    fetchAllCards();
  }, []);

  const fetchAllCards = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: "",
          banks_ids: [],
          card_networks: [],
          annualFees: "",
          credit_score: "",
          sort_by: "",
          free_cards: "",
          eligiblityPayload: {},
          cardGeniusPayload: {}
        }),
      });
      const data = await response.json();
      setCards(data.cards?.slice(0, 8) || []);
    } catch (error) {
      console.error('Error fetching cards:', error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAskAI = (cardName: string) => {
    setShowAIWidget(true);
    // Here you would implement the AI chat for specific card
    console.log(`AI query for card: ${cardName}`);
  };

  const filteredCards = cards.filter(card => 
    card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.bank_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              All Credit Cards
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the perfect credit card for your needs with AI-powered insights
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for cards or banks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-base border-2 border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-muted-foreground">
            {loading ? "Loading..." : `Showing ${filteredCards.length} cards`}
          </p>
        </div>

        {/* Cards List */}
        {loading ? (
          <div className="space-y-4">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="shadow-card">
                <CardContent className="p-6">
                  <div className="animate-pulse flex items-center space-x-6">
                    <div className="w-20 h-12 bg-muted rounded"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="flex space-x-4">
                        <div className="h-6 w-16 bg-muted rounded"></div>
                        <div className="h-6 w-16 bg-muted rounded"></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <div className="h-10 w-20 bg-muted rounded"></div>
                      <div className="h-10 w-24 bg-muted rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCards.map((card, index) => (
              <Card 
                key={card.id} 
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
                        onClick={() => handleAskAI(card.name)}
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
            ))}
          </div>
        )}

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
            Load More Cards
          </Button>
        </div>
      </div>

      {/* AI Widget */}
      {showAIWidget && (
        <div className="fixed bottom-6 right-6 w-80 h-96 bg-card border border-border rounded-lg shadow-elevated z-50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowAIWidget(false)}
            >
              ×
            </Button>
          </div>
          <div className="p-4 h-full flex items-center justify-center text-muted-foreground">
            AI chat interface would be implemented here
          </div>
        </div>
      )}
    </div>
  );
};

export default AllCards;
