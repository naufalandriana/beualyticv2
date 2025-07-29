import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Package, Beaker, Globe, FileText, Save, RotateCcw, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const UploadProdukPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    suitable_for: '',
    alcohol_content: '',
    price: '',
    image_url: '',
    external_url: '',
    ingredients: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [completedSections, setCompletedSections] = useState(new Set());
  const [focusedSection, setFocusedSection] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    updateCompletedSections({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, alcohol_content: value }));
    updateCompletedSections({ ...formData, alcohol_content: value });
  };

  const updateCompletedSections = (data) => {
    const sections = new Set();
    
    // Section 1: Info Produk
    if (data.name && data.brand) sections.add(1);
    
    // Section 2: Detail Tambahan
    if (data.suitable_for && data.alcohol_content && data.price) sections.add(2);
    
    // Section 3: Link Produk
    if (data.image_url && data.external_url) sections.add(3);
    
    // Section 4: Komposisi
    if (data.ingredients) sections.add(4);
    
    setCompletedSections(sections);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      suitable_for: '',
      alcohol_content: '',
      price: '',
      image_url: '',
      external_url: '',
      ingredients: '',
    });
    setCompletedSections(new Set());
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        price: parseInt(formData.price),
      };

      const res = await axios.post('http://10.5.49.252:5000/api/productsv2', payload);
      
      toast({ 
        title: 'Produk ditambahkan!', 
        description: res.data.name 
      });
      
      resetForm();
    } catch (err) {
      console.error('Gagal submit:', err);
      toast({
        title: 'Gagal simpan',
        description: err.response?.data?.error || err.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = completedSections.size === 4;
  const progressPercentage = (completedSections.size / 4) * 100;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
            Upload Produk Kosmetik
          </h1>
          <p className="text-gray-600 text-lg">Tambahkan produk baru ke dalam katalog</p>
          
          {/* Progress Bar */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Section 1: Info Produk */}
          <Card 
            className={`group transition-all duration-300 hover:shadow-xl border-2 ${
              completedSections.has(1) 
                ? 'border-green-200 bg-green-50/30' 
                : focusedSection === 1 
                ? 'border-blue-300 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onFocus={() => setFocusedSection(1)}
            onBlur={() => setFocusedSection(null)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    completedSections.has(1) ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Info Produk</CardTitle>
                    <CardDescription>Nama dan brand produk kosmetik</CardDescription>
                  </div>
                </div>
                {completedSections.has(1) && (
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Nama Produk</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama produk"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand</Label>
                  <Input 
                    id="brand" 
                    name="brand" 
                    value={formData.brand} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Masukkan nama brand"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Detail Tambahan */}
          <Card 
            className={`group transition-all duration-300 hover:shadow-xl border-2 ${
              completedSections.has(2) 
                ? 'border-green-200 bg-green-50/30' 
                : focusedSection === 2 
                ? 'border-blue-300 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onFocus={() => setFocusedSection(2)}
            onBlur={() => setFocusedSection(null)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    completedSections.has(2) ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    <Beaker className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Detail Tambahan</CardTitle>
                    <CardDescription>Target pengguna, kandungan alkohol, dan harga</CardDescription>
                  </div>
                </div>
                {completedSections.has(2) && (
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="suitable_for" className="text-sm font-medium text-gray-700">Suitable For</Label>
                  <Input 
                    id="suitable_for" 
                    name="suitable_for" 
                    value={formData.suitable_for} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Semua jenis kulit"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alcohol_content" className="text-sm font-medium text-gray-700">Alcohol Content</Label>
                  <Select onValueChange={handleSelectChange} value={formData.alcohol_content}>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <SelectValue placeholder="Pilih kandungan alkohol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yes">Mengandung Alkohol</SelectItem>
                      <SelectItem value="No">Bebas Alkohol</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-sm font-medium text-gray-700">Harga (Rp)</Label>
                  <Input 
                    id="price" 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="150000"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Link Produk */}
          <Card 
            className={`group transition-all duration-300 hover:shadow-xl border-2 ${
              completedSections.has(3) 
                ? 'border-green-200 bg-green-50/30' 
                : focusedSection === 3 
                ? 'border-blue-300 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onFocus={() => setFocusedSection(3)}
            onBlur={() => setFocusedSection(null)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    completedSections.has(3) ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Link Produk</CardTitle>
                    <CardDescription>Gambar dan tautan ke halaman produk eksternal</CardDescription>
                  </div>
                </div>
                {completedSections.has(3) && (
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image_url" className="text-sm font-medium text-gray-700">Image URL</Label>
                  <Input 
                    id="image_url" 
                    name="image_url" 
                    type="url" 
                    value={formData.image_url} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="external_url" className="text-sm font-medium text-gray-700">External URL</Label>
                  <Input 
                    id="external_url" 
                    name="external_url" 
                    type="url" 
                    value={formData.external_url} 
                    onChange={handleChange} 
                    required 
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://tokopedia.com/product"
                  />
                </div>
              </div>
              {formData.image_url && (
                <div className="mt-4">
                  <img 
                    src={formData.image_url} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200 transition-transform hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 4: Komposisi */}
          <Card 
            className={`group transition-all duration-300 hover:shadow-xl border-2 ${
              completedSections.has(4) 
                ? 'border-green-200 bg-green-50/30' 
                : focusedSection === 4 
                ? 'border-blue-300 shadow-lg' 
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onFocus={() => setFocusedSection(4)}
            onBlur={() => setFocusedSection(null)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg transition-colors ${
                    completedSections.has(4) ? 'bg-green-100 text-green-600' : 'bg-teal-100 text-teal-600'
                  }`}>
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Komposisi Bahan</CardTitle>
                    <CardDescription>Ingredients dan kandungan utama produk</CardDescription>
                  </div>
                </div>
                {completedSections.has(4) && (
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                id="ingredients"
                name="ingredients"
                rows={4}
                value={formData.ingredients}
                onChange={handleChange}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Contoh: Aqua, Glycerin, Niacinamide, Hyaluronic Acid, Vitamin C, dll..."
              />
            </CardContent>
          </Card>

          {/* Preview Section */}
          {isFormValid && (
            <Card className="border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-lg">
                      <Eye className="w-5 h-5 text-indigo-600" />
                    </div>
                    <CardTitle className="text-xl text-indigo-900">Preview Produk</CardTitle>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  >
                    {showPreview ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                    {showPreview ? 'Sembunyikan' : 'Tampilkan'}
                  </Button>
                </div>
              </CardHeader>
              {showPreview && (
                <CardContent className="bg-white rounded-lg mx-6 mb-6 p-4 border">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      {formData.image_url && (
                        <img 
                          src={formData.image_url} 
                          alt={formData.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900">{formData.name}</h3>
                      <p className="text-gray-600">Brand: {formData.brand}</p>
                      <p className="text-2xl font-bold text-green-600">Rp {parseInt(formData.price || "0").toLocaleString('id-ID')}</p>
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Suitable for: {formData.suitable_for}</p>
                        <p>Alcohol: {formData.alcohol_content === 'Yes' ? 'Mengandung' : 'Bebas'}</p>
                      </div>
                      <p className="text-sm text-gray-700">{formData.ingredients}</p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}

          {/* Action Buttons */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-sm text-gray-600">
                  {!isFormValid && (
                    <div className="flex items-center space-x-2 text-amber-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Lengkapi semua section untuk melanjutkan</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={resetForm}
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={!isFormValid || isSubmitting}
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-lg transition-all duration-200 disabled:opacity-50 min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Uploading...
                      </div>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Upload Produk
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UploadProdukPage;