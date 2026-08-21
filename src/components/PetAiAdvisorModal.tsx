import React, { useState } from 'react';
import { X, Sparkles, Dog, Cat, CheckCircle, ArrowRight, ShieldCheck, Heart, ShoppingBag, Loader2, RefreshCw } from 'lucide-react';
import { Product, PetProfile, AiRecommendation } from '../types';
import { PET_BREEDS } from '../data/products';

interface PetAiAdvisorModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  onAddBundleToCart: (products: Product[]) => void;
}

export const PetAiAdvisorModal: React.FC<PetAiAdvisorModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  onAddBundleToCart
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<PetProfile>({
    name: 'Milo',
    type: 'dog',
    breed: 'Golden Retriever',
    age: 'Adult (2-6 yrs)',
    weight: '55-75 lbs (Large)',
    activityLevel: 'high',
    dietaryNeeds: ['Grain-Free'],
    healthGoals: ['Shiny Coat & Skin', 'Dental Cleanliness', 'Joint Support']
  });

  const [recommendation, setRecommendation] = useState<AiRecommendation | null>(null);

  const allergyOptions = [
    'Grain-Free',
    'Hypoallergenic / Single Protein',
    'Sensitive Stomach',
    'Low Calorie / Weight Control',
    'No Poultry / Chicken-Free'
  ];

  const goalOptions = [
    'Shiny Coat & Skin',
    'Joint & Mobility Support',
    'Dental Cleanliness & Plaque Control',
    'Anxiety & Stress Calming',
    'Active Energy & Muscle Growth'
  ];

  const toggleAllergy = (opt: string) => {
    setProfile(prev => ({
      ...prev,
      dietaryNeeds: prev.dietaryNeeds.includes(opt)
        ? prev.dietaryNeeds.filter(i => i !== opt)
        : [...prev.dietaryNeeds, opt]
    }));
  };

  const toggleGoal = (opt: string) => {
    setProfile(prev => ({
      ...prev,
      healthGoals: prev.healthGoals.includes(opt)
        ? prev.healthGoals.filter(i => i !== opt)
        : [...prev.healthGoals, opt]
    }));
  };

  const handleGenerateAdvice = async () => {
    setLoading(true);
    setStep(3);

    try {
      const response = await fetch('/api/ai-pet-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      const data = await response.json();
      if (data.success && data.recommendation) {
        setRecommendation(data.recommendation);
      } else {
        throw new Error('Fallback needed');
      }
    } catch (err) {
      // Fallback recommendation
      setRecommendation({
        summary: `For ${profile.name} the ${profile.breed}, our nutrition experts recommend wholesome omega-3 rich salmon recipes paired with an anxiety-reducing orthopedic bed and tough dental rubber chew toys.`,
        dailyRoutine: {
          morning: `Start with high-protein whole breakfast followed by a 25-minute walk using an ergonomic padded rope leash.`,
          afternoon: `Cognitive play session with durable chew bone toy filled with raw beef liver bites.`,
          evening: `Gentle grooming with natural paw balm and restorative sleep in a calming cloud-donut cuddler bed.`
        },
        recommendedProductIds: ['prod-treat-01', 'prod-chew-01', 'prod-bed-01'],
        dietaryTip: `For ${profile.breed}s with ${profile.dietaryNeeds.join(' & ')}, single-source wild fish and pumpkin provide optimal prebiotic gut balance.`,
        treatPortionGuide: `Limit treats to 2-3 biscuits per day (approx 45 kcal total) to preserve lean muscular physique.`
      });
    } finally {
      setLoading(false);
    }
  };

  const recommendedProducts = recommendation
    ? allProducts.filter(p => recommendation.recommendedProductIds.includes(p.id))
    : allProducts.slice(0, 3);

  const bundleTotal = recommendedProducts.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscountedTotal = bundleTotal * 0.85; // 15% bundle discount

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="pet-ai-advisor-modal"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#FAF8F5] rounded-sm shadow-2xl border border-[#1A1A1A]/15 text-[#1A1A1A]"
      >
        {/* Header Ribbon */}
        <div className="sticky top-0 z-10 bg-[#1A1A1A] text-[#F9F7F2] p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-[#A67C52] flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-light leading-tight text-[#F9F7F2]">
                Pet Nutrition & Gear Curator
              </h2>
              <p className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#D4A373]">Tailored botanical & dietary analysis</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">

          {/* Step 1: Pet Info */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-[#1A1A1A]/10 pb-3">
                <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A67C52]">Phase 01 / 02</span>
                <h3 className="font-serif text-2xl font-light text-[#1A1A1A] mt-1">Companion Dossier</h3>
              </div>

              {/* Species Toggle */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, type: 'dog' })}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-sm border font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    profile.type === 'dog'
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <Dog className="w-4 h-4" />
                  <span>Canine</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProfile({ ...profile, type: 'cat' })}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-sm border font-sans text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    profile.type === 'cat'
                      ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white'
                      : 'border-[#1A1A1A]/15 bg-white text-[#1A1A1A] hover:border-[#1A1A1A]'
                  }`}
                >
                  <Cat className="w-4 h-4" />
                  <span>Feline</span>
                </button>
              </div>

              {/* Pet Name & Breed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-[#1A1A1A]">Companion's Name</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="e.g. Milo, Luna"
                    className="w-full bg-white px-3.5 py-2.5 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans focus:outline-none focus:border-[#A67C52]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-[#1A1A1A]">Breed Lineage</label>
                  <select
                    value={profile.breed}
                    onChange={(e) => setProfile({ ...profile, breed: e.target.value })}
                    className="w-full bg-white px-3.5 py-2.5 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans focus:outline-none focus:border-[#A67C52]"
                  >
                    {PET_BREEDS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Age & Weight */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-[#1A1A1A]">Life Stage</label>
                  <select
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                    className="w-full bg-white px-3.5 py-2.5 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans focus:outline-none focus:border-[#A67C52]"
                  >
                    <option value="Puppy/Kitten (< 1 yr)">Early Development (&lt; 1 yr)</option>
                    <option value="Adult (2-6 yrs)">Adult Prime (2 - 6 yrs)</option>
                    <option value="Senior (7+ yrs)">Golden Years (7+ yrs)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-sans font-medium text-[#1A1A1A]">Weight Class</label>
                  <select
                    value={profile.weight}
                    onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
                    className="w-full bg-white px-3.5 py-2.5 rounded-sm border border-[#1A1A1A]/15 text-xs font-sans focus:outline-none focus:border-[#A67C52]"
                  >
                    <option value="Toy (< 12 lbs)">Toy (&lt; 12 lbs)</option>
                    <option value="Small (12-25 lbs)">Small (12 - 25 lbs)</option>
                    <option value="Medium (25-50 lbs)">Medium (25 - 50 lbs)</option>
                    <option value="Large (50-80 lbs)">Large (50 - 80 lbs)</option>
                    <option value="Giant (80+ lbs)">Giant (80+ lbs)</option>
                  </select>
                </div>
              </div>

              {/* Next CTA */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 px-6 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Continue: Dietary & Wellness Needs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Health & Dietary Needs */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <div className="border-b border-[#1A1A1A]/10 pb-3 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#A67C52]">Phase 02 / 02</span>
                  <h3 className="font-serif text-2xl font-light text-[#1A1A1A] mt-1">Holistic Wellness Focus</h3>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs font-sans uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#1A1A1A] cursor-pointer"
                >
                  ← Back
                </button>
              </div>

              {/* Sensitivities */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                  Dietary Sensitivities & Standards
                </label>
                <div className="flex flex-wrap gap-2">
                  {allergyOptions.map((opt) => {
                    const active = profile.dietaryNeeds.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleAllergy(opt)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-sans transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#1A1A1A]'
                        }`}
                      >
                        {active && '✓ '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Goals */}
              <div className="space-y-2">
                <label className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1A1A1A] block">
                  Wellness Milestones
                </label>
                <div className="flex flex-wrap gap-2">
                  {goalOptions.map((opt) => {
                    const active = profile.healthGoals.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleGoal(opt)}
                        className={`px-3 py-1.5 rounded-sm text-xs font-sans transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#2E5E4E] text-white border-[#2E5E4E]'
                            : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/15 hover:border-[#2E5E4E]'
                        }`}
                      >
                        {active && '✓ '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate CTA */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleGenerateAdvice}
                  className="w-full py-4 px-6 rounded-none bg-[#1A1A1A] hover:bg-[#A67C52] text-white text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A373]" />
                  <span>Synthesize Regimen for {profile.name}</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Result & Tailored Bundle */}
          {step === 3 && (
            <div className="space-y-6 animate-in fade-in">
              {loading ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-10 h-10 border border-[#1A1A1A] border-t-transparent animate-spin mx-auto flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-[#A67C52]" />
                  </div>
                  <h3 className="font-serif text-xl font-light text-[#1A1A1A]">
                    Curating Formulation for {profile.name}...
                  </h3>
                  <p className="text-xs font-sans text-[#1A1A1A]/60 max-w-sm mx-auto">
                    Cross-referencing biological nutritional ratios for {profile.breed}...
                  </p>
                </div>
              ) : recommendation ? (
                <div className="space-y-6">
                  
                  {/* Summary Card */}
                  <div className="bg-[#EFECE7] p-5 rounded-sm border border-[#1A1A1A]/10 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.15em] font-semibold text-[#A67C52]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Formulation Regimen · {profile.name} ({profile.breed})</span>
                    </div>
                    <p className="text-xs sm:text-sm font-sans text-[#1A1A1A]/80 leading-relaxed">
                      {recommendation.summary}
                    </p>
                    <div className="bg-white p-3 rounded-sm border border-[#1A1A1A]/10 text-xs font-sans text-[#1A1A1A]/70">
                      <strong className="text-[#1A1A1A] block mb-0.5 font-medium">Nutritionist Insight:</strong>
                      {recommendation.dietaryTip}
                    </div>
                  </div>

                  {/* Daily Routine Breakdown */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-sans uppercase tracking-[0.15em] font-semibold text-[#1A1A1A]">
                      Diurnal Wellness Sequence
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-sans">
                      <div className="bg-white p-3 rounded-sm border border-[#1A1A1A]/10">
                        <span className="font-serif text-sm font-medium text-[#1A1A1A] block mb-1">Morning</span>
                        <p className="text-[#1A1A1A]/70 leading-relaxed text-[11px]">{recommendation.dailyRoutine.morning}</p>
                      </div>
                      <div className="bg-white p-3 rounded-sm border border-[#1A1A1A]/10">
                        <span className="font-serif text-sm font-medium text-[#1A1A1A] block mb-1">Midday</span>
                        <p className="text-[#1A1A1A]/70 leading-relaxed text-[11px]">{recommendation.dailyRoutine.afternoon}</p>
                      </div>
                      <div className="bg-white p-3 rounded-sm border border-[#1A1A1A]/10">
                        <span className="font-serif text-sm font-medium text-[#1A1A1A] block mb-1">Evening</span>
                        <p className="text-[#1A1A1A]/70 leading-relaxed text-[11px]">{recommendation.dailyRoutine.evening}</p>
                      </div>
                    </div>
                  </div>

                  {/* Curated Product Bundle */}
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-sans uppercase tracking-[0.15em] font-semibold text-[#1A1A1A]">
                        Curated 3-Piece Essential Set
                      </h4>
                      <span className="text-[10px] uppercase tracking-wider font-sans font-semibold text-[#2E5E4E] bg-[#2E5E4E]/10 px-2 py-0.5 rounded-sm">
                        15% Set Privilege
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {recommendedProducts.map((p) => (
                        <div key={p.id} className="bg-white p-2.5 rounded-sm border border-[#1A1A1A]/10 flex flex-col justify-between">
                          <img src={p.image} alt={p.name} className="w-full aspect-square object-cover rounded-none bg-[#EFECE7] mb-2 border border-[#1A1A1A]/5" />
                          <div>
                            <p className="text-[10px] font-sans font-medium text-[#1A1A1A] line-clamp-1">{p.name}</p>
                            <p className="text-xs font-serif text-[#1A1A1A]">${p.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 1-Click Add Bundle to Cart */}
                    <div className="bg-[#1A1A1A] text-[#F9F7F2] p-4 rounded-none flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-serif text-white">${bundleDiscountedTotal.toFixed(2)}</span>
                          <span className="text-xs font-sans text-white/50 line-through">${bundleTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] font-sans uppercase tracking-wider text-[#D4A373]">Complete bespoke bundle for {profile.name}</p>
                      </div>

                      <button
                        onClick={() => {
                          onAddBundleToCart(recommendedProducts);
                          onClose();
                        }}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-[#A67C52] hover:bg-[#8F643B] text-white text-[10px] uppercase tracking-[0.2em] font-sans font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Acquire Set</span>
                      </button>
                    </div>

                    {/* Reset Button */}
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-1.5 text-xs font-sans text-[#1A1A1A]/60 hover:text-[#1A1A1A] cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Curate Another Profile</span>
                      </button>
                    </div>

                  </div>

                </div>
              ) : null}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
