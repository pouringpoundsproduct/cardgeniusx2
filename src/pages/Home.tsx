
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  Calculator, 
  Target, 
  Users, 
  TrendingUp, 
  Award,
  ShoppingCart,
  Plane,
  Utensils,
  Fuel,
  ShoppingBag,
  Zap,
  Star
} from "lucide-react";
import { fetchCards } from "@/lib/api-client";
import { useSecurity } from "@/hooks/use-security";

const Home = () => {
  const navigate = useNavigate();
  const [cardsByCategory, setCardsByCategory] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const { canMakeRequest } = useSecurity();

  const categories = [
    {
      id: "Shopping",
      name: "Shopping",
      icon: ShoppingCart,
      description: "Best rewards for online & offline shopping",
      slug: "best-shopping-credit-card",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "Travel", 
      name: "Travel",
      icon: Plane,
      description: "Miles, lounge access & travel benefits",
      slug: "best-travel-credit-card",
      gradient: "from-green-500 to-teal-600"
    },
    {
      id: "Dining",
      name: "Dining", 
      icon: Utensils,
      description: "Great rewards on restaurants & food delivery",
      slug: "best-dining-credit-card",
      gradient: "from-orange-500 to-red-600"
    },
    {
      id: "Fuel",
      name: "Fuel",
      icon: Fuel,
      description: "Save more on fuel and automotive expenses",
      slug: "best-fuel-credit-card", 
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      id: "Grocery",
      name: "Grocery",
      icon: ShoppingBag,
      description: "Cashback on grocery and daily essentials",
      slug: "BestCardsforGroceryShopping",
      gradient: "from-pink-500 to-rose-600"
    },
    {
      id: "Utility", 
      name: "Utility",
      icon: Zap,
      description: "Rewards on bill payments & utilities",
      slug: "best-utility-credit-card",
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  useEffect(() => {
    loadCategoryCards();
  }, []);

  const loadCategoryCards = async () => {
    if (!canMakeRequest('home-cards')) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const results: Record<string, any[]> = {};

    try {
      // Load cards for each category
      for (const category of categories) {
        const payload = {
          slug: category.slug,
          banks_ids: [],
          card_networks: [],
          annualFees: "",
          credit_score: "",
          sort_by: "",
          free_cards: "",
          eligiblityPayload: {},
          cardGeniusPayload: {}
        };

        const cards = await fetchCards(payload);
        results[category.id] = cards.slice(0, 5); // Top 5 cards
      }

      setCardsByCategory(results);
    } catch (error) {
      console.error('Error loading category cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAllCards = (categoryName: string) => {
    navigate(`/explore?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-subtle py-20 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold text-foreground mb-6">
              Find Your Perfect 
              <span className="text-gradient bg-gradient-primary bg-clip-text text-transparent"> Credit Card</span>
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover credit cards tailored to your lifestyle. Compare benefits, calculate rewards, and make smarter financial decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-4 h-auto shadow-soft"
                onClick={() => navigate('/explore')}
              >
                <CreditCard className="mr-3 h-6 w-6" />
                Explore Cards
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/5 text-lg px-8 py-4 h-auto shadow-soft"
                onClick={() => navigate('/calculator')}
              >
                <Calculator className="mr-3 h-6 w-6" />
                Try Calculator
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Uncredit?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make credit card selection simple, transparent, and rewarding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: "Personalized Matches",
                description: "Get card recommendations based on your spending patterns"
              },
              {
                icon: Calculator,
                title: "Reward Calculator", 
                description: "Calculate exact rewards you'll earn with different cards"
              },
              {
                icon: Users,
                title: "Expert Reviews",
                description: "Detailed analysis from financial experts and real users"
              },
              {
                icon: TrendingUp,
                title: "Best Offers",
                description: "Access exclusive deals and limited-time promotions"
              }
            ].map((feature, index) => (
              <Card key={index} className="hover-lift shadow-card animate-slide-up" style={{animationDelay: `${index * 100}ms`}}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Explore Cards by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect card for your specific spending needs
            </p>
          </div>

          <div className="space-y-16">
            {categories.map((category, categoryIndex) => (
              <div key={category.id} className="animate-slide-up" style={{animationDelay: `${categoryIndex * 200}ms`}}>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{category.name} Cards</h3>
                      <p className="text-muted-foreground">{category.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleViewAllCards(category.name)}
                    className="border-primary text-primary hover:bg-primary/5"
                  >
                    View All
                  </Button>
                </div>

                {loading ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[...Array(5)].map((_, index) => (
                      <Card key={index} className="shadow-card">
                        <CardContent className="p-4">
                          <div className="animate-pulse">
                            <div className="w-full h-24 bg-muted rounded-lg mb-4"></div>
                            <div className="h-4 bg-muted rounded mb-2"></div>
                            <div className="h-3 bg-muted rounded mb-4"></div>
                            <div className="h-8 bg-muted rounded"></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {(cardsByCategory[category.id] || []).map((card, cardIndex) => (
                      <Card 
                        key={card.id} 
                        className="hover-lift shadow-card animate-slide-up cursor-pointer"
                        style={{animationDelay: `${cardIndex * 100}ms`}}
                        onClick={() => navigate(`/explore?category=${encodeURIComponent(category.name)}`)}
                      >
                        <CardContent className="p-4">
                          {/* Card Visual */}
                          <div className="relative mb-4">
                            <div className={`w-full h-24 bg-gradient-to-r ${category.gradient} rounded-lg flex items-center justify-center`}>
                              <CreditCard className="h-8 w-8 text-white" />
                            </div>
                            <Badge className="absolute top-2 right-2 bg-white/90 text-foreground text-xs">
                              {card.annual_fee ? `₹${card.annual_fee}` : 'Free'}
                            </Badge>
                          </div>

                          {/* Card Info */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-foreground text-sm line-clamp-2">
                              {card.name || 'Premium Card'}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {card.bank_name || 'Major Bank'}
                            </p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                                <span className="text-xs font-medium">{card.rating || '4.0'}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs">
                                {card.card_network || 'Visa'}
                              </Badge>
                            </div>

                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {card.key_features?.[0] || 'Great rewards and benefits for your spending'}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center animate-fade-in">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 mx-auto mb-8 opacity-90" />
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Start Your Credit Journey Today
            </h2>
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              Join thousands of users who've found their perfect credit card match. 
              Compare, calculate, and choose with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 h-auto shadow-soft"
                onClick={() => navigate('/explore')}
              >
                Start Exploring
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
                onClick={() => navigate('/calculator')}
              >
                Calculate Rewards
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
