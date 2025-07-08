import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Heart, Plus, Star, CreditCard } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [comparison, setComparison] = useState<string[]>([]);
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const categories = [
    { name: "All Cards", slug: "" },
    { name: "Shopping", slug: "best-shopping-credit-card" },
    { name: "Travel", slug: "best-travel-credit-card" },
    { name: "Dining", slug: "best-dining-credit-card" },
    { name: "Fuel", slug: "best-fuel-credit-card" },
    { name: "Grocery", slug: "BestCardsforGroceryShopping" },
    { name: "Utility", slug: "best-utility-credit-card" }
  ];

  const networks = ["Visa", "Mastercard", "American Express", "RuPay"];
  const feeRanges = ["Free", "Under ₹1,000", "₹1,000-₹5,000", "₹5,000+"];

  const fetchCards = async (categorySlug = "") => {
    setLoading(true);
    try {
      const response = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: categorySlug,
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
      setCards(data.cards || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch cards. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if category is passed via URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      fetchCards(categoryParam);
    } else {
      fetchCards();
    }
  }, [searchParams]);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    fetchCards(categorySlug);
  };

  const addToComparison = (cardId: string) => {
    if (comparison.includes(cardId)) {
      setComparison(comparison.filter(id => id !== cardId));
    } else if (comparison.length < 3) {
      setComparison([...comparison, cardId]);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.bank?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Explore Credit Cards
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find the perfect credit card tailored to your spending habits and lifestyle
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search for cards, banks, or features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Filter className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="text-lg font-semibold">Filters</h3>
                </div>

                <div className="space-y-6">
                   {/* Category Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Category</label>
                    <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.slug} value={category.slug}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Network Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Network</label>
                    <div className="space-y-2">
                      {networks.map((network) => (
                        <div key={network} className="flex items-center space-x-2">
                          <Checkbox id={network} />
                          <label htmlFor={network} className="text-sm text-muted-foreground">
                            {network}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Annual Fee Filter */}
                  <div>
                    <label className="text-sm font-medium text-foreground mb-3 block">Annual Fee</label>
                    <div className="space-y-2">
                      {feeRanges.map((range) => (
                        <div key={range} className="flex items-center space-x-2">
                          <Checkbox id={range} />
                          <label htmlFor={range} className="text-sm text-muted-foreground">
                            {range}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" variant="outline">
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cards Grid */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCards.length} of {cards.length} cards
              </p>
              <Select defaultValue="recommended">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="fee-low">Annual Fee: Low to High</SelectItem>
                  <SelectItem value="fee-high">Annual Fee: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comparison Bar */}
            {comparison.length > 0 && (
              <Card className="mb-6 bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      {comparison.length} card{comparison.length > 1 ? 's' : ''} selected for comparison
                    </p>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      Compare Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Cards Grid */}
            {loading ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-6">
                      <div className="h-32 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-2/3 mb-4"></div>
                      <div className="h-10 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCards.map((card, index) => (
                  <Card 
                    key={card.id || index} 
                    className="hover-lift shadow-card animate-slide-up"
                    style={{animationDelay: `${index * 100}ms`}}
                  >
                    <CardContent className="p-6">
                      {/* Card Image */}
                      <div className="relative mb-4">
                        {card.image ? (
                          <img 
                            src={card.image} 
                            alt={card.name}
                            className="w-full h-32 object-contain rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gradient-primary rounded-lg flex items-center justify-center">
                            <CreditCard className="h-12 w-12 text-white" />
                          </div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex space-x-2">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8 bg-white/90 hover:bg-white"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="secondary"
                            className={`h-8 w-8 ${
                              comparison.includes(card.id) 
                                ? 'bg-primary text-white hover:bg-primary/90' 
                                : 'bg-white/90 hover:bg-white'
                            }`}
                            onClick={() => addToComparison(card.id)}
                            disabled={!comparison.includes(card.id) && comparison.length >= 3}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {/* Annual Fee Badge */}
                        <Badge className="absolute bottom-2 left-2 bg-white text-primary">
                          {card.annual_fee ? `₹${card.annual_fee}` : 'Free'}
                        </Badge>
                      </div>

                      {/* Card Info */}
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-foreground text-lg">{card.name}</h3>
                          <p className="text-sm text-muted-foreground">{card.bank}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-accent text-accent mr-1" />
                            <span className="text-sm font-medium">{card.rating || '4.0'}</span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {card.network || 'Visa'}
                          </Badge>
                        </div>

                        {card.reward_rate && (
                          <div className="bg-accent/10 p-3 rounded-lg">
                            <p className="text-sm font-medium text-accent">Up to {card.reward_rate}% rewards</p>
                          </div>
                        )}

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Apply Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More */}
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5">
                Load More Cards
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;