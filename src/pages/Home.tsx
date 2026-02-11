import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2, School, ShieldCheck, Clock, CalendarDays, ArrowRight, Zap, Brain, Sparkles, Timer } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const RoleSelect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Welcome | SONA TTG";
  }, []);



  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 selection:bg-purple-200/50">
      
      {/* AI-Themed Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-blue-400/10 to-purple-400/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Floating AI Elements */}
        <div className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-32 left-32 w-24 h-24 border-2 border-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-indigo-400/30 rounded-lg animate-bounce" style={{ animationDelay: '0.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-12 h-12 border border-cyan-400/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        
        {/* Neural Network Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <path d="M100,200 Q300,100 500,300 T900,200" stroke="url(#line-gradient)" strokeWidth="2" fill="none" className="animate-pulse" />
          <path d="M200,400 Q400,300 600,500 T1000,400" stroke="url(#line-gradient)" strokeWidth="1.5" fill="none" className="animate-pulse" style={{ animationDelay: '1s' }} />
        </svg>
      </div>

      <Navbar />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-8 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-forwards ease-out">
          
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg mb-8">
            <div className="relative">
              <Brain className="w-4 h-4 text-blue-300 animate-pulse" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
            </div>
            <span className="text-sm font-semibold text-white tracking-wide">AI-Powered Scheduling v3.0</span>
            <Sparkles className="w-4 h-4 text-purple-300 animate-bounce" />
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
            Simplify Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-[length:200%_auto] animate-gradient">
              Academic Time.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-blue-200 font-normal max-w-3xl mx-auto leading-relaxed tracking-tight">
            The automated timetable generator designed for perfection. <br className="hidden md:block"/>
            Conflict-free scheduling, reimagined.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-blue-300 pt-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="p-1.5 rounded-full bg-blue-500/20"><Zap className="w-4 h-4 text-blue-400" /></div>
              <span>Real-time Generation</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="p-1.5 rounded-full bg-purple-500/20"><Timer className="w-4 h-4 text-purple-400" /></div>
              <span>Smart Conflict Resolution</span>
            </div>
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="p-1.5 rounded-full bg-cyan-500/20"><Brain className="w-4 h-4 text-cyan-400" /></div>
              <span>Smart Learning</span>
            </div>
          </div>
        </div>

        {/* Enhanced AI Portal Login Card */}
        <div className="w-full max-w-lg mx-auto px-4">
          <div
            className="group relative flex flex-col p-1 rounded-3xl transition-all duration-700 hover:-translate-y-2 hover:scale-105 animate-in fade-in slide-in-from-bottom-8 duration-1000 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-cyan-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative h-full overflow-hidden rounded-[22px] bg-gradient-to-br from-white/10 via-blue-50/10 to-purple-50/10 backdrop-blur-xl border border-white/20 hover:border-white/30 transition-all duration-700">
              
              {/* Animated Background Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 right-8 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                <div className="absolute top-12 right-16 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-8 right-12 w-1 h-1 bg-cyan-400/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className="relative p-12 flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-700">
                      <Clock className="w-10 h-10 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 animate-ping" style={{ animationDuration: '3s' }} />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white/60 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-blue-200 transition-colors duration-500">
                  Enter AI Portal
                </h3>
                
                <p className="text-blue-200 leading-relaxed mb-8 text-lg">
                  Access your intelligent scheduling dashboard. Our AI will recognize your role and personalize your experience.
                </p>
                
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-white flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                      <Brain className="w-5 h-5 text-blue-300" />
                      Smart Login
                    </span>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm text-green-300">AI Ready</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-24 border-t border-white/10 pt-12 pb-8 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between text-blue-300 text-sm font-medium px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <p>&copy; {new Date().getFullYear()} AI Time Portal by SONA TTG. All rights reserved.</p>
          </div>
          <div className="flex gap-8 mt-6 md:mt-0">
            <a href="#" className="hover:text-blue-200 transition-colors duration-300 flex items-center gap-1">
              <span>Privacy</span>
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300 flex items-center gap-1">
              <span>Terms</span>
            </a>
            <a href="#" className="hover:text-blue-200 transition-colors duration-300 flex items-center gap-1">
              <span>AI Support</span>
              <Brain className="w-3 h-3" />
            </a>
          </div>
        </footer>

      </section>
    </main>
  );
};

export default RoleSelect;
