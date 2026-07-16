import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ProductDetailClient from '@/components/public/ProductDetailClient';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const product = await db.product.findUnique({
    where: { slug },
    include: { images: true },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (excluding current one)
  const relatedProducts = await db.product.findMany({
    where: {
      id: { not: product.id },
    },
    take: 3,
    include: { images: true },
  });

  const primaryImage = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';

  return (
    <div className="container mx-auto px-4 py-16 space-y-20">
      
      {/* Back Link */}
      <div>
        <Link href="/shop" className="text-xs font-ui uppercase tracking-widest text-charcoal-400 hover:text-gold-400 transition-colors">
          &larr; Back to Shop
        </Link>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
        
        {/* Images Column */}
        <div className="space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 border border-cream-200 shadow-sm">
            <Image 
              src={primaryImage} 
              alt={product.title} 
              fill 
              className="object-cover"
              priority
            />
          </div>
          {/* Gallery thumbnails if multiple */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img) => (
                <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border border-cream-200 cursor-pointer hover:border-gold-300 transition-colors">
                  <Image src={img.url} alt={product.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Content Column */}
        <div className="space-y-6">
          <div>
            <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700 leading-tight">{product.title}</h1>
            <p className="text-lg font-ui font-bold text-gold-500 mt-2">
              LKR ${(product.price * 300).toLocaleString()}
            </p>
          </div>

          <div className="divider-gold mx-0" />

          {product.fragrance && (
            <div className="space-y-1">
              <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Fragrance Profile:</span>
              <p className="text-xs font-ui text-sage-400 font-semibold uppercase">{product.fragrance}</p>
            </div>
          )}

          <div className="space-y-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Description:</span>
            <p className="text-xs text-charcoal-500 leading-relaxed font-body whitespace-pre-line">{product.description}</p>
          </div>

          <div className="pt-4 border-t border-cream-200 space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-charcoal-400 font-ui font-bold uppercase tracking-wider">Availability:</span>
              <span className={`font-ui font-bold uppercase tracking-wider ${product.stock > 0 ? 'text-sage-400' : 'text-rose-400'}`}>
                {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </span>
            </div>

            {/* Interactive Client Add to Cart & Qty Controls */}
            {product.stock > 0 && (
              <ProductDetailClient 
                id={product.id}
                slug={product.slug}
                title={product.title}
                price={product.price}
                image={primaryImage}
              />
            )}
          </div>

          {/* Quick Care Highlight Box */}
          <div className="bg-cream-100 p-4 rounded-xl border border-cream-200 text-[11px] leading-relaxed text-charcoal-500 font-body">
            <strong className="text-gold-500 block mb-1">🕯️ Clean Burn Guarantee:</strong>
            Handcrafted with 100% pure organic soy wax and lead-free cotton wicks, ensuring a non-toxic, clean burn that is safe for your pets and family.
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-8 pt-12 border-t border-cream-200">
          <h2 className="text-display text-2xl sm:text-3xl text-charcoal-700">You Might Also Love</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((rel) => {
              const relImg = rel.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
              return (
                <div key={rel.id} className="card flex flex-col justify-between group">
                  <div>
                    <Link href={`/products/${rel.slug}`} className="relative block aspect-square overflow-hidden bg-cream-100">
                      <Image 
                        src={relImg} 
                        alt={rel.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </Link>
                    <div className="p-4 space-y-1">
                      <h3 className="font-display text-lg font-semibold text-charcoal-700">
                        <Link href={`/products/${rel.slug}`} className="hover:text-gold-400 transition-colors">
                          {rel.title}
                        </Link>
                      </h3>
                      <p className="text-xs font-ui font-bold text-gold-400">
                        LKR ${(rel.price * 300).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
