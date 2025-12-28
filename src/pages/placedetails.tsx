import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Share2, Star, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useToast } from "@/hooks/use-toast";

interface Place { id: number; name: string; location?: string; rating?: number; reviews?: number; description?: string; price: string; tags: string[]; image: string; googleMapsUrl?: string; }
const mockPlaces: Place[] = [{ id: 1, name: "Dyu Art Cafe", price: "300-600", tags: ["cozy"], image: "/images/dyu-art-cafe.avif", location: "Koramangala", rating: 4.5, reviews: 1200, description: "A beautiful art cafe." }, { id: 2, name: "Lalbagh", price: "0-300", tags: ["nature"], image: "/images/lalbagh.jpg", location: "Mavalli", rating: 4.6, reviews: 5000, description: "Historic garden." }];

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPlace = async () => {
        if (!id) return;
        try {
            const response = await fetch(`/api/places`);
            if (response.ok) {
                const allPlaces = await response.json();
                const foundPlace = allPlaces.find((p: any) => p.id === parseInt(id));
                if (foundPlace) {
                    setPlace({ ...foundPlace, location: foundPlace.location || "Bengaluru", rating: foundPlace.rating || 4.5, reviews: foundPlace.reviews || 100, description: foundPlace.description || `Experience ${foundPlace.name}.`, googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foundPlace.name + " Bangalore")}` });
                } else throw new Error("Place not found");
            } else throw new Error("API Error");
        } catch (error) {
            const foundMock = mockPlaces.find((p) => p.id === parseInt(id));
            if (foundMock) setPlace({ ...foundMock, googleMapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(foundMock.name)}` });
        } finally { setLoading(false); }
    };
    fetchPlace();
  }, [id]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("userFavorites") || "[]");
    const isFav = favs.some((p: any) => p.id === parseInt(id || "0"));
    setIsFavorite(isFav);
  }, [id]);

  const toggleFavorite = () => {
    if (!place) return;
    const favs = JSON.parse(localStorage.getItem("userFavorites") || "[]");
    if (isFavorite) {
        const newFavs = favs.filter((p: any) => p.id !== place.id);
        localStorage.setItem("userFavorites", JSON.stringify(newFavs));
        setIsFavorite(false);
        toast({ title: "Removed", description: "Removed from favorites." });
    } else {
        const newFav = { id: place.id, name: place.name, location: place.location, tags: place.tags[0], image: place.image };
        localStorage.setItem("userFavorites", JSON.stringify([...favs, newFav]));
        setIsFavorite(true);
        toast({ title: "Added to Favorites", description: `${place.name} is saved!` });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!place) return <div>Place not found</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 hover:bg-white rounded-full px-4 font-semibold"><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-slate-100">
            <div className="relative h-[400px]">
                 <img src={place.image} alt={place.name} className="w-full h-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://placehold.co/800x400?text=${place.name}` }} />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-8 text-white"><h1 className="text-4xl md:text-5xl font-brand font-bold mb-2">{place.name}</h1><div className="flex items-center text-white/90"><MapPin className="w-4 h-4 mr-1" /> {place.location}</div></div>
            </div>
            <div className="p-6 md:p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4"><div className="flex items-center bg-green-50 px-3 py-1.5 rounded-lg border border-green-100"><Star className="w-5 h-5 text-green-600 fill-current mr-1" /><span className="font-bold text-lg text-green-700">{place.rating}</span></div><span className="text-muted-foreground text-sm">({place.reviews} reviews)</span></div>
                    <div className="flex gap-3 w-full md:w-auto items-center">
                        <button onClick={toggleFavorite} className={`p-3 rounded-full flex items-center justify-center transition-all border-2 cursor-pointer ${isFavorite ? "bg-primary text-primary-foreground border-primary shadow-md transform scale-110" : "bg-white text-stone-500 border-stone-200 hover:border-primary/50 hover:bg-primary/5"}`}><Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} /></button>
                        <Button variant="outline" size="icon" className="rounded-full border-2 border-stone-200"><Share2 className="w-4 h-4 text-stone-500" /></Button>
                        <Button onClick={() => window.open(place.googleMapsUrl, '_blank')} className="flex-1 md:flex-none rounded-full bg-primary hover:bg-primary/90 px-8 font-semibold"><MapPin className="w-4 h-4 mr-2" /> Get Directions</Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                        <div><h3 className="text-xl font-bold font-brand mb-3 text-foreground">About this place</h3><p className="text-slate-600 leading-relaxed text-lg">{place.description}</p></div>
                        <div><h3 className="text-lg font-bold font-brand mb-3 text-foreground">Tags</h3><div className="flex flex-wrap gap-2">{place.tags.map(tag => (<span key={tag} className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">{tag}</span>))}</div></div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 h-fit"><h3 className="text-lg font-bold font-brand mb-4 text-foreground">Details</h3><div className="space-y-4"><div className="flex justify-between items-center"><span className="text-slate-500">Price Range</span><span className="font-semibold text-foreground">{place.price}</span></div><div className="flex justify-between items-center"><span className="text-slate-500">Open Now</span><span className="font-semibold text-green-600">Yes</span></div></div></div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceDetails;