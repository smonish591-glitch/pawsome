import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Heart, Award, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface HeroSectionProps {
  onShopNow: () => void;
  onOpenAiAdvisor: () => void;
  onSelectProductById: (id: string) => void;
  featuredProducts: Product[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopNow,
  onOpenAiAdvisor,
  onSelectProductById
}) => {
  return (
    <section className="relative overflow-hidden bg-[#F9F7F2] text-[#1A1A1A] border-b border-[#1A1A1A]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        
        {/* Left Column: Editorial Typography & Actions */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/10 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-[#F9F7F2]">
          
          {/* Eyebrow */}
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-[#A67C52] mb-4 block font-semibold">
            Bespoke Pet Essentials
          </span>

          {/* Main Headline with Editorial Italic styling */}
          <h1 className="text-4xl sm:text-6xl lg:text-[70px] leading-[0.92] mb-6 font-light font-serif italic tracking-tight text-[#1A1A1A]">
            The Art of <br />
            <span className="not-italic font-normal">Companion</span> <br />
            Living.
          </h1>

          {/* Editorial Paragraph */}
          <p className="text-xs sm:text-sm leading-relaxed text-[#1A1A1A]/70 mb-8 max-w-md font-sans">
            Experience elevated pet care through artisan craft and whole nutrition. Our curated release features organic whole-food treats, vegetable-tanned Italian leathers, and orthopedic resting clouds tailored for the modern home.
          </p>

          {/* Editorial CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <button
              id="hero-shop-now-btn"
              onClick={onShopNow}
              className="bg-[#1A1A1A] hover:bg-[#A67C52] text-white px-8 py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 shadow-xs cursor-pointer flex items-center gap-2 group"
            >
              <span>Shop the Release</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="hero-ai-match-btn"
              onClick={onOpenAiAdvisor}
              className="border border-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white text-[#1A1A1A] px-8 py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-sans font-medium transition-colors duration-300 cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A67C52]" />
              <span>Pet Match Quiz</span>
            </button>
          </div>

          {/* Editorial Value Highlights */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#1A1A1A]/10 text-[#1A1A1A]">
            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-sans text-[#A67C52] block font-bold">Origin</span>
              <p className="text-xs font-serif font-medium text-[#1A1A1A]">100% Organic</p>
              <p className="text-[10px] text-[#1A1A1A]/60 font-sans">Zero fillers or grain</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-sans text-[#A67C52] block font-bold">Standard</span>
              <p className="text-xs font-serif font-medium text-[#1A1A1A]">Vet Approved</p>
              <p className="text-[10px] text-[#1A1A1A]/60 font-sans">Board certified formula</p>
            </div>

            <div className="space-y-1">
              <span className="text-[9px] uppercase tracking-widest font-sans text-[#A67C52] block font-bold">Pledge</span>
              <p className="text-xs font-serif font-medium text-[#1A1A1A]">Hand-Stitched</p>
              <p className="text-[10px] text-[#1A1A1A]/60 font-sans">30-Day durability</p>
            </div>
          </div>

        </div>

        {/* Right Column: Architectural Canvas, Arch Frame, & Floating Product Card */}
        <div className="lg:col-span-7 bg-[#EFECE7] relative overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 min-h-[520px]">
          
          {/* Floating Product Card (Matching Design HTML) */}
          <div className="relative sm:absolute sm:top-8 sm:left-8 z-20 mb-6 sm:mb-0">
            <div className="bg-white/85 backdrop-blur-md p-5 sm:p-6 w-full sm:w-72 border border-white/80 shadow-md">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] uppercase tracking-widest font-sans text-[#1A1A1A]/60">Product 01</span>
                <span className="text-xs font-sans font-bold text-[#A67C52]">$14.99</span>
              </div>
              <h3 className="text-base font-serif font-medium text-[#1A1A1A] mb-1.5 leading-snug">
                The Tuscan Leather Collar
              </h3>
              <p className="text-[11px] font-sans text-[#1A1A1A]/70 mb-4 leading-relaxed">
                Vegetable-tanned harness leather with solid brass hardware. Ages beautifully with every walk.
              </p>
              
              {/* Color Swatch Dots */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#5A4632]" title="Espresso Brown" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#1A1A1A]" title="Classic Noir" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#D4A373]" title="Caramel Tan" />
                </div>
                <button
                  onClick={() => onSelectProductById('prod-collar-01')}
                  className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#1A1A1A] hover:text-[#A67C52] transition-colors underline underline-offset-4 cursor-pointer"
                >
                  Inspect
                </button>
              </div>
            </div>
          </div>

          {/* Architectural Arch Stage with Central Golden Retriever Canvas */}
          <div className="w-full flex-1 flex items-center justify-center relative my-4 sm:my-0">
            <div className="w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] border-[1px] border-[#1A1A1A]/10 rounded-t-full relative overflow-hidden bg-gradient-to-tr from-[#D6D1CA] to-[#F9F7F2] shadow-sm">
              
              {/* Central Visual Companion */}
              <img 
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=85" 
                alt="Bespoke canine companion enjoying artisanal treats"
                className="w-full h-full object-cover object-center mix-blend-multiply opacity-90 transform hover:scale-103 transition-transform duration-700"
              />

              {/* Background Watermark Inscription */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[100px] sm:text-[140px] font-serif italic text-[#1A1A1A]/5 select-none tracking-tighter">
                  Elegance
                </span>
              </div>

              {/* Hotspot 1: Donut Bed */}
              <div 
                onClick={() => onSelectProductById('prod-bed-01')}
                className="absolute bottom-6 right-6 z-20 cursor-pointer group"
              >
                <div className="bg-[#1A1A1A]/85 hover:bg-[#1A1A1A] text-[#F9F7F2] px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest backdrop-blur-xs transition-all flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                  <span>Cloud Bed · $39</span>
                </div>
              </div>

              {/* Hotspot 2: Chew Bone */}
              <div 
                onClick={() => onSelectProductById('prod-chew-01')}
                className="absolute top-1/3 left-6 z-20 cursor-pointer group"
              >
                <div className="bg-[#1A1A1A]/85 hover:bg-[#1A1A1A] text-[#F9F7F2] px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest backdrop-blur-xs transition-all flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373]" />
                  <span>Natural Bone · $5.99</span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Editorial Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#1A1A1A]/10 text-[10px] uppercase tracking-widest font-sans text-[#1A1A1A]/70">
            <div className="flex items-center gap-4">
              <span>Collection 04 / Autumn-Spring</span>
              <span>·</span>
              <span>Tuscan Leather & Wild Salmon</span>
            </div>
            <button
              onClick={() => onSelectProductById('prod-treat-01')}
              className="text-[#A67C52] hover:text-[#1A1A1A] font-bold transition-colors cursor-pointer"
            >
              Explore Wild Salmon Treats →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
