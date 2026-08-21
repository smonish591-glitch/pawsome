import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Product } from '../types';

interface FlatLayShowcaseProps {
  onSelectProduct: (p: Product) => void;
  allProducts: Product[];
  onOpenAiAdvisor: () => void;
}

export const FlatLayShowcase: React.FC<FlatLayShowcaseProps> = ({
  onSelectProduct,
  allProducts,
  onOpenAiAdvisor
}) => {
  return (
    <section className="bg-[#1A1A1A] text-[#F9F7F2] py-16 sm:py-24 relative overflow-hidden border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] uppercase font-sans font-semibold tracking-[0.4em] text-[#A67C52] block">
            Pure Formulation · Handcrafted Standards
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-[#F9F7F2]">
            The Master Lookbook
          </h2>

          <p className="text-xs sm:text-sm text-[#F9F7F2]/70 leading-relaxed font-sans max-w-lg mx-auto">
            Every collar, orthopedic bed, and organic chew biscuit is engineered with non-toxic, pet-safe materials and inspected by certified animal nutritionists.
          </p>
        </div>

        {/* Flat Lay Visual Grid - Editorial Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Item 1: Biscuit & Treats */}
          <div 
            onClick={() => {
              const p = allProducts.find(x => x.id === 'prod-treat-01');
              if (p) onSelectProduct(p);
            }}
            className="group relative rounded-sm overflow-hidden bg-[#242424] border border-white/10 p-5 aspect-square flex flex-col justify-between cursor-pointer hover:border-[#A67C52] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-white text-[#1A1A1A] px-2 py-0.5">
                01 · Organic
              </span>
              <span className="text-sm font-serif italic text-[#A67C52]">Treats</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-white group-hover:text-[#D4A373] transition-colors">Wild Salmon Treats</h4>
              <p className="text-[11px] font-sans text-[#F9F7F2]/60">Oven-baked crunch · $12.50</p>
            </div>
          </div>

          {/* Item 2: Leather Collar & Harness */}
          <div 
            onClick={() => {
              const p = allProducts.find(x => x.id === 'prod-collar-01');
              if (p) onSelectProduct(p);
            }}
            className="group relative rounded-sm overflow-hidden bg-[#242424] border border-white/10 p-5 aspect-square flex flex-col justify-between cursor-pointer hover:border-[#A67C52] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-white text-[#1A1A1A] px-2 py-0.5">
                02 · Full-Grain
              </span>
              <span className="text-sm font-serif italic text-[#A67C52]">Leather</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-white group-hover:text-[#D4A373] transition-colors">Tuscan Collar</h4>
              <p className="text-[11px] font-sans text-[#F9F7F2]/60">Solid brass hardware · $14.99</p>
            </div>
          </div>

          {/* Item 3: Ceramic Bowl */}
          <div 
            onClick={() => {
              const p = allProducts.find(x => x.id === 'prod-bowl-01');
              if (p) onSelectProduct(p);
            }}
            className="group relative rounded-sm overflow-hidden bg-[#242424] border border-white/10 p-5 aspect-square flex flex-col justify-between cursor-pointer hover:border-[#A67C52] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-white text-[#1A1A1A] px-2 py-0.5">
                03 · Ceramic
              </span>
              <span className="text-sm font-serif italic text-[#A67C52]">Dining</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-white group-hover:text-[#D4A373] transition-colors">Elevated Bowls</h4>
              <p className="text-[11px] font-sans text-[#F9F7F2]/60">Spine-safe bamboo · $28.00</p>
            </div>
          </div>

          {/* Item 4: Heavy-Duty Travel Crate */}
          <div 
            onClick={() => {
              const p = allProducts.find(x => x.id === 'prod-crate-01');
              if (p) onSelectProduct(p);
            }}
            className="group relative rounded-sm overflow-hidden bg-[#242424] border border-white/10 p-5 aspect-square flex flex-col justify-between cursor-pointer hover:border-[#A67C52] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <span className="text-[9px] font-sans font-bold uppercase tracking-[0.2em] bg-white text-[#1A1A1A] px-2 py-0.5">
                04 · Travel
              </span>
              <span className="text-sm font-serif italic text-[#A67C52]">Cabin</span>
            </div>
            <div className="space-y-1">
              <h4 className="font-serif text-base text-white group-hover:text-[#D4A373] transition-colors">Voyager Carrier</h4>
              <p className="text-[11px] font-sans text-[#F9F7F2]/60">Airline IATA approved · $64.00</p>
            </div>
          </div>

        </div>

        {/* Interactive Bottom Banner - Editorial Aesthetic */}
        <div className="mt-12 bg-[#222222] rounded-sm p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-[9px] uppercase font-sans font-bold tracking-[0.3em] text-[#A67C52] block">
              Bespoke Formulation Engine
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#F9F7F2]">
              Need an AI Nutrition & Gear Recommendation?
            </h3>
            <p className="text-xs sm:text-sm text-[#F9F7F2]/70 font-sans max-w-xl">
              Complete a 60-second assessment tailored to your canine or feline companion's breed, age, weight, and allergies.
            </p>
          </div>

          <button
            onClick={onOpenAiAdvisor}
            className="px-8 py-4 rounded-none bg-white hover:bg-[#A67C52] hover:text-white text-[#1A1A1A] text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Launch AI Advisor</span>
          </button>
        </div>

      </div>
    </section>
  );
};
