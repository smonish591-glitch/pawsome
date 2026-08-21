import React from 'react';
import { Star, CheckCircle, Heart, Sparkles, MessageCircle } from 'lucide-react';
import { CUSTOMER_REVIEWS } from '../data/products';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-[#F9F7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.4em] text-[#A67C52] block">
            Client Testimonials
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#1A1A1A]">
            Words from Companions
          </h2>

          <div className="flex items-center justify-center gap-2 pt-2 text-xs font-sans text-[#1A1A1A]/70">
            <div className="flex text-[#A67C52]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#A67C52]" />
              ))}
            </div>
            <span className="font-medium text-[#1A1A1A]">4.95 / 5.0 Overall Rating</span>
            <span>· Verified Pet Parents</span>
          </div>
        </div>

        {/* Reviews 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF8F5] p-6 sm:p-8 rounded-sm border border-[#1A1A1A]/10 flex flex-col justify-between space-y-6 hover:border-[#A67C52]/50 transition-all duration-300 shadow-xs"
            >
              <div className="space-y-4">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex text-[#A67C52]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#A67C52]" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#1A1A1A]/50">{rev.date}</span>
                </div>

                {/* Title & Comment */}
                <div>
                  <h4 className="text-base font-serif font-medium text-[#1A1A1A] leading-snug">
                    "{rev.title}"
                  </h4>
                  <p className="text-xs text-[#1A1A1A]/70 mt-2 leading-relaxed font-sans">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Author & Pet Avatar */}
              <div className="pt-4 border-t border-[#1A1A1A]/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {rev.photoUrl ? (
                    <img src={rev.photoUrl} alt={rev.petName} className="w-9 h-9 rounded-full object-cover border border-[#A67C52]" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#EFECE7] text-[#1A1A1A] flex items-center justify-center font-serif text-xs">
                      ✦
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-sans font-semibold text-[#1A1A1A] leading-tight flex items-center gap-1">
                      <span>{rev.author}</span>
                      {rev.verified && <CheckCircle className="w-3 h-3 text-[#A67C52]" />}
                    </p>
                    <p className="text-[10px] text-[#1A1A1A]/50 font-sans">{rev.petName} ({rev.petBreed})</p>
                  </div>
                </div>

                <span className="text-[9px] uppercase font-sans tracking-wider text-[#A67C52] font-semibold">
                  Verified
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
