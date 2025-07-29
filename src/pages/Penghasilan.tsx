
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ChevronDown,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Download,
  Calendar,
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

interface Transaction {
  id: string;
  date: string;
  customer: string;
  products: string[];
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  paymentMethod: string;
}

const transactionsData: Transaction[] = [
  {
    id: 'TRX-001',
    date: '2024-01-15',
    customer: 'Sarah Kusuma',
    products: ['Lipstik Matte Red', 'Serum Vitamin C'],
    amount: 470000,
    status: 'completed',
    paymentMethod: 'Transfer Bank'
  },
  {
    id: 'TRX-002',
    date: '2024-01-14',
    customer: 'Dewi Maharani',
    products: ['Foundation Natural'],
    amount: 280000,
    status: 'completed',
    paymentMethod: 'E-Wallet'
  },
  {
    id: 'TRX-003',
    date: '2024-01-14',
    customer: 'Rina Pertiwi',
    products: ['Eyeshadow Palette', 'Lipstik Matte Red'],
    amount: 400000,
    status: 'pending',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'TRX-004',
    date: '2024-01-13',
    customer: 'Lisa Andari',
    products: ['Serum Vitamin C'],
    amount: 320000,
    status: 'completed',
    paymentMethod: 'Transfer Bank'
  },
  {
    id: 'TRX-005',
    date: '2024-01-13',
    customer: 'Maya Sari',
    products: ['Foundation Natural', 'Eyeshadow Palette'],
    amount: 530000,
    status: 'cancelled',
    paymentMethod: 'E-Wallet'
  }
];

export default function Penghasilan() {
  const [timeframe, setTimeframe] = useState('30 Hari Terakhir');
  const [transactions] = useState<Transaction[]>(transactionsData);

  const totalRevenue = 127500000;
  const monthlyGrowth = 23.5;
  const completedTransactions = transactions.filter(t => t.status === 'completed');
  const totalTransactions = completedTransactions.length;
  const averageOrderValue = completedTransactions.reduce((acc, t) => acc + t.amount, 0) / totalTransactions;

  const revenueChartOption = {
    title: {
      text: 'Tren Pendapatan Bulanan',
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
      data: ['Aug', 'Sep', 'Okt', 'Nov', 'Des', 'Jan'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) => `${value/1000000}M`
      }
    },
    series: [{
      data: [45000000, 52000000, 48000000, 67000000, 78000000, 127500000],
      type: 'line',
      smooth: true,
      lineStyle: { color: '#FFC107', width: 4 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 193, 7, 0.4)' },
            { offset: 1, color: 'rgba(255, 193, 7, 0.05)' }
          ]
        }
      },
      itemStyle: { color: '#FFC107', borderWidth: 3, borderColor: '#fff' }
    }],
    grid: { left: 60, right: 30, bottom: 50, top: 60 }
  };

  const paymentMethodChartOption = {
    title: {
      text: 'Metode Pembayaran',
      textStyle: { fontSize: 16, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} transaksi ({d}%)'
    },
    series: [{
      name: 'Metode Pembayaran',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 45, name: 'Transfer Bank', itemStyle: { color: '#FFC107' } },
        { value: 32, name: 'E-Wallet', itemStyle: { color: '#4ECDC4' } },
        { value: 23, name: 'Credit Card', itemStyle: { color: '#FF6B6B' } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  };

  const dailyRevenueOption = {
    title: {
      text: 'Pendapatan Harian (7 Hari Terakhir)',
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
      barWidth: '50%'
    }],
    grid: { left: 60, right: 30, bottom: 50, top: 60 }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Selesai</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Dibatalkan</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Laporan Penghasilan</h1>
          <p className="text-gray-600 mt-1">Analisis detail pendapatan dan transaksi bisnis</p>
        </div>

        <div className="flex space-x-3">
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

          <Button className="bg-yellow-500 hover:bg-yellow-600 gap-2">
            <Download className="h-4 w-4" />
            Export Laporan
          </Button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Pendapatan',
            value: formatCurrency(totalRevenue),
            change: `+${monthlyGrowth}%`,
            trend: 'up',
            icon: DollarSign,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
          },
          {
            title: 'Transaksi Berhasil',
            value: totalTransactions.toString(),
            change: '+18.2%',
            trend: 'up',
            icon: Calendar,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
          },
          {
            title: 'Rata-rata Nilai Order',
            value: formatCurrency(averageOrderValue),
            change: '+8.3%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
          },
          {
            title: 'Pertumbuhan Bulanan',
            value: `${monthlyGrowth}%`,
            change: '+4.1%',
            trend: 'up',
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.change}
                      </span>
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

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Analisis Pendapatan</CardTitle>
            <CardDescription>Tren pendapatan dan metode pembayaran</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="monthly" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="monthly">Bulanan</TabsTrigger>
                <TabsTrigger value="daily">Harian</TabsTrigger>
                <TabsTrigger value="payment">Metode Bayar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="mt-6">
                <ReactECharts option={revenueChartOption} style={{ height: '400px' }} />
              </TabsContent>
              
              <TabsContent value="daily" className="mt-6">
                <ReactECharts option={dailyRevenueOption} style={{ height: '400px' }} />
              </TabsContent>
              
              <TabsContent value="payment" className="mt-6">
                <ReactECharts option={paymentMethodChartOption} style={{ height: '400px' }} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>
              Daftar transaksi terbaru dan statusnya
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID Transaksi</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Metode Bayar</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('id-ID')}
                    </TableCell>
                    <TableCell className="font-medium">
                      {transaction.customer}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {transaction.products.slice(0, 2).map((product, idx) => (
                          <div key={idx} className="text-sm text-gray-600">
                            {product}
                          </div>
                        ))}
                        {transaction.products.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{transaction.products.length - 2} lainnya
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-green-600">
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {transaction.paymentMethod}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(transaction.status)}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
