import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

const tripTypes = [
  { value: "romantic", label: "Romantic Date" },
  { value: "birthday", label: "Birthday Bash" },
  { value: "group", label: "Group Fun" },
  { value: "adventurous", label: "Adventurous" },
  { value: "relaxing", label: "Relaxing Escape" },
  { value: "foodie", label: "Foodie Tour" },
  { value: "cultural", label: "Cultural/Historical" },
  { value: "books", label: "Bookworm Trail" },
];

const budgetRanges = [
  { value: "0-500", label: "₹0 - ₹500 (Thrifty)" },
  { value: "500-1500", label: "₹500 - ₹1500 (Standard)" },
  { value: "1500-3000", label: "₹1500 - ₹3000 (Premium)" },
  { value: "3000+", label: "₹3000+ (Splurge)" }
];

interface PlanItem {
  time: string;
  activity: string;
  description: string;
  image: string;
}

interface Itinerary {
  type: string;
  budget: string;
  plan: PlanItem[];
}

const PlanDay = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripType, setTripType] = useState("romantic");
  const [budget, setBudget] = useState("500-1500");
  const [itinerary, setItinerary] = useState<PlanItem[]>([]);
  const [allItineraries, setAllItineraries] = useState<Itinerary[]>([]);
  const { toast } = useToast();

  // --- NEW: Fetch Itineraries from Database ---
  useEffect(() => {
    fetch('/api/itineraries')
      .then(res => res.json())
      .then(data => {
        console.log("Fetched itineraries:", data);
        setAllItineraries(data);
      })
      .catch(err => {
        console.error("Error fetching itineraries:", err);
        toast({
             title: "Error",
             description: "Could not load itineraries from database",
             variant: "destructive"
        });
      });
  }, []);
  
  // Logic to find the best matching plan from the DB data
  const getItinerary = (selectedType: string, selectedBudget: string) => {
    // 1. Try exact match
    let found = allItineraries.find(item => item.type === selectedType && item.budget === selectedBudget);

    // 2. If no exact match, try matching just the type (fallback to any budget)
    if (!found) {
      found = allItineraries.find(item => item.type === selectedType);
    }
    
    // 3. Fallback to a default if nothing matches
    if (!found) {
       // Return a dummy default plan so the app doesn't crash
       return [
         { time: "10:00 AM", activity: "Start at Cubbon Park", description: "Begin your day with a relaxing walk.", image: "/images/cubbon-park.jpg" },
         { time: "1:00 PM", activity: "Lunch at MTR", description: "Enjoy authentic local cuisine.", image: "/images/truffles.jpg" },
         { time: "4:00 PM", activity: "Visit Bangalore Palace", description: "Explore local culture and history.", image: "/images/bangalore-palace.jpg" }
       ];
    }
    
    return found.plan;
  };
  
  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate itinerary from DB data
      const plan = getItinerary(tripType, budget);
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
    setTripType("romantic");
    setBudget("500-1500");
    setItinerary([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left">
              <Link to="/home" className="text-byways-primary hover:underline flex items-center mb-2 justify-center md:justify-start">
                <ArrowRight className="mr-1 rotate-180" size={16} /> Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-brand text-byways-dark">Plan Your Perfect Day</h1>
              <p className="text-byways-accent mt-1 text-lg">
                Let us create a perfect itinerary for your special day
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-byways-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
            
            {/* Step 1: Select occasion/trip type */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's the plan?</h2>
                <p className="text-stone-500 mb-6 text-center">Select the type of day you're planning</p>
                
                <RadioGroup value={tripType} onValueChange={setTripType} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tripTypes.map((item) => (
                    <div key={item.value} className="flex items-center">
                      <Label
                        htmlFor={`trip-${item.value}`}
                        className={`w-full p-4 rounded-2xl border text-left cursor-pointer transition-all filter-chip ${
                            tripType === item.value
                              ? "chip-selected"
                              : "border-stone-300 hover:border-byways-accent"
                          }`}
                      >
                        <RadioGroupItem 
                          id={`trip-${item.value}`}
                          value={item.value}
                          className="sr-only"
                        />
                        <span className="font-semibold">{item.label}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's your budget?</h2>
                <p className="text-stone-500 mb-6 text-center">Select a budget range for your day</p>
                
                <RadioGroup value={budget} onValueChange={setBudget} className="space-y-3">
                  {budgetRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <Label
                        htmlFor={`budget-${range.value}`}
                        className={`w-full p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all filter-chip ${
                            budget === range.value 
                              ? "chip-selected"
                              : "border-stone-300 hover:border-byways-accent"
                          }`}
                      >
                        <span className="ml-2 text-base font-semibold">{range.label}</span>
                        <RadioGroupItem 
                          id={`budget-${range.value}`}
                          value={range.value}
                          className="h-5 w-5"
                        />
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 3: Itinerary */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <div>
                    <h2 className="text-3xl font-brand text-stone-700 mb-1 text-center sm:text-left">Your Day Plan</h2>
                    <p className="text-stone-500 text-center sm:text-left">
                      A perfect {tripTypes.find(t => t.value === tripType)?.label} with a budget of {budgetRanges.find(b => b.value === budget)?.label}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white rounded-lg"
                  >
                    Plan Another Day
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {itinerary.map((item, index) => (
                    <Card key={index} className="border-2 border-stone-200 shadow-lg overflow-hidden bg-white">
                      <div className="flex flex-col md:flex-row">
                        <div 
                          className="h-40 md:h-auto md:w-1/3 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${item.image})` }}
                          onError={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundImage = `url(https://placehold.co/600x400/f9d8b7/8f5b33?text=${item.activity.replace(/ /g, '+')})` }}
                        ></div>
                        <CardContent className="p-5 md:w-2/3">
                          <div className="flex items-center mb-2">
                            <div className="bg-byways-primary text-white text-sm font-brand px-3 py-1 rounded-full mr-3 text-base">
                              {item.time}
                            </div>
                            <h3 className="font-brand text-byways-dark text-2xl">
                              {item.activity}
                            </h3>
                          </div>
                          <p className="text-stone-600 text-sm">
                            {item.description}
                          </p>
                          <div className="mt-4 flex justify-end">
                            <a href={`https://www.google.com/search?q=${encodeURIComponent(item.activity + " Bangalore")}`} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="sm" className="text-byways-primary border-byways-primary rounded-lg">View Details</Button>
                            </a>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                  
                  <div className="mt-8 bg-white/70 p-5 rounded-2xl border-2 border-stone-200">
                    <h4 className="text-byways-dark font-brand text-2xl mb-2">Need More Suggestions?</h4>
                    <p className="text-stone-600 text-sm mb-4">
                      This is just a sample itinerary. For more personalized recommendations, log in or sign up to access our full features.
                    </p>
                    <Link to="/register">
                      <Button className="bg-byways-primary hover:bg-byways-dark rounded-lg">
                        Sign Up for Free
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentStep < 3 && (
              <div className="flex justify-between mt-10">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  disabled={currentStep === 1}
                  className="border-stone-300 bg-white rounded-lg px-6 py-5 text-base font-semibold"
                >
                  Back
                </Button>
                <Button onClick={handleNext} className="btn-brand !w-auto px-8">
                  {currentStep < 2 ? "Next" : "Create Plan!"}
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