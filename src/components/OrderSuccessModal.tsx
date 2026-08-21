import React from 'react';
import { CheckCircle2, Package, Truck, Home, Sparkles, Download, ArrowRight, X, Heart, PawPrint } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderSuccessModalProps {
  order: OrderDetails | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping
}) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="order-success-modal"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#1A1A1A]/15 text-[#1A1A1A] p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-sm bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-xs hover:bg-[#FAF8F5] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center space-y-3 pb-6 border-b border-[#1A1A1A]/10">
          <div className="w-14 h-14 rounded-full bg-[#EFECE7] border border-[#1A1A1A]/20 flex items-center justify-center mx-auto text-[#2E5E4E] shadow-xs">
            <CheckCircle2 className="w-8 h-8 text-[#2E5E4E]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-[#EFECE7] text-[#A67C52] text-[10px] font-sans uppercase tracking-[0.2em] font-semibold">
            <Sparkles className="w-3 h-3" />
            <span>Order Confirmed & Logged</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#1A1A1A]">
            Thank You, {order.customer.fullName}
          </h2>

          <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/70 max-w-md mx-auto">
            Your atelier order is confirmed. Our craftsmen are preparing the bespoke packaging dedicated to <strong className="text-[#A67C52] font-medium">{order.customer.petName || 'your companion'}</strong>.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-sans">
            <span className="bg-white px-3 py-1.5 rounded-sm border border-[#1A1A1A]/10 text-[#1A1A1A]/70">
              Order ID: <strong className="text-[#1A1A1A] font-serif">{order.id}</strong>
            </span>
            <span className="bg-white px-3 py-1.5 rounded-sm border border-[#1A1A1A]/10 text-[#1A1A1A]/70">
              Tracking: <strong className="text-[#A67C52] font-mono">{order.trackingNumber}</strong>
            </span>
          </div>
        </div>

        {/* Order Status Progress Tracker */}
        <div className="py-6 border-b border-[#1A1A1A]/10 space-y-4">
          <h3 className="font-serif text-sm font-medium text-[#1A1A1A] tracking-wide text-center sm:text-left">
            Dispatch Timeline
          </h3>

          <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs font-sans">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-7 h-7 rounded-none bg-[#1A1A1A] text-white flex items-center justify-center font-bold text-[10px]">
                ✓
              </div>
              <span className="font-medium text-[#1A1A1A]">Logged</span>
              <span className="text-[9px] text-[#1A1A1A]/50">Payment Settled</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-1.5">
              <div className="w-7 h-7 rounded-none bg-[#A67C52] text-white flex items-center justify-center font-bold animate-pulse">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[#A67C52]">Atelier Prep</span>
              <span className="text-[9px] text-[#1A1A1A]/50">Hand packaging</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-1.5 opacity-50">
              <div className="w-7 h-7 rounded-none bg-[#EFECE7] text-[#1A1A1A] flex items-center justify-center font-bold border border-[#1A1A1A]/20">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[#1A1A1A]">Transit</span>
              <span className="text-[9px] text-[#1A1A1A]/50">Carbon courier</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center space-y-1.5 opacity-50">
              <div className="w-7 h-7 rounded-none bg-[#EFECE7] text-[#1A1A1A] flex items-center justify-center font-bold border border-[#1A1A1A]/20">
                <Home className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[#1A1A1A]">Delivered</span>
              <span className="text-[9px] text-[#1A1A1A]/50">To your door</span>
            </div>

          </div>
        </div>

        {/* Itemized Receipt Details */}
        <div className="py-5 space-y-3 border-b border-[#1A1A1A]/10">
          <div className="flex items-center justify-between text-xs font-sans uppercase tracking-wider text-[#1A1A1A]/70">
            <span>Provisions ({order.items.length})</span>
            <span>Subtotal</span>
          </div>

          <div className="space-y-2 max-h-40 overflow-y-auto font-sans">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-[#1A1A1A] bg-white p-2.5 rounded-sm border border-[#1A1A1A]/10">
                <div className="flex items-center gap-2.5">
                  <img src={item.product.image} alt={item.product.name} className="w-9 h-9 rounded-sm object-cover bg-[#EFECE7]" />
                  <div>
                    <p className="font-medium text-[#1A1A1A] line-clamp-1">{item.product.name}</p>
                    <p className="text-[10px] text-[#1A1A1A]/60">Qty: {item.quantity} · {item.purchaseType === 'subscription' ? 'Standing Delivery (10% Off)' : 'Single Order'}</p>
                  </div>
                </div>
                <span className="font-serif text-xs text-[#1A1A1A]">
                  ${((item.purchaseType === 'subscription' ? item.product.price * 0.9 : item.product.price) * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-2 text-xs font-sans space-y-1 text-[#1A1A1A]/70">
            <div className="flex justify-between">
              <span>Destination:</span>
              <span className="font-medium text-[#1A1A1A]">{order.customer.address}, {order.customer.city}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Protocol:</span>
              <span className="font-medium text-[#1A1A1A] uppercase">{order.paymentMethod.type} (•••• {order.paymentMethod.lastFour || '4242'})</span>
            </div>
            <div className="flex justify-between text-sm font-serif text-[#1A1A1A] pt-1 border-t border-[#1A1A1A]/10">
              <span>Total Settled:</span>
              <span className="text-base font-normal text-[#1A1A1A]">${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-3 rounded-none bg-white hover:bg-[#FAF8F5] text-[#1A1A1A] border border-[#1A1A1A]/20 text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Invoice</span>
          </button>

          <button
            onClick={onContinueShopping}
            className="w-full flex-1 py-3.5 px-6 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Return to Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
