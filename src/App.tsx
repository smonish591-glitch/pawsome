import React, { useState, useEffect } from 'react';
import { ALL_PRODUCTS, FEATURED_PRODUCTS } from './data/products';
import { Product, CartItem, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedProducts } from './components/FeaturedProducts';
import { ProductCatalog } from './components/ProductCatalog';
import { FlatLayShowcase } from './components/FlatLayShowcase';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PetAiAdvisorModal } from './components/PetAiAdvisorModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ReviewsSection } from './components/ReviewsSection';
import { BrandPerks } from './components/BrandPerks';
import { Footer } from './components/Footer';
import { Sparkles, Check, Heart, ShoppingBag, X } from 'lucide-react';

export default function App() {
  // Products Catalog
  const allProducts = ALL_PRODUCTS;
  const featuredProducts = FEATURED_PRODUCTS;

  // Shopping Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('pawsome_cart');
      if (saved) return JSON.parse(saved);
    } catch {}
    // Initial welcome item
    return [
      {
        product: FEATURED_PRODUCTS[0], // Adjustable collar
        quantity: 1,
        selectedColor: 'Terracotta Tan',
        selectedSize: 'Medium (14"-18")',
        purchaseType: 'one-time'
      }
    ];
  });

  // Wishlist State
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('pawsome_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['prod-bed-01'];
  });

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isAiAdvisorOpen, setIsAiAdvisorOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Cart configuration state
  const [couponCode, setCouponCode] = useState('PAW10');
  const [discountPercent, setDiscountPercent] = useState(10);
  const [petGiftName, setPetGiftName] = useState('Milo');

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<{ title: string; desc?: string; type?: 'success' | 'info' } | null>(null);

  const showToast = (title: string, desc?: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem('pawsome_cart', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('pawsome_wishlist', JSON.stringify(wishlistIds));
    } catch {}
  }, [wishlistIds]);

  // Cart actions
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    size?: string,
    purchaseType: 'one-time' | 'subscription' = 'one-time',
    subscriptionFrequency?: '2-weeks' | '4-weeks' | '6-weeks' | '8-weeks'
  ) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id &&
                item.selectedColor === color &&
                item.selectedSize === size &&
                item.purchaseType === purchaseType
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            product,
            quantity,
            selectedColor: color || product.colors?.[0]?.name,
            selectedSize: size || product.sizes?.[0],
            purchaseType,
            subscriptionFrequency
          }
        ];
      }
    });

    showToast(`Added ${product.name} to Cart`, `${quantity}x item added with 100% happiness pledge.`);
  };

  const handleUpdateQuantity = (index: number, qty: number) => {
    if (qty <= 0) {
      handleRemoveItem(index);
    } else {
      setCartItems(prev => {
        const updated = [...prev];
        updated[index].quantity = qty;
        return updated;
      });
    }
  };

  const handleRemoveItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart', undefined, 'info');
  };

  // Wishlist actions
  const handleToggleWishlist = (product: Product) => {
    setWishlistIds(prev => {
      if (prev.includes(product.id)) {
        showToast('Removed from Wishlist', product.name, 'info');
        return prev.filter(id => id !== product.id);
      } else {
        showToast('Saved to Wishlist!', product.name);
        return [...prev, product.id];
      }
    });
  };

  const handleAddBundleToCart = (bundleProducts: Product[]) => {
    bundleProducts.forEach(p => {
      handleAddToCart(p, 1, p.colors?.[0]?.name, p.sizes?.[0], 'one-time');
    });
    setDiscountPercent(15);
    setCouponCode('BUNDLE15');
    setIsCartOpen(true);
    showToast('AI Pet Starter Bundle Added!', '15% bundle discount applied to your cart.');
  };

  const handleAddAllWishlistToCart = () => {
    const productsToAdd = allProducts.filter(p => wishlistIds.includes(p.id));
    productsToAdd.forEach(p => {
      handleAddToCart(p, 1, p.colors?.[0]?.name, p.sizes?.[0]);
    });
    setWishlistIds([]);
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast('All saved items moved to cart!');
  };

  const handleOrderSuccess = (order: OrderDetails) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCartItems([]);
    showToast('🎉 Order Successfully Authorized!', `Order #${order.id} is confirmed.`);
  };

  const wishlistProducts = allProducts.filter(p => wishlistIds.includes(p.id));
  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf5ee] text-[#2c1d11]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="bg-[#1c120a] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#c46927] flex items-center gap-3 max-w-sm">
            <div className="w-8 h-8 rounded-full bg-[#c46927] flex items-center justify-center text-white shrink-0">
              {toastMessage.type === 'info' ? <ShoppingBag className="w-4 h-4" /> : <Check className="w-4 h-4" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-[#fffaf3]">{toastMessage.title}</p>
              {toastMessage.desc && <p className="text-[11px] text-[#e0cfbe] truncate">{toastMessage.desc}</p>}
            </div>
            <button onClick={() => setToastMessage(null)} className="text-[#9c826c] hover:text-white p-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        cartCount={cartTotalItems}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        allProducts={allProducts}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section matching the user's inspiration image */}
        <HeroSection
          onShopNow={() => {
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
          onSelectProductById={(id) => {
            const p = allProducts.find(x => x.id === id);
            if (p) setSelectedProduct(p);
          }}
          featuredProducts={featuredProducts}
        />

        {/* Featured Products Row (Matches the 4 items in reference photo) */}
        <FeaturedProducts
          products={featuredProducts}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={(p) => setSelectedProduct(p)}
          onViewAll={() => {
            setSelectedCategory('all');
            const el = document.getElementById('catalog-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Flat Lay Showcase Row (Matches bottom flat lay in reference) */}
        <FlatLayShowcase
          allProducts={allProducts}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        />

        {/* Full Interactive Product Catalog & Filters */}
        <ProductCatalog
          products={allProducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* Verified Customer Reviews Carousel / Grid */}
        <ReviewsSection />

        {/* Core Brand Commitments & Guarantees */}
        <BrandPerks />
      </main>

      {/* Footer & Newsletter */}
      <Footer
        onOpenAiAdvisor={() => setIsAiAdvisorOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Floating AI Advisor Action Shortcut */}
      <div className="fixed bottom-6 left-6 z-30">
        <button
          id="floating-ai-advisor-btn"
          onClick={() => setIsAiAdvisorOpen(true)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1c120a] hover:bg-[#c46927] text-white text-xs font-bold shadow-2xl border border-[#c46927]/50 hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer"
        >
          <div className="w-5 h-5 rounded-full bg-[#c46927] group-hover:bg-[#1c120a] flex items-center justify-center text-white">
            <Sparkles className="w-3 h-3 text-[#ffc87a]" />
          </div>
          <span>Pet AI Nutrition Quiz</span>
        </button>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onOpenAiAdvisor={() => {
          setSelectedProduct(null);
          setIsAiAdvisorOpen(true);
        }}
      />

      {/* AI Pet Advisor Modal */}
      <PetAiAdvisorModal
        isOpen={isAiAdvisorOpen}
        onClose={() => setIsAiAdvisorOpen(false)}
        allProducts={allProducts}
        onAddBundleToCart={handleAddBundleToCart}
      />

      {/* Slide-Over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        couponCode={couponCode}
        setCouponCode={setCouponCode}
        discountPercent={discountPercent}
        setDiscountPercent={setDiscountPercent}
        petGiftName={petGiftName}
        setPetGiftName={setPetGiftName}
      />

      {/* Slide-Over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
        onAddAllToCart={handleAddAllWishlistToCart}
      />

      {/* Secure Payment & Checkout Gateway Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        discountPercent={discountPercent}
        couponCode={couponCode}
        petGiftName={petGiftName}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Confirmation & Live Tracking Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
        onContinueShopping={() => setCompletedOrder(null)}
      />

    </div>
  );
}
