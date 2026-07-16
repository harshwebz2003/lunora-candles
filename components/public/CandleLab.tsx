'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Candle3D with SSR disabled to prevent Three.js hydration errors
const Candle3D = dynamic(() => import('./Candle3D'), { ssr: false });

export default function CandleLab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
      {/* 3D Canvas Column */}
      <div className="lg:col-span-7 w-full h-[420px] relative">
        <Candle3D waxColor="#EDCC87" />
      </div>

      {/* Control Panel Column */}
      <div className="lg:col-span-5 space-y-6">
        <div className="space-y-1">
          <span className="label-caps text-terra-400">Interactive 3D Preview</span>
          <h3 className="text-display text-3xl text-ink-600 font-light leading-snug">
            Sandalwood &amp; Honey Candle Tin
          </h3>
          <div className="w-10 h-px bg-terra-300 my-2" />
        </div>

        <p className="font-ui text-sm text-ink-400 leading-relaxed">
          Interact with our signature Sandalwood &amp; Honey candle tin in real-time 3D space. Drag to rotate the candle and inspect our natural wooden wicks and slow-burning soy wax from every angle.
        </p>

        {/* Selected Details */}
        <div className="bg-sand-100/60 border border-sand-200/80 p-6 rounded-2xl space-y-4">
          <div className="space-y-1">
            <span className="label-caps text-terra-400 text-[10px]">Scent Profile</span>
            <p className="font-display text-lg text-ink-600">
              Indian Sandalwood, Wild Honey &amp; Patchouli
            </p>
          </div>
          <p className="font-ui text-xs text-ink-400 leading-relaxed">
            An exotic, creamy luxury fragrance featuring rich, warm Indian sandalwood sweetened with notes of organic wild honey, spun sugar, and dark patchouli. Perfect for meditative spaces.
          </p>
          <div className="pt-2">
            <Link 
              href="/products/sandalwood-honey" 
              className="btn btn-terra text-xs inline-block"
            >
              Shop Sandalwood Candle — $29.50
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
