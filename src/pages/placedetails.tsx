import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Share2, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

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

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlace = async () => {
        if (!id) return;
        try {
            // UPDATED: Using relative path '/api/places'
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
                    console.error("Place not found");
                }
            }
        } catch (error) {
            console.error("Error fetching place:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-brand text-xl">Loading...</div>;
  if (!place) return <div className="min-h-screen flex items-center justify-center font-brand text-xl">Place not found.</div>;

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