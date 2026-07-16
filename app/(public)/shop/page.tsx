import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { AddToCartButton } from '@/components/public/HomeClientComponents';
import ShopFilters from '@/components/public/ShopFilters';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    search?: string;
    fragrance?: string;
    sort?: string;
  }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const fragranceFilter = params.fragrance || '';
  const sort = params.sort || '';

  // Get all unique fragrances for filter listing
  const allProducts = await db.product.findMany({
    select: { fragrance: true }
  });
  
  const fragrancesSet = new Set<string>();
  allProducts.forEach(p => {
    if (p.fragrance) {
      // Split fragrances if they are comma separated
      p.fragrance.split(',').forEach(f => fragrancesSet.add(f.trim()));
    }
  });
  const fragrancesList = Array.from(fragrancesSet);

  // Build query where clause
  const whereClause: any = {};
  
  if (search) {
    whereClause.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }
  
  if (fragranceFilter) {
    whereClause.fragrance = { contains: fragranceFilter };
  }

  // Build sorting object
  let orderBy: any = { createdAt: 'desc' };
  if (sort === 'price-asc') {
    orderBy = { price: 'asc' };
  } else if (sort === 'price-desc') {
    orderBy = { price: 'desc' };
  } else if (sort === 'name-asc') {
    orderBy = { title: 'asc' };
  } else if (sort === 'name-desc') {
    orderBy = { title: 'desc' };
  }

  const products = await db.product.findMany({
    where: whereClause,
    orderBy: orderBy,
    include: { images: true },
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700">The Candle Collections</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Pure Soy Wax & Organic Wicks</p>
        <div className="divider-gold" />
      </div>

      {/* Seasonal Collections Spotlight */}
      <div className="space-y-4">
        <h2 className="font-display text-xs uppercase tracking-[0.25em] text-charcoal-400 font-bold text-center">Seasonal Collections Spotlight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Spring/Summer Monsoon Serenade */}
          <Link href="/shop?search=sea+salt" className="group relative block overflow-hidden rounded-2xl border border-cream-200 bg-cream-100/50 hover:border-gold-300 transition-all p-6 sm:p-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-sage-200/20 blur-[60px] rounded-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="relative space-y-2 z-10">
              <span className="text-[9px] font-ui uppercase tracking-wider text-sage-400 font-bold">Monsoon Serenade Collection</span>
              <h3 className="text-display text-xl text-charcoal-700 group-hover:text-gold-400 transition-colors">Earthy Ocean & Rain</h3>
              <p className="text-[11px] text-charcoal-400 leading-relaxed font-body max-w-sm">
                Clean, refreshing marine air, herbal French lavender, and mineral ocean breeze wicks to calm your senses during rainfall.
              </p>
              <span className="inline-block text-[10px] font-ui uppercase font-bold tracking-wider text-gold-400 pt-2">Shop Monsoon Collection &rarr;</span>
            </div>
          </Link>

          {/* Ceylon Spiced Winter */}
          <Link href="/shop?search=cinnamon" className="group relative block overflow-hidden rounded-2xl border border-cream-200 bg-cream-100/50 hover:border-gold-300 transition-all p-6 sm:p-8">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gold-200/20 blur-[60px] rounded-full pointer-events-none group-hover:scale-110 transition-transform" />
            <div className="relative space-y-2 z-10">
              <span className="text-[9px] font-ui uppercase tracking-wider text-gold-400 font-bold">Ceylon Spiced Winter Collection</span>
              <h3 className="text-display text-xl text-charcoal-700 group-hover:text-gold-400 transition-colors">Warm Amber & Spices</h3>
              <p className="text-[11px] text-charcoal-400 leading-relaxed font-body max-w-sm">
                Indulge in rich Sri Lankan cinnamon bark, sweet clove oil, and cozy Madagascar vanilla amberwood for cold evenings.
              </p>
              <span className="inline-block text-[10px] font-ui uppercase font-bold tracking-wider text-gold-400 pt-2">Shop Spiced Collection &rarr;</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Filters and Controls */}
      <ShopFilters 
        initialSearch={search}
        initialFragrance={fragranceFilter}
        initialSort={sort}
        fragrancesList={fragrancesList}
      />

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-cream-200 rounded-2xl space-y-4">
          <p className="font-display text-xl text-charcoal-600">No candle creations found</p>
          <p className="text-xs text-charcoal-400">Try adjusting your filters or search keywords.</p>
          <Link href="/shop" className="btn btn-primary text-xs tracking-widest mt-4">
            Reset Filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const primaryImage = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
            return (
              <div key={product.id} className="card flex flex-col justify-between group">
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
            );
          })}
        </div>
      )}
    </div>
  );
}
