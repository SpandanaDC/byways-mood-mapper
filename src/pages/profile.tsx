import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Heart, Settings, LogOut } from "lucide-react";

const Profile = () => {
  // Mock user data - normally this would come from your auth context/backend
  const user = {
    name: "Namma Traveller",
    email: "user@example.com",
    joinDate: "Oct 2025",
    location: "Bengaluru, KA",
    bio: "Exploring every nook and corner of this beautiful garden city! Coffee lover ☕"
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Sidebar / User Info Card */}
          <Card className="md:col-span-1 h-fit shadow-lg border-none rounded-2xl">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-md">
                <AvatarImage src="https://github.com/shadcn.png" alt={user.name} />
                <AvatarFallback>UR</AvatarFallback>
              </Avatar>
              <CardTitle className="text-2xl font-brand font-bold">{user.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 text-primary" />
                {user.location}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 text-primary" />
                Joined {user.joinDate}
              </div>
              <p className="text-sm italic border-l-2 border-accent pl-3 py-1 bg-accent/5 rounded-r-md">
                "{user.bio}"
              </p>
              
              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start rounded-xl">
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </Button>
                <Button variant="destructive" className="w-full justify-start rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-red-100">
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Stats / Overview */}
             <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-none shadow-sm rounded-2xl text-center p-4">
                <h4 className="text-2xl font-bold text-primary">12</h4>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Trips Planned</p>
              </Card>
              <Card className="bg-accent/10 border-none shadow-sm rounded-2xl text-center p-4">
                <h4 className="text-2xl font-bold text-accent">5</h4>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Reviews</p>
              </Card>
               <Card className="bg-purple-100 border-none shadow-sm rounded-2xl text-center p-4">
                <h4 className="text-2xl font-bold text-purple-600">8</h4>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold">Favorites</p>
              </Card>
            </div>

            {/* Recent Activity / Wishlist */}
            <Card className="border-none shadow-lg rounded-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-brand">Your Favorites</CardTitle>
                  <Button variant="ghost" size="sm" className="text-primary">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <img 
                      src={`https://placehold.co/100x100?text=Place+${item}`} 
                      alt="Place" 
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">Cozy Corner Cafe</h4>
                      <p className="text-xs text-muted-foreground">Koramangala • Cafe</p>
                    </div>
                    <Button size="icon" variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full">
                      <Heart className="w-5 h-5 fill-current" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Comments / Reviews Section */}
             <Card className="border-none shadow-lg rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl font-brand">Your Recent Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-slate-50 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                       <h5 className="font-semibold">Cubbon Park</h5>
                       <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-sm text-slate-600">"Absolutely loved the morning walk here. The air is so fresh!"</p>
                    <div className="flex gap-1 mt-2">
                      {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                    </div>
                 </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;