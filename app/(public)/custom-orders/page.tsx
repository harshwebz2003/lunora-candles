import React from 'react';
import Image from 'next/image';
import CustomOrderForm from '@/components/public/CustomOrderForm';

export default function CustomOrdersPage() {
  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Banner */}
      <section className="relative h-[35vh] flex items-center justify-center bg-charcoal-700">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/632129514_17911290222317246_1212543984744105027_n.jpg"
            alt="Custom wedding candle orders"
            fill
            className="object-cover opacity-35"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700 to-transparent" />
        </div>
        <div className="container relative z-10 text-center space-y-3">
          <h1 className="text-display text-4xl sm:text-5xl font-light text-white">Custom Favors & Orders</h1>
          <p className="text-xs font-ui uppercase tracking-widest text-gold-300">Custom Labels, Jars, and Scents for Your Events</p>
          <div className="divider-gold" />
        </div>
      </section>

      {/* Intro details */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-display text-3xl font-light text-charcoal-700 leading-tight">
            Tailor-Made Elegance <br />
            <span className="italic font-serif text-gold-300">For Your Special Day</span>
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
            At Lunora Candles, we craft personalized candle favors that add a glowing warmth and memorable scent to weddings, private parties, corporate events, and boutique hotel rooms. 
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <span className="text-gold-400 font-serif italic text-lg">01.</span>
              <div>
                <strong className="font-display text-charcoal-700 text-sm block">Custom Scent Curation</strong>
                <span className="text-xs text-charcoal-400 leading-relaxed block font-body">Select from our existing catalog or work directly with our perfumers to curate a unique scent profile for your event.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-gold-400 font-serif italic text-lg">02.</span>
              <div>
                <strong className="font-display text-charcoal-700 text-sm block">Bespoke Design & Labels</strong>
                <span className="text-xs text-charcoal-400 leading-relaxed block font-body">We design personalized labels, custom tags, or stamp custom dust covers to match your event theme, color palette, or company branding.</span>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="text-gold-400 font-serif italic text-lg">03.</span>
              <div>
                <strong className="font-display text-charcoal-700 text-sm block">Flexible Batch Sizes</strong>
                <span className="text-xs text-charcoal-400 leading-relaxed block font-body">Whether you need 30 favors for an intimate wedding dinner in Galle or 500 branded candles for corporate gifts, we accommodate all sizes.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Order Request Form card */}
        <div className="bg-white border border-cream-200 p-8 sm:p-10 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h3 className="font-display text-2xl font-semibold text-charcoal-700">Inquire About Custom Orders</h3>
            <p className="text-xs text-charcoal-400 font-body">Please fill out the form below, and we will get back to you with a custom quote.</p>
          </div>
          <CustomOrderForm />
        </div>
      </section>

    </div>
  );
}
