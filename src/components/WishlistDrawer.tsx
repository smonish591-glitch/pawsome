import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveFromWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddAllToCart: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onAddAllToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="wishlist-drawer-panel"
          className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#1A1A1A]/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#1A1A1A] text-[#F9F7F2] flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#D4A373] fill-[#D4A373]" />
              <h2 className="font-serif text-base sm:text-lg font-light text-[#F9F7F2]">
                Saved Favorites ({wishlistProducts.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#EFECE7] flex items-center justify-center text-[#A67C52]">
                  <Heart className="w-6 h-6 text-[#A67C52]" />
                </div>
                <h3 className="font-serif text-lg font-light text-[#1A1A1A]">Your List is Empty</h3>
                <p className="text-xs font-sans text-[#1A1A1A]/60 max-w-xs">
                  Click the heart icon on any curated piece or treat formulation to save for subsequent review.
                </p>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-white p-3 rounded-sm border border-[#1A1A1A]/10 shadow-xs relative group"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-18 h-18 rounded-sm object-cover bg-[#EFECE7] border border-[#1A1A1A]/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-medium font-sans text-[#1A1A1A] line-clamp-1">{product.name}</h4>
                        <button
                          onClick={() => onRemoveFromWishlist(product)}
                          className="text-[#1A1A1A]/40 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-xs font-serif text-[#1A1A1A] mt-0.5">${product.price.toFixed(2)}</p>
                    </div>

                    <button
                      onClick={() => {
                        onAddToCart(product);
                        onRemoveFromWishlist(product);
                      }}
                      className="mt-2 py-1.5 px-3 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] uppercase tracking-wider font-sans font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#D4A373]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 sm:p-5 bg-white border-t border-[#1A1A1A]/10">
              <button
                onClick={() => {
                  onAddAllToCart();
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Move All ({wishlistProducts.length}) to Bag</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
