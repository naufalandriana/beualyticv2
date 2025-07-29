
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Search,
  User,
  Settings,
  LogOut 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export function TopBar() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Mendapatkan inisial untuk avatar fallback
  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'AB';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleLogout = async () => {
    setShowLogoutConfirm(true);
    try {
      await signOut(auth);
      toast({
        title: "Logout berhasil",
        description: "Anda telah keluar dari akun",
      });
      setTimeout(() => {
        navigate('/login');
        setShowLogoutConfirm(false);
      }, 1500);
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout gagal",
        description: "Terjadi kesalahan saat logout. Silakan coba lagi.",
        variant: "destructive",
      });
      setShowLogoutConfirm(false);
    }
  };

  return (
    <>
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white border-b border-yellow-200 px-6 py-4 backdrop-blur-sm bg-white/95"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger className="text-gray-600 hover:text-yellow-600" />
            
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari produk, pelanggan, atau laporan..."
                className="pl-10 border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
              onClick={() => navigate('/notifikasi')}
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs bg-red-500 text-white border-2 border-white">
                3
              </Badge>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={currentUser?.photoURL || "https://github.com/shadcn.png"} />
                    <AvatarFallback className="bg-yellow-500 text-white">{getInitials(currentUser?.displayName)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium">{currentUser?.displayName || 'Admin Beauty'}</p>
                    <p className="text-xs text-gray-500">{currentUser?.email || 'admin@beauty.com'}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/profil')}>
                  <User className="mr-2 h-4 w-4" />
                  Profil Saya
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/pengaturan')}>
                  <Settings className="mr-2 h-4 w-4" />
                  Pengaturan
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="text-red-600"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>

      {/* Logout Animation Overlay */}
      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 text-center space-y-4"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-yellow-200 border-t-yellow-500 rounded-full mx-auto"
              />
              <h3 className="text-lg font-semibold text-gray-900">Sedang Keluar...</h3>
              <p className="text-gray-600">Terima kasih telah menggunakan Beauty Admin</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
