import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

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
  { value: "instagramable", label: "Instagramable" },
  { value: "romantic", label: "Romantic" },
  { value: "lively", label: "Lively" },
  { value: "pet-friendly", label: "Pet-Friendly" },
  { value: "classy", label: "Classy" },
  { value: "books", label: "Bookworm" },
];

const groupSizes = ["1", "2", "3", "4", "5", "6", "7+"];

const budgetRanges = [
  { value: "0-300", label: "₹0 - ₹300 (Low)" },
  { value: "300-600", label: "₹300 - ₹600 (Mid)" },
  { value: "600-1000", label: "₹600 - ₹1000 (High)" },
  { value: "1000-2000", label: "₹1000 - ₹2000 (V. High)" },
  { value: "2000+", label: "₹2000+ (Splurge)" }
];

interface Place {
  id: number;
  name: string;
  price: string;
  tags: string[];
  image: string;
  groupSize: string[];
}

const MoodDiscovery = () => {
  const navigate = useNavigate(); // Added hook
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState("2");
  const [budget, setBudget] = useState("300-600");
  const [places, setPlaces] = useState<Place[]>([]); 
  const [recommendations, setRecommendations] = useState<Place[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetch('/api/places')
      .then(res => { if (!res.ok) throw new Error("Database Error"); return res.json(); })
      .then(data => { setPlaces(data); })
      .catch(err => { console.error("Database Error", err); toast({ title: "Database Error", description: "Check Server.", variant: "destructive" }); });
  }, []);

  const handleMoodToggle = (mood: string) => {
    if (selectedMoods.includes(mood)) { setSelectedMoods(selectedMoods.filter(m => m !== mood)); } 
    else { if (selectedMoods.length < 3) setSelectedMoods([...selectedMoods, mood]); else toast({ title: "Maximum 3 moods", variant: "destructive" }); }
  };

  const filterRecommendations = () => {
    let [minBudgetStr, maxBudgetStr] = budget.split('-');
    
    // Handle the "2000+" case
    if (budget === "2000+") { 
      minBudgetStr = "2000"; 
      maxBudgetStr = "100000"; 
    }
    
    // We only care about the UPPER LIMIT of the user's selection
    const userMax = parseInt(maxBudgetStr);

    return places.filter(place => {
      let pMin = 0, pMax = 0;
      
      // Parse the place price
      if (place.price === "2000+") { 
        pMin = 2000; 
        pMax = 100000; 
      } else { 
        const parts = place.price.split('-'); 
        pMin = parseInt(parts[0]); 
        pMax = parseInt(parts[1] || parts[0]); 
      }
      
      // LOGIC FIX:
      // Treat the selection as a "Max Budget".
      // If user picks "300-600", userMax is 600.
      // "0-300" (max 300) -> Shown (300 <= 600)
      // "300-600" (max 600) -> Shown (600 <= 600)
      // "600-1000" (max 1000) -> Hidden (1000 > 600)
      const budgetMatch = pMax <= userMax;

      const moodMatch = selectedMoods.some(m => place.tags.map(t => t.toLowerCase()).includes(m.toLowerCase()));
      const groupMatch = place.groupSize.includes(groupSize) || (groupSize === '7+' && place.groupSize.some(s => ['7+', '5', '6'].includes(s)));
      
      return moodMatch && groupMatch && budgetMatch;
    });
  };
  
  // --- NEW: SAVE TO HISTORY FUNCTION ---
  const saveToHistory = () => {
    const title = selectedMoods.length > 0 
      ? `${selectedMoods.map(m => moods.find(x => x.value === m)?.label).join(" & ")} Hunt` 
      : "Vibe Check";
      
    const budgetLabel = budgetRanges.find(b => b.value === budget)?.label || budget;

    const newHistoryItem = {
        id: Date.now(),
        title: title,
        details: `Budget: ${budgetLabel} • Group: ${groupSize}`,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        type: 'mood'
    };

    const existingHistory = JSON.parse(localStorage.getItem("userHistory") || "[]");
    localStorage.setItem("userHistory", JSON.stringify([newHistoryItem, ...existingHistory]));
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedMoods.length === 0) {
      toast({ title: "Select mood", description: "Pick at least one.", variant: "destructive" });
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      const results = filterRecommendations();
      setRecommendations(results);
      
      // CALL SAVE HISTORY HERE
      saveToHistory();
      
      setCurrentStep(4);
    }
  };
  
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleReset = () => { setCurrentStep(1); setSelectedMoods([]); setGroupSize("2"); setBudget("300-600"); setRecommendations([]); };
  
  return (
    <div className="min-h-screen flex flex-col bg-brand-cream">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center md:text-left">
              <Link to="/home" className="text-byways-primary hover:underline flex items-center mb-2 justify-center md:justify-start"><ArrowRight className="mr-1 rotate-180" size={16} /> Back to Home</Link>
              <h1 className="text-4xl md:text-5xl font-brand text-byways-dark">Where's the Vibe?</h1>
              <p className="text-byways-accent mt-1 text-lg">Find the perfect spot based on your mood, group, and budget!</p>
            </div>
            
            <div className="w-full bg-muted h-2 rounded-full mb-8 overflow-hidden"><div className="h-full bg-byways-primary transition-all duration-500 ease-out rounded-full" style={{ width: `${(currentStep / 4) * 100}%` }}></div></div>
            
            {currentStep === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's your mood?</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <button key={mood.value} onClick={() => handleMoodToggle(mood.value)} className={`p-4 rounded-2xl flex flex-col items-center justify-center transition-all text-center border-2 cursor-pointer ${selectedMoods.includes(mood.value) ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105" : "bg-white text-stone-700 border-stone-200 hover:border-primary/50 hover:bg-primary/5"}`}>
                      <span className="font-semibold text-base">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">How many of you?</h2>
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-7 gap-3">
                  {groupSizes.map((size) => (
                    <button key={size} onClick={() => setGroupSize(size)} className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all text-lg font-medium ${groupSize === size ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-105" : "bg-white text-stone-700 border-stone-200 hover:border-primary/50 hover:bg-primary/5"}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-brand text-stone-700 mb-4 text-center">What's your budget?</h2>
                <div className="space-y-3">
                  {budgetRanges.map((range) => (
                    <button key={range.value} onClick={() => setBudget(range.value)} className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${budget === range.value ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-[1.01]" : "bg-white text-stone-700 border-stone-200 hover:border-primary/50 hover:bg-primary/5"}`}>
                      <span className="ml-2 text-base font-semibold">{range.label}</span>
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${budget === range.value ? "border-white" : "border-stone-400"}`}>{budget === range.value && <div className="h-2.5 w-2.5 rounded-full bg-white" />}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {currentStep === 4 && (
              <div className="animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                  <div><h2 className="text-3xl font-brand text-stone-700 mb-1 text-center sm:text-left">Your Hangouts</h2><p className="text-stone-500 text-center sm:text-left">Based on your mood: {selectedMoods.map(m => moods.find(mood => mood.value === m)?.label).join(", ")}</p></div>
                  <Button variant="outline" onClick={handleReset} className="border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white rounded-lg">Start Over</Button>
                </div>
                {recommendations.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {recommendations.map((place, index) => (
                      <Card key={index} className="byways-card overflow-hidden shadow-lg transform transition-transform hover:scale-[1.02]">
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${place.image})` }} onError={(e) => { (e.currentTarget as HTMLDivElement).style.backgroundImage = `url(https://placehold.co/600x400/f9d8b7/8f5b33?text=${place.name.replace(/ /g, '+')})` }}></div>
                        <CardContent className="p-4">
                          <h3 className="font-brand text-2xl text-stone-700">{place.name}</h3>
                          <div className="flex items-center text-byways-accent mt-1"><span className="text-sm font-medium">₹{place.price}</span><Separator orientation="vertical" className="h-4 mx-2" /><div className="flex flex-wrap gap-1">{place.tags.map((tag, i) => (<span key={i} className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full font-medium">{tag}</span>))}</div></div>
                        </CardContent>
                        <CardFooter className="p-4 pt-0 flex justify-between gap-2">
                          <Link to={`/place/${place.id}`} className="w-full"><Button variant="outline" size="sm" className="w-full text-primary border-primary hover:bg-primary hover:text-white rounded-lg">View Details</Button></Link>
                          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + " Bangalore")}`} target="_blank" rel="noopener noreferrer" className="w-full"><Button size="sm" className="w-full bg-primary hover:bg-primary/90 rounded-lg"><MapPin size={16} className="mr-1" /> Maps</Button></a>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-8 border-2 border-dashed border-stone-300 rounded-2xl bg-white/50"><p className="text-stone-500 font-brand text-2xl">No exact matches found!</p><p className="text-stone-500">Try removing a mood or changing your budget.</p></div>
                )}
              </div>
            )}
            
            {currentStep < 4 && (
              <div className="flex justify-between mt-10">
                <Button onClick={handleBack} variant="outline" disabled={currentStep === 1} className="border-stone-300 bg-white rounded-lg px-6 py-5 text-base font-semibold">Back</Button>
                <Button onClick={handleNext} className="btn-brand !w-auto px-8">{currentStep < 3 ? "Next" : "Find Places!"}</Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-byways-dark text-white py-4 mt-auto"><div className="container mx-auto px-4 text-center text-sm"><p>© 2025 ByWays. Your personalized local guide for Bengaluru</p></div></footer>
    </div>
  );
};

export default MoodDiscovery;