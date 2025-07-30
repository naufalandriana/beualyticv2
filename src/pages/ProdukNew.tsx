import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  PlusIcon, PencilIcon, TrashIcon, PhotoIcon, MagnifyingGlassIcon, TagIcon
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  brand: string;
  ingredients: string;
  suitable_for: string;
  alcohol_content: string;
  price: number;
  image_url: string;
  external_url: string;
  category: string;
}

export default function Produk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const categories = [
    { value: 'all', label: 'Semua Kategori' },
    { value: 'serum', label: 'Serum' },
    { value: 'cream', label: 'Cream' },
    { value: 'cleanser', label: 'Cleanser' },
    { value: 'toner', label: 'Toner' }
  ];

  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: '',
    ingredients: '',
    suitable_for: '',
    alcohol_content: '',
    price: '',
    image_url: '',
    external_url: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/productsv2')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Fetch produk gagal:', err);
        toast({ title: 'Error fetch produk', description: err.message, variant: 'destructive' });
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        price: parseInt(formData.price),
      };

      if (editingProduct) {
        const res = await axios.put(`http://localhost:5000/api/productsv2/${editingProduct.id}`, payload);
        setProducts(products.map(p => p.id === res.data.id ? res.data : p));
        toast({ title: "Produk diperbarui", description: "Berhasil edit produk." });
      } else {
        const res = await axios.post('http://localhost:5000/api/productsv2', payload);
        setProducts([res.data, ...products]);
        toast({ title: 'Produk ditambahkan!', description: res.data.name });
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (err: any) {
      console.error('Gagal submit:', err);
      toast({
        title: 'Gagal simpan',
        description: err.response?.data?.error || err.message,
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      brand: prod.brand,
      category: prod.category,
      ingredients: prod.ingredients,
      suitable_for: prod.suitable_for,
      alcohol_content: prod.alcohol_content,
      price: prod.price.toString(),
      image_url: prod.image_url,
      external_url: prod.external_url,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/productsv2/${id}`);
      setProducts(products.filter(p => p.id !== id));
      toast({ title: 'Produk berhasil dihapus!' });
    } catch (err: any) {
      toast({
        title: 'Gagal menghapus produk',
        description: err.response?.data?.error || err.message,
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      brand: '',
      category: '',
      ingredients: '',
      suitable_for: '',
      alcohol_content: '',
      price: '',
      image_url: '',
      external_url: '',
    });
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  const getCategoryColor = (category: string) => {
    const colors = {
      'serum': 'bg-blue-100 text-blue-800 border-blue-200',
      'cream': 'bg-pink-100 text-pink-800 border-pink-200',
      'cleanser': 'bg-green-100 text-green-800 border-green-200',
      'toner': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCategoryStats = () => {
    return categories.slice(1).map(cat => ({
      ...cat,
      count: products.filter(p => p.category === cat.value).length
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk Kosmetik</h1>
          <p className="text-gray-600 mt-1">Kelola data produk berdasarkan tabel database</p>
        </div>
        <a href="/upload">
          <Button className="bg-yellow-500 hover:bg-yellow-600 gap-2">
            <PlusIcon className="h-4 w-4" /> Tambah Produk
          </Button>
        </a>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-6 gap-6">
        
        {/* Search Bar */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Cari produk atau brand..." className="pl-10"
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <Card className="md:col-span-2">
          <CardContent className="p-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center space-x-2">
                      <TagIcon className="w-4 h-4" />
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold">{products.length}</p>
              <p className="text-sm">Total Produk</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Filtered Results */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{filteredProducts.length}</p>
              <p className="text-sm">Ditampilkan</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Statistics */}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        <Card>
          <CardHeader>
            <CardTitle>Daftar Produk Kosmetik</CardTitle>
            <CardDescription>
              Menampilkan {filteredProducts.length} produk
              {categoryFilter !== 'all' && ` dalam kategori ${categories.find(c => c.value === categoryFilter)?.label}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Produk</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Kategori</TableHead>
                    <TableHead>Harga</TableHead>
                    <TableHead>Suitable For</TableHead>
                    <TableHead>Alcohol</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map(prod => (
                    <TableRow key={prod.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img src={prod.image_url} alt={prod.name} className="w-12 h-12 object-cover rounded" />
                          <div>
                            <p className="font-medium">{prod.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">{prod.ingredients}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{prod.brand}</TableCell>
                      <TableCell>
                        <Badge className={`${getCategoryColor(prod.category)} border`}>
                          {prod.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatPrice(prod.price)}</TableCell>
                      <TableCell><Badge variant="outline">{prod.suitable_for}</Badge></TableCell>
                      <TableCell>
                        <Badge className={prod.alcohol_content.toLowerCase() === 'no' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'}>
                          {prod.alcohol_content === 'No' ? 'Bebas Alkohol' : 'Mengandung Alkohol'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a href={prod.external_url} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-800">
                          Link
                        </a>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(prod)}>
                            <PencilIcon className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(prod.id)}>
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Edit/Add Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                {editingProduct ? 'Edit Produk' : 'Tambah Produk'}
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500">
                {editingProduct
                  ? 'Ubah informasi produk berikut.'
                  : 'Masukkan data produk baru.'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="name">Nama Produk</Label>
                <Input
                  id="name"
                  placeholder="Masukkan nama produk"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  placeholder="Contoh: Lux, Dove"
                  value={formData.brand}
                  onChange={e => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori produk" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center space-x-2">
                          <TagIcon className="w-4 h-4" />
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="suitable_for">Suitable For</Label>
                <Input
                  id="suitable_for"
                  placeholder="Contoh: Kulit kering, pria"
                  value={formData.suitable_for}
                  onChange={e => setFormData({ ...formData, suitable_for: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea
                  id="ingredients"
                  placeholder="Bahan-bahan produk"
                  className="min-h-[100px]"
                  value={formData.ingredients}
                  onChange={e => setFormData({ ...formData, ingredients: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="alcohol_content">Alcohol Content</Label>
                <Select value={formData.alcohol_content} onValueChange={(value) => setFormData({ ...formData, alcohol_content: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kandungan alkohol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">Bebas Alkohol</SelectItem>
                    <SelectItem value="yes">Mengandung Alkohol</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="price">Harga</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Contoh: 15000"
                  value={formData.price}
                  onChange={e => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image_url}
                  onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="external_url">External URL</Label>
                <Input
                  id="external_url"
                  placeholder="https://example.com/product"
                  value={formData.external_url}
                  onChange={e => setFormData({ ...formData, external_url: e.target.value })}
                  required
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                  Batal
                </Button>
                <Button type="submit">
                  {editingProduct ? 'Simpan Perubahan' : 'Tambah Produk'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
