'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ScrollReveal from '@/components/public/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';

const SLIDESHOW_IMAGES = [
  '/assets/553805204_1339286811541445_7449795635161896691_n.jpg',
  '/assets/554797110_1339286851541441_8366442550545946149_n.jpg',
  '/assets/631734611_17911290213317246_3639787322669815310_n.jpg',
  '/assets/631825283_17911451328317246_8620884724096749501_n.jpg',
  '/assets/632129514_17911290222317246_1212543984744105027_n.jpg',
  '/assets/632156505_17911290231317246_2806134531291435844_n.jpg',
];

function AboutSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-terra-100 shadow-sm border border-sand-200">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={SLIDESHOW_IMAGES[index]}
            alt="Handcrafted Soy Candle"
            fill
            className="object-cover"
            priority={index === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Slide index indicator dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 bg-ink-600/40 backdrop-blur-xs py-1.5 px-3.5 rounded-full border border-white/10 select-none">
        {SLIDESHOW_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              idx === index ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pb-24">

      {/* ── Hero Banner ── */}
      <section className="relative h-[42vh] min-h-[280px] flex items-center justify-center overflow-hidden bg-ink-600">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/552807669_1339286778208115_6571929007844017528_n.jpg"
            alt="Lunora Studio"
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-700 via-ink-700/40 to-transparent" />
        </div>
        <div className="relative z-10 text-center space-y-3 px-6">
          <span className="label-caps text-sand-400 block">Galle, Sri Lanka</span>
          <h1 className="text-display text-4xl sm:text-5xl font-light text-white">Our Story &amp; Studio</h1>
          <div className="divider-gold" />
          <p className="label-caps text-sand-300">Poured with purpose. Crafted with love.</p>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="space-y-6">
              <span className="label-caps text-terra-400">How it began</span>
              <h2 className="text-display text-3xl sm:text-4xl text-ink-600 leading-tight">
                How Lunora Candles<br />
                <span className="text-serif-italic text-terra-300">Began Its Journey</span>
              </h2>
              <div className="w-10 h-px bg-terra-300" />
              <p className="font-ui text-sm text-ink-400 leading-relaxed">
                Founded along the historic coast of Galle, Sri Lanka, Lunora Candles was born out of a deep passion for natural home aromatics and artisanal design. We wanted to create home scents that were not only deeply luxurious — but also clean-burning and safe for every family.
              </p>
              <p className="font-ui text-sm text-ink-400 leading-relaxed">
                Every candle is hand-poured in our Galle studio using natural soy wax from sustainable farms, organic cotton-core and wooden wicks, and natural fragrance profiles that reflect the sea breezes, lush flora, and warm spices of Sri Lanka.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative aspect-[4/5]">
              <AboutSlideshow />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Meet the Founder ── */}
      <section className="bg-sand-100 border-y border-sand-200 py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-14 space-y-2">
              <span className="label-caps text-terra-400">The visionary behind Lunora</span>
              <h2 className="text-display text-3xl sm:text-4xl text-ink-600">Meet the Founder</h2>
              <div className="divider-gold" />
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

            {/* Photo — arch shaped */}
            <ScrollReveal direction="left" delay={0.15}>
              <div className="relative mx-auto max-w-sm">
                {/* Decorative background circle */}
                <div className="absolute -inset-4 bg-terra-100 rounded-full opacity-40 blur-2xl" />
                <div className="relative arch-container aspect-[3/4] overflow-hidden bg-terra-100 shadow-lg">
                  <Image
                    src="/assets/founder-kalana-udara.jpg"
                    alt="Kalana Udara — Founder & CEO, Lunora Candles"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Bio */}
            <ScrollReveal direction="right" delay={0.25}>
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="text-display text-4xl text-ink-600">Kalana Udara</h3>
                  <p className="label-caps text-terra-400">Founder &amp; CEO · Lunora Candles</p>
                </div>

                <div className="flex items-center gap-2 label-caps text-ink-400">
                  <span>📍</span>
                  <span>Galle, Sri Lanka</span>
                </div>

                <div className="w-10 h-px bg-terra-300" />

                <p className="font-ui text-sm text-ink-400 leading-relaxed">
                  Kalana Udara is the heart and soul behind Lunora Candles. Growing up along the sun-soaked coast of Galle, he developed a profound appreciation for the natural fragrances of the island — the salt air, tropical blooms, and warm spices of the south.
                </p>
                <p className="font-ui text-sm text-ink-400 leading-relaxed">
                  Driven by a desire to bring that sensory richness into every Sri Lankan home, Kalana founded Lunora with a single promise: to create candles that are as honest and beautiful as the land that inspires them. Today, each hand-poured creation reflects his commitment to natural ingredients, artisanal craft, and timeless elegance.
                </p>

                {/* Quote */}
                <blockquote className="border-l-2 border-terra-300 pl-5 py-2">
                  <p className="text-display text-lg text-ink-500 italic leading-snug">
                    "Every candle we make is a little piece of Galle — its warmth, its calm, its stories."
                  </p>
                  <cite className="label-caps text-terra-400 mt-2 block not-italic">— Kalana Udara</cite>
                </blockquote>

                <div className="flex gap-3 pt-2">
                  <Link href="/contact" className="btn btn-terra text-xs">
                    Get In Touch
                  </Link>
                  <Link href="/shop" className="btn btn-outline text-xs">
                    Explore Candles
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Studio Philosophy ── */}
      <section className="container mx-auto px-4 sm:px-6 py-20">
        <ScrollReveal>
          <div className="text-center mb-14 space-y-2">
            <h2 className="text-display text-3xl sm:text-4xl text-ink-600">Studio Philosophy</h2>
            <div className="divider-gold" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              icon: '🤲',
              title: 'Artisanal Honesty',
              desc: 'We make our products by hand, batch by batch — no bulk machinery, no shortcuts. Just the slow, honest, handcrafted way.',
            },
            {
              icon: '🌱',
              title: 'Earthy Stewardship',
              desc: 'Our jars are designed to be reused. Wash with hot soapy water when finished and repurpose as plant pots, storage, or decor.',
            },
            {
              icon: '🏡',
              title: 'Local Integrity',
              desc: 'We support our local economy — hiring Galle craftsmen and printing packaging locally to strengthen Sri Lankan entrepreneurship.',
            },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={0.15 * (i + 1)}>
              <div className="bg-white border border-sand-200 rounded-2xl p-8 space-y-4 hover:shadow-md transition-shadow">
                <div className="text-3xl">{item.icon}</div>
                <h3 className="font-display text-xl text-ink-600">{item.title}</h3>
                <p className="font-ui text-xs text-ink-400 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── Visit CTA ── */}
      <section className="bg-ink-600 py-16">
        <ScrollReveal>
          <div className="container mx-auto px-4 sm:px-6 text-center max-w-2xl space-y-6">
            <h2 className="text-display text-3xl font-light text-white">Visit Our Studio</h2>
            <div className="w-10 h-px bg-terra-300 mx-auto" />
            <p className="font-ui text-sm text-sand-300 leading-relaxed">
              We love meeting fellow fragrance lovers. Stop by our Dowata, Galle studio to browse fragrances, experience live candle pours, or design your own custom scents.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <Link href="/contact" className="btn btn-terra">
                Get Directions
              </Link>
              <Link href="/shop" className="btn btn-outline border-white/30 text-white hover:bg-white/10">
                Shop Online
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
}
