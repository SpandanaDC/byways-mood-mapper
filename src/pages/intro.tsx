import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
  const [isZooming, setIsZooming] = useState(false);

  const handleInteraction = () => {
    setIsZooming(true);
    // Wait for the animation to finish before navigating
    setTimeout(() => {
      navigate("/login");
    }, 800); // 800ms matches the transition duration below
  };

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground flex flex-col items-center justify-center relative">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>

      <div 
        className={`max-w-md space-y-8 transition-transform duration-1000 ease-in-out ${
          isZooming ? "scale-[5] opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl md:text-6xl font-brand font-bold text-primary">ByWays</h1>
          <p className="text-xl text-muted-foreground">Your personalized local guide to Bengaluru</p>
        </div>

        {/* Main Intro Card - Clickable for Zoom Effect */}
        <div 
          className="relative w-full aspect-square max-w-xs mx-auto my-8 cursor-pointer group"
          onClick={handleInteraction}
        >
           {/* REPLACED THE TEXT DIV WITH AN IMAGE */}
           <div className="absolute inset-0 rounded-3xl shadow-2xl transform rotate-3 group-hover:rotate-0 transition-transform duration-500 overflow-hidden">
              <img 
                src="public/intro-logo.png" 
                alt="ByWays Intro" 
                className="w-full h-full object-cover"
              />
           </div>
        </div>

        <div className="text-center text-sm text-muted-foreground animate-pulse">
          Click the image to enter
        </div>
      </div>
    </div>
  );
};

export default Intro;