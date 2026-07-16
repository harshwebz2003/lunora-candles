import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { AddToCartButton, TestimonialsSlider } from '@/components/public/HomeClientComponents';
import ScrollReveal from '@/components/public/ScrollReveal';

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
    <div className="pb-24">

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex items-end justify-center overflow-hidden bg-sand-200">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/631734611_17911290213317246_3639787322669815310_n.jpg"
            alt="Lunora Candles"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-700/80 via-ink-700/20 to-transparent" />
        </div>

        <div className="relative z-10 text-center pb-20 px-6 max-w-3xl mx-auto animate-fade-in">
          <span className="label-caps text-sand-300 mb-4 block">Galle, Sri Lanka — Est. 2022</span>
          <h1 className="text-display text-5xl sm:text-7xl font-light text-white leading-tight mb-4">
            Scents that tell<br />
            <span className="text-serif-italic text-terra-200">your story</span>
          </h1>
          <div className="divider-gold mb-6" />
          <p className="font-ui text-sm text-sand-200 leading-relaxed max-w-xl mx-auto mb-8">
            Handcrafted in small batches using 100% natural soy wax, wooden wicks, and botanically inspired fragrance oils from the coast of Galle.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shop" className="btn btn-terra">
              Explore Collections
            </Link>
            <Link href="/custom-orders" className="btn btn-outline border-white/50 text-white hover:bg-white/10">
              Custom Favors
            </Link>
          </div>
        </div>
      </section>

      {/* ── COLLECTIONS HEADING ── */}
      <section className="pt-20 pb-4">
        <ScrollReveal>
          <div className="text-center space-y-2">
            <h2 className="text-display text-4xl sm:text-5xl text-ink-600 tracking-wide">Collections</h2>
            <div className="divider-gold" />
            <p className="label-caps text-ink-300">Handpicked fragrance selections</p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── ARCH PRODUCT GRID ── */}
      <section className="container mx-auto px-4 sm:px-6 py-10">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-display text-2xl text-ink-400">No products yet</p>
            <p className="label-caps mt-2">Check back soon</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
            {products.map((product, idx) => {
              const img = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
              const tint = ARCH_TINTS[idx % ARCH_TINTS.length];
              return (
                <ScrollReveal key={product.id} delay={0.08 * (idx % 4)} className="flex flex-col">
                  <Link href={`/products/${product.slug}`} className="product-card group">
                    {/* Arch image container */}
                    <div className={`product-card-arch ${tint} aspect-[3/4] relative`}>
                      <Image
                        src={img}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    {/* Text below arch */}
                    <div className="pt-3 text-center space-y-1 px-2">
                      <h3 className="label-caps text-ink-600 font-medium tracking-[0.2em]">
                        {product.title.toUpperCase()}
                      </h3>
                      <p className="font-ui text-sm text-ink-500">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Pagination placeholder / View All */}
        <div className="flex justify-center mt-12">
          <Link href="/shop" className="btn btn-outline">
            View All Candles
          </Link>
        </div>
      </section>

      {/* ── WHY LUNORA ── */}
      <section className="bg-sand-100 border-y border-sand-200 py-16 mt-12">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 space-y-2">
              <h2 className="text-display text-3xl sm:text-4xl text-ink-600">Why Lunora</h2>
              <div className="divider-gold" />
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🌿', title: 'Pure Soy Wax', desc: '100% natural, paraffin-free soy wax sourced from sustainable farms. Cleaner burn, longer lasting.' },
              { icon: '🪵', title: 'Wooden Wicks', desc: 'Organic cotton-core and wooden wicks that crackle softly as they burn — a true sensory experience.' },
              { icon: '🎁', title: 'Gift Ready', desc: 'Every candle arrives in elegant, reusable packaging, perfect for weddings, events, and personal gifting.' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={0.15 * (i + 1)}>
                <div className="space-y-3 px-4">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="font-display text-xl text-ink-600">{item.title}</h3>
                  <p className="font-ui text-xs text-ink-400 leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS + CARE TIP ── */}
      <section className="container mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScrollReveal direction="left" className="h-full flex flex-col">
          <div className="bg-white border border-sand-200 rounded-2xl p-8 sm:p-10 flex flex-col gap-6 h-full">
            <div className="space-y-1">
              <h3 className="text-display text-2xl text-ink-600">What Our Customers Say</h3>
              <div className="divider-gold-left" />
              <p className="label-caps">Genuine reviews</p>
            </div>
            <TestimonialsSlider testimonials={testimonials} />
          </div>
        </ScrollReveal>

        <ScrollReveal direction="right" className="h-full flex flex-col">
          <div className="bg-ink-600 text-white rounded-2xl p-8 sm:p-10 flex flex-col gap-6 h-full">
            <div className="space-y-1">
              <span className="label-caps text-sand-400">Candle Care</span>
              <h3 className="text-display text-2xl text-sand-100">Prevent Tunneling</h3>
              <div className="w-10 h-px bg-terra-300 mt-2" />
            </div>
            <p className="font-ui text-sm text-sand-300 leading-relaxed">
              Soy candles have a "burn memory." Always allow a full melt pool to the edges before extinguishing — especially on the first burn.
            </p>
            <div className="bg-ink-500/60 border border-ink-400 p-4 rounded-xl">
              <p className="label-caps text-terra-200 mb-2">💡 Essential tip</p>
              <p className="font-ui text-sm text-sand-200 leading-relaxed">
                Burn for at least 2–3 hours on first light to establish a full melt pool and prevent wax tunneling.
              </p>
            </div>
            <div className="mt-auto pt-2">
              <Link href="/candle-care" className="btn btn-outline border-white/30 text-white hover:bg-white/10 w-full">
                Full Candle Care Guide
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── BLOG ── */}
      {blogs.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 pb-4">
          <ScrollReveal>
            <div className="text-center mb-10 space-y-2">
              <h2 className="text-display text-3xl sm:text-4xl text-ink-600">Studio Journals</h2>
              <div className="divider-gold" />
              <p className="label-caps">Insights into scent design &amp; care</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog, idx) => (
              <ScrollReveal key={blog.id} delay={0.15 * (idx + 1)} direction={idx === 0 ? 'left' : 'right'} className="h-full flex flex-col">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="group bg-white border border-sand-200 rounded-2xl p-7 flex flex-col gap-4 h-full hover:shadow-md transition-shadow"
                >
                  <span className="label-caps text-terra-400">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <h3 className="font-display text-xl text-ink-600 leading-snug group-hover:text-terra-400 transition-colors">
                    {blog.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between border-t border-sand-100 pt-4">
                    <span className="label-caps">By {blog.author.name || 'Admin'}</span>
                    <span className="label-caps text-terra-400 group-hover:translate-x-1 transition-transform inline-block">
                      Read Article →
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
