import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { 
  SparklesIcon, 
  HeartIcon, 
  MapPinIcon, 
  GiftIcon 
} from '@heroicons/react/24/outline';
import { AddToCartButton, TestimonialsSlider } from '@/components/public/HomeClientComponents';
import ScrollReveal from '@/components/public/ScrollReveal';

export const revalidate = 0; // Fresh database fetches

export default async function HomePage() {
  // Query featured products, blogs, and testimonials from database
  const products = await db.product.findMany({
    take: 3,
    include: { images: true },
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
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-charcoal-700">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/631734611_17911290213317246_3639787322669815310_n.jpg"
            alt="Lunora Candles Studio Backdrop"
            fill
            className="object-cover opacity-45 scale-105 filter blur-[1px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-700 via-charcoal-700/50 to-transparent" />
        </div>

        {/* Hero Content box */}
        <div className="container relative z-10 mx-auto text-center px-4 max-w-4xl">
          <div className="space-y-6 animate-fade-in">
            <span className="font-ui text-xs font-bold uppercase tracking-[0.4em] text-gold-200">
              Galle, Sri Lanka
            </span>
            <h1 className="text-display text-4xl sm:text-6xl md:text-7xl font-light text-white leading-tight">
              Luxurious Handcrafted <br />
              <span className="font-serif italic text-gold-300">Scented Soy Candles</span>
            </h1>
            <div className="divider-gold" />
            <p className="font-body text-cream-100/90 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-light">
              Crafted in small batches using premium natural soy wax, wooden wicks, and botanically inspired fragrances that fill your home with tranquility.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/shop" className="btn btn-primary w-full sm:w-auto">
                Explore Collections
              </Link>
              <Link href="/custom-orders" className="btn btn-outline border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Custom Wedding Favors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand USPs Section */}
      <section className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <h2 className="text-display text-3xl sm:text-4xl">Why Lunora Candles?</h2>
            <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Our Craftsmanship Promise</p>
            <div className="divider-gold" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="text-center p-6 bg-white border border-cream-200 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-500">
                <SparklesIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-700">100% Natural Soy</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                Safe, non-toxic, biodegradable wax. Free of paraffin, toxins, and artificial colorings for a clean burn.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="text-center p-6 bg-white border border-cream-200 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-500">
                <HeartIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Eco Wooden Wicks</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                Organic, natural crackling wooden wicks that sound like a tiny fireplace, providing a clean burn and rich scent release.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="text-center p-6 bg-white border border-cream-200 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-500">
                <MapPinIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Poured in Galle</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                Each candle is carefully hand-poured in Galle, Sri Lanka, infusing tropical breezes and coastal luxury into every jar.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="text-center p-6 bg-white border border-cream-200 rounded-2xl space-y-4">
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto text-gold-500">
                <GiftIcon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-700">Wedding & Event Favors</h3>
              <p className="text-xs text-charcoal-400 leading-relaxed font-body">
                Beautiful customized candle jars and custom fragrances tailored specifically for your special day or corporate events.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="container mx-auto px-4">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-3">
              <h2 className="text-display text-3xl sm:text-4xl">Featured Creations</h2>
              <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Handpicked fragrance selections</p>
            </div>
            <Link href="/shop" className="btn btn-outline text-xs tracking-widest uppercase">
              View All Candles
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product, idx) => {
            const primaryImage = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
            return (
              <ScrollReveal key={product.id} delay={0.15 * (idx + 1)}>
                <div className="card flex flex-col justify-between group h-full">
                  <div>
                    <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-100">
                      <Image 
                        src={primaryImage} 
                        alt={product.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-6 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-display text-xl font-semibold text-charcoal-700">
                          <Link href={`/products/${product.slug}`} className="hover:text-gold-400 transition-colors">
                            {product.title}
                          </Link>
                        </h3>
                        <span className="font-ui text-sm font-bold text-gold-400">
                          LKR ${(product.price * 300).toLocaleString()}
                        </span>
                      </div>
                      {product.fragrance && (
                        <p className="text-[10px] font-ui uppercase tracking-wider text-sage-400 font-semibold">
                          Scent: {product.fragrance}
                        </p>
                      )}
                      <p className="text-xs text-charcoal-400 line-clamp-2 leading-relaxed mt-2 font-body">
                        {product.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Client Side Cart Hook wrapper */}
                  <div className="px-6 pb-6 pt-2">
                    <AddToCartButton 
                      id={product.id}
                      slug={product.slug}
                      title={product.title}
                      price={product.price}
                      image={primaryImage}
                    />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* 4. Fragrance Category Spotlight (Banner / Promo) */}
      <section className="bg-cream-100 border-y border-cream-200 py-20">
        <ScrollReveal>
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-cream-300">
              <Image 
                src="/assets/631825283_17911451328317246_8620884724096749501_n.jpg"
                alt="Luxury Candle Pouring"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-gold-400">
                Hand-Poured Luxury
              </span>
              <h2 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700 leading-tight">
                Crafting Aromatic Journeys <br />
                <span className="italic font-serif text-gold-300">For Your Home</span>
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed font-body">
                Every single Lunora Candle is hand-poured in Galle using 100% natural, locally sourced materials and high-quality fragrance oils. From floral rose petals to woody amber and therapeutic herbs, find the scent profile that matches your mood and enhances your lifestyle.
              </p>
              <div className="flex gap-4">
                <Link href="/fragrance-guide" className="btn btn-primary text-xs tracking-widest">
                  Fragrance Guide
                </Link>
                <Link href="/about" className="btn btn-outline text-xs tracking-widest">
                  Our Story
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Client Component testimonial and care widget */}
      <section className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Testimonials */}
        <ScrollReveal direction="left" delay={0.15}>
          <div className="bg-white border border-cream-200 p-8 sm:p-12 rounded-2xl flex flex-col justify-between h-full">
            <div className="space-y-4">
              <h3 className="text-display text-2xl sm:text-3xl text-charcoal-700">What Our Customers Say</h3>
              <p className="text-[10px] font-ui uppercase tracking-wider text-gold-400">Genuine customer reviews</p>
              <div className="divider-gold mx-0" />
              
              <TestimonialsSlider testimonials={testimonials} />
            </div>
          </div>
        </ScrollReveal>

        {/* Quick Candle Care Interactive Tip */}
        <ScrollReveal direction="right" delay={0.3}>
          <div className="bg-charcoal-700 text-white p-8 sm:p-12 rounded-2xl flex flex-col justify-between h-full">
            <div className="space-y-6">
              <span className="font-ui text-xs font-bold uppercase tracking-[0.3em] text-gold-200">
                Interactive Guide
              </span>
              <h3 className="text-display text-2xl sm:text-3xl text-cream-100 leading-snug">
                Prevent Candle Tunneling
              </h3>
              <p className="text-xs text-cream-100/80 leading-relaxed font-body">
                Soy candles have a &quot;burn memory.&quot; If you don&apos;t let the candle melt completely to the edges on the first light, it will tunnel straight down, wasting precious wax.
              </p>
              <div className="bg-charcoal-600/50 border border-charcoal-500 p-4 rounded-xl space-y-2 text-xs">
                <p className="text-gold-200 font-semibold font-ui uppercase tracking-widest text-[9px]">💡 Essential Tip:</p>
                <p className="text-cream-100/90 leading-relaxed font-body">
                  Let your candle burn for at least **2 to 3 hours** on the first burn to establish a full melt pool.
                </p>
              </div>
            </div>
            <div className="pt-6">
              <Link href="/candle-care" className="btn btn-primary text-xs tracking-widest w-full">
                Full Candle Care Guide
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. Recent Blog Articles */}
      <section className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <h2 className="text-display text-3xl sm:text-4xl">Studio Journals</h2>
            <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Insights into scent design & care</p>
            <div className="divider-gold" />
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.map((blog, idx) => (
            <ScrollReveal key={blog.id} delay={0.2 * (idx + 1)} direction={idx === 0 ? 'left' : 'right'}>
              <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between group h-full">
                <div className="space-y-4">
                  <span className="text-[10px] font-ui uppercase tracking-wider text-gold-400 font-bold">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-charcoal-700 leading-snug">
                    <Link href={`/blog/${blog.slug}`} className="hover:text-gold-400 transition-colors">
                      {blog.title}
                    </Link>
                  </h3>
                </div>
                <div className="pt-6 border-t border-cream-100 mt-6 flex justify-between items-center">
                  <span className="text-[10px] font-ui text-charcoal-400 uppercase tracking-widest">
                    By {blog.author.name || 'Admin'}
                  </span>
                  <Link href={`/blog/${blog.slug}`} className="text-xs font-ui uppercase font-bold tracking-wider text-gold-400 hover:text-gold-500 transition-colors flex items-center gap-1">
                    Read Article &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

    </div>
  );
}
