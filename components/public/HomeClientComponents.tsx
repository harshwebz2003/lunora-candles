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
      className={`w-full btn ${added ? 'bg-sage-400 text-white border-sage-400' : 'btn-primary'} py-2.5 text-xs tracking-widest uppercase transition-all`}
    >
      {added ? '✓ Added to Cart' : 'Add to Cart'}
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
    return <p className="text-xs text-charcoal-400 font-body">No testimonials approved yet.</p>;
  }

  const active = testimonials[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="space-y-6 pt-4 flex flex-col justify-between flex-grow min-h-[160px]">
      <div className="space-y-4">
        {/* Rating Stars */}
        <div className="flex gap-1 text-gold-300">
          {Array.from({ length: active.rating }).map((_, i) => (
            <SparklesIcon key={i} className="h-4 w-4" />
          ))}
        </div>
        
        {/* Review text */}
        <p className="text-sm text-charcoal-500 italic leading-relaxed font-body">
          &quot;{active.content}&quot;
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-cream-200 mt-auto">
        <div>
          <h4 className="font-ui text-xs font-bold uppercase tracking-widest text-charcoal-700">
            {active.author}
          </h4>
          <span className="text-[10px] text-charcoal-400 font-body font-light">Verified Buyer</span>
        </div>
        
        {/* Navigation buttons */}
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button 
              onClick={handlePrev}
              className="h-8 w-8 rounded-full border border-cream-300 hover:border-gold-300 flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors"
              aria-label="Previous Testimonial"
            >
              &larr;
            </button>
            <button 
              onClick={handleNext}
              className="h-8 w-8 rounded-full border border-cream-300 hover:border-gold-300 flex items-center justify-center text-charcoal-400 hover:text-gold-400 transition-colors"
              aria-label="Next Testimonial"
            >
              &rarr;
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
