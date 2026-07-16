'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

export default function ProductDetailClient({
  id,
  slug,
  title,
  price,
  image
}: {
  id: number;
  slug: string;
  title: string;
  price: number;
  image: string;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id, slug, title, price, image }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        {/* Quantity Select */}
        <div className="flex items-center border border-sand-300 rounded-lg overflow-hidden bg-sand-50 h-12">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-3 px-4 text-ink-500 hover:bg-sand-200"
          >
            <MinusIcon className="h-4 w-4" />
          </button>
          <span className="px-6 text-sm font-bold text-ink-600">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="p-3 px-4 text-ink-500 hover:bg-sand-200"
          >
            <PlusIcon className="h-4 w-4" />
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAdd}
          className={`flex-grow h-12 btn ${added ? 'bg-sage-400 text-white border-sage-400' : 'btn-primary'} py-2.5 text-xs tracking-widest uppercase transition-all`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
