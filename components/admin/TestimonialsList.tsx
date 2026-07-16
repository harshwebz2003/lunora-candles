'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { SparklesIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: number;
  author: string;
  content: string;
  rating: number;
  approved: boolean;
}

export default function TestimonialsList({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [list, setList] = useState<Testimonial[]>(initialTestimonials);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleApprove = async (id: number) => {
    setLoadingId(id);
    try {
      const res = await axios.patch(`/api/admin/testimonials/${id}`, { approved: true });
      if (res.data.success) {
        setList((prev) =>
          prev.map((t) => (t.id === id ? { ...t, approved: true } : t))
        );
      }
    } catch (err) {
      console.error(err);
      alert('Failed to approve review.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    setLoadingId(id);
    try {
      const res = await axios.delete(`/api/admin/testimonials/${id}`);
      if (res.data.success) {
        setList((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete review.');
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="bg-white border border-cream-200 p-8 rounded-2xl text-center">
        <p className="text-xs text-charcoal-400 font-body">No reviews submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((test) => (
        <div 
          key={test.id} 
          className={`bg-white border border-cream-200 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm ${
            !test.approved ? 'border-l-4 border-l-gold-400' : ''
          }`}
        >
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-ui text-xs font-bold uppercase tracking-wider text-charcoal-700">
                {test.author}
              </span>
              <div className="flex gap-1 text-gold-300">
                {Array.from({ length: test.rating }).map((_, i) => (
                  <SparklesIcon key={i} className="h-3.5 w-3.5" />
                ))}
              </div>
              {!test.approved && (
                <span className="badge badge-gold text-[7px]">Pending Approval</span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-charcoal-500 italic leading-relaxed font-body">
              &quot;{test.content}&quot;
            </p>
          </div>

          <div className="flex gap-3 flex-shrink-0">
            {!test.approved && (
              <button
                disabled={loadingId === test.id}
                onClick={() => handleApprove(test.id)}
                className="btn btn-primary py-2 px-4 text-[10px] tracking-widest uppercase disabled:opacity-50"
              >
                Approve
              </button>
            )}
            <button
              disabled={loadingId === test.id}
              onClick={() => handleDelete(test.id)}
              className="btn btn-outline text-rose-400 border-rose-400 hover:bg-rose-500/10 py-2 px-4 text-[10px] tracking-widest uppercase disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
