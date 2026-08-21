import React, { useState } from 'react';
import { X, Heart, Star, ShoppingBag, ShieldCheck, Check, Sparkles, Truck, RotateCcw, Award } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    color?: string,
    size?: string,
    purchaseType?: 'one-time' | 'subscription',
    frequency?: '2-weeks' | '4-weeks' | '6-weeks' | '8-weeks'
  ) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onOpenAiAdvisor: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onOpenAiAdvisor
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(product.colors?.[0]?.name);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [purchaseType, setPurchaseType] = useState<'one-time' | 'subscription'>('one-time');
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<'2-weeks' | '4-weeks' | '6-weeks' | '8-weeks'>('4-weeks');
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'benefits'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountedPrice = purchaseType === 'subscription' ? product.price * 0.9 : product.price;

  const handleAdd = () => {
    onAddToCart(
      product,
      quantity,
      selectedColor,
      selectedSize,
      purchaseType,
      purchaseType === 'subscription' ? subscriptionFrequency : undefined
    );
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="product-detail-modal"
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#1A1A1A]/15 text-[#1A1A1A]"
      >
        {/* Close Button */}
        <button
          id="close-product-modal-btn"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-sm bg-[#EFECE7] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] border border-[#1A1A1A]/10 z-30 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 p-6 sm:p-8">
          
          {/* Left: Studio Media Canvas & Gallery */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Main Stage */}
            <div className="relative aspect-square w-full rounded-sm overflow-hidden bg-[#EFECE7] border border-[#1A1A1A]/10 shadow-xs">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
              />
              
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-[#1A1A1A] text-[#F9F7F2]">
                  {product.badge}
                </span>
              )}

              <button
                onClick={() => onToggleWishlist(product)}
                className={`absolute top-3 right-3 p-2 rounded-sm backdrop-blur-md transition-all ${
                  isWishlisted
                    ? 'bg-[#A67C52] text-white'
                    : 'bg-white/80 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Thumbnail switcher */}
            {product.secondaryImage && (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedImage(product.image)}
                  className={`w-16 h-16 rounded-sm overflow-hidden border transition-all ${
                    selectedImage === product.image ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#1A1A1A]/10 opacity-70'
                  }`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover bg-[#EFECE7]" />
                </button>
                <button
                  onClick={() => setSelectedImage(product.secondaryImage!)}
                  className={`w-16 h-16 rounded-sm overflow-hidden border transition-all ${
                    selectedImage === product.secondaryImage ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#1A1A1A]/10 opacity-70'
                  }`}
                >
                  <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover bg-[#EFECE7]" />
                </button>
              </div>
            )}

            {/* Vet Quality Seal */}
            <div className="bg-[#EFECE7] p-3.5 rounded-sm flex items-center gap-3 border border-[#1A1A1A]/10">
              <div className="w-9 h-9 rounded-sm bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-xs shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#D4A373]" />
              </div>
              <div className="text-xs font-sans">
                <p className="font-medium text-[#1A1A1A]">Veterinarian Formulated Standards</p>
                <p className="text-[#1A1A1A]/60 text-[11px]">Inspected for biocompatibility, digestion & structural durability.</p>
              </div>
            </div>

          </div>

          {/* Right: Product Configuration & Checkout Options */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-5">
            
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] uppercase font-sans font-bold tracking-[0.3em] text-[#A67C52]">
                  {product.category} · {product.petType === 'all' ? 'All Breeds' : product.petType}
                </span>

                <div className="flex items-center gap-1 text-xs font-sans">
                  <div className="flex items-center text-[#A67C52]">
                    <Star className="w-3.5 h-3.5 fill-[#A67C52]" />
                    <span className="font-semibold ml-1 text-[#1A1A1A]">{product.rating}</span>
                  </div>
                  <span className="text-[#1A1A1A]/60">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A] mt-1 leading-tight">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="mt-2 flex items-baseline gap-2.5">
                <span className="text-2xl sm:text-3xl font-serif text-[#1A1A1A]">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm sm:text-base font-sans text-[#1A1A1A]/40 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {purchaseType === 'subscription' && (
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 font-sans font-semibold bg-[#2E5E4E] text-white">
                    Subscribe & Save 10%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#1A1A1A]/70 mt-3 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Color Swatches if available */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                    Color: <span className="text-[#A67C52] font-medium">{selectedColor}</span>
                  </label>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        style={{ backgroundColor: c.hex }}
                        className={`w-6 h-6 rounded-full transition-all border ${
                          selectedColor === c.name ? 'border-[#1A1A1A] ring-2 ring-[#A67C52]' : 'border-black/20 opacity-85'
                        }`}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector if available */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-4 space-y-2">
                  <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                    Size: <span className="text-[#A67C52] font-medium">{selectedSize}</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-sans uppercase tracking-wider font-semibold transition-all border ${
                          selectedSize === s
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Mode Option: One-Time vs Subscribe & Save */}
              <div className="mt-5 space-y-2 bg-[#EFECE7] p-3 rounded-sm border border-[#1A1A1A]/10">
                
                {/* One Time */}
                <label className={`flex items-center justify-between p-2.5 rounded-sm cursor-pointer transition-all ${
                  purchaseType === 'one-time' ? 'bg-white shadow-xs border border-[#1A1A1A]/20' : 'hover:bg-white/50'
                }`}>
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="purchase-type"
                      checked={purchaseType === 'one-time'}
                      onChange={() => setPurchaseType('one-time')}
                      className="accent-[#A67C52]"
                    />
                    <span className="text-xs font-sans font-medium text-[#1A1A1A]">One-Time Order</span>
                  </div>
                  <span className="text-xs font-serif text-[#1A1A1A]">${product.price.toFixed(2)}</span>
                </label>

                {/* Subscription */}
                <div className={`p-2.5 rounded-sm transition-all ${
                  purchaseType === 'subscription' ? 'bg-white shadow-xs border border-[#2E5E4E]' : 'hover:bg-white/50'
                }`}>
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="purchase-type"
                        checked={purchaseType === 'subscription'}
                        onChange={() => setPurchaseType('subscription')}
                        className="accent-[#2E5E4E]"
                      />
                      <div>
                        <span className="text-xs font-sans font-semibold text-[#2E5E4E] block">Subscribe & Save 10%</span>
                        <span className="text-[10px] text-[#1A1A1A]/60 font-sans">Automated replenishments, pause anytime</span>
                      </div>
                    </div>
                    <span className="text-xs font-serif text-[#2E5E4E] font-medium">${(product.price * 0.9).toFixed(2)}</span>
                  </label>

                  {purchaseType === 'subscription' && (
                    <div className="mt-2.5 pt-2 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs font-sans">
                      <span className="text-[11px] text-[#1A1A1A]/70">Delivery schedule:</span>
                      <select
                        value={subscriptionFrequency}
                        onChange={(e) => setSubscriptionFrequency(e.target.value as any)}
                        className="bg-[#FAF8F5] px-2.5 py-1 rounded-sm text-xs font-sans text-[#1A1A1A] border border-[#1A1A1A]/15 focus:outline-none"
                      >
                        <option value="2-weeks">Every 2 Weeks</option>
                        <option value="4-weeks">Every 4 Weeks</option>
                        <option value="6-weeks">Every 6 Weeks</option>
                        <option value="8-weeks">Every 8 Weeks</option>
                      </select>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                
                {/* Stepper */}
                <div className="flex items-center bg-white border border-[#1A1A1A]/15 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2.5 text-sm font-sans text-[#1A1A1A] hover:bg-[#EFECE7] transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-xs font-sans font-medium text-[#1A1A1A]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2.5 text-sm font-sans text-[#1A1A1A] hover:bg-[#EFECE7] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={!product.inStock}
                  className={`flex-1 py-3.5 px-6 rounded-none font-sans font-medium text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedAnimation
                      ? 'bg-[#2E5E4E] text-white'
                      : 'bg-[#1A1A1A] hover:bg-[#A67C52] text-white'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-3.5 h-3.5 text-[#D4A373]" />
                      <span>Add to Bag · ${(discountedPrice * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>

              </div>

              {/* Guarantees Ribbon */}
              <div className="flex items-center justify-between text-[10px] font-sans text-[#1A1A1A]/60 pt-2 border-t border-[#1A1A1A]/10">
                <span className="flex items-center gap-1"><Truck className="w-3 h-3 text-[#A67C52]" /> Free courier over $45</span>
                <span className="flex items-center gap-1"><RotateCcw className="w-3 h-3 text-[#A67C52]" /> 30-Day satisfaction pledge</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-[#A67C52]" /> Pure formulation</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Expandable Details & Ingredients */}
        <div className="border-t border-[#1A1A1A]/10 bg-[#EFECE7] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-4 border-b border-[#1A1A1A]/10 pb-3">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-sans uppercase tracking-[0.15em] font-semibold pb-1 border-b-2 transition-all ${
                activeTab === 'details' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50'
              }`}
            >
              Specifications
            </button>
            {(product.ingredients || product.materials) && (
              <button
                onClick={() => setActiveTab('ingredients')}
                className={`text-xs font-sans uppercase tracking-[0.15em] font-semibold pb-1 border-b-2 transition-all ${
                  activeTab === 'ingredients' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50'
                }`}
              >
                {product.ingredients ? 'Nutrition & Sourcing' : 'Materials & Craft'}
              </button>
            )}
            <button
              onClick={() => setActiveTab('benefits')}
              className={`text-xs font-sans uppercase tracking-[0.15em] font-semibold pb-1 border-b-2 transition-all ${
                activeTab === 'benefits' ? 'border-[#1A1A1A] text-[#1A1A1A]' : 'border-transparent text-[#1A1A1A]/50'
              }`}
            >
              Wellness Notes
            </button>
          </div>

          {activeTab === 'details' && (
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-sans text-[#1A1A1A]/80">
              {product.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#A67C52] shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'ingredients' && (
            <div className="text-xs font-sans text-[#1A1A1A]/80 space-y-2">
              {product.ingredients && (
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-1">Human-Grade Ingredients:</p>
                  <p className="leading-relaxed bg-white p-3 rounded-sm border border-[#1A1A1A]/10">
                    {product.ingredients.join(' · ')}
                  </p>
                </div>
              )}
              {product.materials && (
                <div>
                  <p className="font-semibold text-[#1A1A1A] mb-1">Premium Materials:</p>
                  <p className="leading-relaxed bg-white p-3 rounded-sm border border-[#1A1A1A]/10">
                    {product.materials.join(' · ')}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'benefits' && (
            <div className="flex flex-wrap gap-2">
              {product.benefits?.map((b, i) => (
                <span key={i} className="px-3 py-1.5 rounded-sm bg-white border border-[#1A1A1A]/10 text-[#1A1A1A] text-xs font-sans font-medium">
                  ✦ {b}
                </span>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
