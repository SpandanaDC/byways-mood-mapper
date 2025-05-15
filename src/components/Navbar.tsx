
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="bg-moss-gradient p-1.5 rounded-lg mr-2">
            <span className="text-white font-bold text-xl">B</span>
          </div>
          <span className="byways-title text-byways-dark text-xl hidden sm:block">ByWays</span>
        </Link>
        
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-byways-primary">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-white">
            <SheetHeader>
              <SheetTitle className="text-byways-dark flex items-center">
                <div className="bg-moss-gradient p-1.5 rounded-lg mr-2">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="byways-title">ByWays</span>
              </SheetTitle>
              <SheetDescription className="text-byways-accent">
                Your personalized local guide
              </SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col space-y-4">
              <SheetClose asChild>
                <Link to="/profile" className="flex items-center p-3 rounded-lg hover:bg-muted">
                  <User size={18} className="mr-3 text-byways-primary" />
                  <span>Profile</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/subscription" className="flex items-center p-3 rounded-lg hover:bg-muted">
                  <Settings size={18} className="mr-3 text-byways-primary" />
                  <span>Subscription</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/mood-tracker" className="flex items-center p-3 rounded-lg hover:bg-muted">
                  <HelpCircle size={18} className="mr-3 text-byways-primary" />
                  <span>Your Mood This Week</span>
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link to="/help" className="flex items-center p-3 rounded-lg hover:bg-muted">
                  <HelpCircle size={18} className="mr-3 text-byways-primary" />
                  <span>Help</span>
                </Link>
              </SheetClose>
              <div className="border-t border-byways-light pt-4 mt-4">
                <SheetClose asChild>
                  <Link to="/login" className="block w-full">
                    <Button variant="outline" className="w-full border-byways-primary text-byways-primary hover:bg-byways-primary hover:text-white">
                      Sign In / Register
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
