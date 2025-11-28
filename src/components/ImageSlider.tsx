import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Slide {
  id: number;
  image: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    // Ensure these paths match your actual files in public/images/
    // If you haven't added them yet, these will fallback to the placeholder
    image: "/images/cubbon-park.jpg", 
    title: "Explore Bengaluru's Hidden Parks",
    description: "Discover serene green spaces in the heart of the city"
  },
  {
    id: 2,
    image: "/images/church-street.jpg",
    title: "Night Markets & Food Festivals",
    description: "Experience the best local flavors and street food"
  },
  {
    id: 3,
    image: "/images/ramanagara.jpg",
    title: "Weekend Adventure Getaways",
    description: "Short trips around Bengaluru for the perfect weekend"
  }
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);
  
  return (
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-3xl shadow-xl group">
      {/* Slides */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-out bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${slides[currentIndex].image})`,
        }}
      >
        {/* Image loader fallback: If the background image fails, this invisible img tag triggers error handling */}
        <img 
            src={slides[currentIndex].image}
            alt="slide"
            className="hidden"
            onError={(e) => {
                const parent = (e.target as HTMLElement).parentElement;
                if (parent) {
                    // Fallback to a nice placeholder if local image is missing
                    parent.style.backgroundImage = `url(https://placehold.co/1200x500/0D9488/FFFFFF?text=${encodeURIComponent(slides[currentIndex].title)})`;
                }
            }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-left">
          <h2 className="text-white text-2xl md:text-4xl font-brand font-bold mb-2 drop-shadow-md">{slides[currentIndex].title}</h2>
          <p className="text-white/90 text-sm md:text-lg mb-6 max-w-xl drop-shadow-sm">{slides[currentIndex].description}</p>
          <Button className="w-max bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-6 shadow-lg border-none">
            Explore Now
          </Button>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            onClick={goToPrevious}
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm h-10 w-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button 
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm h-10 w-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
      </div>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;