'use client';

import React from 'react';
import Link from 'next/link';

interface ShopFiltersProps {
  initialSearch: string;
  initialFragrance: string;
  initialSort: string;
  fragrancesList: string[];
}

export default function ShopFilters({
  initialSearch,
  initialFragrance,
  initialSort,
  fragrancesList,
}: ShopFiltersProps) {
  
  const handleFilterChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(window.location.search);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    window.location.href = `/shop?${newParams.toString()}`;
  };

  return (
    <div className="bg-white border border-cream-200 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center justify-between shadow-sm">
      
      {/* Search Form */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchVal = formData.get('search') as string;
          handleFilterChange('search', searchVal);
        }}
        className="w-full md:w-auto flex-grow max-w-md flex gap-2"
      >
        <input
          type="text"
          name="search"
          defaultValue={initialSearch}
          placeholder="Search candles..."
          className="input text-xs"
        />
        <button type="submit" className="btn btn-primary py-2 px-6 text-xs tracking-widest uppercase">
          Search
        </button>
      </form>

      {/* Filters Selectors */}
      <div className="w-full md:w-auto flex flex-wrap gap-4 items-center justify-end">
        {/* Fragrance Select */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Fragrance:</span>
          <select
            className="input text-xs py-2 px-3 pr-8 min-w-[140px] bg-cream-50"
            onChange={(e) => handleFilterChange('fragrance', e.target.value)}
            value={initialFragrance}
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
            onChange={(e) => handleFilterChange('sort', e.target.value)}
            value={initialSort}
          >
            <option value="">Default (Newest)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>

        {(initialSearch || initialFragrance || initialSort) && (
          <Link href="/shop" className="text-xs text-rose-400 hover:text-rose-500 font-ui font-semibold uppercase tracking-wider py-2">
            Clear All
          </Link>
        )}
      </div>
    </div>
  );
}
