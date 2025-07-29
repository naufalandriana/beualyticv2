
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Eye, 
  Mail, 
  Shield, 
  Palette, 
  Globe, 
  Save,
  Smartphone
} from 'lucide-react';

export default function Pengaturan() {
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      orderUpdates: true,
      marketing: false,
      security: true
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true
    },
    appearance: {
      theme: 'light',
      language: 'id',
      primaryColor: '#FFC107'
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Di sini akan ada logika untuk menyimpan pengaturan
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600 mt-1">Kelola preferensi dan pengaturan akun Anda</p>
        </div>
        
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Simpan Pengaturan
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifikasi
              </CardTitle>
              <CardDescription>
                Atur bagaimana Anda ingin menerima notifikasi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifikasi</Label>
                  <p className="text-sm text-gray-500">Terima notifikasi melalui email</p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, email: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifikasi</Label>
                  <p className="text-sm text-gray-500">Notifikasi langsung di browser</p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, push: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifikasi</Label>
                  <p className="text-sm text-gray-500">Terima notifikasi via SMS</p>
                </div>
                <Switch
                  checked={settings.notifications.sms}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, sms: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Update Pesanan</Label>
                  <p className="text-sm text-gray-500">Notifikasi status pesanan</p>
                </div>
                <Switch
                  checked={settings.notifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      notifications: { ...settings.notifications, orderUpdates: checked }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Settings */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Privasi & Keamanan
              </CardTitle>
              <CardDescription>
                Kontrol privasi dan keamanan data Anda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Visibilitas Profil</Label>
                <Select
                  value={settings.privacy.profileVisibility}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, profileVisibility: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Publik</SelectItem>
                    <SelectItem value="private">Privat</SelectItem>
                    <SelectItem value="friends">Teman Saja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Berbagi Data</Label>
                  <p className="text-sm text-gray-500">Izinkan berbagi data untuk analitik</p>
                </div>
                <Switch
                  checked={settings.privacy.dataSharing}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, dataSharing: checked }
                    })
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Analitik</Label>
                  <p className="text-sm text-gray-500">Bantu tingkatkan layanan dengan data usage</p>
                </div>
                <Switch
                  checked={settings.privacy.analytics}
                  onCheckedChange={(checked) =>
                    setSettings({
                      ...settings,
                      privacy: { ...settings.privacy, analytics: checked }
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Appearance Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Tampilan
              </CardTitle>
              <CardDescription>
                Sesuaikan tampilan interface sesuai preferensi
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Tema</Label>
                <Select
                  value={settings.appearance.theme}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, theme: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Terang</SelectItem>
                    <SelectItem value="dark">Gelap</SelectItem>
                    <SelectItem value="auto">Otomatis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Bahasa</Label>
                <Select
                  value={settings.appearance.language}
                  onValueChange={(value) =>
                    setSettings({
                      ...settings,
                      appearance: { ...settings.appearance, language: value }
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Warna Utama</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="color"
                    value={settings.appearance.primaryColor}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        appearance: { ...settings.appearance, primaryColor: e.target.value }
                      })
                    }
                    className="w-16 h-10"
                  />
                  <Badge variant="outline">{settings.appearance.primaryColor}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Akun
              </CardTitle>
              <CardDescription>
                Pengaturan akun dan preferensi umum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Zona Waktu</Label>
                <Select defaultValue="asia/jakarta">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia/jakarta">Asia/Jakarta (WIB)</SelectItem>
                    <SelectItem value="asia/makassar">Asia/Makassar (WITA)</SelectItem>
                    <SelectItem value="asia/jayapura">Asia/Jayapura (WIT)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Format Mata Uang</Label>
                <Select defaultValue="idr">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="idr">IDR (Rupiah)</SelectItem>
                    <SelectItem value="usd">USD (Dollar)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Separator />
              
              <div className="pt-2">
                <Button variant="destructive" className="w-full">
                  Hapus Akun
                </Button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Tindakan ini tidak dapat dibatalkan
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
