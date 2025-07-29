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
  PlusIcon, PencilIcon, TrashIcon, PhotoIcon, MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  image: string;
  description: string;
}

export default function Produk() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setProducts(res.data))
      .catch(err => {
        console.error('Fetch produk gagal:', err);
        toast({ title: 'Error fetch produk', description: err.message, variant: 'destructive' });
      });
  }, []);

  const [formData, setFormData] = useState({
    name: '', category: '', price: '', stock: '',
    description: '', status: 'active' as 'active' | 'inactive',
  });

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
    || p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, {
          name: formData.name,
          category: formData.category,
          price: formData.price,
          stock: formData.stock,
          description: formData.description,
        })
        .then(res => {
          // update state lokal
          setProducts(products.map(p => p.id === res.data.id ? res.data : p));
          toast({ title: "Produk diperbarui", description: "Berhasil edit produk." });
        })
        .catch(err => {
          toast({ title: "Gagal edit produk", description: err.message });
        });
      } else {
        const res = await axios.post('http://localhost:5000/api/products', {
          name: formData.name,
          category: formData.category,
          price: parseInt(formData.price),
          stock: parseInt(formData.stock),
          description: formData.description,
          status: formData.status,
        });
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

  const resetForm = () => {
    setFormData({ name: '', category: '', price: '', stock: '', description: '', status: 'active' });
    setEditingProduct(null);
  };

  const handleEdit = (prod: Product) => {
  const adjustedStatus = prod.stock === 0 ? 'inactive' : prod.status;

  setEditingProduct(prod);
  setFormData({
    name: prod.name,
    category: prod.category,
    price: prod.price.toString(),
    stock: prod.stock.toString(),
    description: prod.description,
    status: adjustedStatus,
  });
  setIsDialogOpen(true);
};
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter(p => p.id !== id)); // update state hilangkan produk yg dihapus
      toast({ title: 'Produk berhasil dihapus!' });
    } catch (err: any) {
      toast({
        title: 'Gagal menghapus produk',
        description: err.response?.data?.error || err.message,
        variant: 'destructive',
      });
    }
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(price);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Produk</h1>
          <p className="text-gray-600 mt-1">Kelola katalog kosmetik</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 gap-2" onClick={resetForm}>
              <PlusIcon className="h-4 w-4" /> Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingProduct ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
              <DialogDescription>{editingProduct ? 'Update info produk' : 'Tambah produk baru'}</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2"><Label htmlFor="name">Nama Produk</Label>
                <Input id="name" required value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
              <div className="space-y-2"><Label htmlFor="category">Kategori</Label>
                <Input id="category" required value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="price">Harga (Rp)</Label>
                  <Input id="price" type="number" required value={formData.price}
                    onChange={e => setFormData({ ...formData, price: e.target.value })} /></div>
                <div className="space-y-2"><Label htmlFor="stock">Stok</Label>
                  <Input id="stock" type="number" required value={formData.stock}
                    onChange={e => setFormData({ ...formData, stock: e.target.value })} /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" rows={3} value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })} /></div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                <Button type="submit" className="bg-yellow‑500 hover:bg‑yellow‑600">
                  {editingProduct ? 'Perbarui' : 'Tambah'} Produk
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Search & Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-4"><div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform –translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Cari produk..." className="pl-10"
              value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div></CardContent>
        </Card>
        <Card><CardContent className="p-4"><div className="text-center">
          <p className="text-2xl font-bold">{products.length}</p><p className="text-sm">Total Produk</p>
        </div></CardContent></Card>
        <Card><CardContent className="p-4"><div className="text-center">
          <p className="text-2xl font-bold text-green-600">{products.filter(p => p.status === 'active' && p.stock > 0).length}</p>
          <p className="text-sm">Produk Aktif</p>
        </div></CardContent></Card>
      </motion.div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}>
        <Card><CardHeader><CardTitle>Daftar Produk</CardTitle>
          <CardDescription>Menampilkan {filteredProducts.length} dari {products.length} produk</CardDescription>
        </CardHeader><CardContent>
          <Table><TableHeader><TableRow>
            <TableHead>Produk</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Harga</TableHead>
            <TableHead>Stok</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow></TableHeader><TableBody>
            {filteredProducts.map((prod, idx) => (
              <motion.tr key={prod.id} initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + idx*0.05 }}
                className="hover:bg-gray-50">
                <TableCell><div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <PhotoIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div><p className="font-medium">{prod.name}</p>
                    <p className="text-sm text-gray-500 line-clamp-1">{prod.description}</p></div>
                </div></TableCell>
                <TableCell><Badge variant="secondary">{prod.category}</Badge></TableCell>
                <TableCell className="font-medium">{formatPrice(prod.price)}</TableCell>
                <TableCell><span className={`font-medium ${
                  prod.stock === 0 ? 'text-red-600' : prod.stock < 10 ? 'text-yellow-600' : 'text-green-600'}`}>
                  {prod.stock}
                </span></TableCell>
                <TableCell>
                  {(() => {
                    const status = prod.stock === 0 ? 'inactive' : prod.status;
                    return (
                      <Badge
                        variant={status === 'active' ? 'default' : 'secondary'}
                        className={status === 'active' ? 'bg-green-500' : ''}
                      >
                        {status === 'active' ? 'Aktif' : 'Nonaktif'}
                      </Badge>
                    );
                  })()}
                </TableCell>
                <TableCell><div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(prod)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(prod.id)}>
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div></TableCell>
              </motion.tr>
            ))}
          </TableBody></Table>
        </CardContent></Card>
      </motion.div>
    </div>
  );
}
