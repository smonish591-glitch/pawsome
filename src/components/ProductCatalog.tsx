import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Check, Dog, Cat, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  onAddToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView
}) => {
  const [petTypeFilter, setPetTypeFilter] = useState<'all' | 'dog' | 'cat'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(80);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'treats', label: 'Treats & Chews' },
    { id: 'collars', label: 'Collars & Leashes' },
    { id: 'beds', label: 'Beds & Furniture' },
    { id: 'toys', label: 'Play & Toys' },
    { id: 'crates', label: 'Travel & Carriers' },
    { id: 'grooming', label: 'Care & Bowls' }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      // Pet Type filter
      if (petTypeFilter !== 'all' && p.petType !== 'all' && p.petType !== petTypeFilter) {
        return false;
      }
      // In stock
      if (onlyInStock && !p.inStock) {
        return false;
      }
      // Max price
      if (p.price > maxPrice) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesCat) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, petTypeFilter, onlyInStock, maxPrice, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-14 sm:py-20 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#1A1A1A]/10">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-[#A67C52] block mb-2">
              Curated Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#1A1A1A]">
              {selectedCategory === 'all' ? 'All Pet Collection' : categories.find(c => c.id === selectedCategory)?.label}
            </h2>
            <p className="text-xs sm:text-sm text-[#1A1A1A]/60 mt-1 font-sans">
              Showing {filteredProducts.length} handcrafted pet goods & dietary formulas
            </p>
          </div>

          {/* Top Quick Filters: Pet Type & Sort */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Pet Type Switch */}
            <div className="flex items-center bg-[#EFECE7] p-1 rounded-sm border border-[#1A1A1A]/10">
              <button
                id="pet-type-all-btn"
                onClick={() => setPetTypeFilter('all')}
                className={`px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider font-sans font-semibold transition-all ${
                  petTypeFilter === 'all'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                All Pets
              </button>
              <button
                id="pet-type-dog-btn"
                onClick={() => setPetTypeFilter('dog')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider font-sans font-semibold transition-all ${
                  petTypeFilter === 'dog'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                <Dog className="w-3.5 h-3.5" />
                <span>Dogs</span>
              </button>
              <button
                id="pet-type-cat-btn"
                onClick={() => setPetTypeFilter('cat')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-sm text-[10px] uppercase tracking-wider font-sans font-semibold transition-all ${
                  petTypeFilter === 'cat'
                    ? 'bg-[#1A1A1A] text-white shadow-xs'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                <Cat className="w-3.5 h-3.5" />
                <span>Cats</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#EFECE7] px-3 py-1.5 rounded-sm border border-[#1A1A1A]/10">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#1A1A1A]/60" />
              <select
                id="catalog-sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[11px] font-sans uppercase tracking-wider font-medium text-[#1A1A1A] focus:outline-none cursor-pointer pr-2"
              >
                <option value="featured">Featured First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>
        </div>

        {/* Category Pills & Price Filter Ribbon */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 bg-[#EFECE7] p-3 sm:p-4 rounded-sm border border-[#1A1A1A]/10">
          
          {/* Category Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`cat-filter-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-sm text-[10px] font-sans uppercase tracking-[0.15em] font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#1A1A1A] text-white shadow-xs'
                      : 'bg-white/80 hover:bg-white text-[#1A1A1A]/80 border border-[#1A1A1A]/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Price Range Slider */}
          <div className="flex items-center gap-4 bg-white/80 px-4 py-2 rounded-sm border border-[#1A1A1A]/10">
            <span className="text-[11px] font-sans font-medium text-[#1A1A1A]/80 whitespace-nowrap">
              Max Price: <strong className="font-serif text-[#A67C52] text-sm">${maxPrice}</strong>
            </span>
            <input
              type="range"
              min="5"
              max="80"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-24 sm:w-32 accent-[#A67C52] cursor-pointer"
            />
          </div>

        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-[#EFECE7] rounded-sm border border-[#1A1A1A]/10 p-8 space-y-4">
            <div className="w-12 h-12 rounded-sm bg-[#F9F7F2] flex items-center justify-center mx-auto text-[#A67C52]">
              ✦
            </div>
            <h3 className="font-serif text-xl text-[#1A1A1A]">No matching pet goods found</h3>
            <p className="text-xs text-[#1A1A1A]/60 max-w-sm mx-auto font-sans">
              Try adjusting your price filter or pet type filter to see more bespoke goods.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setPetTypeFilter('all');
                setMaxPrice(80);
              }}
              className="px-6 py-2.5 rounded-sm bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium hover:bg-[#A67C52] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
