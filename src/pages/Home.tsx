import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import ImageSlider from "@/components/ImageSlider";

const Home = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* Hero Slider */}
          <section className="mb-8">
            <ImageSlider />
          </section>
          
          {/* Main Tiles */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/mood-discovery" className="group">
              <div className="byways-tile bg-vibrant-gradient text-white h-60">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Where My Mood Goes?</h3>
                    <p className="text-white/90">
                      Discover places based on your current mood, budget, and group size
                    </p>
                  </div>
                  <div className="flex justify-end items-center mt-4">
                    <ArrowRight className="transform transition-transform group-hover:translate-x-2" size={24} />
                  </div>
                </div>
              </div>
            </Link>
            
            <Link to="/plan-day" className="group">
              <div className="byways-tile bg-light-gradient h-60">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-byways-dark mb-2">Plan A Day</h3>
                    <p className="text-byways-dark/80">
                      Get a complete itinerary for special occasions based on your preferences
                    </p>
                  </div>
                  <div className="flex justify-end items-center mt-4 text-byways-primary">
                    <ArrowRight className="transform transition-transform group-hover:translate-x-2" size={24} />
                  </div>
                </div>
              </div>
            </Link>
          </section>
          
          {/* Recent Discoveries */}
          <section className="mt-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-byways-dark">Popular in Bengaluru</h2>
              <Link to="/trending" className="text-byways-primary flex items-center hover:underline">
                See all <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Cubbon Park", image: "https://images.pexels.com/photos/1039518/pexels-photo-1039518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { name: "Lalbagh Botanical Garden", image: "https://images.pexels.com/photos/10182293/pexels-photo-10182293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
                { name: "Church Street", image: "https://images.pexels.com/photos/1684151/pexels-photo-1684151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }
              ].map((place, index) => (
                <div key={index} className="byways-card">
                  <div 
                    className="h-48 bg-cover bg-center" 
                    style={{
                      backgroundImage: `url(${place.image})`
                    }}
                  ></div>
                  <div className="p-4">
                    <h3 className="font-semibold text-byways-dark">{place.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-byways-accent">₹0 - ₹200 • Outdoor</span>
                      <Link to={`/place/${index}`} className="text-byways-primary text-sm hover:underline">
                        View details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-byways-dark text-white py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white p-1.5 rounded-lg mr-2">
                <span className="text-byways-dark font-bold text-xl">B</span>
              </div>
              <span className="byways-title text-xl">ByWays</span>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-white/80">© 2025 ByWays. All rights reserved.</p>
              <p className="text-xs text-white/60 mt-1">Your personalized local guide for Bengaluru</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
