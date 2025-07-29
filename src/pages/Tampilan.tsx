
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PaintBrushIcon,
  MoonIcon,
  SunIcon,
  EyeIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

const colorThemes = [
  { name: 'Kuning Cerah', value: 'yellow', primary: '#FFC107', secondary: '#FFE082' },
  { name: 'Biru Laut', value: 'blue', primary: '#2196F3', secondary: '#81D4FA' },
  { name: 'Hijau Emerald', value: 'green', primary: '#4CAF50', secondary: '#A5D6A7' },
  { name: 'Ungu Royal', value: 'purple', primary: '#9C27B0', secondary: '#CE93D8' },
  { name: 'Merah Ruby', value: 'red', primary: '#F44336', secondary: '#FFAB91' },
];

const fontOptions = [
  { name: 'Inter', value: 'inter' },
  { name: 'Roboto', value: 'roboto' },
  { name: 'Open Sans', value: 'opensans' },
  { name: 'Poppins', value: 'poppins' },
  { name: 'Montserrat', value: 'montserrat' },
];

export default function Tampilan() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('yellow');
  const [fontSize, setFontSize] = useState([14]);
  const [selectedFont, setSelectedFont] = useState('inter');
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);
  const [borderRadius, setBorderRadius] = useState([8]);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    toast({
      title: "Pengaturan disimpan!",
      description: "Preferensi tampilan Anda telah berhasil disimpan.",
    });
  };

  const handleResetSettings = () => {
    setIsDarkMode(false);
    setSelectedTheme('yellow');
    setFontSize([14]);
    setSelectedFont('inter');
    setAnimationsEnabled(true);
    setCompactMode(false);
    setBorderRadius([8]);
    
    toast({
      title: "Pengaturan direset!",
      description: "Semua pengaturan dikembalikan ke default.",
    });
  };

  const currentTheme = colorThemes.find(theme => theme.value === selectedTheme) || colorThemes[0];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pengaturan Tampilan</h1>
          <p className="text-gray-600 mt-1">Kustomisasi antarmuka sesuai preferensi Anda</p>
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleResetSettings}>
            Reset Default
          </Button>
          <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={handleSaveSettings}>
            Simpan Pengaturan
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <Tabs defaultValue="theme" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="theme">Tema & Warna</TabsTrigger>
              <TabsTrigger value="typography">Tipografi</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-6">
              {/* Dark Mode */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MoonIcon className="h-5 w-5" />
                    Mode Gelap
                  </CardTitle>
                  <CardDescription>
                    Aktifkan mode gelap untuk pengalaman visual yang lebih nyaman
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SunIcon className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm">Terang</span>
                    </div>
                    <Switch
                      checked={isDarkMode}
                      onCheckedChange={setIsDarkMode}
                    />
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">Gelap</span>
                      <MoonIcon className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Color Theme */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PaintBrushIcon className="h-5 w-5" />
                    Tema Warna
                  </CardTitle>
                  <CardDescription>
                    Pilih skema warna yang sesuai dengan brand Anda
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {colorThemes.map((theme) => (
                      <motion.div
                        key={theme.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          selectedTheme === theme.value
                            ? 'border-yellow-500 bg-yellow-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTheme(theme.value)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.primary }}
                          ></div>
                          <div
                            className="w-6 h-6 rounded-full"
                            style={{ backgroundColor: theme.secondary }}
                          ></div>
                        </div>
                        <p className="text-sm font-medium text-gray-900">{theme.name}</p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6">
              {/* Font Family */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Family</CardTitle>
                  <CardDescription>
                    Pilih jenis font yang akan digunakan di seluruh aplikasi
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Select value={selectedFont} onValueChange={setSelectedFont}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((font) => (
                        <SelectItem key={font.value} value={font.value}>
                          {font.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              {/* Font Size */}
              <Card>
                <CardHeader>
                  <CardTitle>Ukuran Font</CardTitle>
                  <CardDescription>
                    Sesuaikan ukuran font default untuk keterbacaan yang optimal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Ukuran Font: {fontSize[0]}px</Label>
                    <span className="text-sm text-gray-500">12px - 18px</span>
                  </div>
                  <Slider
                    value={fontSize}
                    onValueChange={setFontSize}
                    max={18}
                    min={12}
                    step={1}
                    className="w-full"
                  />
                  <div className="mt-4 p-4 border rounded-lg">
                    <p style={{ fontSize: `${fontSize[0]}px` }}>
                      Contoh teks dengan ukuran font {fontSize[0]}px. 
                      Ini adalah preview bagaimana teks akan terlihat dengan pengaturan font yang dipilih.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              {/* Border Radius */}
              <Card>
                <CardHeader>
                  <CardTitle>Border Radius</CardTitle>
                  <CardDescription>
                    Sesuaikan kelengkungan sudut elemen UI
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Radius: {borderRadius[0]}px</Label>
                    <span className="text-sm text-gray-500">0px - 20px</span>
                  </div>
                  <Slider
                    value={borderRadius}
                    onValueChange={setBorderRadius}
                    max={20}
                    min={0}
                    step={1}
                    className="w-full"
                  />
                  <div className="mt-4 flex space-x-4">
                    <div
                      className="w-16 h-16 bg-yellow-500"
                      style={{ borderRadius: `${borderRadius[0]}px` }}
                    ></div>
                    <div
                      className="w-16 h-16 bg-blue-500"
                      style={{ borderRadius: `${borderRadius[0]}px` }}
                    ></div>
                    <div
                      className="w-16 h-16 bg-green-500"
                      style={{ borderRadius: `${borderRadius[0]}px` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Layout Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Opsi Layout</CardTitle>
                  <CardDescription>
                    Konfigurasi tambahan untuk tampilan layout
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Animasi</Label>
                      <p className="text-sm text-gray-500">Aktifkan animasi dan transisi</p>
                    </div>
                    <Switch
                      id="animations"
                      checked={animationsEnabled}
                      onCheckedChange={setAnimationsEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact">Mode Kompak</Label>
                      <p className="text-sm text-gray-500">Kurangi jarak antar elemen</p>
                    </div>
                    <Switch
                      id="compact"
                      checked={compactMode}
                      onCheckedChange={setCompactMode}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Preview Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <EyeIcon className="h-5 w-5" />
                Preview Live
              </CardTitle>
              <CardDescription>
                Lihat perubahan secara real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`space-y-4 p-4 rounded-lg transition-all ${
                  isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
                }`}
                style={{ borderRadius: `${borderRadius[0]}px` }}
              >
                {/* Preview Header */}
                <div className="flex items-center justify-between">
                  <h3 
                    className="font-semibold"
                    style={{ 
                      fontSize: `${fontSize[0] + 2}px`,
                      fontFamily: selectedFont 
                    }}
                  >
                    Beauty Admin
                  </h3>
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ 
                      backgroundColor: currentTheme.primary,
                      borderRadius: `${borderRadius[0]}px`
                    }}
                  ></div>
                </div>

                {/* Preview Cards */}
                <div className="space-y-3">
                  <div 
                    className={`p-3 ${isDarkMode ? 'bg-gray-700' : 'bg-white'} border ${
                      isDarkMode ? 'border-gray-600' : 'border-gray-200'
                    } transition-all`}
                    style={{ borderRadius: `${borderRadius[0]}px` }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p 
                          className="font-medium"
                          style={{ 
                            fontSize: `${fontSize[0]}px`,
                            fontFamily: selectedFont 
                          }}
                        >
                          Total Penjualan
                        </p>
                        <p 
                          className="text-lg font-bold"
                          style={{ color: currentTheme.primary }}
                        >
                          Rp 127.5M
                        </p>
                      </div>
                      <div
                        className="p-2 rounded"
                        style={{ 
                          backgroundColor: currentTheme.secondary,
                          borderRadius: `${borderRadius[0]/2}px`
                        }}
                      >
                        <Cog6ToothIcon className="h-4 w-4" style={{ color: currentTheme.primary }} />
                      </div>
                    </div>
                  </div>

                  <div 
                    className="p-2 rounded"
                    style={{ 
                      backgroundColor: currentTheme.primary,
                      borderRadius: `${borderRadius[0]}px`
                    }}
                  >
                    <p 
                      className="text-white font-medium text-center"
                      style={{ 
                        fontSize: `${fontSize[0]}px`,
                        fontFamily: selectedFont 
                      }}
                    >
                      Tombol Utama
                    </p>
                  </div>
                </div>

                <div className="text-xs opacity-75">
                  Preview akan berubah sesuai pengaturan yang dipilih
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
