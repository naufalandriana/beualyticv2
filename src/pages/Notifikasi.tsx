
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Bell, 
  Check, 
  X, 
  ShoppingCart, 
  Star, 
  MessageCircle, 
  TrendingUp,
  AlertCircle,
  Filter
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'Pesanan Baru',
    message: 'Sarah K. memesan Lipstik Matte Red',
    time: '2 menit lalu',
    read: false,
    icon: ShoppingCart,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 2,
    type: 'review',
    title: 'Ulasan Baru',
    message: 'Dewi M. memberikan rating 5 bintang untuk Foundation Natural',
    time: '5 menit lalu',
    read: false,
    icon: Star,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    id: 3,
    type: 'comment',
    title: 'Komentar Baru',
    message: 'Ada 3 komentar baru di produk Serum Vitamin C',
    time: '10 menit lalu',
    read: true,
    icon: MessageCircle,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 4,
    type: 'analytics',
    title: 'Laporan Analitik',
    message: 'Penjualan bulan ini meningkat 15% dari bulan lalu',
    time: '1 jam lalu',
    read: true,
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    id: 5,
    type: 'alert',
    title: 'Stok Menipis',
    message: 'Foundation Natural tersisa 5 unit, pertimbangkan untuk restock',
    time: '2 jam lalu',
    read: false,
    icon: AlertCircle,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  }
];

export default function Notifikasi() {
  const [filter, setFilter] = useState<string>('all');
  const [notificationList, setNotificationList] = useState(notifications);

  const unreadCount = notificationList.filter(n => !n.read).length;

  const filteredNotifications = filter === 'all' 
    ? notificationList 
    : notificationList.filter(n => n.type === filter);

  const markAsRead = (id: number) => {
    setNotificationList(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationList(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationList(prev =>
      prev.filter(notification => notification.id !== id)
    );
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
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Bell className="h-8 w-8" />
            Notifikasi
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-gray-600 mt-1">Kelola notifikasi dan pemberitahuan terbaru</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter('all')}>
                Semua Notifikasi
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('order')}>
                Pesanan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('review')}>
                Ulasan
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('comment')}>
                Komentar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('analytics')}>
                Analitik
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('alert')}>
                Peringatan
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} className="gap-2">
              <Check className="h-4 w-4" />
              Tandai Semua Dibaca
            </Button>
          )}
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-2">
        {filteredNotifications.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada notifikasi</h3>
              <p className="text-gray-500">Semua notifikasi sudah dibaca atau dihapus</p>
            </CardContent>
          </Card>
        ) : (
          filteredNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`hover:shadow-md transition-all ${
                !notification.read ? 'bg-yellow-50 border-yellow-200' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${notification.bgColor}`}>
                      <notification.icon className={`h-5 w-5 ${notification.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.read ? 'text-gray-900' : 'text-gray-700'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">
                            {notification.time}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => markAsRead(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteNotification(notification.id)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
