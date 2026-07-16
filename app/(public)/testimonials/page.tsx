import React from 'react';
import { db } from '@/lib/db';
import { SparklesIcon } from '@heroicons/react/24/solid';
import TestimonialForm from '@/components/public/TestimonialForm';

export const revalidate = 0;

export default async function TestimonialsPage() {
  const testimonials = await db.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700">Customer Testimonials</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Read what candle lovers say about our creations</p>
        <div className="divider-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Testimonials Grid (left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {testimonials.length === 0 ? (
            <div className="bg-white border border-cream-200 p-8 rounded-2xl text-center">
              <p className="font-display text-lg text-charcoal-500">No testimonials published yet. Be the first to share your thoughts!</p>
            </div>
          ) : (
            testimonials.map((test) => (
              <div key={test.id} className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl space-y-4 shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="font-ui text-xs font-bold uppercase tracking-widest text-charcoal-700">
                    {test.author}
                  </span>
                  <div className="flex gap-1 text-gold-300">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <SparklesIcon key={i} className="h-3.5 w-3.5" />
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-500 italic leading-relaxed font-body">
                  &quot;{test.content}&quot;
                </p>
                <div className="text-[9px] text-charcoal-300 font-ui uppercase tracking-wider">
                  Verified Purchase • {new Date(test.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Testimonial Form Card (right 1 col) */}
        <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl shadow-sm h-fit space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-xl font-semibold text-charcoal-700">Share Your Experience</h2>
            <p className="text-xs text-charcoal-400 font-body">Loved our candles? Share your honest review to help others find their perfect burn.</p>
          </div>
          <TestimonialForm />
        </div>

      </div>

    </div>
  );
}
