
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Relax from "./pages/Relax";
import Progress from "./pages/Progress";
import Games from "./pages/Games";
import NotFound from "./pages/NotFound";
import VideoAnalysis from "./pages/VideoAnalysis";
import MentalHealth from "./pages/MentalHealth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="bg-gradient-mindnest from-mindnest-bg-start via-mindnest-bg-mid to-mindnest-bg-end min-h-screen">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/relax" element={<Relax />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/video-analysis" element={<VideoAnalysis />} />
            <Route path="/mental-health" element={<MentalHealth />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/memory" element={<Games />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
