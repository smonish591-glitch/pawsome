import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number, color?: string, size?: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
  isFeaturedRowStyle?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView,
  isFeaturedRowStyle = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, selectedColor, product.sizes?.[0]);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-transparent cursor-pointer select-none transition-all duration-300"
    >
      {/* Studio Image Container - Editorial Framing */}
      <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#EFECE7] border border-[#1A1A1A]/10 group-hover:border-[#1A1A1A]/30 transition-all duration-500 shadow-xs">
        
        {/* Product Image */}
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Top Editorial Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className="px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F9F7F2]">
              {product.badge}
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2 py-0.5 text-[9px] font-sans font-bold uppercase tracking-[0.15em] bg-[#A67C52] text-white">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          id={`wishlist-btn-${product.id}`}
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 p-2 rounded-sm backdrop-blur-md transition-all duration-200 z-20 ${
            isWishlisted
              ? 'bg-[#A67C52] text-white'
              : 'bg-white/80 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View & Add Floating Action Bar on Hover */}
        <div className="absolute inset-x-2.5 bottom-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-20">
          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleAdd}
            disabled={!product.inStock}
            className={`flex-1 py-2.5 px-3 rounded-sm text-[10px] font-sans font-semibold uppercase tracking-[0.15em] flex items-center justify-center gap-1.5 transition-all ${
              justAdded
                ? 'bg-[#2E5E4E] text-white'
                : 'bg-[#1A1A1A] hover:bg-[#A67C52] text-white'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>Quick Add</span>
              </>
            )}
          </button>

          <button
            id={`quick-view-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="p-2.5 rounded-sm bg-white hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white transition-colors border border-[#1A1A1A]/10 shadow-xs"
            title="Inspect Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Information Typography - Editorial Serif */}
      <div className="pt-3 pb-1 text-left flex-1 flex flex-col justify-between">
        
        {/* Rating & Review Count */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex items-center text-[#A67C52]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'fill-[#A67C52] text-[#A67C52]'
                    : 'text-[#D6D1CA]'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-sans font-medium text-[#1A1A1A]/60">
            ({product.reviewsCount})
          </span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-serif font-medium text-[#1A1A1A] group-hover:text-[#A67C52] transition-colors leading-snug line-clamp-1">
          {product.name}
        </h3>

        {/* Price & Color Swatches */}
        <div className="mt-1.5 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-serif text-[#1A1A1A]">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-[#1A1A1A]/40 line-through font-sans">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Dots if Available */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((c) => (
                <span
                  key={c.name}
                  style={{ backgroundColor: c.hex }}
                  className="w-2.5 h-2.5 rounded-full border border-black/15"
                  title={c.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-[#1A1A1A]/50 font-sans font-semibold">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
