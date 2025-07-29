
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ShieldCheckIcon,
  KeyIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ComputerDesktopIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface LoginActivity {
  id: number;
  device: string;
  location: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed';
  isCurrent: boolean;
}

const loginActivities: LoginActivity[] = [
  {
    id: 1,
    device: 'Chrome - Windows',
    location: 'Jakarta, Indonesia',
    ipAddress: '103.xxx.xxx.1',
    timestamp: '2024-01-15 14:30:25',
    status: 'success',
    isCurrent: true,
  },
  {
    id: 2,
    device: 'Safari - iPhone',
    location: 'Jakarta, Indonesia',
    ipAddress: '103.xxx.xxx.1',
    timestamp: '2024-01-14 09:15:42',
    status: 'success',
    isCurrent: false,
  },
  {
    id: 3,
    device: 'Chrome - Android',
    location: 'Surabaya, Indonesia',
    ipAddress: '114.xxx.xxx.5',
    timestamp: '2024-01-13 22:45:18',
    status: 'failed',
    isCurrent: false,
  },
  {
    id: 4,
    device: 'Firefox - Windows',
    location: 'Bandung, Indonesia',
    ipAddress: '125.xxx.xxx.2',
    timestamp: '2024-01-12 16:20:33',
    status: 'success',
    isCurrent: false,
  },
];

export default function Keamanan() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const { toast } = useToast();

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password tidak cocok",
        description: "Konfirmasi password harus sama dengan password baru.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Password terlalu pendek",
        description: "Password harus minimal 8 karakter.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password berhasil diubah!",
      description: "Password Anda telah berhasil diperbarui.",
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA dinonaktifkan" : "2FA diaktifkan",
      description: twoFactorEnabled 
        ? "Two-Factor Authentication telah dinonaktifkan." 
        : "Two-Factor Authentication telah diaktifkan untuk keamanan tambahan.",
    });
  };

  const getDeviceIcon = (device: string) => {
    if (device.includes('iPhone') || device.includes('Android')) {
      return <DevicePhoneMobileIcon className="h-4 w-4" />;
    }
    return <ComputerDesktopIcon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string, isCurrent: boolean) => {
    if (isCurrent) {
      return <Badge className="bg-blue-500">Sesi Aktif</Badge>;
    }
    if (status === 'success') {
      return <Badge className="bg-green-500">Berhasil</Badge>;
    }
    return <Badge variant="destructive">Gagal</Badge>;
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
          <h1 className="text-3xl font-bold text-gray-900">Keamanan Akun</h1>
          <p className="text-gray-600 mt-1">Kelola pengaturan keamanan dan privasi akun Anda</p>
        </div>
      </motion.div>

      {/* Security Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Alert className="border-green-200 bg-green-50">
          <CheckCircleIcon className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Akun Anda Aman</AlertTitle>
          <AlertDescription className="text-green-700">
            Tidak ada aktivitas mencurigakan yang terdeteksi. Terus jaga keamanan akun Anda dengan mengaktifkan 2FA.
          </AlertDescription>
        </Alert>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Change Password */}
            <AccordionItem value="password" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <KeyIcon className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Ubah Password</h3>
                    <p className="text-sm text-gray-500">Perbarui password untuk keamanan yang lebih baik</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Password Saat Ini</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Masukkan password saat ini"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-password">Password Baru</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Masukkan password baru"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Konfirmasi Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Konfirmasi password baru"
                  />
                </div>

                <Button 
                  onClick={handleChangePassword}
                  className="w-full bg-yellow-500 hover:bg-yellow-600"
                >
                  Ubah Password
                </Button>
              </AccordionContent>
            </AccordionItem>

            {/* Two-Factor Authentication */}
            <AccordionItem value="2fa" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Two-Factor Authentication (2FA)</h3>
                        <p className="text-sm text-gray-500">Lapisan keamanan tambahan untuk akun Anda</p>
                      </div>
                      <Badge variant={twoFactorEnabled ? "default" : "secondary"}>
                        {twoFactorEnabled ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">Status 2FA</p>
                    <p className="text-sm text-gray-500">
                      {twoFactorEnabled 
                        ? "2FA aktif menggunakan aplikasi authenticator" 
                        : "2FA belum diaktifkan"
                      }
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={handleToggle2FA}
                  />
                </div>

                {!twoFactorEnabled && (
                  <Alert>
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Rekomendasikan Mengaktifkan 2FA</AlertTitle>
                    <AlertDescription>
                      2FA menambah lapisan keamanan ekstra dengan memerlukan kode verifikasi dari ponsel Anda.
                    </AlertDescription>
                  </Alert>
                )}

                {twoFactorEnabled && (
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full">
                      <DevicePhoneMobileIcon className="h-4 w-4 mr-2" />
                      Kelola Perangkat 2FA
                    </Button>
                    <Button variant="outline" className="w-full">
                      Lihat Kode Backup
                    </Button>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>

            {/* Notification Settings */}
            <AccordionItem value="notifications" className="border rounded-lg px-4">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <GlobeAltIcon className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold">Notifikasi Keamanan</h3>
                    <p className="text-sm text-gray-500">Atur pemberitahuan aktivitas akun</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Notifikasi Email</Label>
                      <p className="text-sm text-gray-500">Terima email untuk aktivitas akun penting</p>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Peringatan Login</Label>
                      <p className="text-sm text-gray-500">Notifikasi saat ada login dari perangkat baru</p>
                    </div>
                    <Switch
                      checked={loginAlerts}
                      onCheckedChange={setLoginAlerts}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>

        {/* Login Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Login Terbaru</CardTitle>
              <CardDescription>
                Pantau aktivitas masuk ke akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Perangkat</TableHead>
                    <TableHead>Lokasi</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loginActivities.map((activity, index) => (
                    <motion.tr
                      key={activity.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="hover:bg-gray-50"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getDeviceIcon(activity.device)}
                          <div>
                            <p className="font-medium text-sm">{activity.device}</p>
                            <p className="text-xs text-gray-500">{activity.ipAddress}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm">{activity.location}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(activity.status, activity.isCurrent)}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  Lihat Semua Aktivitas
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
