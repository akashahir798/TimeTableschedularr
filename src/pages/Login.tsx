import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, ArrowLeft, Loader2, Mail, Lock, Clock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email or username is required";
    } else if (!/\S+@\S+\.\S+/.test(email) && !email.includes("@")) {
      // Allow usernames without @, but validate email format if @ is present
      if (email.includes("@") && !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Check Super Admin first (hardcoded credentials)
      if (email === "admin" && password === "admin") {
        localStorage.setItem("superAdmin", "true");
        toast.success("Welcome Super Admin");
        navigate("/super-admin", { replace: true });
        return;
      }

      // Check Admin Users in database
      const { data: adminUsers, error: queryError } = await (supabase as any)
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('is_active', true);

      if (queryError) throw queryError;

      if (adminUsers && adminUsers.length > 0) {
        const admin = adminUsers[0];

        if (admin.password_hash) {
          const { data: isValid, error: verifyError } = await (supabase as any)
            .rpc('verify_password', {
              password: password,
              hashed_password: admin.password_hash
            });

          if (verifyError) throw verifyError;

          if (isValid) {
            localStorage.setItem("adminUser", JSON.stringify({
              id: admin.id,
              name: admin.name,
              email: admin.email,
              department_id: admin.department_id,
              is_active: admin.is_active
            }));
            toast.success(`Welcome ${admin.name}`);
            navigate("/admin", { replace: true });
            return;
          }
        }
      }

      // Check Faculty Users in database
      const { data: facultyUsers, error: facultyError } = await (supabase as any)
        .from('faculty_members')
        .select('*')
        .eq('email', email);

      if (facultyError) throw facultyError;

      if (facultyUsers && facultyUsers.length > 0) {
        const faculty = facultyUsers[0];
        // For faculty, we'll use email as the identifier (no password check for now)
        localStorage.setItem("facultyUser", JSON.stringify({
          id: faculty.id,
          name: faculty.name,
          email: faculty.email
        }));
        toast.success(`Welcome ${faculty.name}`);
        navigate("/faculty", { replace: true });
        return;
      }

      toast.error("Invalid credentials");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Time-Themed Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        {/* Clock-like circular patterns */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-300 hover:-translate-x-1 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-purple-900"
        aria-label="Go back to home"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-2xl shadow-purple-500/50 mb-2 relative">
              <Clock className="w-10 h-10 animate-pulse" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-ping" style={{ animationDuration: '3s' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">AI Time Portal</h1>
              <p className="text-blue-200 text-base">Smart scheduling at your fingertips</p>
            </div>
          </div>

          {/* Login Card */}
          <Card className="rounded-2xl border border-white/10 shadow-2xl shadow-black/20 bg-white/10 backdrop-blur-xl overflow-hidden">
            <CardContent className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-white">
                    Email / Username
                  </Label>
                  <div className="relative group">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-purple-300 transition-colors" />
                    <Input
                      id="email"
                      type="text"
                      placeholder="Enter your email or username"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`h-12 pl-11 pr-4 rounded-xl border-2 bg-white/5 text-white placeholder:text-blue-200/50 transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
                          : 'border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20'
                      }`}
                      aria-label="Email or Username"
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  </div>
                  {errors.email && (
                    <p id="email-error" className="text-sm text-red-300 flex items-center gap-1.5 animate-in slide-in-from-top-1" role="alert">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-300" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold text-white">
                    Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-300 group-focus-within:text-purple-300 transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password) setErrors({ ...errors, password: undefined });
                      }}
                      className={`h-12 pl-11 pr-12 rounded-xl border-2 bg-white/5 text-white placeholder:text-blue-200/50 transition-all duration-200 ${
                        errors.password 
                          ? 'border-red-400 focus:border-red-400 focus:ring-4 focus:ring-red-500/20' 
                          : 'border-white/20 focus:border-purple-400 focus:ring-4 focus:ring-purple-500/20'
                      }`}
                      aria-label="Password"
                      aria-describedby={errors.password ? "password-error" : undefined}
                      aria-invalid={errors.password ? "true" : "false"}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-blue-300 hover:text-purple-300 transition-colors p-1 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-400"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className="text-sm text-red-300 flex items-center gap-1.5 animate-in slide-in-from-top-1" role="alert">
                      <span className="inline-block w-1 h-1 rounded-full bg-red-300" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="rounded border-white/30 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      aria-label="Remember me"
                    />
                    <Label 
                      htmlFor="remember" 
                      className="text-sm text-blue-100 font-medium cursor-pointer select-none hover:text-white transition-colors"
                    >
                      Remember me
                    </Label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-purple-300 hover:text-purple-200 font-medium transition-colors focus:outline-none focus:underline rounded px-1"
                    onClick={() => toast.info("Password reset functionality coming soon!")}
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-purple-900 mt-6"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Footer Note */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-center text-blue-200 leading-relaxed flex items-center justify-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  AI-powered time management • Auto-redirect enabled
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <p className="text-center text-sm text-blue-200">
            Need help? <button className="text-purple-300 hover:text-purple-200 font-medium hover:underline" onClick={() => toast.info("Support: support@sonattg.edu")}>Contact Support</button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
