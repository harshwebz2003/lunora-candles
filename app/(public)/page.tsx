import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { AddToCartButton, TestimonialsSlider, AnimatedHero } from '@/components/public/HomeClientComponents';
import ScrollReveal from '@/components/public/ScrollReveal';
import CandleLab from '@/components/public/CandleLab';

export const revalidate = 0;

// Arch background tints that cycle through products
const ARCH_TINTS = [
  'bg-terra-100',
  'bg-gold-100',
  'bg-sand-200',
  'bg-sage-100',
  'bg-rose-100',
  'bg-terra-100',
  'bg-gold-100',
  'bg-sand-200',
];

export default async function HomePage() {
  const products = await db.product.findMany({
    take: 8,
    include: { images: true },
    orderBy: { id: 'asc' },
  });

  const blogs = await db.blogPost.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  const testimonials = await db.testimonial.findMany({
    where: { approved: true },
    take: 3,
  });

  return (
    // Clean modern vertical flow using Flexbox to prevent any section collapse or overlapping
    <div className="flex flex-col gap-20 sm:gap-28 pb-32">

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-end justify-center overflow-hidden bg-sand-200">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/assets/create_Studio_product_videogra.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-ink-700/80 via-ink-700/20 to-transparent" />
        </div>

        <AnimatedHero />
      </section>

      {/* ── COLLECTIONS HEADING & GRID ── */}
      <section className="container mx-auto px-4 sm:px-6 space-y-12">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <h2 className="text-display text-4xl sm:text-5xl text-ink-600 tracking-wide">Collections</h2>
            <div className="divider-gold" />
            <p className="label-caps text-ink-300">Handpicked fragrance selections</p>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-display text-2xl text-ink-400">No products yet</p>
            <p className="label-caps mt-2">Check back soon</p>
          </div>
        ) : (
          <div className="flex overflow-x-auto gap-5 snap-x snap-mandatory pb-6 hide-scrollbar md:grid md:grid-cols-3 lg:grid-cols-4 md:overflow-x-visible md:pb-0">
            {products.map((product, idx) => {
              const img = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
              const tint = ARCH_TINTS[idx % ARCH_TINTS.length];
              return (
                <div key={product.id} className="flex flex-col w-[240px] shrink-0 snap-align-start md:w-auto md:shrink md:snap-align-none">
                  <ScrollReveal delay={0.08 * (idx % 4)} className="h-full flex flex-col">
                    <Link href={`/products/${product.slug}`} className="product-card group h-full flex flex-col justify-between">
                      <div>
                        {/* Arch image container */}
                        <div className={`product-card-arch ${tint} aspect-[3/4] relative`}>
                          <Image
                            src={img}
                            alt={product.title}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            priority={idx < 4}
                          />
                        </div>
                        {/* Text below arch */}
                        <div className="pt-3 text-center space-y-1 px-2">
                          <h3 className="label-caps text-ink-600 font-medium tracking-[0.2em]">
                            {product.title.toUpperCase()}
                          </h3>
                        </div>
                      </div>
                      <div className="text-center pt-1">
                        <p className="font-ui text-sm text-ink-500">
                          LKR {(product.price * 300).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center pt-4">
          <Link href="/shop" className="btn btn-outline">
            View All Candles
          </Link>
        </div>
      </section>

      {/* ── 3D CANDLE LAB ── */}
      <section className="container mx-auto px-4 sm:px-6 border-t border-sand-200 pt-16">
        <ScrollReveal>
          <CandleLab />
        </ScrollReveal>
      </section>

      {/* ── WHY LUNORA ── */}
      <section className="bg-peach-champagne border-y border-border-subtle/50 py-20">
        <div className="container mx-auto px-4 sm:px-6 space-y-14">
          <ScrollReveal>
            <div className="text-center space-y-2">
              <h2 className="text-display text-4xl sm:text-5xl text-ink-600 tracking-wide">Why Lunora</h2>
              <div className="divider-gold" />
              <p className="label-caps text-ink-300">Handcrafted pure home fragrance</p>
            </div>
          </ScrollReveal>
          
          <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-6 hide-scrollbar md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0">
            {[
              { title: 'Pure Soy Wax', desc: '100% natural, paraffin-free soy wax sourced from sustainable farms. Cleaner burn, longer lasting.' },
              { title: 'Wooden Wicks', desc: 'Organic cotton-core and wooden wicks that crackle softly as they burn — a true sensory experience.' },
              { title: 'Gift Ready', desc: 'Every candle arrives in elegant, reusable packaging, perfect for weddings, events, and personal gifting.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col w-[280px] shrink-0 snap-align-start md:w-auto md:shrink md:snap-align-none">
                <ScrollReveal 
                  delay={0.1 * i}
                  className="space-y-4 px-6 py-10 bg-white border border-sand-200 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col items-center text-center h-full justify-between"
                >
                  <div className="space-y-4 flex flex-col items-center">
                    <span className="font-display text-3xl text-terra-300 italic">0{i + 1}</span>
                    <h3 className="font-display text-xl text-ink-600 tracking-wide font-medium">{item.title}</h3>
                    {/* Improved typography contrast, hierarchy and line-height */}
                    <p className="font-ui text-sm text-ink-500 leading-relaxed max-w-[260px]">{item.desc}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCENT FINDER QUIZ BANNER ── */}
      <section className="container mx-auto px-4 sm:px-6">
        <ScrollReveal 
          direction="up" 
          className="relative rounded-3xl overflow-hidden bg-peach-champagne border border-border-subtle/50 p-8 sm:p-14 text-center space-y-6"
        >
          <div className="absolute inset-0 z-0 opacity-10 bg-[radial-gradient(#A8845A_1.5px,transparent_1.5px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <span className="label-caps text-terra-400">Not sure which candle to choose?</span>
            <h2 className="text-display text-3xl sm:text-4xl text-ink-600 font-light leading-tight">
              Find Your Signature <span className="text-serif-italic">Home Aura</span>
            </h2>
            <div className="divider-gold" />
            <p className="font-ui text-sm text-ink-500 leading-relaxed">
              Answer 3 simple questions about your spaces and preferences, and our studio perfumers will curate the ideal wax fragrance match for you.
            </p>
          </div>
          
          <div className="relative z-10">
            <Link href="/scent-finder" className="btn btn-primary">
              Take Scent Quiz
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── TESTIMONIALS + CARE TIP ── */}
      <section className="container mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="flex flex-col h-full min-h-[440px]">
          <ScrollReveal 
            direction="left" 
            className="bg-white border border-sand-200 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 h-full justify-between"
          >
            <div className="space-y-1">
              <h3 className="text-display text-3xl text-ink-600">What Our Customers Say</h3>
              <div className="divider-gold-left" />
              <p className="label-caps text-ink-300">Genuine reviews</p>
            </div>
            <TestimonialsSlider testimonials={testimonials} />
          </ScrollReveal>
        </div>

        <div className="flex flex-col h-full min-h-[440px]">
          {/* Prevent Tunneling card: Height auto, minimum height and professional padding to avoid text cuts */}
          <ScrollReveal 
            direction="right" 
            className="bg-ink-600 text-white rounded-2xl p-8 sm:p-10 flex flex-col gap-6 h-full justify-between"
          >
            <div className="space-y-1">
              <span className="label-caps text-sand-400">Candle Care</span>
              <h3 className="text-display text-3xl text-sand-100">Prevent Tunneling</h3>
              <div className="w-10 h-px bg-terra-300 mt-2" />
            </div>
            
            <p className="font-ui text-sm text-sand-200 leading-relaxed">
              Soy candles have a "burn memory." Always allow a full melt pool to the edges before extinguishing — especially on the first burn.
            </p>
            
            <div className="bg-ink-500 border border-ink-400/50 p-5 rounded-xl">
              <p className="label-caps text-terra-200 mb-2">💡 Essential tip</p>
              <p className="font-ui text-xs text-sand-200 leading-relaxed">
                Burn for at least 2–3 hours on first light to establish a full melt pool and prevent wax tunneling.
              </p>
            </div>
            
            <div className="pt-4">
              <Link href="/candle-care" className="btn btn-outline border-white/30 !text-white hover:!text-white hover:bg-white/10 w-full text-center">
                Full Candle Care Guide
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CUSTOM EVENT FAVORS ── */}
      <section className="container mx-auto px-4 sm:px-6">
        <ScrollReveal 
          direction="up" 
          className="relative rounded-3xl overflow-hidden bg-ink-700 text-white p-8 sm:p-14 flex flex-col lg:flex-row gap-8 items-center justify-between"
        >
          <div className="absolute inset-0 z-0">
            <Image 
              src="/assets/632129514_17911290222317246_1212543984744105027_n.jpg"
              alt="Custom wedding favors"
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover opacity-20"
            />
          </div>
          
          <div className="relative z-10 max-w-xl space-y-4 text-left">
            <span className="label-caps text-terra-300">Wedding &amp; Event Favors</span>
            <h2 className="text-display text-3xl sm:text-4xl text-sand-100 font-light leading-tight">
              Bespoke candle designs <br />
              <span className="text-serif-italic text-terra-200">handcrafted for you</span>
            </h2>
            <div className="w-10 h-px bg-terra-300" />
            <p className="font-ui text-xs sm:text-sm text-sand-300 leading-relaxed">
              Create personalized candle favors with custom label designs, unique scents, and hand-stamped dust covers for weddings, private parties, corporate gifting, or hotel amenities in Sri Lanka.
            </p>
          </div>
          
          <div className="relative z-10 flex-shrink-0">
            <Link href="/custom-orders" className="btn btn-terra">
              Inquire Custom Favors
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* ── BLOG ── */}
      {blogs.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6">
          <div className="space-y-12">
            <ScrollReveal>
              <div className="text-center space-y-2">
                <h2 className="text-display text-4xl sm:text-5xl text-ink-600 tracking-wide">Studio Journals</h2>
                <div className="divider-gold" />
                <p className="label-caps text-ink-300">Insights into scent design &amp; care</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {blogs.map((blog, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={blog.id} className="flex flex-col h-full">
                    <ScrollReveal 
                      delay={0.1 * idx} 
                      direction={isEven ? 'left' : 'right'} 
                      className={`group rounded-2xl overflow-hidden border border-sand-200 transition-all duration-300 hover:shadow-md flex flex-col justify-between h-full flex-grow ${
                        isEven ? 'bg-white' : 'bg-sand-100'
                      }`}
                    >
                      <Link
                        href={`/blog/${blog.slug}`}
                        className="p-8 sm:p-10 flex flex-col gap-6 h-full justify-between"
                      >
                        <div className="space-y-4">
                          <span className="label-caps text-terra-400">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                          </span>
                          <h3 className="font-display text-2xl text-ink-600 leading-snug group-hover:text-terra-400 transition-colors">
                            {blog.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-sand-300/40 pt-5 mt-6">
                          <span className="label-caps text-ink-400">By {blog.author.name || 'Admin'}</span>
                          <span className="label-caps text-terra-400 group-hover:translate-x-1.5 transition-transform inline-block font-semibold">
                            Read Article →
                          </span>
                        </div>
                      </Link>
                    </ScrollReveal>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
