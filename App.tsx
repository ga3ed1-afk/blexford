
import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AdminDashboard from './components/AdminDashboard';
import ProductDetailView from './components/ProductDetailView';
import { Product, CartItem, Order, KonnectSettings } from './types';
import { PRODUCTS, MOCK_ORDERS, CATEGORIES } from './constants';
import {
  CheckCircle2, Sparkles, Zap, Home, Layout, ChevronLeft, Lock
} from 'lucide-react';

const App: React.FC = () => {
  const [view, setView] = useState<'shop' | 'admin' | 'product-detail'>('shop');
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [konnectSettings, setKonnectSettings] = useState<KonnectSettings>(() => {
    const saved = localStorage.getItem('konnect_settings');
    const defaultSettings: KonnectSettings = {
      apiKey: '',
      wallets: [],
      activeWalletId: '',
      mode: 'sandbox',
      enabledMethods: {
        bankCard: true,
        edinar: true
      }
    };
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("الكل");
  const [searchQuery, setSearchQuery] = useState('');
  const [showToast, setShowToast] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('categories', JSON.stringify(categories));
    localStorage.setItem('cart', JSON.stringify(cartItems));
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.setItem('konnect_settings', JSON.stringify(konnectSettings));
  }, [products, categories, cartItems, orders, konnectSettings]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "الكل" || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const addToCart = (product: Product, openDrawer: boolean = false) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      setShowToast(product.title);
      setTimeout(() => setShowToast(null), 3000);
    }
  };

  const handleBuyNow = (product: Product) => {
    addToCart(product, true);
    setSelectedProduct(null);
  };

  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (view === 'admin') {
    return (
      <AdminDashboard
        products={products}
        setProducts={setProducts}
        setCartItems={setCartItems}
        categories={categories}
        setCategories={setCategories}
        orders={orders}
        setOrders={setOrders}
        konnectSettings={konnectSettings}
        setKonnectSettings={setKonnectSettings}
        onBackToShop={() => setView('shop')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F2] flex flex-col antialiased pb-16 md:pb-0" dir="rtl">
      <Navbar
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onWholesaleClick={() => setView('admin')}
      />

      <main className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64 shrink-0">
              <div className="hidden lg:block bg-white rounded-md shadow-sm border border-gray-100 sticky top-24">
                <div className="p-4 border-b border-gray-50 bg-gray-50/50">
                  <h3 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
                    <Layout size={14} className="text-[#f68b1e]" />
                    الأقسام
                  </h3>
                </div>
                <nav className="p-2 space-y-0.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all group ${selectedCategory === cat
                        ? 'bg-orange-50 text-[#f68b1e]'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#f68b1e]'
                        }`}
                    >
                      <span className="text-xs font-bold">{cat}</span>
                      <ChevronLeft size={12} className={`opacity-0 group-hover:opacity-100 transition-opacity ${selectedCategory === cat ? 'opacity-100 translate-x-0' : 'translate-x-1'}`} />
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {view === 'product-detail' && selectedProduct ? (
                <ProductDetailView
                  product={selectedProduct}
                  onBack={() => setView('shop')}
                  onAddToCart={(p) => addToCart(p)}
                  onBuyNow={handleBuyNow}
                />
              ) : (
                <div className="space-y-10">
                  <div>
                    <div className="flex items-center justify-between mb-5 bg-white p-4 rounded-md shadow-sm border border-gray-100">
                      <h2 className="font-black text-gray-900 uppercase tracking-widest flex items-center gap-2 text-sm md:text-base">
                        <Sparkles size={18} className="text-orange-500" />
                        {selectedCategory === 'الكل' ? 'جميع المنتجات' : selectedCategory}
                      </h2>
                    </div>

                    {filteredProducts.length > 0 ? (
                      /* التعديل هنا: تقليل عدد الأعمدة لتكبير مساحة كل بطاقة */
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProducts.map((product) => (
                          <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={(p) => addToCart(p)}
                            onBuyNow={(p) => { addToCart(p, true); }}
                            onViewDetail={handleViewDetail}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-24 bg-white rounded-md shadow-sm">
                        <h3 className="text-lg font-bold text-gray-400">لا توجد منتجات حالياً</h3>
                      </div>
                    )}
                  </div>

                  {selectedCategory === "الكل" && (
                    <div className="bg-white rounded-md overflow-hidden shadow-sm border border-orange-100">
                      <div className="bg-red-600 p-3 md:p-4 flex flex-col md:flex-row items-center justify-between text-white gap-3">
                        <div className="flex items-center gap-4">
                          <Zap size={24} className="fill-current text-yellow-300" />
                          <h3 className="text-lg font-black uppercase tracking-tight text-white">عروض فلاش</h3>
                        </div>
                      </div>
                      <div className="p-4 flex gap-4 overflow-x-auto no-scrollbar">
                        {products.filter(p => p.discount).map((product) => (
                          <div key={product.id} className="min-w-[200px] md:min-w-[240px] cursor-pointer group flex flex-col" onClick={() => handleViewDetail(product)}>
                            <div className="aspect-square bg-white rounded-md mb-2 relative overflow-hidden border border-gray-100">
                              <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" alt={product.title} />
                              <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-1 rounded-sm shadow-md">-{product.discount}%</div>
                            </div>
                            <h4 className="text-xs font-bold text-gray-800 truncate mb-1">{product.title}</h4>
                            <div className="text-sm font-black text-gray-900">{product.price.toFixed(3)} د.ت</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 pt-10 pb-20 md:pb-10 mt-12">
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 text-right">
            <h3 className="text-lg font-black text-[#f68b1e] uppercase tracking-tighter tracking-widest">جين ستور</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">متجركم الموثوق للتسوق عبر الإنترنت في تونس.</p>
          </div>
          <div className="text-right">
            <h4 className="text-xs font-black text-gray-900 uppercase mb-4 tracking-widest">المساعدة</h4>
            <ul className="text-[10px] font-bold text-gray-500 space-y-2">
              <li className="hover:text-[#f68b1e] cursor-pointer">مركز المساعدة</li>
              <li className="hover:text-[#f68b1e] cursor-pointer">تتبع الطلبية</li>
            </ul>
          </div>
          <div className="text-right">
            <h4 className="text-xs font-black text-gray-900 uppercase mb-4 tracking-widest">الإدارة</h4>
            <button onClick={() => setView('admin')} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-gray-900 transition-colors py-1 group">
              <Lock size={12} className="group-hover:text-orange-500" />
              <span>إدارة المتجر</span>
            </button>
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2024 جين ستور</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around py-2.5 z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
        <button onClick={() => { setView('shop'); setSelectedCategory('الكل'); }} className="flex flex-col items-center gap-1 text-gray-400">
          <Home size={22} />
          <span className="text-[9px] font-black">الرئيسية</span>
        </button>
        <button onClick={() => setView('admin')} className="flex flex-col items-center gap-1 text-gray-400">
          <Lock size={22} />
          <span className="text-[9px] font-black">الإدارة</span>
        </button>
      </div>

      {showToast && (
        <div className="fixed bottom-20 md:bottom-10 right-4 left-4 md:left-auto md:w-80 bg-gray-900/95 backdrop-blur-md text-white px-5 py-3 rounded-md shadow-2xl z-50 flex items-center gap-3 animate-in slide-in-from-bottom-10 border border-white/10">
          <CheckCircle2 size={18} className="text-green-500" />
          <p className="text-xs font-bold truncate">تمت إضافة {showToast} إلى السلة</p>
        </div>
      )}



      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={(id, delta) => {
          setCartItems(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
        }}
        onRemoveItem={(id) => setCartItems(prev => prev.filter(i => i.id !== id))}
        onClearCart={() => setCartItems([])}
        onAddOrder={(o) => setOrders(prev => [o, ...prev])}
        konnectSettings={konnectSettings}
      />
    </div>
  );
};

export default App;
