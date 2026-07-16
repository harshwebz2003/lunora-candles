import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FRAGRANCES = [
  {
    name: 'Calming French Lavender',
    type: 'Floral / Herbaceous',
    description: 'A soothing, therapeutic blend of pure French lavender buds, soft chamomile, and a grounding base of white musk. Perfect for unwinding, promoting deep sleep, and bringing a serene atmosphere to bedrooms.',
    mood: 'Relaxation, Serenity, Sleep Aid',
    intensity: 'Mild to Medium',
    image: '/assets/552807669_1339286778208115_6571929007844017528_n.jpg',
  },
  {
    name: 'Madagascar Vanilla & Amberwood',
    type: 'Sweet / Warm Woodsy',
    description: 'Cozy and sweet Madagascar vanilla beans balanced with rich golden amber, dark patchouli, and warm Indian sandalwood. Creates an inviting, luxurious ambience perfect for living rooms and libraries.',
    mood: 'Cozy warmth, Luxury, Comfort',
    intensity: 'Medium to Strong',
    image: '/assets/553805204_1339286811541445_7449795635161896691_n.jpg',
  },
  {
    name: 'Cinnamon Bark & Clove',
    type: 'Spicy / Warm',
    description: 'Freshly ground Sri Lankan cinnamon sticks, spicy clove buds, and warm nutmeg finished with a touch of sweet apple and amber. Fills the kitchen or dining space with a mouthwatering, festive aroma.',
    mood: 'Festive joy, Warmth, Alertness',
    intensity: 'Strong',
    image: '/assets/554797110_1339286851541441_8366442550545946149_n.jpg',
  },
  {
    name: 'Earthy Sage & Sea Salt',
    type: 'Fresh / Mineral / Woody',
    description: 'An earthy blend of woodsy sage leaves, mineral sea salt crust, dry coastal moss, and weathered driftwood. Captures the essence of the rugged Indian Ocean coastline in Galle.',
    mood: 'Freshness, Meditative focus, Clean air',
    intensity: 'Medium',
    image: '/assets/631734611_17911290213317246_3639787322669815310_n.jpg',
  },
  {
    name: 'English Blush Rose',
    type: 'Rich Floral',
    description: 'Dewy green ivy leaves, geranium stems, and classic English rose petals. Light, floral, and romantic, it adds an elegant floral signature to dressing rooms and bathrooms.',
    mood: 'Romance, Elegance, Floral freshness',
    intensity: 'Medium',
    image: '/assets/631825283_17911451328317246_8620884724096749501_n.jpg',
  },
];

export default function FragranceGuidePage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="relative h-[35vh] flex items-center justify-center bg-charcoal-700">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/632156505_17911290231317246_2806134531291435844_n.jpg"
            alt="Essential oil and fragrance curation"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700 to-transparent" />
        </div>
        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-display text-4xl sm:text-5xl font-light text-white">Fragrance & Scent Guide</h1>
          <p className="text-xs font-ui uppercase tracking-widest text-gold-300">Discover Scent Profiles to Elevate Your Spaces</p>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Fragrance List Grid */}
      <section className="container mx-auto px-4 max-w-5xl space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-display text-3xl font-light text-charcoal-700">Our Signature Scents</h2>
          <p className="text-xs text-charcoal-400 font-body">We select premium botanicals and essential oils to create non-toxic fragrances that deliver an even, beautiful scent throw.</p>
        </div>

        <div className="space-y-12">
          {FRAGRANCES.map((frag, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div 
                key={frag.name} 
                className={`flex flex-col lg:flex-row items-center gap-10 p-6 sm:p-10 bg-white border border-cream-200 rounded-3xl ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className="relative w-full lg:w-1/3 aspect-square rounded-2xl overflow-hidden border border-cream-200 flex-shrink-0 shadow-sm">
                  <Image src={frag.image} alt={frag.name} fill className="object-cover" />
                </div>
                
                {/* Details */}
                <div className="flex-grow space-y-4">
                  <div>
                    <span className="text-[10px] font-ui uppercase tracking-wider text-gold-400 font-bold">{frag.type}</span>
                    <h3 className="font-display text-2xl font-semibold text-charcoal-700 mt-1">{frag.name}</h3>
                  </div>
                  
                  <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">{frag.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-cream-100 text-xs">
                    <div>
                      <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Suggested Mood:</strong>
                      <span className="text-charcoal-600 font-body">{frag.mood}</span>
                    </div>
                    <div>
                      <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Scent Intensity:</strong>
                      <span className="text-charcoal-600 font-body">{frag.intensity}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Shop Link CTA */}
      <section className="container mx-auto px-4 text-center max-w-xl space-y-6 pt-10">
        <h2 className="text-display text-3xl font-light text-charcoal-700">Find Your Signature Scent</h2>
        <p className="text-xs text-charcoal-400 leading-relaxed font-body">Ready to experience these aromas? Browse our collection of handcrafted jars, custom wedding favors, and tin candles.</p>
        <Link href="/shop" className="btn btn-primary text-xs tracking-widest uppercase">
          Explore Scented Candles
        </Link>
      </section>

    </div>
  );
}
