'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface GalleryImage {
  id: number;
  url: string;
  altText: string | null;
}

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [list, setList] = useState<GalleryImage[]>(initialImages);
  const [url, setUrl] = useState('');
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('/api/admin/gallery', { url, altText });
      if (res.data.success) {
        setList((prev) => [res.data.image, ...prev]);
        setSuccess(true);
        setUrl('');
        setAltText('');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add image.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image from the gallery?')) return;
    setLoading(true);
    try {
      const res = await axios.delete(`/api/admin/gallery/${id}`);
      if (res.data.success) {
        setList((prev) => prev.filter((img) => img.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* Upload/Add Form Panel */}
      <div className="bg-white border border-cream-200 p-6 rounded-2xl shadow-sm h-fit space-y-6">
        <div>
          <h3 className="font-display text-xl font-semibold text-charcoal-700">Add New Photo</h3>
          <p className="text-xs text-charcoal-400 font-body">Input image path or external URL to add to the gallery.</p>
        </div>

        <form onSubmit={handleAddImage} className="space-y-4">
          {success && (
            <div className="bg-sage-100 border border-sage-200 text-sage-400 text-xs p-3 rounded-xl font-ui font-semibold">
              ✓ Image added successfully!
            </div>
          )}
          
          {error && (
            <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-3 rounded-xl font-ui font-semibold">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
              Image URL / Path *
            </label>
            <input
              type="text"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="input text-xs"
              placeholder="e.g. /assets/new-candle.jpg"
            />
            <span className="text-[9px] text-charcoal-300 font-ui leading-normal mt-1 block">
              * Put local paths starting with `/assets/` or full web URLs.
            </span>
          </div>

          <div>
            <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
              Alt Text / Description
            </label>
            <input
              type="text"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="input text-xs"
              placeholder="e.g. Hand pouring fresh soy wax"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-2.5 text-xs tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? 'Adding Image...' : 'Add Image to Gallery'}
          </button>
        </form>
      </div>

      {/* Grid of Images */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="font-display text-xl font-semibold text-charcoal-700 mb-2">Active Gallery Photos</h3>
        
        {list.length === 0 ? (
          <div className="bg-white border border-cream-200 p-8 rounded-2xl text-center">
            <p className="text-xs text-charcoal-400 font-body">No images in gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {list.map((img) => (
              <div 
                key={img.id} 
                className="group relative aspect-square rounded-xl overflow-hidden border border-cream-200 bg-cream-50"
              >
                <Image src={img.url} alt={img.altText || ''} fill className="object-cover" />
                <div className="absolute inset-0 bg-charcoal-700/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                  <span className="text-[9px] text-cream-100 font-body line-clamp-2">
                    {img.altText || '(No Alt Text)'}
                  </span>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="self-end btn bg-rose-500 hover:bg-rose-600 text-white text-[8px] font-bold py-1 px-2.5 tracking-wider uppercase rounded-md border border-rose-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
