
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  Eye,
  Heart,
  MessageCircle,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  ChevronDown
} from 'lucide-react';
import ReactECharts from 'echarts-for-react';

const statsCards = [
  {
    title: 'Total Tayangan',
    value: '2.4M',
    change: '+12.5%',
    trend: 'up',
    icon: Eye,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Total Likes',
    value: '156K',
    change: '+8.2%',
    trend: 'up',
    icon: Heart,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    title: 'Komentar',
    value: '23.5K',
    change: '+15.3%',
    trend: 'up',
    icon: MessageCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Penjualan',
    value: '48.2K',
    change: '-2.1%',
    trend: 'down',
    icon: ShoppingCart,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
];

const recentActivities = [
  { user: 'Sarah K.', action: 'membeli Lipstik Matte Red', time: '2 menit lalu', amount: 'Rp 150,000' },
  { user: 'Dewi M.', action: 'memberikan review 5 bintang', time: '5 menit lalu', amount: '' },
  { user: 'Rina P.', action: 'membeli Foundation Natural', time: '8 menit lalu', amount: 'Rp 280,000' },
  { user: 'Lisa A.', action: 'menambahkan ke wishlist', time: '12 menit lalu', amount: '' },
  { user: 'Maya S.', action: 'membeli Serum Vitamin C', time: '15 menit lalu', amount: 'Rp 320,000' },
];

export default function Beranda() {
  const [selectedPeriod, setSelectedPeriod] = useState('7 Hari Terakhir');

  // Data yang berubah berdasarkan periode yang dipilih
  const getDataForPeriod = (period: string) => {
    const dataMap = {
      'Hari Ini': {
        sales: [5000, 7000, 6000, 8000, 9000, 7500, 8500],
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
      },
      '7 Hari Terakhir': {
        sales: [12000, 15000, 18000, 22000, 25000, 28000, 32000],
        labels: ['1', '2', '3', '4', '5', '6', '7']
      },
      '30 Hari Terakhir': {
        sales: [120000, 150000, 180000, 220000, 250000, 280000, 320000],
        labels: ['1', '5', '10', '15', '20', '25', '30']
      },
      '3 Bulan Terakhir': {
        sales: [1200000, 1500000, 1800000, 2200000, 2500000, 2800000, 3200000],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      }
    };
    return dataMap[period as keyof typeof dataMap] || dataMap['7 Hari Terakhir'];
  };

  const currentData = getDataForPeriod(selectedPeriod);

  const salesChartOption = {
    title: {
      text: `Tren Penjualan ${selectedPeriod}`,
      textStyle: { fontSize: 14, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: Rp {c}'
    },
    xAxis: {
      type: 'category',
      data: currentData.labels,
      axisLabel: { fontSize: 10 }
    },
    yAxis: {
      type: 'value',
      axisLabel: { 
        fontSize: 10,
        formatter: (value: number) => `${value/1000}K`
      }
    },
    series: [{
      data: currentData.sales,
      type: 'line',
      smooth: true,
      lineStyle: { color: '#FFC107', width: 3 },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(255, 193, 7, 0.3)' },
            { offset: 1, color: 'rgba(255, 193, 7, 0.05)' }
          ]
        }
      },
      itemStyle: { color: '#FFC107' }
    }],
    grid: { left: 50, right: 30, bottom: 30, top: 50 }
  };

  const categoryChartOption = {
    title: {
      text: 'Kategori Produk Terlaris',
      textStyle: { fontSize: 14, fontWeight: 'normal' }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [{
      name: 'Kategori',
      type: 'pie',
      radius: ['40%', '70%'],
      data: [
        { value: 35, name: 'Lipstik', itemStyle: { color: '#FF6B6B' } },
        { value: 28, name: 'Foundation', itemStyle: { color: '#4ECDC4' } },
        { value: 22, name: 'Eyeshadow', itemStyle: { color: '#45B7D1' } },
        { value: 15, name: 'Serum', itemStyle: { color: '#FFC107' } },
      ],
      label: { fontSize: 10 },
      labelLine: { length: 10, length2: 5 }
    }]
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
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Beranda</h1>
          <p className="text-gray-600 mt-1">Selamat datang kembali! Berikut ringkasan bisnis Anda hari ini.</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {selectedPeriod}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSelectedPeriod('Hari Ini')}>
              Hari Ini
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod('7 Hari Terakhir')}>
              7 Hari Terakhir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod('30 Hari Terakhir')}>
              30 Hari Terakhir
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSelectedPeriod('3 Bulan Terakhir')}>
              3 Bulan Terakhir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Analisis Penjualan</CardTitle>
              <CardDescription>Tren penjualan dan performa produk</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sales" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="sales">Penjualan</TabsTrigger>
                  <TabsTrigger value="category">Kategori</TabsTrigger>
                </TabsList>
                <TabsContent value="sales" className="mt-4">
                  <ReactECharts option={salesChartOption} style={{ height: '300px' }} />
                </TabsContent>
                <TabsContent value="category" className="mt-4">
                  <ReactECharts option={categoryChartOption} style={{ height: '300px' }} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Aktivitas Terbaru</CardTitle>
              <CardDescription>Transaksi dan interaksi pelanggan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        <span className="font-semibold">{activity.user}</span> {activity.action}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-500">{activity.time}</p>
                        {activity.amount && (
                          <p className="text-xs font-semibold text-green-600">{activity.amount}</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
