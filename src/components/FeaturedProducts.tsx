import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  onQuickView: (product: Product) => void;
  onViewAll: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onQuickView,
  onViewAll
}) => {
  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-20 border-b border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header - Editorial Title and Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#1A1A1A]/10">
          <div>
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.35em] text-[#A67C52] block mb-2">
              Curated Release
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1A1A1A] tracking-tight">
              Featured Essentials
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#1A1A1A]/70 max-w-sm font-sans leading-relaxed">
            Meticulously engineered from human-grade ingredients, full-grain Italian hides, and cloud memory contours.
          </p>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onQuickView={onQuickView}
              isFeaturedRowStyle={true}
            />
          ))}
        </div>

        {/* Bottom Explorer CTA */}
        <div className="mt-12 text-center">
          <button
            id="view-all-featured-btn"
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-8 py-3.5 sm:py-4 rounded-none bg-transparent hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-[#1A1A1A] text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer"
          >
            <span>Explore Complete Collection</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
