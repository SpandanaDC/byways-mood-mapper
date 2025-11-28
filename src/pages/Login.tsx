import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// --- MOCK USER FALLBACK ---
const defaultMockUser = {
  email: "user@example.com",
  password: "password123",
  name: "Namma Traveller"
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  // --- NEW: Mock Social Login Handler ---
  const handleSocialLogin = (provider: string) => {
    // Create a mock user for social login
    const socialUser = {
        email: `${provider.toLowerCase()}@user.com`,
        password: "social-login",
        name: `${provider} User`
    };
    // Save to localStorage so app thinks they are logged in
    localStorage.setItem('tempMockUser', JSON.stringify(socialUser));

    toast({
        title: `Logged in with ${provider}`,
        description: "Redirecting to home...",
    });

    setTimeout(() => {
        navigate("/home");
    }, 800);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: email, password })
      });

      const data = await response.json();

      if (response.ok) {
        toast({ title: "Welcome back!", description: "Successfully logged in." });
        navigate("/home");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (error) {
      console.warn("Login error, trying mock login:", error);
      
      // FALLBACK LOGIC
      // 1. Check hardcoded mock user
      let isValid = (email === defaultMockUser.email && password === defaultMockUser.password);
      
      // 2. Check localStorage mock user (if registered in this session)
      if (!isValid) {
          const storedUser = localStorage.getItem('tempMockUser');
          if (storedUser) {
              const parsedUser = JSON.parse(storedUser);
              if (email === parsedUser.email && password === parsedUser.password) {
                  isValid = true;
              }
          }
      }

      if (isValid) {
         // Removed the explicit "Offline Mode" toast here as requested
         // Just navigate directly on successful mock login
         navigate("/home");
      } else {
        toast({
            title: "Login Failed",
            description: "Invalid email or password.",
            variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-brand font-bold text-primary">Welcome Back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl border-muted bg-white/50"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl border-muted bg-white/50"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg rounded-xl bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              className="h-12 rounded-xl hover:bg-slate-50"
              onClick={() => handleSocialLogin("Google")}
            >
              {/* Google Icon Placeholder */}
              <span className="mr-2 font-bold text-blue-500">G</span> Google
            </Button>
            <Button 
              variant="outline" 
              className="h-12 rounded-xl hover:bg-slate-50"
              onClick={() => handleSocialLogin("Facebook")}
            >
              {/* Facebook Icon Placeholder */}
              <span className="mr-2 font-bold text-blue-700">f</span> Facebook
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 text-center">
          <div className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </div>
          {/* Helper text for demo purposes */}
          <div className="text-xs text-stone-400 mt-2">
            Demo Login: user@example.com / password123
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;