'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Candle3D with SSR disabled to prevent Three.js hydration errors
const Candle3D = dynamic(() => import('./Candle3D'), { ssr: false });

const WAX_VARIANTS = [
  {
    name: 'Lavender Breeze',
    color: '#D6C2F7',
    tag: 'bg-[#D6C2F7]',
    scent: 'Floral & Sweet',
    desc: 'Infused with calming French lavender, chamomile buds, and soft white musk.',
    slug: 'lavender-breeze',
  },
  {
    name: 'Vanilla Amberwood',
    color: '#EDCC87',
    tag: 'bg-[#EDCC87]',
    scent: 'Cozy & Warm',
    desc: 'Sweet Madagascar vanilla beans balanced with rich golden amber and sandalwood.',
    slug: 'vanilla-amberwood',
  },
  {
    name: 'Sage & Sea Salt',
    color: '#9BAF8E',
    tag: 'bg-[#9BAF8E]',
    scent: 'Fresh & Earthy',
    desc: 'Earthy woodsy sage leaves with mineral sea salt and driftwood accents.',
    slug: 'sage-sea-salt',
  },
  {
    name: 'Blush Rose',
    color: '#F5C8C8',
    tag: 'bg-[#F5C8C8]',
    scent: 'Floral & Dewy',
    desc: 'Geranium stems, classic English rose petals, and dewy green ivy leaves.',
    slug: 'blush-rose',
  },
];

export default function CandleLab() {
  const [selected, setSelected] = useState(WAX_VARIANTS[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* 3D Canvas Column */}
      <div className="lg:col-span-7 w-full h-[420px] relative">
        <Candle3D waxColor={selected.color} />
      </div>

      {/* Control Panel Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-1">
          <span className="label-caps text-terra-400">Interactive 3D Preview</span>
          <h3 className="text-display text-3xl text-ink-600 font-light leading-snug">
            Studio Candle Lab
          </h3>
          <div className="w-10 h-px bg-terra-300 my-2" />
        </div>

        <p className="font-ui text-sm text-ink-400 leading-relaxed">
          Rotate our signature amber jar candle in 3D space to see our organic wooden wicks and slow-burning soy wax. Select a fragrance profile below to customize the blend.
        </p>

        {/* Variant Selector */}
        <div className="space-y-3">
          <span className="label-caps text-[9px]">Select Wax Blend:</span>
          <div className="grid grid-cols-2 gap-2.5">
            {WAX_VARIANTS.map((variant) => {
              const isSelected = selected.name === variant.name;
              return (
                <button
                  key={variant.name}
                  onClick={() => setSelected(variant)}
                  className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-terra-300 bg-white shadow-xs'
                      : 'border-sand-200 hover:border-sand-300 bg-sand-50/50'
                  }`}
                >
                  <div className={`h-4.5 w-4.5 rounded-full border border-sand-300/40 ${variant.tag}`} />
                  <div className="leading-tight">
                    <span className="label-caps text-[10px] text-ink-600 font-medium block">{variant.name}</span>
                    <span className="text-[9px] text-ink-300 font-ui font-light">{variant.scent}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Details */}
        <div className="bg-sand-100/60 border border-sand-200/80 p-4 rounded-xl space-y-1.5 animate-fade-in" key={selected.name}>
          <span className="label-caps text-terra-400 text-[9px]">{selected.name} Details</span>
          <p className="font-ui text-xs text-ink-400 leading-relaxed">
            {selected.desc}
          </p>
          <div className="pt-2">
            <Link 
              href={`/products/${selected.slug}`} 
              className="text-[10px] label-caps text-ink-600 hover:text-terra-400 transition-colors inline-block font-semibold"
            >
              Shop This Candle →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
