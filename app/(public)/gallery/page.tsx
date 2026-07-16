import React from 'react';
import Image from 'next/image';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function GalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-ink-600">Studio Gallery</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-terra-400">Glimpses of Hand-poured Artistry in Galle</p>
        <div className="divider-gold" />
      </div>

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <div className="text-center py-20 bg-white border border-sand-200 rounded-2xl">
          <p className="font-display text-lg text-ink-500">Our gallery is empty. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="group relative aspect-square rounded-2xl overflow-hidden bg-sand-100 border border-sand-200 shadow-sm cursor-pointer"
            >
              <Image 
                src={img.url} 
                alt={img.altText || 'Lunora Candles Image'} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {img.altText && (
                <div className="absolute inset-0 bg-ink-600/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-[11px] text-cream-100 font-body leading-normal">
                    {img.altText}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
