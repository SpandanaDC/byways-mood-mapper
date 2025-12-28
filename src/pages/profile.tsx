import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Settings, LogOut, ArrowLeft, Heart, Clock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setUser(JSON.parse(storedUser)); else navigate("/login");
    const storedFavs = JSON.parse(localStorage.getItem("userFavorites") || "[]");
    setFavorites(storedFavs);
    const storedHistory = JSON.parse(localStorage.getItem("userHistory") || "[]");
    setHistory(storedHistory);
  }, [navigate]);

  const handleLogout = () => { localStorage.removeItem("currentUser"); toast({ title: "Logged Out" }); navigate("/login"); };
  const clearHistory = () => { localStorage.removeItem("userHistory"); setHistory([]); toast({ title: "History Cleared" }); };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-brand">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate("/home")} className="mb-4 pl-0 hover:bg-transparent"><ArrowLeft className="w-4 h-4 mr-2" /> Back to Home</Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="md:col-span-1 h-fit shadow-lg border-none rounded-2xl sticky top-24">
            <CardHeader className="flex flex-col items-center text-center pb-2">
              <Avatar className="w-24 h-24 mb-4 border-4 border-white shadow-md"><AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} /><AvatarFallback>{user.name?.charAt(0)}</AvatarFallback></Avatar>
              <CardTitle className="text-2xl font-bold">{user.name}</CardTitle><p className="text-sm text-muted-foreground">{user.email}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center text-sm text-muted-foreground"><MapPin className="w-4 h-4 mr-2 text-primary" /> {user.locality || "Bengaluru, India"}</div>
              <div className="flex items-center text-sm text-muted-foreground"><Calendar className="w-4 h-4 mr-2 text-primary" /> Joined {new Date().getFullYear()}</div>
              <div className="pt-4 space-y-2 border-t mt-4">
                <Button variant="outline" className="w-full justify-start rounded-xl"><Settings className="w-4 h-4 mr-2" /> Settings</Button>
                <Button variant="destructive" className="w-full justify-start rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border-red-100" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" /> Log Out</Button>
              </div>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-6">
             <div className="grid grid-cols-3 gap-4">
              <Card className="bg-primary/10 border-none shadow-sm rounded-2xl text-center p-4"><h4 className="text-3xl font-bold text-primary">{history.length}</h4><p className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Activities</p></Card>
              <Card className="bg-accent/10 border-none shadow-sm rounded-2xl text-center p-4"><h4 className="text-3xl font-bold text-accent">0</h4><p className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Reviews</p></Card>
              <Card className="bg-purple-100 border-none shadow-sm rounded-2xl text-center p-4"><h4 className="text-3xl font-bold text-purple-600">{favorites.length}</h4><p className="text-xs uppercase tracking-wide text-muted-foreground font-bold">Favorites</p></Card>
            </div>

            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xl flex items-center gap-2"><Heart className="w-5 h-5 text-red-500 fill-current" /> Your Favorites</CardTitle></CardHeader>
              <CardContent>
                {favorites.length === 0 ? (<div className="text-center py-8 text-stone-400"><p>No favorites yet.</p><Button variant="link" className="text-primary" onClick={() => navigate('/mood-discovery')}>Start Exploring</Button></div>) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{favorites.map((fav, i) => (<div key={i} className="flex gap-3 p-3 rounded-xl border hover:shadow-md transition-shadow cursor-pointer bg-white" onClick={() => navigate(`/place/${fav.id}`)}><img src={fav.image} alt="" className="w-16 h-16 rounded-lg object-cover bg-stone-200" /><div><h4 className="font-bold text-stone-800 line-clamp-1">{fav.name}</h4><p className="text-xs text-stone-500">{fav.location}</p><span className="inline-block mt-1 text-[10px] uppercase font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">{fav.tags}</span></div></div>))}</div>
                )}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-xl flex items-center gap-2"><Clock className="w-5 h-5 text-stone-600" /> Activity History</CardTitle>{history.length > 0 && (<Button variant="ghost" size="sm" onClick={clearHistory} className="text-red-400 hover:text-red-600 h-auto p-0 hover:bg-transparent"><Trash2 className="w-4 h-4 mr-1" /> Clear</Button>)}</CardHeader>
              <CardContent>
                {history.length === 0 ? (<p className="text-center py-6 text-stone-400 text-sm">No recent activity.</p>) : (
                    <div className="space-y-4">{history.map((item, i) => (<div key={i} className="flex justify-between items-center p-4 bg-stone-50 rounded-xl border border-stone-100"><div><h4 className="font-bold text-stone-800">{item.title}</h4><p className="text-xs text-stone-500 mt-0.5">{item.details}</p></div><div className="text-right"><span className="text-[10px] font-bold bg-white border px-2 py-1 rounded text-stone-400">{item.date}</span></div></div>))}</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Profile;