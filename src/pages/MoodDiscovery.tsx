
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

// Mood options
const moods = [
  { value: "cozy", label: "Cozy" },
  { value: "adventurous", label: "Adventurous" },
  { value: "chitchat", label: "Chit Chat" },
  { value: "hungry", label: "Hungry" },
  { value: "minigames", label: "Mini Games" },
  { value: "peaceful", label: "Peaceful" },
  { value: "fun", label: "Fun" },
  { value: "nature", label: "Nature" },
  { value: "historical", label: "Historical" },
  { value: "meditation", label: "Meditation" },
  { value: "instagramable", label: "Instagramable" }
];

// Group size options
const groupSizes = ["1", "2", "3", "4", "5", "6", "7+"];

// Budget ranges
const budgetRanges = [
  { value: "150-300", label: "₹150 - ₹300" },
  { value: "300-600", label: "₹300 - ₹600" },
  { value: "1000-1200", label: "₹1000 - ₹1200" },
  { value: "1500-2000", label: "₹1500 - ₹2000" },
  { value: "3000+", label: "₹3000+" }
];

// Sample recommendations based on user selections
const getRecommendations = (
  selectedMoods: string[], 
  groupSize: string, 
  budget: string
) => {
  // This is sample data that would normally come from a database
  const hasCozy = selectedMoods.includes("cozy");
  const hasNature = selectedMoods.includes("nature");
  const hasPeaceful = selectedMoods.includes("peaceful");
  const hasHungry = selectedMoods.includes("hungry");
  const hasMiniGames = selectedMoods.includes("minigames");
  const hasMeditation = selectedMoods.includes("meditation");
  const hasChitchat = selectedMoods.includes("chitchat");

  if (hasCozy && hasNature && hasPeaceful && budget === "150-300" && (groupSize === "3" || groupSize === "2")) {
    return [
      {
        name: "Lal Bagh",
        price: "₹30",
        image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
        tags: ["Nature", "Peaceful", "Walking"]
      },
      {
        name: "Cubbon Park",
        price: "Free",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        tags: ["Nature", "Peaceful", "Jogging"]
      }
    ];
  }
  
  if (hasHungry && hasMiniGames && budget === "1000-1200" && (groupSize === "4" || groupSize === "3")) {
    return [
      {
        name: "Go Karting",
        price: "₹330",
        image: "https://source.unsplash.com/random/400x300/?go,karting",
        tags: ["Games", "Fun", "Adventure"]
      },
      {
        name: "Bowling",
        price: "₹400",
        image: "https://source.unsplash.com/random/400x300/?bowling",
        tags: ["Games", "Indoor", "Group"]
      },
      {
        name: "Lulu Mall",
        price: "₹1000",
        image: "https://source.unsplash.com/random/400x300/?mall,shopping",
        tags: ["Shopping", "Food", "Entertainment"]
      }
    ];
  }
  
  if (hasPeaceful && hasMeditation && budget === "150-300" && (groupSize === "2" || groupSize === "1")) {
    return [
      {
        name: "Art of Living",
        price: "Free",
        image: "https://source.unsplash.com/random/400x300/?meditation,yoga",
        tags: ["Meditation", "Peace", "Spiritual"]
      },
      {
        name: "Pyramid Valley",
        price: "Free",
        image: "https://source.unsplash.com/random/400x300/?pyramid,meditation",
        tags: ["Meditation", "Spiritual", "Nature"]
      }
    ];
  }
  
  if (hasHungry && hasChitchat && budget === "300-600" && (groupSize === "3" || groupSize === "2")) {
    return [
      {
        name: "Zero Degree",
        price: "₹600",
        image: "https://source.unsplash.com/random/400x300/?cafe,coffee",
        tags: ["Food", "Cafe", "Hangout"]
      },
      {
        name: "Skyline Pizzeria",
        price: "₹400",
        image: "https://source.unsplash.com/random/400x300/?pizza,restaurant",
        tags: ["Food", "Pizza", "Casual"]
      }
    ];
  }
  
  // Default recommendations
  return [
    {
      name: "Church Street",
      price: "Varies",
      image: "https://source.unsplash.com/random/400x300/?street,shopping",
      tags: ["Shopping", "Food", "Hangout"]
    },
    {
      name: "UB City",
      price: "₹1000+",
      image: "https://source.unsplash.com/random/400x300/?luxury,mall",
      tags: ["Luxury", "Shopping", "Food"]
    },
    {
      name: "Wonderla",
      price: "₹1200",
      image: "https://source.unsplash.com/random/400x300/?amusement,park",
      tags: ["Adventure", "Fun", "Group"]
    }
  ];
};

