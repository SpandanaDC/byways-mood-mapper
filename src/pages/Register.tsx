
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const indianCities = [
  "Bengaluru",
  "Mumbai",
  "Delhi",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur"
];

const Register = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [locality, setLocality] = useState("Bengaluru");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match",
        variant: "destructive",
      });
      return;
    }
    
    // Simulating registration
    toast({
      title: "Registration Successful",
      description: "Welcome to ByWays! Let's start exploring!",
    });
    
    // In a real app, we'd handle registration here
    window.location.href = "/";
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-moss-light-gradient p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center justify-center">
            <div className="bg-moss-gradient p-2 rounded-lg">
              <span className="text-white font-bold text-2xl">B</span>
            </div>
            <span className="byways-title text-byways-dark text-3xl ml-2">ByWays</span>
          </Link>
          <p className="text-byways-accent mt-2">Your personalized local guide</p>
        </div>
        
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-byways-dark text-2xl">Create Account</CardTitle>
            <CardDescription>Join ByWays to discover local gems</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="byways-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="byways-input"
                  min="13"
                  max="120"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="locality">Locality</Label>
                <Select value={locality} onValueChange={setLocality} required>
                  <SelectTrigger className="byways-input">
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianCities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="byways-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="byways-input"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-byways-primary hover:bg-byways-dark">
                Create Account
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-byways-light"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-sm text-byways-accent">
                  Or sign up with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button variant="outline" className="border-byways-accent/20">
                Google
              </Button>
              <Button variant="outline" className="border-byways-accent/20">
                Facebook
              </Button>
              <Button variant="outline" className="border-byways-accent/20">
                Instagram
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-byways-light pt-6">
            <p className="text-sm text-byways-accent">
              Already have an account?{" "}
              <Link to="/login" className="text-byways-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
