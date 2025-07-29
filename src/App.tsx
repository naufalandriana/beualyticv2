
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import Beranda from "./pages/Beranda";
import Produk from "./pages/Produk";
import Analitik from "./pages/Analitik";
import Ulasan from "./pages/Ulasan";
import Penghasilan from "./pages/Penghasilan";
import Tampilan from "./pages/Tampilan";
import Keamanan from "./pages/Keamanan";
import Profil from "./pages/Profil";
import Pengaturan from "./pages/Pengaturan";
import Notifikasi from "./pages/Notifikasi";
import ProdukNew from "./pages/ProdukNew";
import NotFound from "./pages/NotFound";
import Upload  from "./pages/upload";

const queryClient = new QueryClient();

// Protected Route component - requires authentication
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" replace />;
};

// Public Route component - redirects to dashboard if already authenticated
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
      </div>
    );
  }
  
  return currentUser ? <Navigate to="/" replace /> : children;
};

// Layout component for authenticated routes
const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full bg-gray-50">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  </SidebarProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Beranda />
              </DashboardLayout>
            </ProtectedRoute>
          } />

          <Route path="/notifikasi" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Notifikasi />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/ProdukNew" element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProdukNew/>
              </DashboardLayout>
            </ProtectedRoute>
          } />
          <Route path="/upload" element={
            <ProtectedRoute>
              <DashboardLayout>
                <Upload />
              </DashboardLayout>
            </ProtectedRoute>
          } />
          
          {/* Redirect root to /beranda */}

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
