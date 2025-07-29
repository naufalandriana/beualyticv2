
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, AuthError } from 'firebase/auth';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      // Menggunakan Firebase Google Auth
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Berhasil login
      toast({
        title: "Login berhasil!",
        description: `Selamat datang, ${result.user.displayName || result.user.email}`,
      });
      
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error);
      
      // Menangani error spesifik
      const authError = error as AuthError;
      let errorMessage = "Terjadi kesalahan saat login dengan Google. Silakan coba lagi.";
      
      if (authError.code === 'auth/operation-not-allowed') {
        errorMessage = "Login dengan Google belum diaktifkan di Firebase Console. Silakan aktifkan di Authentication > Sign-in method > Google.";
      } else if (authError.code === 'auth/popup-closed-by-user') {
        errorMessage = "Proses login dibatalkan. Silakan coba lagi.";
      } else if (authError.code === 'auth/cancelled-popup-request') {
        errorMessage = "Permintaan popup dibatalkan. Silakan coba lagi.";
      }
      
      toast({
        title: "Login gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegularLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Login dengan email dan password menggunakan Firebase
      await signInWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Login berhasil!",
        description: "Selamat datang di Beauty Admin Dashboard.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Email login error:', error);
      
      // Menangani error spesifik
      const authError = error as AuthError;
      let errorMessage = "Email atau password salah. Silakan coba lagi.";
      
      if (authError.code === 'auth/invalid-credential') {
        errorMessage = "Email atau password tidak valid. Silakan coba lagi.";
      } else if (authError.code === 'auth/user-not-found') {
        errorMessage = "Pengguna dengan email ini tidak ditemukan.";
      } else if (authError.code === 'auth/wrong-password') {
        errorMessage = "Password yang Anda masukkan salah.";
      } else if (authError.code === 'auth/too-many-requests') {
        errorMessage = "Terlalu banyak percobaan login. Silakan coba lagi nanti.";
      }
      
      toast({
        title: "Login gagal",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-yellow-200">
          <CardHeader className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mx-auto w-20 h-20 rounded-2xl flex items-center justify-center"
            >
              <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-2xl" />
            </motion.div>
            
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Beauty Admin</CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Masuk ke dashboard e-commerce kosmetik Anda
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 h-12"
                variant="outline"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-600"></div>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Masuk dengan Google
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              <Separator />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
                atau
              </span>
            </motion.div>

            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              onSubmit={handleRegularLogin}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@beauty.com"
                  className="border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Masukkan password"
                  className="border-yellow-200 focus:border-yellow-500 focus:ring-yellow-500"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  'Masuk'
                )}
              </Button>
            </motion.form>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-gray-600"
            >
              Lupa password?{' '}
              <a href="#" className="text-yellow-600 hover:text-yellow-700 font-medium">
                Reset di sini
              </a>
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
