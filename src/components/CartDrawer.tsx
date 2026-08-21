import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Truck, Check, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, qty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  setCouponCode: (code: string) => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  petGiftName: string;
  setPetGiftName: (name: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  setCouponCode,
  discountPercent,
  setDiscountPercent,
  petGiftName,
  setPetGiftName
}) => {
  if (!isOpen) return null;

  const [inputCoupon, setInputCoupon] = useState(couponCode);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(discountPercent > 0);

  const subtotal = items.reduce((acc, item) => {
    const unitPrice = item.purchaseType === 'subscription' ? item.product.price * 0.9 : item.product.price;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountAmount = (subtotal * discountPercent) / 100;
  const FREE_SHIPPING_THRESHOLD = 45;
  const amountForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const clean = inputCoupon.trim().toUpperCase();
    if (clean === 'PAW10' || clean === 'SPRING10') {
      setDiscountPercent(10);
      setCouponCode(clean);
      setCouponApplied(true);
    } else if (clean === 'VIP15' || clean === 'BUNDLE15') {
      setDiscountPercent(15);
      setCouponCode(clean);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid code. Try "PAW10" for 10% off');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-[#F9F7F2] border-l border-[#1A1A1A]/10 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#1A1A1A] text-[#F9F7F2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[#D4A373]" />
              <h2 className="font-serif text-lg font-light text-[#F9F7F2]">
                Your Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#EFECE7] px-5 py-3 border-b border-[#1A1A1A]/10">
            <div className="flex items-center justify-between text-xs font-sans text-[#1A1A1A]/80 mb-1.5">
              {amountForFreeShipping > 0 ? (
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#A67C52]" />
                  Add <strong className="font-serif text-[#A67C52]">${amountForFreeShipping.toFixed(2)}</strong> more for <strong>Complimentary Shipping</strong>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-[#2E5E4E] font-medium font-sans">
                  <Check className="w-3.5 h-3.5" />
                  Unlocked Complimentary Climate Shipping!
                </span>
              )}
              <span className="text-[10px] font-sans text-[#1A1A1A]/50">{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full h-1.5 bg-[#1A1A1A]/10 rounded-none overflow-hidden">
              <div
                className="h-full bg-[#A67C52] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Scrollable Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-12 h-12 rounded-sm bg-[#EFECE7] flex items-center justify-center text-[#A67C52] text-xl font-serif">
                  ✦
                </div>
                <h3 className="font-serif text-lg font-light text-[#1A1A1A]">Your Bag is Empty</h3>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs font-sans">
                  Explore our curated selections of organic whole nutrition and handcrafted leather goods.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-6 py-2.5 rounded-none bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-medium hover:bg-[#A67C52] transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item, index) => {
                const unitPrice = item.purchaseType === 'subscription' ? item.product.price * 0.9 : item.product.price;
                return (
                  <div
                    key={`${item.product.id}-${index}`}
                    className="flex gap-3 bg-[#FAF8F5] p-3 rounded-sm border border-[#1A1A1A]/10 shadow-xs relative group"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-sm object-cover bg-[#EFECE7] shrink-0 border border-[#1A1A1A]/10"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="text-xs font-serif font-medium text-[#1A1A1A] line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(index)}
                            className="text-[#1A1A1A]/40 hover:text-[#1A1A1A] p-1 transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Variants info */}
                        <div className="flex flex-wrap gap-1.5 text-[10px] font-sans text-[#1A1A1A]/60 mt-0.5">
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedSize && <span>· Size: {item.selectedSize}</span>}
                        </div>

                        {/* Subscription badge */}
                        {item.purchaseType === 'subscription' && (
                          <span className="inline-block mt-1 text-[9px] font-sans uppercase tracking-wider font-semibold text-[#2E5E4E] bg-[#2E5E4E]/10 px-1.5 py-0.5 rounded-sm">
                            Auto-Refill ({item.subscriptionFrequency}) · 10% Off
                          </span>
                        )}
                      </div>

                      {/* Quantity Stepper & Line Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#1A1A1A]/10">
                        <div className="flex items-center bg-white border border-[#1A1A1A]/15 rounded-sm">
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs font-sans text-[#1A1A1A] hover:bg-[#EFECE7]"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 text-xs font-sans font-medium text-[#1A1A1A]">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs font-sans text-[#1A1A1A] hover:bg-[#EFECE7]"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-xs font-serif text-[#1A1A1A]">
                          ${(unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Panel */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#1A1A1A]/10 space-y-3.5">
              
              {/* Pet Gift Box Personalization Note */}
              <div className="space-y-1">
                <label className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#1A1A1A]/70 flex items-center gap-1">
                  <span>Companion's Name for Personalized Packaging:</span>
                </label>
                <input
                  type="text"
                  value={petGiftName}
                  onChange={(e) => setPetGiftName(e.target.value)}
                  placeholder="e.g. Milo (Handwritten welcome card included)"
                  className="w-full bg-white px-3 py-2 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans focus:outline-none focus:border-[#A67C52]"
                />
              </div>

              {/* Promo Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon (e.g. PAW15)"
                    className="w-full bg-white pl-8 pr-3 py-2 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans font-medium uppercase focus:outline-none focus:border-[#A67C52]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] uppercase tracking-[0.15em] font-sans font-medium rounded-sm transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {couponError && <p className="text-[11px] text-red-600 font-sans">{couponError}</p>}
              {couponApplied && (
                <p className="text-[11px] text-[#2E5E4E] font-sans font-medium flex items-center gap-1">
                  <Check className="w-3 h-3" /> Coupon "{couponCode}" applied ({discountPercent}% OFF)
                </p>
              )}

              {/* Subtotal Calculation */}
              <div className="space-y-1.5 pt-2 border-t border-[#1A1A1A]/10 text-xs font-sans">
                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Subtotal</span>
                  <span className="font-serif text-[#1A1A1A] font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent > 0 && (
                  <div className="flex justify-between text-[#2E5E4E] font-medium">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-[#1A1A1A]/70">
                  <span>Courier Shipping</span>
                  <span className="font-sans">
                    {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                      <strong className="text-[#2E5E4E]">Complimentary</strong>
                    ) : (
                      '$4.99'
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-serif text-[#1A1A1A] pt-2 border-t border-[#1A1A1A]/10">
                  <span>Estimated Total</span>
                  <span className="text-base font-medium">
                    ${(subtotal - discountAmount + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                id="cart-checkout-proceed-btn"
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-6 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>

              {/* Security Seals */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-[#1A1A1A]/50 font-sans pt-1">
                <span>🔒 256-Bit SSL Encryption</span>
                <span>•</span>
                <span>💳 Apple Pay / Cards / PayPal</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
