'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';

// Load 3D candle preview dynamically (client-only)
const Candle3D = dynamic(() => import('./Candle3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] rounded-2xl bg-sand-100/60 border border-sand-200 flex flex-col items-center justify-center space-y-4">
      <div className="skeleton w-12 h-12 rounded-full" />
      <span className="text-[10px] font-ui uppercase tracking-widest text-terra-400 font-bold animate-pulse">
        Initializing 3D Canvas...
      </span>
    </div>
  ),
});

interface ProductMediaClientProps {
  images: { id: number; url: string }[];
  title: string;
  fragrance?: string | null;
}

export default function ProductMediaClient({ images, title, fragrance }: ProductMediaClientProps) {
  const [viewMode, setViewMode] = useState<'photos' | '3d'>('photos');
  const [selectedImage, setSelectedImage] = useState(images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg');

  // Determine candle wax color from title/fragrance name to customize 3D candle
  const getWaxColor = () => {
    const fLower = (fragrance || '').toLowerCase();
    const tLower = title.toLowerCase();
    if (fLower.includes('lavender') || tLower.includes('lavender')) return '#E8E0F5'; // Lavender tint
    if (fLower.includes('rose') || tLower.includes('rose')) return '#F7ECE8'; // Rose tint
    if (fLower.includes('sage') || tLower.includes('sage')) return '#E3ECE0'; // Sage tint
    if (fLower.includes('cinnamon') || tLower.includes('cinnamon')) return '#E8DFD3'; // Cinnamon warm tint
    return '#FAF5EB'; // Classic cream
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-sand-200 pb-3">
        <button
          onClick={() => setViewMode('photos')}
          className={`px-4 py-1.5 text-[10px] font-ui uppercase tracking-wider font-bold rounded-lg transition-all ${
            viewMode === 'photos'
              ? 'bg-ink-600 text-white shadow-xs'
              : 'text-ink-400 hover:text-ink-600'
          }`}
        >
          📷 Product Photos
        </button>
        <button
          onClick={() => setViewMode('3d')}
          className={`px-4 py-1.5 text-[10px] font-ui uppercase tracking-wider font-bold rounded-lg transition-all ${
            viewMode === '3d'
              ? 'bg-ink-600 text-white shadow-xs'
              : 'text-ink-400 hover:text-ink-600'
          }`}
        >
          🕯️ Interactive 3D Preview
        </button>
      </div>

      {/* Main Display Area */}
      {viewMode === 'photos' ? (
        <div className="space-y-6">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-sand-100 border border-sand-200 shadow-sm transition-all duration-300">
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border cursor-pointer transition-colors ${
                    selectedImage === img.url ? 'border-gold-400 ring-1 ring-gold-400' : 'border-sand-200 hover:border-gold-300'
                  }`}
                >
                  <Image src={img.url} alt={title} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-fade-in">
          <Candle3D waxColor={getWaxColor()} />
          <p className="text-[10px] text-ink-400 italic text-center mt-3 font-body">
            Drag to rotate, pinch to zoom. Features real-time wooden wick flame flickering.
          </p>
        </div>
      )}
    </div>
  );
}
