import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Banner */}
      <section className="relative h-[40vh] flex items-center justify-center bg-charcoal-700">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/552807669_1339286778208115_6571929007844017528_n.jpg"
            alt="Handcrafting candles in Galle"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700 to-transparent" />
        </div>
        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-display text-4xl sm:text-5xl font-light text-white">Our Story & Studio</h1>
          <p className="text-xs font-ui uppercase tracking-widest text-gold-300">Poured in Galle, Inspired by Nature</p>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-display text-3xl sm:text-4xl font-light text-charcoal-700 leading-tight">
            How Lunora Candles <br />
            <span className="italic font-serif text-gold-300">Began Its Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
            Founded along the historic coast of Galle, Sri Lanka, Lunora Candles was born out of a passion for natural home aromatics and artisanal design. We wanted to create home scents that were not only deeply luxurious, but also clean-burning and safe for families.
          </p>
          <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
            Every candle is hand-poured in our studio using natural soy wax sourced from sustainable farms, organic cotton-core and wooden wicks, and natural fragrance profiles that reflect the sea breezes, lush flora, and warm spices of Sri Lanka.
          </p>
        </div>
        
        <div className="relative aspect-square rounded-2xl overflow-hidden border border-cream-300 shadow-md">
          <Image 
            src="/assets/553805204_1339286811541445_7449795635161896691_n.jpg" 
            alt="Our Pouring Process" 
            fill 
            className="object-cover" 
          />
        </div>
      </section>

      {/* Studio Philosophy Grid */}
      <section className="bg-cream-100 border-y border-cream-200 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <h2 className="text-display text-3xl text-charcoal-700">Studio Philosophy</h2>
            <div className="divider-gold" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold text-charcoal-700">Artisanal Honesty</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                We make our products by hand, batch by batch. We do not use bulk machinery or chemical binders, prioritizing the slow, honest, handcrafted way.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold text-charcoal-700">Earthy Stewardship</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                Our jars are designed to be thoroughly reused. Simply wash with hot soapy water when finished to repurpose for plants, storage, or decor.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-display text-xl font-semibold text-charcoal-700">Local Integrity</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                We support our local economy, hiring Galle craftsmen and printing packaging locally to strengthen Sri Lankan entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 text-center max-w-2xl space-y-6">
        <h2 className="text-display text-3xl font-light text-charcoal-700">Visit Our Studio</h2>
        <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
          We love meeting fellow fragrance lovers. Stop by our Dowata, Galle studio to browse fragrances, experience the pours in real-time, or design your own custom scents.
        </p>
        <div className="pt-4 flex justify-center gap-4">
          <Link href="/contact" className="btn btn-primary text-xs tracking-widest uppercase">
            Get Directions
          </Link>
          <Link href="/shop" className="btn btn-outline text-xs tracking-widest uppercase">
            Shop Online
          </Link>
        </div>
      </section>

    </div>
  );
}
