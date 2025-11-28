import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageSlider from "@/components/ImageSlider";

const Home = () => {
  // Real data for the Trending section - ensure IDs match your backend/seed data
  const trendingPlaces = [
    { 
      id: 3, 
      name: "Cubbon Park", 
      image: "/images/cubbon-park.jpg", // Example path - we will set this up later
      description: "Outdoor • Nature", 
      price: "₹0 - ₹300",
      tag: "Relaxing"
    },
    { 
      id: 2, 
      name: "Lalbagh Garden", 
      image: "/images/lalbagh.jpg", 
      description: "Nature • Flowers", 
      price: "₹0 - ₹300",
      tag: "Peaceful"
    },
    { 
      id: 12, 
      name: "Church Street", 
      image: "/images/church-street.jpg", 
      description: "Lively • Shopping", 
      price: "₹300 - ₹600",
      tag: "Fun"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50"> 
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-6 space-y-8">
        <section className="mb-8 rounded-3xl overflow-hidden shadow-xl">
          <ImageSlider />
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/mood-discovery" className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-teal-800 opacity-90 z-0"></div>
            <img src="https://placehold.co/600x400/0D9488/FFFFFF?text=Mood" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-500 group-hover:scale-110" alt="" />
            <div className="relative z-10 p-8 flex flex-col h-64 justify-between text-white">
              <div>
                <h3 className="text-3xl font-brand font-bold mb-2">Where My Mood Goes?</h3>
                <p className="text-white/90 text-lg">Discover places based on your current mood, budget, and vibe.</p>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Explore</span>
                <div className="bg-white text-primary p-3 rounded-full transition-transform group-hover:translate-x-2">
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          </Link>
          
          <Link to="/plan-day" className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-accent to-orange-700 opacity-90 z-0"></div>
             <img src="https://placehold.co/600x400/F97316/FFFFFF?text=Plan" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-500 group-hover:scale-110" alt="" />
            <div className="relative z-10 p-8 flex flex-col h-64 justify-between text-white">
              <div>
                <h3 className="text-3xl font-brand font-bold mb-2">Plan A Day</h3>
                <p className="text-white/90 text-lg">Curated itineraries for special occasions and full-day trips.</p>
              </div>
               <div className="flex justify-between items-center">
                <span className="text-sm font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Plan Now</span>
                <div className="bg-white text-accent p-3 rounded-full transition-transform group-hover:translate-x-2">
                  <ArrowRight size={24} />
                </div>
              </div>
            </div>
          </Link>
        </section>
        
        <section className="mt-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-foreground font-brand">Trending in Bengaluru</h2>
            <Link to="/trending" className="text-primary font-semibold flex items-center hover:underline">
              See all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPlaces.map((place) => (
              <div key={place.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border border-slate-100">
                <Link to={`/place/${place.id}`}>
                  <div className="h-48 overflow-hidden relative">
                     <img 
                      src={place.image} 
                      alt={place.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { (e.currentTarget as HTMLDivElement).src = `https://placehold.co/600x400?text=${place.name}` }} 
                    />
                     <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-foreground shadow-sm flex items-center">
                      4.5 <span className="text-yellow-500 ml-0.5">★</span>
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <h3 className="font-bold text-lg text-foreground mb-1">
                    <Link to={`/place/${place.id}`} className="hover:text-primary transition-colors">{place.name}</Link>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{place.description} • {place.price}</p>
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-medium bg-secondary text-secondary-foreground px-2 py-1 rounded-md">{place.tag}</span>
                      <a 
                        href={`https://www.google.com/search?q=${encodeURIComponent(place.name + " Bangalore")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm font-semibold group-hover:translate-x-1 transition-transform flex items-center"
                      >
                        View on Google <ArrowRight size={12} className="ml-1" />
                      </a>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
       <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 ByWays. Built with ❤️ for Namma Bengaluru.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;