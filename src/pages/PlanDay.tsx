
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

// Occasion options
const occasions = [
  { value: "date", label: "Date" },
  { value: "birthday", label: "Birthday" },
  { value: "group", label: "Group Activity" }
];

// Budget ranges
const budgetRanges = [
  { value: "100-200", label: "₹100 - ₹200" },
  { value: "200-400", label: "₹200 - ₹400" },
  { value: "400-600", label: "₹400 - ₹600" },
  { value: "600-900", label: "₹600 - ₹900" },
  { value: "900-1200", label: "₹900 - ₹1200" }
];

// Sample itinerary data
const getItinerary = (occasion: string, budget: string) => {
  if (occasion === "date" && budget === "400-600") {
    return [
      {
        time: "4:00 PM",
        activity: "Visit Zero Degree Café",
        description: "Start with a cozy coffee date at this popular café known for its ambiance.",
        image: "https://source.unsplash.com/random/400x300/?cafe,coffee"
      },
      {
        time: "6:30 PM",
        activity: "Order chocolate via Blinkit",
        description: "Surprise your date with their favorite chocolates delivered to the café.",
        image: "https://source.unsplash.com/random/400x300/?chocolate,gift"
      },
      {
        time: "7:30 PM",
        activity: "Buy a greeting card",
        description: "Pick up a thoughtful card from the nearby stationary shop to make the day memorable.",
        image: "https://source.unsplash.com/random/400x300/?card,gift"
      }
    ];
  }
  
  if (occasion === "birthday" && budget === "600-900") {
    return [
      {
        time: "11:00 AM",
        activity: "Brunch at Third Wave Coffee",
        description: "Start the day with a delicious brunch at this trendy coffee shop.",
        image: "https://source.unsplash.com/random/400x300/?brunch,coffee"
      },
      {
        time: "2:00 PM",
        activity: "Gaming at Gamezone",
        description: "Spend a few hours playing arcade games and having fun.",
        image: "https://source.unsplash.com/random/400x300/?arcade,gaming"
      },
      {
        time: "6:00 PM",
        activity: "Dinner at Truffles",
        description: "End the day with a delicious burger dinner at this popular joint.",
        image: "https://source.unsplash.com/random/400x300/?burger,restaurant"
      }
    ];
  }
  
  // Default itinerary
  return [
    {
      time: "10:00 AM",
      activity: "Start at Cubbon Park",
      description: "Begin your day with a relaxing walk in the park.",
      image: "https://source.unsplash.com/random/400x300/?park,nature"
    },
    {
      time: "1:00 PM",
      activity: "Lunch at a local restaurant",
      description: "Enjoy authentic local cuisine at an affordable price.",
      image: "https://source.unsplash.com/random/400x300/?restaurant,food"
    },
    {
      time: "4:00 PM",
      activity: "Visit a museum or gallery",
      description: "Explore local culture and art.",
      image: "https://source.unsplash.com/random/400x300/?museum,gallery"
    }
  ];
};

const PlanDay = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [occasion, setOccasion] = useState("date");
  const [budget, setBudget] = useState("400-600");
  const [itinerary, setItinerary] = useState<any[]>([]);
  
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate itinerary
      const plan = getItinerary(occasion, budget);
      setItinerary(plan);
      setCurrentStep(3);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(1);
    setOccasion("date");
    setBudget("400-600");
    setItinerary([]);
  };
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link to="/" className="text-byways-primary hover:underline flex items-center mb-2">
                <ArrowRight className="mr-1 rotate-180" size={16} /> Back to Home
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold text-byways-dark">Plan A Day</h1>
              <p className="text-byways-accent mt-1">
                Let us create a perfect itinerary for your special occasion
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-byways-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            
            {/* Step 1: Select occasion */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What's the occasion?</h2>
                <p className="text-byways-accent mb-6">Select the type of day you're planning</p>
                
                <RadioGroup value={occasion} onValueChange={setOccasion} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {occasions.map((item) => (
                    <div key={item.value} className="flex items-center">
                      <Label
                        htmlFor={`occasion-${item.value}`}
                        className={`w-full p-4 rounded-lg border text-center cursor-pointer transition-all
                          ${
                            occasion === item.value 
                              ? "border-byways-primary bg-byways-primary/10 text-byways-primary" 
                              : "border-byways-accent/20 hover:border-byways-accent/40"
                          }`}
                      >
                        <RadioGroupItem 
                          id={`occasion-${item.value}`}
                          value={item.value}
                          className="sr-only"
                        />
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What's your budget?</h2>
                <p className="text-byways-accent mb-6">Select a budget range for your day</p>
                
                <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
                  {budgetRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <Label
                        htmlFor={`budget-${range.value}`}
                        className={`w-full p-4 rounded-lg border flex items-center justify-between cursor-pointer transition-all
                          ${
                            budget === range.value 
                              ? "border-byways-primary bg-byways-primary/10 text-byways-primary" 
                              : "border-byways-accent/20 hover:border-byways-accent/40"
                          }`}
                      >
                        <RadioGroupItem 
                          id={`budget-${range.value}`}
                          value={range.value}
                        />
                        <span className="ml-2">{range.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 3: Itinerary */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Your Day Plan</h2>
                    <p className="text-byways-accent">
                      A perfect {occasion} with a budget of {budget.replace("-", " to ₹")} rupees
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white"
                  >
                    Plan Another Day
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <Card key={index} className="border-none shadow-lg overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="h-40 md:h-auto md:w-1/3 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <CardContent className="p-5 md:w-2/3">
                          <div className="flex items-center mb-2">
                            <div className="bg-byways-primary text-white text-sm font-semibold px-2 py-1 rounded-full mr-3">
                              {item.time}
                            </div>
                            <h3 className="font-semibold text-byways-dark text-lg">
                              {item.activity}
                            </h3>
                          </div>
                          <p className="text-byways-accent text-sm">
                            {item.description}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" className="text-byways-primary border-byways-primary">
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="mt-8 bg-muted/50 p-5 rounded-lg">
                    <h4 className="text-byways-dark font-semibold mb-2">Need More Suggestions?</h4>
                    <p className="text-byways-accent text-sm mb-4">
                      This is just a sample itinerary. For more personalized recommendations, log in or sign up to access our full features.
                    </p>
                    <Link to="/register">
                      <Button className="bg-byways-primary hover:bg-byways-dark">
                        Sign Up for Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-8">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentStep === 1}
                  className="border-byways-accent/20"
                >
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-byways-primary hover:bg-byways-dark">
                  {currentStep < 2 ? "Next" : "Create Plan"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <footer className="bg-byways-dark text-white py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="text-white/80">© 2025 ByWays. Your personalized local guide for Bengaluru</p>
        </div>
      </footer>
    </div>
  );
};

export default PlanDay;
