import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Heart, Plus, Star, CreditCard } from "lucide-react";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [comparison, setComparison] = useState<string[]>([]);

  const categories = [
    "All Cards", "Shopping", "Travel", "Dining", "Fuel", "Grocery", "Utility", "Premium"
  ];

  const networks = ["Visa", "Mastercard", "American Express", "RuPay"];
  const feeRanges = ["Free", "Under ₹1,000", "₹1,000-₹5,000", "₹5,000+"];

  // Mock card data
  const cards = [
    {
      id: "1",
      name: "Amazon Pay ICICI Credit Card",
      bank: "ICICI Bank",
      image: "/placeholder-card.jpg",
      annualFee: "Free",
      network: "Visa",
      rewards: "5% on Amazon",
      rating: 4.5,
      benefits: ["5% cashback on Amazon", "2% on bill payments", "1% everywhere else"],
      category: "Shopping"
    },
    {
      id: "2", 
      name: "HDFC Regalia Credit Card",
      bank: "HDFC Bank",
      image: "/placeholder-card.jpg",
      annualFee: "₹2,500",
      network: "Visa",
      rewards: "4 Reward Points per ₹150",
      rating: 4.3,
      benefits: ["Airport lounge access", "Air miles conversion", "Dining rewards"],
      category: "Travel"
    },
    {
      id: "3",
      name: "SBI SimplyCLICK Credit Card",
      bank: "SBI",
      image: "/placeholder-card.jpg",
      annualFee: "₹499",
      network: "Visa",
      rewards: "10X on online spends",
      rating: 4.1,
      benefits: ["10X rewards online", "5X on dining", "1X on other spends"],
      category: "Dining"
    },
    {
      id: "4",
      name: "Axis Bank Neo Credit Card",
      bank: "Axis Bank",
      image: "/placeholder-card.jpg",
      annualFee: "Free",
      network: "Visa",
      rewards: "Unlimited cashback",
      rating: 4.4,
      benefits: ["No annual fee", "Contactless payments", "Easy approval"],
      category: "Shopping"
    }
  ];

  const addToComparison = (cardId: string) => {
    if (comparison.includes(cardId)) {
      setComparison(comparison.filter(id => id !== cardId));
    } else if (comparison.length < 3) {
      setComparison([...comparison, cardId]);
    }
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.bank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All Cards" || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
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
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCards.map((card, index) => (
                <Card 
                  key={card.id} 
                  className="hover-lift shadow-card animate-slide-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <CardContent className="p-6">
                    {/* Card Image */}
                    <div className="relative mb-4">
                      <div className="w-full h-32 bg-gradient-primary rounded-lg flex items-center justify-center">
                        <CreditCard className="h-12 w-12 text-white" />
                      </div>
                      
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
                        {card.annualFee}
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
                          <span className="text-sm font-medium">{card.rating}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {card.network}
                        </Badge>
                      </div>

                      <div className="bg-accent/10 p-3 rounded-lg">
                        <p className="text-sm font-medium text-accent">{card.rewards}</p>
                      </div>

                      <div className="space-y-1">
                        {card.benefits.slice(0, 2).map((benefit, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">• {benefit}</p>
                        ))}
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90">
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

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