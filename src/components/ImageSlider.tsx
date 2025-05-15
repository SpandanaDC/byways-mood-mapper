
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
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    title: "Explore Bengaluru's Hidden Parks",
    description: "Discover serene green spaces in the heart of the city"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1500673922987-e212871fec22",
    title: "Night Markets & Food Festivals",
    description: "Experience the best local flavors and street food"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
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
    <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden rounded-xl">
      {/* Slides */}
      <div 
        className="w-full h-full transition-transform duration-500 ease-out"
        style={{ 
          backgroundImage: `url(${slides[currentIndex].image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-byways-dark/70 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
          <h2 className="text-white text-xl md:text-2xl font-bold mb-2">{slides[currentIndex].title}</h2>
          <p className="text-white/90 text-sm md:text-base mb-4">{slides[currentIndex].description}</p>
          <Button className="w-max bg-white text-byways-dark hover:bg-white/90">Explore Now</Button>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <Button 
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full p-2 h-10 w-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white"
        variant="ghost"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-2 h-10 w-10 bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white"
        variant="ghost"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      
      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
