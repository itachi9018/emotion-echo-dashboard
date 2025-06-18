
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Settings from "./pages/Settings";
import CBTTools from "./pages/CBTTools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/emotion-echo-dashboard">
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="journal" element={<Journal />} />
                <Route path="history" element={<History />} />
                <Route path="cbt-tools" element={<CBTTools />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
