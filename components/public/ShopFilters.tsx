'use client';

import React from 'react';
import Link from 'next/link';

export interface ShopFiltersProps {
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
    <div className="flex flex-col sm:flex-row gap-4 items-center">
      
      {/* Search */}
      <form 
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleFilterChange('search', formData.get('search') as string);
        }}
        className="flex gap-2 flex-1 max-w-sm"
      >
        <input
          type="text"
          name="search"
          defaultValue={initialSearch}
          placeholder="Search candles..."
          className="input text-sm flex-1"
        />
        <button type="submit" className="btn btn-outline px-5 py-2 text-xs">
          Search
        </button>
      </form>

      <div className="flex flex-wrap gap-3 items-center">
        {/* Fragrance */}
        {fragrancesList.length > 0 && (
          <select
            className="input text-xs py-2 px-3 pr-8 min-w-[140px] bg-sand-50"
            onChange={(e) => handleFilterChange('fragrance', e.target.value)}
            defaultValue={initialFragrance}
          >
            <option value="">All Scents</option>
            {fragrancesList.map((frag) => (
              <option key={frag} value={frag}>{frag}</option>
            ))}
          </select>
        )}

        {/* Sort */}
        <select
          className="input text-xs py-2 px-3 pr-8 min-w-[140px] bg-sand-50"
          onChange={(e) => handleFilterChange('sort', e.target.value)}
          defaultValue={initialSort}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="name-asc">Name: A → Z</option>
          <option value="name-desc">Name: Z → A</option>
        </select>

        {(initialSearch || initialFragrance || initialSort) && (
          <Link href="/shop" className="label-caps text-terra-400 hover:text-terra-500 transition-colors py-2">
            Clear
          </Link>
        )}
      </div>
    </div>
  );
}
