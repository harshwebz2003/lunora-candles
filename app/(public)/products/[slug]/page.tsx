import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ProductDetailClient from '@/components/public/ProductDetailClient';
import ScrollReveal from '@/components/public/ScrollReveal';

export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ARCH_TINTS = ['bg-terra-100', 'bg-gold-100', 'bg-sand-200', 'bg-sage-100'];

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!product) notFound();

  const relatedProducts = await db.product.findMany({
    where: { id: { not: product.id } },
    take: 4,
    include: { images: true },
  });

  const primaryImage = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
  const galleryImages = product.images.length > 0 ? product.images : [{ url: primaryImage, id: 0 }];

  return (
    <div className="pb-24">

      {/* ── Breadcrumb ── */}
      <div className="container mx-auto px-4 sm:px-6 pt-8 pb-6">
        <nav className="flex items-center gap-2 label-caps text-ink-300">
          <Link href="/" className="hover:text-terra-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-terra-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-ink-500">{product.title}</span>
        </nav>
      </div>

      {/* ── Main Product Area ── */}
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">

          {/* Left: Gallery Thumbnails + Main Image */}
          <div className="flex gap-4">
            {/* Vertical thumbnail strip */}
            <div className="flex flex-col gap-3 w-20 flex-shrink-0">
              {galleryImages.slice(0, 4).map((img, i) => (
                <div
                  key={img.id ?? i}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                    i === 0 ? 'border-terra-300 shadow-sm' : 'border-sand-200 hover:border-terra-200'
                  }`}
                >
                  <Image src={img.url} alt={`${product.title} view ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Main hero image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden bg-terra-100 aspect-[4/5]">
              <Image
                src={primaryImage}
                alt={product.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col gap-6">
            {/* Category tag */}
            <span className="label-caps text-terra-400">
              {product.fragrance ? `Fragrance: ${product.fragrance}` : 'Lunora Candles'}
            </span>

            {/* Title + Price */}
            <div>
              <h1 className="text-display text-4xl sm:text-5xl text-ink-600 leading-tight">
                {product.title}
              </h1>
              <p className="font-ui text-xl font-medium text-ink-500 mt-3">
                ${product.price.toFixed(2)} USD
              </p>
            </div>

            <div className="w-12 h-px bg-terra-300" />

            {/* Short description */}
            <p className="font-ui text-sm text-ink-400 leading-relaxed">
              {product.description?.split('\n')[0] || 'A beautifully handcrafted scented candle, poured in Galle, Sri Lanka using 100% natural soy wax and premium fragrance oils.'}
            </p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${product.stock > 0 ? 'bg-sage-400' : 'bg-rose-400'}`} />
              <span className="label-caps">
                {product.stock > 0 ? `In Stock — ${product.stock} units` : 'Out of Stock'}
              </span>
            </div>

            {/* Add to Cart */}
            {product.stock > 0 && (
              <ProductDetailClient
                id={product.id}
                slug={product.slug}
                title={product.title}
                price={product.price}
                image={primaryImage}
              />
            )}

            {/* Clean burn guarantee */}
            <div className="bg-sand-100 border border-sand-200 rounded-xl p-4">
              <p className="label-caps text-terra-400 mb-1.5">🕯️ Clean Burn Guarantee</p>
              <p className="font-ui text-xs text-ink-400 leading-relaxed">
                Handcrafted with 100% organic soy wax and lead-free cotton wicks — non-toxic and safe for your family and pets.
              </p>
            </div>
          </div>
        </div>

        {/* ── Description Tabs ── */}
        <div className="mt-16 border-t border-sand-200 pt-12">
          <div className="flex gap-8 border-b border-sand-200 mb-8">
            {['Description', 'Specification', 'Ingredients', 'Instructions'].map((tab, i) => (
              <button
                key={tab}
                className={`font-ui text-xs uppercase tracking-widest pb-3 transition-colors border-b-2 -mb-px ${
                  i === 0
                    ? 'border-ink-600 text-ink-600'
                    : 'border-transparent text-ink-300 hover:text-ink-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="max-w-2xl space-y-4">
            {product.description ? (
              product.description.split('\n\n').map((para, i) => (
                <p key={i} className="font-ui text-sm text-ink-400 leading-relaxed">{para}</p>
              ))
            ) : (
              <>
                <p className="font-ui text-sm text-ink-400 leading-relaxed">
                  This beautifully crafted candle from Lunora is a remarkable addition to any home fragrance collection. The exquisite glass jar candle options you see at our studio reflect the finest artisan craft — poured from our Galle studio with care.
                </p>
                <h4 className="font-display text-lg text-ink-600 mt-6">Two Wick Soy Candle</h4>
                <p className="font-ui text-sm text-ink-400 leading-relaxed">
                  This candle features a high-quality soy wax candle that has an RRS set for widened burning. The wick between candles is not in touch to your home but releases a warming smell while crafting a wonderful and ever-born burn.
                </p>
                <h4 className="font-display text-lg text-ink-600 mt-4">Calm & Relieve Aroma</h4>
                <p className="font-ui text-sm text-ink-400 leading-relaxed">
                  Light this candle when you come along on quiet days, as it helps better experience. It can help you meditate, promote your ideas, reduce your stress, and put you in good mood. Our lightweight candles are the highlight and featuring a unique blend of premium natural fragrance oils.
                </p>
              </>
            )}
          </div>
        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-sand-200">
            <ScrollReveal>
              <h2 className="text-display text-3xl text-ink-600 mb-10">Related Products</h2>
            </ScrollReveal>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
              {relatedProducts.map((rel, idx) => {
                const relImg = rel.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
                const tint = ARCH_TINTS[idx % ARCH_TINTS.length];
                return (
                  <ScrollReveal key={rel.id} delay={0.1 * idx} className="flex flex-col">
                    <Link href={`/products/${rel.slug}`} className="product-card group">
                      <div className={`product-card-arch-sm ${tint} aspect-[3/4] relative`}>
                        <Image
                          src={relImg}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="pt-3 text-center space-y-1 px-1">
                        <h3 className="label-caps text-ink-600 font-medium">{rel.title.toUpperCase()}</h3>
                        <p className="font-ui text-sm text-ink-500">${rel.price.toFixed(2)}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
