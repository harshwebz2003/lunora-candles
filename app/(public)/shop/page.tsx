import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { AddToCartButton } from '@/components/public/HomeClientComponents';

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

      {/* Filters and Controls */}
      <div className="bg-white border border-cream-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
        
        {/* Search Form */}
        <form method="GET" action="/shop" className="w-full md:w-auto flex-grow max-w-md flex gap-2">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search candles..."
            className="input text-xs"
          />
          {fragranceFilter && <input type="hidden" name="fragrance" value={fragranceFilter} />}
          {sort && <input type="hidden" name="sort" value={sort} />}
          <button type="submit" className="btn btn-primary py-2 px-6 text-xs tracking-widest uppercase">
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="w-full md:w-auto flex flex-wrap gap-4 items-center justify-end">
          {/* Fragrance Select */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Fragrance:</span>
            <select
              className="input text-xs py-2 px-3 pr-8 min-w-[140px] bg-cream-50"
              onChange={(e) => {
                const val = e.target.value;
                const newParams = new URLSearchParams();
                if (search) newParams.set('search', search);
                if (val) newParams.set('fragrance', val);
                if (sort) newParams.set('sort', sort);
                window.location.href = `/shop?${newParams.toString()}`;
              }}
              value={fragranceFilter}
            >
              <option value="">All Scents</option>
              {fragrancesList.map((frag) => (
                <option key={frag} value={frag}>{frag}</option>
              ))}
            </select>
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Sort:</span>
            <select
              className="input text-xs py-2 px-3 pr-8 min-w-[140px] bg-cream-50"
              onChange={(e) => {
                const val = e.target.value;
                const newParams = new URLSearchParams();
                if (search) newParams.set('search', search);
                if (fragranceFilter) newParams.set('fragrance', fragranceFilter);
                if (val) newParams.set('sort', val);
                window.location.href = `/shop?${newParams.toString()}`;
              }}
              value={sort}
            >
              <option value="">Default (Newest)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {(search || fragranceFilter || sort) && (
            <Link href="/shop" className="text-xs text-rose-400 hover:text-rose-500 font-ui font-semibold uppercase tracking-wider py-2">
              Clear All
            </Link>
          )}
        </div>
      </div>

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
