import React from 'react';
import { ShieldCheck, Truck, RotateCcw, HeartHandshake, Sparkles, Award, Leaf } from 'lucide-react';

export const BrandPerks: React.FC = () => {
  const perks = [
    {
      icon: Leaf,
      title: '100% Organic & Non-GMO',
      description: 'Handcrafted with whole-food ingredients, zero artificial fillers, and human-grade wild salmon and meats.'
    },
    {
      icon: ShieldCheck,
      title: 'Veterinarian Approved',
      description: 'Recipes formulated alongside board-certified pet nutritionists for optimal gut and coat wellness.'
    },
    {
      icon: Truck,
      title: 'Climate-Neutral Courier',
      description: 'Expedited shipping on all orders over $45 packed in 100% recyclable bespoke insulated boxes.'
    },
    {
      icon: HeartHandshake,
      title: '30-Day Happiness Guarantee',
      description: "If your pet isn't thrilled with any accessory, bed, or treat, return it within 30 days for a full refund."
    }
  ];

  return (
    <section className="bg-[#FAF8F5] py-14 sm:py-16 border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="flex items-start gap-4 p-5 rounded-sm bg-[#EFECE7] border border-[#1A1A1A]/10">
                <div className="w-10 h-10 rounded-sm bg-[#1A1A1A] text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#D4A373]" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-sm font-medium text-[#1A1A1A]">
                    {perk.title}
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                    {perk.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
