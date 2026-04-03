/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sprout, 
  Flame, 
  Gem, 
  CheckCircle, 
  ShoppingCart, 
  Star, 
  Truck, 
  Undo, 
  Gift, 
  Phone, 
  Clock,
  Check,
  AlertTriangle,
  MessageCircle,
  Search,
  Filter,
  X,
  ChevronRight,
  Leaf,
  Droplets,
  Package,
  Heart,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  category: 'Sekam' | 'Pot' | 'Pupuk' | 'Alat';
  image: string;
  price: number;
  priceRange: string;
  description: string;
  stockStatus: 'full' | 'limited';
  stockCount?: number;
  rating: number;
  sold: string;
  link: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'sekam-bakar',
    name: 'Sekam Bakar Padi Super',
    category: 'Sekam',
    image: 'https://picsum.photos/seed/husk1/600/400',
    price: 8000,
    priceRange: 'Rp 8.000 - 15.000',
    description: 'Sekam padi bakar murni tanpa campuran. Sangat baik untuk media tanam.',
    stockStatus: 'full',
    rating: 4.9,
    sold: '10rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'sekam-mentah',
    name: 'Sekam Mentah Padi Bersih',
    category: 'Sekam',
    image: 'https://picsum.photos/seed/husk2/600/400',
    price: 5000,
    priceRange: 'Rp 5.000 - 10.000',
    description: 'Sekam mentah kering dan bersih. Cocok untuk campuran media tanam.',
    stockStatus: 'full',
    rating: 4.8,
    sold: '5rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'pot-hitam-15',
    name: 'Pot Plastik Hitam 15cm',
    category: 'Pot',
    image: 'https://picsum.photos/seed/pot1/600/400',
    price: 2500,
    priceRange: 'Rp 2.500 - 5.000',
    description: 'Pot plastik hitam tebal ukuran 15cm. Tahan panas dan awet.',
    stockStatus: 'full',
    rating: 4.9,
    sold: '15rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'pot-putih-aesthetic',
    name: 'Pot Putih Aesthetic 20cm',
    category: 'Pot',
    image: 'https://picsum.photos/seed/pot2/600/400',
    price: 12000,
    priceRange: 'Rp 12.000 - 18.000',
    description: 'Pot putih minimalis untuk tanaman indoor. Mempercantik ruangan.',
    stockStatus: 'limited',
    stockCount: 45,
    rating: 5.0,
    sold: '2rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'pupuk-npk',
    name: 'Pupuk NPK Mutiara 16-16-16',
    category: 'Pupuk',
    image: 'https://picsum.photos/seed/fertilizer1/600/400',
    price: 15000,
    priceRange: 'Rp 15.000 - 25.000',
    description: 'Pupuk penyubur tanaman universal. Mempercepat pertumbuhan.',
    stockStatus: 'full',
    rating: 4.9,
    sold: '8rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'media-tanam-organik',
    name: 'Media Tanam Organik 5kg',
    category: 'Pupuk',
    image: 'https://picsum.photos/seed/soil1/600/400',
    price: 12000,
    priceRange: 'Rp 12.000 - 20.000',
    description: 'Campuran tanah, pupuk kandang, dan sekam. Siap pakai.',
    stockStatus: 'full',
    rating: 4.8,
    sold: '12rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'sprayer-2l',
    name: 'Sprayer Tanaman 2 Liter',
    category: 'Alat',
    image: 'https://picsum.photos/seed/sprayer1/600/400',
    price: 35000,
    priceRange: 'Rp 35.000 - 45.000',
    description: 'Semprotan air tekanan tinggi. Awet dan mudah digunakan.',
    stockStatus: 'limited',
    stockCount: 12,
    rating: 4.7,
    sold: '1rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  },
  {
    id: 'gunting-stek',
    name: 'Gunting Stek Ranting',
    category: 'Alat',
    image: 'https://picsum.photos/seed/tools1/600/400',
    price: 25000,
    priceRange: 'Rp 25.000 - 35.000',
    description: 'Gunting tajam untuk merapikan tanaman dan stek batang.',
    stockStatus: 'full',
    rating: 4.9,
    sold: '3rb+',
    link: 'https://id.shp.ee/fgWpoZjc'
  }
];

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = ['Semua', 'Sekam', 'Pot', 'Pupuk', 'Alat'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Semua' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCartCount(prev => prev + 1);
  };

  return (
    <div className={`min-h-screen bg-slate-50 font-sans transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 p-2 rounded-xl">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 hidden sm:block">Toko Pertanian Kita</span>
          </div>

          <div className="flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari perlengkapan berkebun..." 
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-green-500 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-600 hover:text-green-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition-colors hidden md:block">
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-[400px] overflow-hidden">
        <img 
          src="https://picsum.photos/seed/garden-hero/1920/600" 
          alt="Garden Hero" 
          className="w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Kebun Impian Dimulai di Sini</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Sedia berbagai macam pot, sekam, pupuk, dan alat pertanian berkualitas untuk hobi berkebun Anda.
            </p>
            <div className="bg-white/20 backdrop-blur-md inline-flex items-center gap-4 p-2 rounded-full border border-white/30">
              <span className="pl-4 font-bold text-orange-400">PROMO NEW2024</span>
              <button className="bg-white text-green-700 px-6 py-2 rounded-full font-bold hover:bg-green-50 transition-colors">
                Klaim Voucher
              </button>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Categories */}
        <div className="flex items-center gap-4 mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-2 text-slate-500 mr-4">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Kategori:</span>
          </div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat 
                  ? 'bg-green-600 text-white shadow-lg shadow-green-200' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer group border border-slate-100"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-400 hover:text-red-500 transition-colors shadow-md">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm p-2 rounded-full text-slate-400 hover:text-green-600 transition-colors shadow-md">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  {product.stockStatus === 'limited' && (
                    <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      Stok Terbatas
                    </div>
                  )}
                </div>
                
                <div className="p-5">
                  <div className="text-xs text-green-600 font-bold uppercase tracking-wider mb-1">{product.category}</div>
                  <h3 className="text-slate-800 font-bold mb-2 line-clamp-1 group-hover:text-green-600 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-slate-600">{product.rating}</span>
                    <span className="text-xs text-slate-400 ml-1">| Terjual {product.sold}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-lg font-bold text-red-500">
                      Rp {product.price.toLocaleString('id-ID')}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={handleAddToCart}
                        className="bg-slate-100 text-slate-600 p-2 rounded-xl hover:bg-green-600 hover:text-white transition-all"
                        title="Tambah ke Keranjang"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </button>
                      <a 
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="bg-green-600 text-white p-2 rounded-xl hover:bg-green-700 transition-all"
                        title="Beli di Shopee"
                      >
                        <ShoppingCart className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Produk tidak ditemukan</h3>
            <p className="text-slate-500">Coba kata kunci lain atau pilih kategori yang berbeda.</p>
          </div>
        )}

        {/* Features Bento */}
        <section className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-green-600 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold mb-4">Pengiriman Cepat & Aman</h2>
              <p className="opacity-90 mb-6">Kami menjamin setiap pesanan dikemas dengan aman menggunakan bubble wrap tebal untuk mencegah kerusakan.</p>
              <div className="flex gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Truck className="w-8 h-8 mb-2" />
                  <div className="font-bold">Gratis Ongkir</div>
                </div>
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Undo className="w-8 h-8 mb-2" />
                  <div className="font-bold">Garansi Retur</div>
                </div>
              </div>
            </div>
            <Leaf className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12" />
          </div>
          <div className="bg-orange-500 rounded-3xl p-8 text-white flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Butuh Bantuan?</h2>
              <p className="opacity-90">Konsultasi gratis mengenai media tanam dan perawatan tanaman.</p>
            </div>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              className="bg-white text-orange-600 py-3 rounded-2xl font-bold text-center hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" /> Chat Admin
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-20 pb-10 mt-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <Sprout className="w-8 h-8 text-green-500" />
                <span className="text-2xl font-bold">Toko Pertanian Kita</span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">
                Solusi terlengkap untuk kebutuhan berkebun Anda. Kami menyediakan produk berkualitas tinggi dengan harga yang kompetitif.
              </p>
              <div className="flex gap-4">
                {['facebook', 'instagram', 'twitter', 'youtube'].map(social => (
                  <div key={social} className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors cursor-pointer capitalize">
                    {social[0]}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6">Tautan Cepat</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="hover:text-green-500 cursor-pointer">Tentang Kami</li>
                <li className="hover:text-green-500 cursor-pointer">Cara Belanja</li>
                <li className="hover:text-green-500 cursor-pointer">Syarat & Ketentuan</li>
                <li className="hover:text-green-500 cursor-pointer">Kebijakan Privasi</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Kontak</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> 0812-3456-7890</li>
                <li className="flex items-center gap-3"><Clock className="w-4 h-4" /> Senin - Minggu (24 Jam)</li>
                <li className="flex items-center gap-3"><Package className="w-4 h-4" /> Pengiriman Seluruh Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2024 Toko Pertanian Kita. Semua Hak Dilindungi.</p>
          </div>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-slate-600 hover:bg-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="md:w-1/2 h-[300px] md:h-auto relative">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
                <div className="text-xs text-green-600 font-bold uppercase tracking-wider mb-2">{selectedProduct.category}</div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4">{selectedProduct.name}</h2>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-slate-800">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-slate-400">|</span>
                  <span className="text-slate-600 font-medium">{selectedProduct.sold} Terjual</span>
                </div>

                <div className="text-3xl font-bold text-red-500 mb-6">
                  Rp {selectedProduct.price.toLocaleString('id-ID')}
                </div>

                <p className="text-slate-600 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium">
                    <div className={`w-3 h-3 rounded-full ${selectedProduct.stockStatus === 'full' ? 'bg-green-500' : 'bg-orange-500'}`} />
                    <span className="text-slate-600">{selectedProduct.stockText}</span>
                  </div>
                  
                  <div className="flex gap-4">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 bg-slate-100 text-slate-800 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" /> Keranjang
                    </button>
                    <a 
                      href={selectedProduct.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[2] bg-green-600 text-white py-4 rounded-2xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2"
                    >
                      Beli Sekarang <ChevronRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <motion.a
        href="https://wa.me/6281234567890?text=Saya%20mau%20tanya%20produk%20Toko%20Pertanian%20Kita"
        target="_blank"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-50 hover:bg-green-600 transition-all"
      >
        <MessageCircle className="w-8 h-8 fill-white" />
      </motion.a>
    </div>
  );
}
