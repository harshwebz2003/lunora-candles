import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import ShopFilters from '@/components/public/ShopFilters';
import ScrollReveal from '@/components/public/ScrollReveal';
import { AddToCartButton } from '@/components/public/HomeClientComponents';

export const revalidate = 0;

interface PageProps {
  searchParams: Promise<{
    search?: string;
    fragrance?: string;
    sort?: string;
  }>;
}

const ARCH_TINTS = [
  'bg-terra-100',
  'bg-gold-100',
  'bg-sand-200',
  'bg-sage-100',
  'bg-rose-100',
  'bg-terra-100',
  'bg-gold-100',
  'bg-sand-200',
  'bg-sage-100',
  'bg-rose-100',
  'bg-terra-100',
  'bg-gold-100',
];

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || '';
  const fragranceFilter = params.fragrance || '';
  const sort = params.sort || '';

  const allProducts = await db.product.findMany({ select: { fragrance: true } });
  const fragrancesSet = new Set<string>();
  allProducts.forEach(p => {
    if (p.fragrance) p.fragrance.split(',').forEach(f => fragrancesSet.add(f.trim()));
  });
  const fragrancesList = Array.from(fragrancesSet);

  const whereClause: Record<string, unknown> = {};
  if (search) {
    whereClause.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }
  if (fragranceFilter) {
    whereClause.fragrance = { contains: fragranceFilter };
  }

  let orderBy: Record<string, string> = { createdAt: 'desc' };
  if (sort === 'price-asc')  orderBy = { price: 'asc' };
  if (sort === 'price-desc') orderBy = { price: 'desc' };
  if (sort === 'name-asc')   orderBy = { title: 'asc' };
  if (sort === 'name-desc')  orderBy = { title: 'desc' };

  const products = await db.product.findMany({
    where: whereClause,
    orderBy,
    include: { images: true },
  });

  return (
    <div className="pb-24">

      {/* ── Page Heading ── */}
      <section className="pt-14 pb-8 text-center">
        <h1 className="text-display text-4xl sm:text-5xl text-ink-600 tracking-wide">Collections</h1>
        <div className="divider-gold mt-3" />
        <p className="label-caps mt-2 text-ink-300">
          {products.length} candle{products.length !== 1 ? 's' : ''} available
        </p>
      </section>

      {/* ── Filters ── */}
      <div className="container mx-auto px-4 sm:px-6 mb-10">
        <ShopFilters
          fragrancesList={fragrancesList}
          initialSearch={search}
          initialFragrance={fragranceFilter}
          initialSort={sort}
        />
      </div>

      {/* ── Arch Products Grid ── */}
      <section className="container mx-auto px-4 sm:px-6">
        {products.length === 0 ? (
          <div className="text-center py-20 space-y-4">
            <p className="text-display text-2xl text-ink-400">No candles found</p>
            <p className="label-caps">Try adjusting your search or filters</p>
            <Link href="/shop" className="btn btn-outline mt-4">Clear Filters</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
            {products.map((product, idx) => {
              const img = product.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
              const tint = ARCH_TINTS[idx % ARCH_TINTS.length];
              return (
                <ScrollReveal key={product.id} delay={0.06 * (idx % 4)} className="flex flex-col">
                  <div className="product-card group flex flex-col">
                    {/* Arch image */}
                    <Link href={`/products/${product.slug}`}>
                      <div className={`product-card-arch ${tint} aspect-[3/4] relative`}>
                        <Image
                          src={img}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          priority={idx < 8}
                        />
                      </div>
                    </Link>

                    {/* Info */}
                    <div className="pt-3 text-center space-y-1.5 px-1">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="label-caps text-ink-600 font-medium hover:text-terra-400 transition-colors">
                          {product.title.toUpperCase()}
                        </h3>
                      </Link>
                      <p className="font-ui text-sm text-ink-500">LKR {(product.price * 300).toLocaleString()}</p>

                      {/* Quick Add */}
                      <div className="pt-1">
                        <AddToCartButton
                          id={product.id}
                          slug={product.slug}
                          title={product.title}
                          price={product.price}
                          image={img}
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
