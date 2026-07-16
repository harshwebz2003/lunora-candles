'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { SparklesIcon } from '@heroicons/react/24/solid';

// AddToCartButton component
export function AddToCartButton({ 
  id, 
  slug, 
  title, 
  price, 
  image 
}: { 
  id: number; 
  slug: string; 
  title: string; 
  price: number; 
  image: string; 
}) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ id, slug, title, price, image }, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full btn text-[10px] tracking-[0.18em] py-2 ${
        added
          ? 'bg-sage-400 text-white border-sage-400'
          : 'btn-outline text-ink-500 border-sand-300 hover:bg-ink-600 hover:text-white hover:border-ink-600'
      } transition-all`}
    >
      {added ? '✓ Added' : 'Add to Cart'}
    </button>
  );
}

// TestimonialsSlider component
interface Testimonial {
  id: number;
  author: string;
  content: string;
  rating: number;
}

export function TestimonialsSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return <p className="label-caps text-center text-ink-300 py-10">No testimonials yet</p>;
  }

  const active = testimonials[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="flex flex-col justify-between flex-1 gap-6">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1 text-gold-400">
          {Array.from({ length: active.rating }).map((_, i) => (
            <span key={i} className="text-lg">★</span>
          ))}
        </div>
        
        {/* Review text */}
        <p className="font-display text-lg sm:text-xl text-ink-500 italic leading-relaxed font-light">
          &ldquo;{active.content}&rdquo;
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-sand-200 mt-auto">
        <div>
          <h4 className="label-caps text-ink-600 font-semibold tracking-wider">
            {active.author}
          </h4>
          <span className="label-caps text-[9px] text-ink-300 font-medium">Verified Buyer</span>
        </div>
        
        {/* Navigation buttons */}
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="h-8 w-8 rounded-full border border-sand-300 hover:border-terra-300 hover:text-terra-400 flex items-center justify-center text-ink-400 transition-colors"
              aria-label="Previous Testimonial"
            >
              ←
            </button>
            <button 
              onClick={handleNext}
              className="h-8 w-8 rounded-full border border-sand-300 hover:border-terra-300 hover:text-terra-400 flex items-center justify-center text-ink-400 transition-colors"
              aria-label="Next Testimonial"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const HomeClientComponents = {
  AddToCartButton,
  TestimonialsSlider,
};

export default HomeClientComponents;
