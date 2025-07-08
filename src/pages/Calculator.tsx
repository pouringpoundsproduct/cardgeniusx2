import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Calculator as CalculatorIcon, ShoppingBag, Fuel, Utensils, Plane, Home, Zap } from "lucide-react";

const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [spendingData, setSpendingData] = useState({
    amazon_spends: 5000,
    flipkart_spends: 3000,
    grocery_spends_online: 4000,
    online_food_ordering: 2500,
    other_online_spends: 2000,
    other_offline_spends: 3000,
    dining_or_going_out: 3500,
    fuel: 4000,
    school_fees: 0,
    rent: 25000,
    mobile_phone_bills: 1000,
    electricity_bills: 3000,
    water_bills: 1500,
    ott_channels: 800,
    hotels_annual: 30000,
    flights_annual: 40000,
    insurance_health_annual: 25000,
    insurance_car_or_bike_annual: 15000,
    large_electronics_purchase_like_mobile_tv_etc: 50000,
    domestic_lounge_usage_quarterly: 4,
    international_lounge_usage_quarterly: 0,
  });

  const categories = [
    { 
      id: "ALL", 
      name: "Complete Analysis", 
      icon: CalculatorIcon, 
      description: "Get comprehensive spending analysis across all categories",
      questions: 19 
    },
    { 
      id: "SHOPPING", 
      name: "Shopping", 
      icon: ShoppingBag, 
      description: "Amazon, Flipkart, online & offline shopping",
      questions: 4 
    },
    { 
      id: "UTILITY", 
      name: "Bills & Utilities", 
      icon: Home, 
      description: "Rent, bills, insurance, school fees",
      questions: 7 
    },
    { 
      id: "GROCERY", 
      name: "Grocery", 
      icon: Utensils, 
      description: "Online grocery shopping",
      questions: 1 
    },
    { 
      id: "FUEL", 
      name: "Fuel", 
      icon: Fuel, 
      description: "Fuel and transportation",
      questions: 1 
    },
    { 
      id: "DINING", 
      name: "Dining", 
      icon: Utensils, 
      description: "Restaurants and going out",
      questions: 1 
    },
    { 
      id: "TRAVEL", 
      name: "Travel & Hotels", 
      icon: Plane, 
      description: "Annual travel and lounge usage",
      questions: 3 
    },
  ];

  const questions = [
    { key: "amazon_spends", label: "Amazon Monthly Spending", min: 0, max: 50000, step: 500, category: ["ALL", "SHOPPING"] },
    { key: "flipkart_spends", label: "Flipkart Monthly Spending", min: 0, max: 50000, step: 500, category: ["ALL", "SHOPPING"] },
    { key: "other_online_spends", label: "Other Online Shopping", min: 0, max: 30000, step: 500, category: ["ALL", "SHOPPING"] },
    { key: "other_offline_spends", label: "Offline Shopping", min: 0, max: 30000, step: 500, category: ["ALL", "SHOPPING"] },
    { key: "grocery_spends_online", label: "Online Grocery Shopping", min: 0, max: 20000, step: 500, category: ["ALL", "GROCERY"] },
    { key: "online_food_ordering", label: "Food Delivery Apps", min: 0, max: 15000, step: 250, category: ["ALL", "DINING"] },
    { key: "dining_or_going_out", label: "Dining & Entertainment", min: 0, max: 20000, step: 500, category: ["ALL", "DINING"] },
    { key: "fuel", label: "Monthly Fuel Expenses", min: 0, max: 15000, step: 500, category: ["ALL", "FUEL"] },
    { key: "rent", label: "Monthly Rent", min: 0, max: 100000, step: 1000, category: ["ALL", "UTILITY"] },
    { key: "mobile_phone_bills", label: "Mobile Bills", min: 0, max: 5000, step: 100, category: ["ALL", "UTILITY"] },
    { key: "electricity_bills", label: "Electricity Bills", min: 0, max: 10000, step: 200, category: ["ALL", "UTILITY"] },
    { key: "water_bills", label: "Water Bills", min: 0, max: 5000, step: 100, category: ["ALL", "UTILITY"] },
    { key: "ott_channels", label: "OTT Subscriptions", min: 0, max: 2000, step: 50, category: ["ALL", "UTILITY"] },
    { key: "insurance_health_annual", label: "Health Insurance (Annual)", min: 0, max: 100000, step: 2000, category: ["ALL", "UTILITY"] },
    { key: "insurance_car_or_bike_annual", label: "Vehicle Insurance (Annual)", min: 0, max: 50000, step: 1000, category: ["ALL", "UTILITY"] },
    { key: "hotels_annual", label: "Hotels (Annual)", min: 0, max: 200000, step: 5000, category: ["ALL", "TRAVEL"] },
    { key: "flights_annual", label: "Flights (Annual)", min: 0, max: 300000, step: 5000, category: ["ALL", "TRAVEL"] },
    { key: "domestic_lounge_usage_quarterly", label: "Domestic Lounge Usage (Quarterly)", min: 0, max: 50, step: 1, category: ["ALL", "TRAVEL"] },
  ];

  const currentQuestions = questions.filter(q => q.category.includes(selectedCategory));
  const progress = currentQuestions.length > 0 ? ((currentStep + 1) / currentQuestions.length) * 100 : 0;

  const formatCurrency = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(1)}L`;
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(0)}K`;
    }
    return `₹${value}`;
  };

  const updateSpending = (key: string, value: number[]) => {
    setSpendingData(prev => ({ ...prev, [key]: value[0] }));
  };

  const nextStep = () => {
    if (currentStep < currentQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRewards = () => {
    // Mock calculation - in real app, call CardGenius API
    const totalSpending = Object.values(spendingData).reduce((sum, val) => sum + val, 0);
    return {
      topCard: "Amazon Pay ICICI Credit Card",
      annualRewards: Math.floor(totalSpending * 0.025),
      currentCardRewards: Math.floor(totalSpending * 0.01),
      savings: Math.floor(totalSpending * 0.015),
    };
  };

  if (currentQuestions.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Category Selection */}
        <section className="bg-gradient-subtle py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Reward Calculator
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Calculate your potential rewards based on your spending patterns. Choose a category to get started.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {categories.map((category, index) => {
                const Icon = category.icon;
                return (
                  <Card 
                    key={category.id} 
                    className="cursor-pointer hover-lift shadow-card animate-bounce-in group"
                    style={{animationDelay: `${index * 100}ms`}}
                    onClick={() => {
                      setSelectedCategory(category.id);
                      setCurrentStep(0);
                    }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                      <Badge variant="secondary">
                        {category.questions} question{category.questions > 1 ? 's' : ''}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentQuestion = currentQuestions[currentStep];
  const results = calculateRewards();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-subtle py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {categories.find(c => c.id === selectedCategory)?.name} Calculator
              </h1>
              <p className="text-muted-foreground">
                Question {currentStep + 1} of {currentQuestions.length}
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory("");
                setCurrentStep(0);
              }}
            >
              Change Category
            </Button>
          </div>
          
          <div className="mt-6">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {currentStep < currentQuestions.length ? (
            <Card className="shadow-card animate-fade-in">
              <CardContent className="p-8">
                <div className="space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                      {currentQuestion.label}
                    </h2>
                    <p className="text-muted-foreground">
                      Move the slider to set your monthly spending
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary mb-2">
                        {formatCurrency(spendingData[currentQuestion.key as keyof typeof spendingData])}
                      </div>
                      <p className="text-sm text-muted-foreground">per month</p>
                    </div>

                    <div className="px-4">
                      <Slider
                        value={[spendingData[currentQuestion.key as keyof typeof spendingData]]}
                        onValueChange={(value) => updateSpending(currentQuestion.key, value)}
                        max={currentQuestion.max}
                        min={currentQuestion.min}
                        step={currentQuestion.step}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>{formatCurrency(currentQuestion.min)}</span>
                        <span>{formatCurrency(currentQuestion.max)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={prevStep}
                      disabled={currentStep === 0}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    
                    <Button 
                      onClick={nextStep}
                      className="bg-primary hover:bg-primary/90"
                    >
                      {currentStep === currentQuestions.length - 1 ? "Calculate Rewards" : "Next"}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Results
            <div className="space-y-8 animate-fade-in">
              <Card className="shadow-card">
                <CardHeader className="text-center bg-gradient-primary text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Your Personalized Results</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Recommended Card
                    </h3>
                    <div className="text-3xl font-bold text-primary mb-2">
                      {results.topCard}
                    </div>
                    <Badge className="bg-success/10 text-success">Best Match</Badge>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        ₹{results.annualRewards.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Annual Rewards</p>
                    </div>
                    <div className="text-center p-4 bg-success/5 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        ₹{results.savings.toLocaleString()}
                      </div>
                      <p className="text-sm text-muted-foreground">Potential Savings</p>
                    </div>
                    <div className="text-center p-4 bg-accent/5 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        2.5%
                      </div>
                      <p className="text-sm text-muted-foreground">Avg Reward Rate</p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <Button className="flex-1 bg-primary hover:bg-primary/90">
                      View Full Analysis
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Try Another Category
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-foreground mb-4">Next Steps</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-semibold">1</div>
                      <p className="text-muted-foreground">Compare this card with others in our comparison tool</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-success-foreground text-sm font-semibold">2</div>
                      <p className="text-muted-foreground">Use Card Genius for complete spending analysis</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-semibold">3</div>
                      <p className="text-muted-foreground">Apply for your chosen card through our platform</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculator;