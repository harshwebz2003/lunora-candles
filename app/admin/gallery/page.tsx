import React from 'react';
import { db } from '@/lib/db';
import GalleryManager from '@/components/admin/GalleryManager';

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { uploadedAt: 'desc' },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-display text-3xl font-light text-charcoal-700">Media Gallery Manager</h1>
        <p className="text-xs text-charcoal-400 mt-1">Add, preview, or remove photos shown in the public website gallery.</p>
      </div>

      <GalleryManager initialImages={images} />
    </div>
  );
}
