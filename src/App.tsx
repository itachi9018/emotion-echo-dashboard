
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import History from "./pages/History";
import Settings from "./pages/Settings";
import CBTTools from "./pages/CBTTools";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import TeamWellness from "./pages/TeamWellness";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  // Use unified layout for all authenticated users
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Personal workspace routes */}
            <Route index element={
              <ProtectedRoute requiredRole="user">
                <Home />
              </ProtectedRoute>
            } />
            <Route path="journal" element={
              <ProtectedRoute requiredRole="user">
                <Journal />
              </ProtectedRoute>
            } />
            <Route path="history" element={
              <ProtectedRoute requiredRole="user">
                <History />
              </ProtectedRoute>
            } />
            <Route path="cbt-tools" element={
              <ProtectedRoute requiredRole="user">
                <CBTTools />
              </ProtectedRoute>
            } />
            <Route path="support" element={
              <ProtectedRoute requiredRole="user">
                <Support />
              </ProtectedRoute>
            } />
            <Route path="settings" element={
              <ProtectedRoute requiredRole="user">
                <Settings />
              </ProtectedRoute>
            } />
            
            {/* Organization workspace routes for admins */}
            <Route path="admin" element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="admin/trends" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-6"><h1 className="text-2xl font-bold">Mood Trends</h1></div>
              </ProtectedRoute>
            } />
            <Route path="admin/users" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1></div>
              </ProtectedRoute>
            } />
            <Route path="admin/reports" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-6"><h1 className="text-2xl font-bold">Reports</h1></div>
              </ProtectedRoute>
            } />
            <Route path="admin/settings" element={
              <ProtectedRoute requiredRole="admin">
                <div className="p-6"><h1 className="text-2xl font-bold">Admin Settings</h1></div>
              </ProtectedRoute>
            } />

            {/* Organization workspace routes for regular users */}
            <Route path="team/wellness" element={
              <ProtectedRoute requiredRole="user">
                <TeamWellness />
              </ProtectedRoute>
            } />
            <Route path="team/summary" element={
              <ProtectedRoute requiredRole="user">
                <div className="p-6"><h1 className="text-2xl font-bold">Organization Mood Summary</h1></div>
              </ProtectedRoute>
            } />
            <Route path="team/checkins" element={
              <ProtectedRoute requiredRole="user">
                <div className="p-6"><h1 className="text-2xl font-bold">Group Check-in Reminders</h1></div>
              </ProtectedRoute>
            } />
            <Route path="team/insights" element={
              <ProtectedRoute requiredRole="user">
                <div className="p-6"><h1 className="text-2xl font-bold">Peer Insights</h1></div>
              </ProtectedRoute>
            } />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </SidebarProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter basename="/emotion-echo-dashboard">
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
