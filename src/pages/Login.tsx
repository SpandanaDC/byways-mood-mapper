
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulating login
    if (userId && password) {
      toast({
        title: "Login Successful",
        description: "Welcome back to ByWays!",
      });
      // In a real app, we'd handle authentication here
      window.location.href = "/";
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter your credentials",
        variant: "destructive",
      });
    }
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
            <CardTitle className="text-byways-dark text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your exploration</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">User ID</Label>
                <Input 
                  id="userId" 
                  type="text" 
                  placeholder="Enter your email or username"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="byways-input"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-byways-accent hover:text-byways-primary">
                    Forgot password?
                  </Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="byways-input"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full bg-byways-primary hover:bg-byways-dark">
                Sign In
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-byways-light"></span>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-background px-4 text-sm text-byways-accent">
                  Or continue with
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
              Haven't signed up yet?{" "}
              <Link to="/register" className="text-byways-primary font-medium hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
