import React from 'react';
import { db } from '@/lib/db';
import ProductManager from '@/components/admin/ProductManager';

export const revalidate = 0;

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { images: true },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-display text-3xl font-light text-charcoal-700">Products Catalog Management</h1>
        <p className="text-xs text-charcoal-400 mt-1">Publish new candles, modify pricing/inventory, and view current offerings.</p>
      </div>

      <ProductManager initialProducts={products} />
    </div>
  );
}
