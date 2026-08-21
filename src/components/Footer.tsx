import React, { useState } from 'react';
import { PawPrint, Mail, ArrowRight, ShieldCheck, Heart, Sparkles, Check } from 'lucide-react';

interface FooterProps {
  onOpenAiAdvisor: () => void;
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAiAdvisor, onSelectCategory }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#1A1A1A] text-[#F9F7F2] border-t border-[#1A1A1A]">
      
      {/* Newsletter Signup Banner */}
      <div className="bg-[#222222] py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#A67C52] block">
            The Journal & Private Circle
          </span>

          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#F9F7F2]">
            Receive Private Releases & 15% Off
          </h3>

          <p className="text-xs sm:text-sm text-[#F9F7F2]/70 max-w-md mx-auto font-sans leading-relaxed">
            Subscribe for seasonal artisan treat drops, veterinary nutrition insights, and complimentary private concierge access.
          </p>

          {subscribed ? (
            <div className="bg-[#2E5E4E] text-white p-4 rounded-sm max-w-md mx-auto text-xs font-sans font-medium flex items-center justify-center gap-2">
              <Check className="w-4 h-4" />
              <span>Welcome to the circle. Use code <strong className="underline font-bold">PAW15</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-[#1A1A1A] pl-11 pr-4 py-3.5 rounded-sm border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#A67C52] font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-3.5 rounded-sm bg-white hover:bg-[#A67C52] hover:text-white text-[#1A1A1A] text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium transition-all cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Claim 15% OFF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center text-[#1A1A1A]">
                <PawPrint className="w-4 h-4 fill-[#1A1A1A]" />
              </div>
              <div>
                <span className="font-serif text-xl font-light tracking-tight text-[#F9F7F2] block leading-none">
                  PAWSOME
                </span>
                <span className="text-[9px] tracking-[0.3em] uppercase font-sans font-semibold text-[#A67C52] block mt-0.5">
                  Pet Boutique & Co.
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F9F7F2]/70 leading-relaxed max-w-sm font-sans">
              Dedicated to companion wellness through certified organic nutrition, architectural comfort, and enduring vegetable-tanned accessories.
            </p>

            <div className="flex items-center gap-2.5 pt-2 text-xs font-sans text-[#A67C52]">
              <ShieldCheck className="w-4 h-4" />
              <span>Certified B-Corp · 1% For Canine & Feline Rescues</span>
            </div>
          </div>

          {/* Col 2: Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52]">
              The Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#F9F7F2]/70 font-sans">
              <li>
                <button onClick={() => onSelectCategory('treats')} className="hover:text-white transition-colors">
                  Artisan Organic Treats
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('collars')} className="hover:text-white transition-colors">
                  Tuscan Leather Collars
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('beds')} className="hover:text-white transition-colors">
                  Orthopedic Cloud Beds
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('toys')} className="hover:text-white transition-colors">
                  Natural Rubber Toys
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('crates')} className="hover:text-white transition-colors">
                  Voyager Travel Carriers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Smart AI & Services */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52]">
              Consultation
            </h4>
            <ul className="space-y-2 text-xs text-[#F9F7F2]/70 font-sans">
              <li>
                <button onClick={onOpenAiAdvisor} className="text-[#D4A373] hover:underline flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3" /> AI Pet Assessment Quiz
                </button>
              </li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Subscribe & Replenish (10% Off)</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Grain-Free Wild Salmon Recipes</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Single-Source Chews</a></li>
              <li><a href="#catalog-section" className="hover:text-white transition-colors">Puppy & Kitten Starter Sets</a></li>
            </ul>
          </div>

          {/* Col 4: Help & Assurance */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A67C52]">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#F9F7F2]/70 font-sans">
              <li><span className="hover:text-white cursor-pointer">Worldwide Concierge</span></li>
              <li><span className="hover:text-white cursor-pointer">30-Day Durability Pledge</span></li>
              <li><span className="hover:text-white cursor-pointer">Veterinary Safety Hotline</span></li>
              <li><span className="hover:text-white cursor-pointer">Shipping & Sustainability Policy</span></li>
              <li><span className="hover:text-white cursor-pointer">PCI-DSS 256-Bit SSL Encrypted</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & payment icons */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#F9F7F2]/50 font-sans">
          <p>© 2026 Pawsome Pet Boutique & Co. All rights reserved. Handcrafted with reverence for animals.</p>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-medium">
            <span className="border border-white/15 px-2 py-0.5 text-white/80">VISA</span>
            <span className="border border-white/15 px-2 py-0.5 text-white/80">AMEX</span>
            <span className="border border-white/15 px-2 py-0.5 text-white/80">APPLE PAY</span>
            <span className="border border-white/15 px-2 py-0.5 text-white/80">PAYPAL</span>
            <span className="border border-white/15 px-2 py-0.5 text-white/80">KLARNA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
