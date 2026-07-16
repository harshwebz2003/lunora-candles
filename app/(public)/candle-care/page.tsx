import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CandleCarePage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Header Banner */}
      <section className="relative h-[35vh] flex items-center justify-center bg-charcoal-700">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/554797110_1339286851541441_8366442550545946149_n.jpg"
            alt="Candle care wooden wicks"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700 to-transparent" />
        </div>
        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-display text-4xl sm:text-5xl font-light text-white">Candle Care & Safety</h1>
          <p className="text-xs font-ui uppercase tracking-widest text-gold-300">How to get the perfect burn and maximize scent throw</p>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Burn Tips Section */}
      <section className="container mx-auto px-4 max-w-4xl space-y-12">
        
        {/* Intro */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-display text-2xl sm:text-3xl text-charcoal-700">The Golden Rules of Candle Care</h2>
          <p className="text-xs text-charcoal-400 font-body">Soy wax is natural and behaves differently than paraffin. Follow these steps to get a safe, soot-free, and long-lasting burn.</p>
        </div>

        {/* Step List */}
        <div className="space-y-8">
          
          <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl flex gap-6">
            <div className="text-gold-300 font-serif italic text-3xl sm:text-4xl flex-shrink-0">01.</div>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Establish a Burn Memory</h3>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
                On the very first light, let your candle burn for **2 to 3 hours** until the pool of melted wax completely reaches the edges of the glass jar. This prevents &quot;tunneling&quot;—where the wick burns straight down the center, wasting wax.
              </p>
            </div>
          </div>

          <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl flex gap-6">
            <div className="text-gold-300 font-serif italic text-3xl sm:text-4xl flex-shrink-0">02.</div>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Trim the Wick Before Every Burn</h3>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
                Always trim your cotton or wooden wick to **1/4 inch (approx 5mm)** before lighting. This keeps the flame at a safe height, prevents black soot, stops the glass jar from overheating, and ensures a cleaner burn.
              </p>
            </div>
          </div>

          <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl flex gap-6">
            <div className="text-gold-300 font-serif italic text-3xl sm:text-4xl flex-shrink-0">03.</div>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Limit Burn Time to 4 Hours</h3>
              <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
                Do not burn your candle for more than **4 hours** at a time. Burning a candle for too long allows carbon to build up on the wick, causing it to &quot;mushroom&quot; and burn unevenly or produce smoke.
              </p>
            </div>
          </div>

          <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl flex gap-6">
            <div className="text-gold-300 font-serif italic text-3xl sm:text-4xl flex-shrink-0">04.</div>
            <div className="space-y-2">
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Practice Candle Safety</h3>
              <ul className="text-xs text-charcoal-500 space-y-1.5 leading-relaxed font-body list-disc pl-4">
                <li>Never leave a burning candle unattended.</li>
                <li>Keep candles away from drafts, open windows, ceiling fans, and flammable objects.</li>
                <li>Keep candles out of reach of children and pets.</li>
                <li>Discontinue burning when only **1/2 inch** of wax remains at the bottom of the jar.</li>
              </ul>
            </div>
          </div>

        </div>

      </section>

      {/* Recycle & Reuse Box */}
      <section className="bg-cream-100 border-y border-cream-200 py-12">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-4">
          <h3 className="font-display text-xl sm:text-2xl text-charcoal-700">♻️ How to Clean & Reuse Your Jars</h3>
          <p className="text-xs text-charcoal-500 leading-relaxed font-body max-w-xl mx-auto">
            Once your candle has finished burning, you can easily clean the glass jar to reuse it for propagation, office storage, or decor. Simply pour boiling water into the jar, let it sit until the remaining wax floats to the top and cools, pop the wax out, and wash with warm soap.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 text-center max-w-xl space-y-6 pt-6">
        <h2 className="text-display text-2xl text-charcoal-700">Ready to Light Your Space?</h2>
        <Link href="/shop" className="btn btn-primary text-xs tracking-widest uppercase">
          Explore Scented Candles
        </Link>
      </section>

    </div>
  );
}
