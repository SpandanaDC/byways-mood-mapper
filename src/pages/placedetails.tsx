import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Share2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface Place {
    id: number;
    name: string;
    location?: string;
    rating?: number;
    reviews?: number;
    description?: string;
    price: string;
    tags: string[];
    image: string;
    googleMapsUrl?: string;
}

// --- MOCK DATA FALLBACK (Subset of your places) ---
// This ensures that if the DB is down, clicking a place still works.
const mockPlaces: Place[] = [
  { id: 1, name: "Dyu Art Cafe", price: "300-600", tags: ["cozy"], image: "/images/dyu-art-cafe.avif", location: "Koramangala", rating: 4.5, reviews: 1200, description: "A beautiful art cafe in an old bungalow style setting." },
  { id: 2, name: "Lalbagh Botanical Garden", price: "0-300", tags: ["nature"], image: "/images/lalbagh.jpg", location: "Mavalli", rating: 4.6, reviews: 5000, description: "A botanical garden with an aquarium and glass house." },
  { id: 3, name: "Cubbon Park", price: "0-300", tags: ["nature"], image: "/images/cubbon-park.jpg", location: "Central Bengaluru", rating: 4.7, reviews: 8000, description: "A landmark 'lung' area of the Bengaluru city." },
  { id: 4, name: "Ramanagara Hills", price: "0-300", tags: ["adventurous"], image: "/images/ramanagara.jpg", location: "Ramanagara", rating: 4.4, reviews: 300, description: "Famous for trekking and rock climbing." },
  { id: 5, name: "Wonderla", price: "2000+", tags: ["adventurous"], image: "/images/Wonderla.jpg", location: "Mysore Road", rating: 4.6, reviews: 15000, description: "One of the largest amusement parks in India." },
  { id: 10, name: "Third Wave Coffee", price: "300-600", tags: ["cozy"], image: "/images/third-wave.jpg", location: "Indiranagar", rating: 4.5, reviews: 500, description: "Artisanal coffee roasters." },
  { id: 11, name: "Truffles", price: "300-600", tags: ["hungry"], image: "/images/truffles.avif", location: "St. Marks Road", rating: 4.6, reviews: 10000, description: "Famous for burgers and steaks." },
  { id: 12, name: "Church Street", price: "300-600", tags: ["lively"], image: "/images/church-street.jpg", location: "Central Bengaluru", rating: 4.4, reviews: 5000, description: "Bustling street with cafes, bookshops, and restaurants." },
  { id: 13, name: "Bangalore Palace", price: "300-600", tags: ["historical"], image: "/images/bangalore-palace.jpg", location: "Vasanth Nagar", rating: 4.4, reviews: 8000, description: "Tudor-style architecture inspired by Windsor Castle." },
  { id: 16, name: "High Ultra Lounge", price: "2000+", tags: ["romantic"], image: "/images/high-ultra.jpeg", location: "Malleshwaram", rating: 4.4, reviews: 1500, description: "Rooftop lounge with city views." },
  { id: 19, name: "Toit Brewpub", price: "1000-2000", tags: ["lively"], image: "/images/toit.jpeg", location: "Indiranagar", rating: 4.6, reviews: 12000, description: "Famous microbrewery." },
];

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPlace = async () => {
        if (!id) return;
        try {
            // Try fetching from API
            const response = await fetch(`/api/places`);
            if (response.ok) {
                const allPlaces = await response.json();
                const foundPlace = allPlaces.find((p: any) => p.id === parseInt(id));
                
                if (foundPlace) {
                    // Transform/Add default data if missing from DB
                    const enhancedData = {
                        ...foundPlace,
                        location: foundPlace.location || "Bengaluru, Karnataka",
                        rating: foundPlace.rating || 4.5,
                        reviews: foundPlace.reviews || 100,
                        description: foundPlace.description || `Experience the vibe at ${foundPlace.name}. A perfect spot for your mood.`,
                        googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foundPlace.name + " Bangalore")}`
                    };
                    setPlace(enhancedData);
                } else {
                   // If DB connects but place ID is missing, fallback to mock search
                   console.warn("Place ID not found in DB, checking mock data...");
                   throw new Error("Place not found in DB");
                }
            } else {
                throw new Error("API Error");
            }
        } catch (error) {
            console.warn("Error fetching place, using mock data:", error);
            // FALLBACK LOGIC
            const foundMock = mockPlaces.find((p) => p.id === parseInt(id));
            if (foundMock) {
                 const enhancedMock = {
                    ...foundMock,
                    location: foundMock.location || "Bengaluru, Karnataka",
                    rating: foundMock.rating || 4.5,
                    reviews: foundMock.reviews || 100,
                    description: foundMock.description || `Experience the vibe at ${foundMock.name}. A perfect spot for your mood.`,
                    googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foundMock.name + " Bangalore")}`
                };
                setPlace(enhancedMock);
                toast({
                    title: "Offline Mode",
                    description: "Showing offline details for this place.",
                    variant: "default"
                });
            } else {
                console.error("Place not found in mock data either");
            }
        } finally {
            setLoading(false);
        }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-brand text-xl">Loading...</div>;
  
  if (!place) return (
    <div className="min-h-screen flex flex-col items-center justify-center font-brand text-xl gap-4">
        <p>Place not found.</p>
        <Button onClick={() => navigate('/home')}>Go Home</Button>
    </div>
  );

  const handleDirections = () => {
    if (place.googleMapsUrl) {
        window.open(place.googleMapsUrl, '_blank');
    }
  };
  
  // If navigation history has entries, go back, otherwise go home
  const handleBack = () => {
      if (window.history.length > 2) {
          navigate(-1);
      } else {
          navigate('/home');
      }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <Button variant="ghost" onClick={handleBack} className="mb-4 hover:bg-white rounded-full px-4 font-semibold">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>

        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
            <div className="relative h-[400px]">
                 <img 
                  src={place.image} 
                  alt={place.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/800x400?text=${place.name}` }}
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h1 className="text-4xl md:text-5xl font-brand font-bold mb-2">{place.name}</h1>
                    <div className="flex items-center text-white/90">
                        <MapPin className="w-4 h-4 mr-1" /> {place.location}
                    </div>
                 </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                         <div className="flex items-center bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                             <Star className="w-5 h-5 text-green-600 fill-current mr-1" />
                             <span className="font-bold text-lg text-green-700">{place.rating}</span>
                         </div>
                         <span className="text-muted-foreground text-sm">({place.reviews} reviews)</span>
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Share2 className="w-4 h-4" />
                        </Button>
                        <Button onClick={handleDirections} className="flex-1 md:flex-none rounded-full bg-primary hover:bg-primary/90 px-8 font-semibold">
                            <MapPin className="w-4 h-4 mr-2" /> Get Directions
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xl font-bold font-brand mb-3 text-foreground">About this place</h3>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                {place.description}
                            </p>
                        </div>
                        
                        <div>
                            <h3 className="text-lg font-bold font-brand mb-3 text-foreground">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {place.tags.map(tag => (
                                    <span key={tag} className="px-4 py-1.5 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit">
                        <h3 className="text-lg font-bold font-brand mb-4 text-foreground">Details</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Price Range</span>
                                <span className="font-semibold text-foreground">{place.price}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500">Open Now</span>
                                <span className="font-semibold text-green-600">Yes</span>
                            </div>
                             <div className="pt-4 border-t border-slate-200">
                                <span className="text-xs text-slate-400 block text-center">Prices are approximate and subject to change.</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceDetails;