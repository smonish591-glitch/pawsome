import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Sparkles, X, Menu, ShieldCheck, Truck, PawPrint } from 'lucide-react';
import { Product } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAiAdvisor: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAiAdvisor,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  allProducts,
  onSelectProduct
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const searchResults = searchQuery.trim()
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  const navLinks = [
    { label: 'All Collection', value: 'all' },
    { label: 'Treats & Chews', value: 'treats' },
    { label: 'Collars & Leashes', value: 'collars' },
    { label: 'Beds & Comfort', value: 'beds' },
    { label: 'Play & Toys', value: 'toys' },
    { label: 'Travel & Crates', value: 'crates' },
    { label: 'Care & Grooming', value: 'grooming' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#F9F7F2]/95 backdrop-blur-md border-b border-[#1A1A1A]/10">
      {/* Top Editorial Notification Bar */}
      <div className="bg-[#1A1A1A] text-[#F9F7F2] text-xs py-2 px-4 border-b border-[#1A1A1A]/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-sans">
            <span className="text-[#A67C52] font-serif italic text-sm">✦</span>
            <span>Bespoke Pet Essentials: Complimentary Worldwide Concierge & 10% Off with Code <strong className="text-[#D4A373] underline underline-offset-2">PAW10</strong></span>
          </div>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-[#F9F7F2]/70 font-sans hidden md:flex">
            <span className="flex items-center gap-1.5"><Truck className="w-3 h-3 text-[#A67C52]" /> Carbon-Neutral Shipping</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3 text-[#A67C52]" /> Vet Formulated</span>
            <span className="text-[#A67C52]">USD ($)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <button 
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A1A] hover:text-[#A67C52] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Boutique Brand Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setSelectedCategory('all'); }}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] flex items-center justify-center text-white shadow-xs group-hover:bg-[#A67C52] transition-colors duration-300">
              <PawPrint className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-light tracking-tight text-[#1A1A1A] block leading-none">
                PAWSOME
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase font-sans font-semibold text-[#A67C52] block mt-0.5">
                Feline & Canine · Bespoke
              </span>
            </div>
          </a>

          {/* Desktop Category Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => {
              const isActive = selectedCategory === link.value;
              return (
                <button
                  key={link.value}
                  id={`nav-link-${link.value}`}
                  onClick={() => setSelectedCategory(link.value)}
                  className={`text-[11px] uppercase tracking-widest font-sans transition-all duration-200 py-1 ${
                    isActive
                      ? 'text-[#1A1A1A] font-bold border-b border-[#1A1A1A]'
                      : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:opacity-75'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & AI Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* AI Pet Matcher Button */}
            <button
              id="ai-pet-advisor-nav-btn"
              onClick={onOpenAiAdvisor}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm bg-[#1A1A1A] text-[#F9F7F2] text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans hover:bg-[#A67C52] shadow-xs transition-all duration-300 group cursor-pointer"
            >
              <Sparkles className="w-3 h-3 text-[#D4A373] group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">AI Pet Advisor</span>
              <span className="sm:hidden">Advisor</span>
            </button>

            {/* Live Search Toggle & Bar */}
            <div className="relative">
              <div className="flex items-center bg-[#EFECE7] rounded-sm px-3 py-1.5 border border-[#1A1A1A]/10 focus-within:border-[#1A1A1A] transition-all">
                <Search className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
                <input
                  id="site-search-input"
                  type="text"
                  placeholder="Search collection..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-20 sm:w-36 md:w-44 bg-transparent text-xs text-[#1A1A1A] placeholder-[#1A1A1A]/50 focus:outline-none ml-2 font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-[#F9F7F2] rounded-sm shadow-xl border border-[#1A1A1A]/15 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-[9px] font-bold text-[#A67C52] px-3 py-1.5 uppercase tracking-[0.25em] font-sans">
                    The Collection ({searchResults.length})
                  </p>
                  <div className="space-y-1">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          setSearchQuery('');
                        }}
                        className="flex items-center gap-3 p-2 rounded-sm hover:bg-[#EFECE7] cursor-pointer transition-colors"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-11 h-11 rounded-sm object-cover bg-[#EFECE7]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-serif font-medium text-[#1A1A1A] truncate">{product.name}</p>
                          <p className="text-[11px] text-[#A67C52] font-sans font-semibold">${product.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              id="wishlist-drawer-toggle-btn"
              onClick={onOpenWishlist}
              className="relative p-2 rounded-sm text-[#1A1A1A]/80 hover:text-[#1A1A1A] hover:bg-[#EFECE7] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#A67C52] text-white text-[9px] font-sans font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Slideover Trigger */}
            <button
              id="cart-drawer-toggle-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 px-3 py-2 rounded-sm bg-transparent border border-[#1A1A1A] text-[#1A1A1A] text-[11px] uppercase tracking-widest font-sans font-medium hover:bg-[#1A1A1A] hover:text-white active:scale-95 transition-all group"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cart</span>
              <span className="text-[10px] font-sans font-bold ml-0.5">
                ({cartCount})
              </span>
            </button>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-[#1A1A1A]/10 mt-3 space-y-1 bg-[#F9F7F2]">
            {navLinks.map((link) => (
              <button
                key={link.value}
                onClick={() => {
                  setSelectedCategory(link.value);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 text-[11px] uppercase tracking-widest font-sans ${
                  selectedCategory === link.value
                    ? 'bg-[#1A1A1A] text-white'
                    : 'text-[#1A1A1A]/80 hover:bg-[#EFECE7]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
