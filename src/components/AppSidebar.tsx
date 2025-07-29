
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  Home,
  ShoppingBag,
  BarChart3,
  Star,
  DollarSign,
  Palette,
  Shield,
  Upload
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  {
    title: 'Beranda',
    url: '/',
    icon: Home,
  },
  
  {
    title: 'produk-v2',
    url: '/produkNew',
    icon: ShoppingBag,
  },


  {
    title: 'upload',
    url: '/upload',
    icon: Upload,
  }

  
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-yellow-200">
      <SidebarHeader className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
          <img src="/logo.ico" alt="Logo" className="h-10 w-10 object-cover rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Beaulytics Admin</h1>
            <p className="text-sm text-gray-500">Dashboard</p>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.url}
                      className="w-full mb-1"
                    >
                      <Link 
                        to={item.url}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                          location.pathname === item.url
                            ? 'bg-yellow-500 text-white shadow-md'
                            : 'text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </motion.div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-xs text-gray-500"
        >
          <p>© 2024 Beauty Admin</p>
          <p>Version 1.0.0</p>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  );
}
