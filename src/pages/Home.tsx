import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, GitCompare, Calculator, Star, ArrowRight, Sparkles, Trophy, ShoppingBag, Plane, UtensilsCrossed, Fuel, ShoppingCart, Zap, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-cards.jpg";

const Home = () => {
  const uspFeatures = [
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Use AI assistant across the website and card level to improve decision making while buying cards",
      cta: "Try AI Assistant",
      link: "/explore",
      color: "primary"
    },
    {
      icon: GitCompare,
      title: "Card Comparison",
      description: "Compare between textual information and spend-based calculations with detailed analysis",
      cta: "Compare Cards",
      link: "/compare",
      color: "success"
    },
    {
      icon: Calculator,
      title: "Reward Calculator",
      description: "Choose a card and get category-specific questions for shopping, fuel, dining, utility etc.",
      cta: "Calculate Rewards",
      link: "/calculator",
      color: "accent"
    },
    {
      icon: Sparkles,
      title: "Card Genius",
      description: "Answer 19 comprehensive questions to get personalized card recommendations",
      cta: "Try Card Genius",
      link: "/genius",
      color: "primary"
    },
    {
      icon: Trophy,
      title: "Beat My Card",
      description: "Choose your existing card and find out which card would save you more money",
      cta: "Beat My Card",
      link: "/beat-my-card",
      color: "success"
    }
  ];

  const [categoryCards, setCategoryCards] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const featuredCategories = [
    { 
      name: "Shopping", 
      slug: "best-shopping-credit-card", 
      icon: ShoppingBag, 
      color: "bg-blue-500",
      cards: []
    },
    { 
      name: "Travel", 
      slug: "best-travel-credit-card", 
      icon: Plane, 
      color: "bg-green-500",
      cards: []
    },
    { 
      name: "Dining", 
      slug: "best-dining-credit-card", 
      icon: UtensilsCrossed, 
      color: "bg-orange-500",
      cards: []
    },
    { 
      name: "Fuel", 
      slug: "best-fuel-credit-card", 
      icon: Fuel, 
      color: "bg-purple-500",
      cards: []
    },
    { 
      name: "Grocery", 
      slug: "BestCardsforGroceryShopping", 
      icon: ShoppingCart, 
      color: "bg-red-500",
      cards: []
    },
    { 
      name: "Utility", 
      slug: "best-utility-credit-card", 
      icon: Zap, 
      color: "bg-indigo-500",
      cards: []
    }
  ];

  useEffect(() => {
    fetchCategoryCards();
  }, []);

  const fetchCategoryCards = async () => {
    setLoading(true);
    const categoryData = {};
    
    try {
      for (const category of featuredCategories) {
        const response = await fetch('https://bk-api.bankkaro.com/sp/api/cards', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            slug: category.slug,
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
        categoryData[category.slug] = data.cards?.slice(0, 5) || [];
      }
      setCategoryCards(categoryData);
    } catch (error) {
      console.error('Error fetching category cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "YouTuber & Content Creator",
      content: "Found the perfect travel card for my frequent shoots. Saved ₹45,000 in the first year!",
      rating: 5,
      avatar: "PS"
    },
    {
      name: "Rahul Kumar",
      role: "Instagram Influencer",
      content: "The spending calculator helped me realize I was missing out on so many rewards. Game changer!",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Sneha Patel",
      role: "Freelance Designer",
      content: "AI recommendations were spot-on. Got a card that matches my creative business expenses perfectly.",
      rating: 5,
      avatar: "SP"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Creators Trust Us" },
    { number: "₹2.5Cr+", label: "Rewards Unlocked" },
    { number: "500+", label: "Cards Analyzed" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Trusted by 10,000+ Creators
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Find Your Perfect 
                  <span className="text-primary"> Credit Card</span>, 
                  <span className="text-accent"> Creator Style!</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  AI-powered recommendations tailored for content creators. 
                  Compare cards, calculate rewards, and optimize your spending like never before.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground group"
                  asChild
                >
                  <Link to="/explore">
                    Find the Best Card
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/5"
                  asChild
                >
                  <Link to="/calculator">Try Calculator</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center animate-bounce-in" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative animate-slide-up">
              <img 
                src={heroImage} 
                alt="Credit Cards" 
                className="w-full h-auto rounded-2xl shadow-elevated floating"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* USP Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Content Creators Choose Uncredit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We understand your unique financial needs and help you make smarter credit card decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {uspFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="relative group hover-lift shadow-card animate-slide-up border-0 bg-card/50 backdrop-blur-sm"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                      feature.color === 'primary' ? 'bg-primary/10 text-primary' :
                      feature.color === 'success' ? 'bg-success/10 text-success' :
                      'bg-accent/10 text-accent'
                    }`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    <Button 
                      variant="outline" 
                      className={`w-full group ${
                        feature.color === 'primary' ? 'border-primary text-primary hover:bg-primary/5' :
                        feature.color === 'success' ? 'border-success text-success hover:bg-success/5' :
                        'border-accent text-accent hover:bg-accent/5'
                      }`}
                      asChild
                    >
                      <Link to={feature.link}>
                        {feature.cta}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Explore Cards by Category
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect card for your spending habits
            </p>
          </div>
          
          {loading ? (
            <div className="text-center">
              <div className="text-lg text-muted-foreground">Loading categories...</div>
            </div>
          ) : (
            <div className="space-y-16">
              {featuredCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                const cards = categoryCards[category.slug] || [];
                
                return (
                  <div key={category.slug} className="space-y-6">
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl ${category.color} flex items-center justify-center`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{category.name} Cards</h3>
                      </div>
                      <Link to={`/explore?category=${category.name}`}>
                        <Button variant="outline" className="border-primary text-primary hover:bg-primary/5">
                          View All
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>

                    {/* Top 5 Cards */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                      {cards.map((card: any, index: number) => (
                        <Card 
                          key={card.id} 
                          className="hover-lift shadow-card animate-slide-up"
                          style={{animationDelay: `${(categoryIndex * 100) + (index * 50)}ms`}}
                        >
                          <CardContent className="p-4">
                            {/* Card Image */}
                            <div className="relative mb-4">
                              <div className="w-full h-24 bg-gradient-primary rounded-lg flex items-center justify-center">
                                <CreditCard className="h-8 w-8 text-white" />
                              </div>
                              
                              {/* Annual Fee Badge */}
                              <Badge className="absolute -bottom-2 left-2 bg-white text-primary text-xs">
                                {card.annual_fee ? `₹${card.annual_fee}` : 'Free'}
                              </Badge>
                            </div>

                            {/* Card Info */}
                            <div className="space-y-2">
                              <div>
                                <h4 className="font-semibold text-foreground text-sm leading-tight line-clamp-2">{card.name}</h4>
                                <p className="text-xs text-muted-foreground">{card.bank_name}</p>
                              </div>

                              <div className="flex items-center space-x-2">
                                <div className="flex items-center">
                                  <Star className="h-3 w-3 fill-accent text-accent mr-1" />
                                  <span className="text-xs font-medium">{card.rating || '4.0'}</span>
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                  {card.card_network}
                                </Badge>
                              </div>

                              <div className="bg-accent/10 p-2 rounded-lg">
                                <p className="text-xs font-medium text-accent line-clamp-2">{card.key_features?.[0] || 'Great rewards'}</p>
                              </div>

                              <Button size="sm" className="w-full bg-primary hover:bg-primary/90 text-xs">
                                Apply Now
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Creators Say About Us
            </h2>
            <p className="text-xl text-muted-foreground">
              Real stories from real creators who found their perfect match
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="hover-lift animate-slide-up shadow-card border-0 bg-card/50 backdrop-blur-sm"
                style={{animationDelay: `${index * 200}ms`}}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Find Your Perfect Credit Card?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of creators who've optimized their finances with AI-powered recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 group"
                asChild
              >
                <Link to="/genius">
                  Start with AI Assistant
                  <Sparkles className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/explore">Browse All Cards</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;