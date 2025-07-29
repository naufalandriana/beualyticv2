import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp, MessageCircle, Filter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const reviews = [
  {
    id: 1,
    user: 'Sarah K.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b04c?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    date: '2 hari lalu',
    comment: 'Lipstik ini benar-benar bagus! Warnanya tahan lama dan tidak membuat bibir kering. Sangat recommend!',
    product: {
      name: 'Lipstik Matte Red',
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=80&h=80&fit=crop',
      price: 'Rp 150,000'
    },
    likes: 12,
    helpful: true
  },
  {
    id: 2,
    user: 'Dewi M.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    date: '5 hari lalu',
    comment: 'Foundation ini coverage-nya bagus, tapi agak sedikit cakey di area T-zone. Overall masih oke sih.',
    product: {
      name: 'Foundation Natural',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop',
      price: 'Rp 280,000'
    },
    likes: 8,
    helpful: false
  },
  {
    id: 3,
    user: 'Rina P.',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e63?w=32&h=32&fit=crop&crop=face',
    rating: 3,
    date: '8 hari lalu',
    comment: 'Serum ini lumayan melembabkan, tapi efek cerahnya kurang terlihat. Mungkin harus dipakai lebih lama.',
    product: {
      name: 'Serum Vitamin C',
      image: 'https://images.unsplash.com/photo-1626200456457-4c7392973115?w=80&h=80&fit=crop',
      price: 'Rp 320,000'
    },
    likes: 5,
    helpful: false
  },
  {
    id: 4,
    user: 'Lisa A.',
    avatar: 'https://images.unsplash.com/photo-1507038366474-4a63e2b9a3c1?w=32&h=32&fit=crop&crop=face',
    rating: 5,
    date: '12 hari lalu',
    comment: 'Eyeshadow palet ini warnanya cantik-cantik banget! Pigmentasinya juga bagus dan mudah diblend.',
    product: {
      name: 'Eyeshadow Glamour',
      image: 'https://images.unsplash.com/photo-1614741118874-45f585758a1f?w=80&h=80&fit=crop',
      price: 'Rp 450,000'
    },
    likes: 15,
    helpful: true
  },
  {
    id: 5,
    user: 'Maya S.',
    avatar: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=32&h=32&fit=crop&crop=face',
    rating: 4,
    date: '15 hari lalu',
    comment: 'Blush on ini warnanya natural dan tahan lama. Cocok untuk dipakai sehari-hari.',
    product: {
      name: 'Blush On Peach',
      image: 'https://images.unsplash.com/photo-1606890650348-952c4f8f829e?w=80&h=80&fit=crop',
      price: 'Rp 220,000'
    },
    likes: 7,
    helpful: true
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function Ulasan() {
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = filterRating 
    ? reviews.filter(review => review.rating === filterRating)
    : reviews;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ulasan Pelanggan</h1>
          <p className="text-gray-600 mt-1">Kelola dan respon ulasan dari pelanggan Anda</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              {filterRating ? `${filterRating} Bintang` : 'Semua Rating'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterRating(null)}>
              Semua Rating
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRating(5)}>
              5 Bintang
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRating(4)}>
              4 Bintang
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRating(3)}>
              3 Bintang
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRating(2)}>
              2 Bintang
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterRating(1)}>
              1 Bintang
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={review.product.image}
                      alt={review.product.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>
                  
                  {/* Review Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={review.avatar} />
                          <AvatarFallback>{review.user.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{review.user}</p>
                          <div className="flex items-center space-x-2">
                            <StarRating rating={review.rating} />
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={review.rating >= 4 ? "default" : "secondary"}>
                        {review.rating >= 4 ? 'Positif' : 'Perlu Perhatian'}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" className="gap-2">
                          <ThumbsUp className="h-4 w-4" />
                          {review.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Balas
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{review.product.name}</p>
                        <p className="text-sm text-yellow-600">{review.product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
