
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { auth } from '@/lib/firebase';
import { updateProfile } from 'firebase/auth';

export default function Profil() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phone: '0812-3456-7890',
    address: 'Jl. Kecantikan No. 123, Jakarta',
    bio: 'Pengelola toko kecantikan dengan pengalaman 5+ tahun dalam industri kosmetik dan perawatan kulit.'
  });

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        displayName: currentUser.displayName || 'Admin Beauty',
        email: currentUser.email || 'admin@beauty.com',
      }));
    }
  }, [currentUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!currentUser) {
      toast({
        title: "Error",
        description: "Tidak ada pengguna yang login",
        variant: "destructive"
      });
      return;
    }

    try {
      // Update profile di Firebase
      await updateProfile(currentUser, {
        displayName: formData.displayName,
      });

      toast({
        title: "Profil diperbarui",
        description: "Perubahan profil Anda telah disimpan",
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Gagal memperbarui profil",
        description: "Terjadi kesalahan saat menyimpan perubahan",
        variant: "destructive"
      });
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        displayName: currentUser.displayName || 'Admin Beauty',
        email: currentUser.email || 'admin@beauty.com',
      }));
    }
    setIsEditing(false);
  };

  // Mendapatkan inisial untuk avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full min-h-screen p-4 sm:p-6 lg:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8 overflow-hidden">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Profil Saya</h1>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4 lg:min-w-[200px]">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                <AvatarImage src={currentUser?.photoURL || "https://github.com/shadcn.png"} />
                <AvatarFallback className="bg-yellow-500 text-white text-lg sm:text-2xl">
                  {getInitials(formData.displayName)}
                </AvatarFallback>
              </Avatar>
              
              {isEditing && (
                <Button variant="outline" className="w-full max-w-[200px]">
                  Ubah Foto
                </Button>
              )}
            </div>
            
            {/* Form Section */}
            <div className="flex-1 space-y-4 sm:space-y-6 min-w-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-sm font-medium">Nama</Label>
                  {isEditing ? (
                    <Input 
                      id="displayName" 
                      name="displayName"
                      value={formData.displayName} 
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-700 py-2 break-words">{formData.displayName}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  {isEditing ? (
                    <Input 
                      id="email" 
                      name="email"
                      value={formData.email} 
                      disabled 
                      className="bg-gray-100 w-full"
                    />
                  ) : (
                    <p className="text-gray-700 py-2 break-words">{formData.email}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Nomor Telepon</Label>
                  {isEditing ? (
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone} 
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-700 py-2 break-words">{formData.phone}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">Alamat</Label>
                  {isEditing ? (
                    <Input 
                      id="address" 
                      name="address"
                      value={formData.address} 
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  ) : (
                    <p className="text-gray-700 py-2 break-words">{formData.address}</p>
                  )}
                </div>
              </div>
              
              {/* Bio Section - Full Width */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                {isEditing ? (
                  <Textarea 
                    id="bio" 
                    name="bio"
                    value={formData.bio} 
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full resize-none"
                  />
                ) : (
                  <p className="text-gray-700 py-2 break-words leading-relaxed">{formData.bio}</p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 border-t border-gray-100">
                {isEditing ? (
                  <>
                    <Button 
                      variant="outline" 
                      onClick={handleCancel}
                      className="w-full sm:w-auto order-2 sm:order-1"
                    >
                      Batal
                    </Button>
                    <Button 
                      onClick={handleSave}
                      className="w-full sm:w-auto order-1 sm:order-2"
                    >
                      Simpan Perubahan
                    </Button>
                  </>
                ) : (
                  <Button 
                    onClick={() => setIsEditing(true)}
                    className="w-full sm:w-auto"
                  >
                    Edit Profil
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
