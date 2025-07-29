
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ChevronDown,
  TrendingUp,
  Users,
  ShoppingCart,
  DollarSign,
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const customerData = [
  { name: 'Sarah Kusuma', email: 'sarah.k@email.com', orders: 12, spent: 2450000, lastOrder: '2 hari lalu' },
  { name: 'Dewi Maharani', email: 'dewi.m@email.com', orders: 8, spent: 1890000, lastOrder: '5 hari lalu' },
  { name: 'Rina Pertiwi', email: 'rina.p@email.com', orders: 15, spent: 3200000, lastOrder: '1 hari lalu' },
  { name: 'Lisa Andari', email: 'lisa.a@email.com', orders: 6, spent: 1250000, lastOrder: '1 minggu lalu' },
  { name: 'Maya Sari', email: 'maya.s@email.com', orders: 10, spent: 2100000, lastOrder: '3 hari lalu' },
];

const topProducts = [
  { name: 'Lipstik Matte Red', sales: 245, revenue: 36750000 },
  { name: 'Foundation Natural', sales: 189, revenue: 52920000 },
  { name: 'Serum Vitamin C', sales: 156, revenue: 49920000 },
  { name: 'Eyeshadow Palette', sales: 134, revenue: 33500000 },
  { name: 'Mascara Waterproof', sales: 98, revenue: 19600000 },
];

export default function Analitik() {
  const [timeframe, setTimeframe] = useState('30 Hari Terakhir');

  const revenueChartOption = {
    title: {
      text: 'Tren Pendapatan Harian',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params: any) => {
        return `${params[0].axisValue}<br/>Pendapatan: Rp ${params[0].value.toLocaleString('id-ID')}`;
      }
    },
    xAxis: {
      type: 'category',
      data: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value/1000000}M`
      }
    },
    series: [{
      data: [2500000, 3200000, 2800000, 4100000, 3900000, 5200000, 4800000],
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: '#FFC107' },
            { offset: 1, color: '#FFB300' }
          ]
        }
      },
      barWidth: '60%'
    }],
    grid: { left: 60, right: 30, bottom: 50, top: 60 }
  };

  const customerGrowthOption = {
    title: {
      text: 'Pertumbuhan Pelanggan',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Pelanggan Baru',
        type: 'line',
        data: [120, 150, 180, 220, 280, 350],
        lineStyle: { color: '#4ECDC4', width: 3 },
        itemStyle: { color: '#4ECDC4' },
        smooth: true
      },
      {
        name: 'Pelanggan Aktif',
        type: 'line',
        data: [800, 850, 920, 980, 1100, 1250],
        lineStyle: { color: '#FFC107', width: 3 },
        itemStyle: { color: '#FFC107' },
        smooth: true
      }
    ],
    legend: {
      bottom: 0
    },
    grid: { left: 50, right: 30, bottom: 60, top: 60 }
  };

  const salesByChannelOption = {
    title: {
      text: 'Penjualan per Saluran',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: Rp {c} ({d}%)'
    },
    series: [{
      name: 'Saluran',
      type: 'pie',
      radius: ['50%', '80%'],
      data: [
        { value: 45000000, name: 'Website', itemStyle: { color: '#FFC107' } },
        { value: 32000000, name: 'Instagram', itemStyle: { color: '#FF6B6B' } },
        { value: 28000000, name: 'TikTok', itemStyle: { color: '#4ECDC4' } },
        { value: 18000000, name: 'WhatsApp', itemStyle: { color: '#45B7D1' } },
        { value: 12000000, name: 'Marketplace', itemStyle: { color: '#96CEB4' } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        formatter: '{b}\n{d}%'
      }
    }]
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
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
          <h1 className="text-3xl font-bold text-gray-900">Analitik Bisnis</h1>
          <p className="text-gray-600 mt-1">Analisis mendalam performa penjualan dan pelanggan</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {timeframe}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTimeframe('7 Hari Terakhir')}>
              7 Hari Terakhir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeframe('30 Hari Terakhir')}>
              30 Hari Terakhir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeframe('3 Bulan Terakhir')}>
              3 Bulan Terakhir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTimeframe('6 Bulan Terakhir')}>
              6 Bulan Terakhir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Pendapatan',
            value: 'Rp 127.5M',
            change: '+23.5%',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Total Pelanggan',
            value: '1,248',
            change: '+18.2%',
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Total Pesanan',
            value: '2,847',
            change: '+15.7%',
            icon: ShoppingCart,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
          {
            title: 'Rata-rata Nilai Pesanan',
            value: 'Rp 448K',
            change: '+8.3%',
            icon: TrendingUp,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      <span className="text-sm font-medium text-green-600">{metric.change}</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Analisis Pendapatan</CardTitle>
              <CardDescription>Tren pendapatan harian dalam minggu terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={revenueChartOption} style={{ height: '350px' }} />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Penjualan per Saluran</CardTitle>
              <CardDescription>Distribusi penjualan berdasarkan platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={salesByChannelOption} style={{ height: '350px' }} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Analisis Detail</CardTitle>
            <CardDescription>Data mendalam tentang pelanggan dan produk</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="customers" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="customers">Pelanggan Teratas</TabsTrigger>
                <TabsTrigger value="products">Produk Terlaris</TabsTrigger>
                <TabsTrigger value="growth">Pertumbuhan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="customers" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Total Pesanan</TableHead>
                      <TableHead>Total Belanja</TableHead>
                      <TableHead>Terakhir Belanja</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerData.map((customer, index) => (
                      <TableRow key={customer.email}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.name}`} />
                              <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{customer.name}</p>
                              <p className="text-sm text-gray-500">{customer.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{customer.orders}</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(customer.spent)}
                        </TableCell>
                        <TableCell className="text-gray-500">{customer.lastOrder}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="products" className="mt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produk</TableHead>
                      <TableHead>Penjualan</TableHead>
                      <TableHead>Pendapatan</TableHead>
                      <TableHead>Persentase</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={product.name}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.sales} unit</TableCell>
                        <TableCell className="font-medium text-green-600">
                          {formatCurrency(product.revenue)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full" 
                                style={{ width: `${(product.sales / 245) * 100}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.round((product.sales / 245) * 100)}%
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="growth" className="mt-6">
                <ReactECharts option={customerGrowthOption} style={{ height: '400px' }} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