const MoodDiscovery = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState("2");
  const [budget, setBudget] = useState("300-600");
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const { toast } = useToast();
  
  const handleMoodToggle = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      if (selectedMoods.length < 3) {
        setSelectedMoods([...selectedMoods, mood]);
      } else {
        toast({
          title: "Maximum 3 moods",
          description: "Please select up to 3 moods only",
          variant: "destructive",
        });
      }
    }
  };
  
  const handleNext = () => {
    if (currentStep === 1 && selectedMoods.length === 0) {
      toast({
        title: "Select at least one mood",
        description: "Please select at least one mood to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Generate recommendations
      const results = getRecommendations(selectedMoods, groupSize, budget);
      setRecommendations(results);
      setCurrentStep(4);
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedMoods([]);
    setGroupSize("2");
    setBudget("300-600");
    setRecommendations([]);
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
              <h1 className="text-2xl md:text-3xl font-bold text-byways-dark">Where My Mood Goes?</h1>
              <p className="text-byways-accent mt-1">
                Let us find the perfect places based on your mood, group size, and budget
              </p>
            </div>
            
            {/* Progress indicator */}
            <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-byways-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
              ></div>
            </div>
            
            {/* Step 1: Select mood */}
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What's your mood?</h2>
                <p className="text-byways-accent mb-6">Select up to 3 moods that match how you're feeling</p>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => handleMoodToggle(mood.value)}
                      className={`p-4 rounded-lg border flex flex-col items-center justify-center transition-all text-center
                        ${
                          selectedMoods.includes(mood.value) 
                            ? "border-byways-primary bg-byways-primary/10 text-byways-primary" 
                            : "border-byways-accent/20 hover:border-byways-accent/40"
                        }`}
                    >
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Step 2: Group size */}
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">How many of us?</h2>
                <p className="text-byways-accent mb-6">Select the number of people in your group</p>
                
                <RadioGroup value={groupSize} onValueChange={setGroupSize} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {groupSizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <Label
                        htmlFor={`size-${size}`}
                        className={`w-full p-4 rounded-lg border text-center cursor-pointer transition-all
                          ${
                            groupSize === size 
                              ? "border-byways-primary bg-byways-primary/10 text-byways-primary" 
                              : "border-byways-accent/20 hover:border-byways-accent/40"
                          }`}
                      >
                        <RadioGroupItem 
                          id={`size-${size}`}
                          value={size}
                          className="sr-only"
                        />
                        {size}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
            
            {/* Step 3: Budget */}
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-semibold mb-4">What's your budget?</h2>
                <p className="text-byways-accent mb-6">Select a budget range for your outing</p>
                
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
            
            {/* Step 4: Recommendations */}
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-1">Your Recommendations</h2>
                    <p className="text-byways-accent">
                      Based on your mood: {selectedMoods.map(m => moods.find(mood => mood.value === m)?.label).join(", ")}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                    className="border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white"
                  >
                    Start Over
                  </Button>
                </div>
                
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommendations.map((place, index) => (
                      <Card key={index} className="byways-card overflow-hidden border-none shadow-lg">
                        <div 
                          className="h-48 bg-cover bg-center" 
                          style={{ backgroundImage: `url(${place.image})` }}
                        ></div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-byways-dark text-lg">{place.name}</h3>
                          <div className="flex items-center text-byways-accent mt-1">
                            <span className="text-sm">{place.price}</span>
                            <Separator orientation="vertical" className="h-4 mx-2" />
                            <div className="flex flex-wrap gap-1">
                              {place.tags.map((tag: string, i: number) => (
                                <span key={i} className="text-xs bg-byways-light px-2 py-0.5 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between">
                          <Button variant="outline" size="sm" className="text-byways-primary border-byways-primary">
                            View Details
                          </Button>
                          <Button size="sm" className="bg-byways-primary hover:bg-byways-dark">
                            <MapPin size={16} className="mr-1" /> Directions
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <p className="text-byways-accent">No recommendations found. Please try different preferences.</p>
                  </div>
                )}
              </div>
            )}
            
            {/* Navigation buttons */}
            {currentStep < 4 && (
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
                  {currentStep < 3 ? "Next" : "Find Places"}
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

export default MoodDiscovery;
