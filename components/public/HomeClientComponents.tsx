'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          {/* Rating Stars */}
          <div className="flex gap-1 text-terra-400">
            {Array.from({ length: active.rating }).map((_, i) => (
              <span key={i} className="text-lg">★</span>
            ))}
          </div>
          
          {/* Review text */}
          <p className="font-display text-lg sm:text-xl text-ink-500 italic leading-relaxed font-light">
            &ldquo;{active.content}&rdquo;
          </p>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between pt-6 border-t border-sand-200 mt-auto">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h4 className="label-caps text-ink-600 font-semibold tracking-wider">
            {active.author}
          </h4>
          <span className="label-caps text-[9px] text-ink-300 font-medium">Verified Buyer</span>
        </motion.div>
        
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

// Staggered animated Hero content for a premium entry load
export function AnimatedHero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.15,
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const titleWordVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const storyVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const dividerVariants: Variants = {
    hidden: { width: 0 },
    visible: {
      width: '4rem',
      transition: {
        duration: 0.9,
        ease: 'easeInOut',
        delay: 0.4
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 text-center pb-20 px-6 max-w-3xl mx-auto"
    >
      {/* Subtitle */}
      <motion.span variants={itemVariants} className="label-caps text-sand-300 mb-4 block">
        Galle, Sri Lanka — Est. 2022
      </motion.span>

      {/* Main Title */}
      <h1 className="text-display text-5xl sm:text-7xl font-light text-white leading-tight mb-4 split-text-container">
        <span className="block overflow-hidden py-1">
          <span className="text-part left" style={{ animationDelay: '0.15s' }}>
            Scents that tell
          </span>
        </span>
        <span className="block overflow-hidden py-1">
          <span className="text-part right text-serif-italic text-terra-200" style={{ animationDelay: '0.35s' }}>
            your story
          </span>
        </span>
      </h1>

      {/* Divider */}
      <div className="flex justify-center mb-6">
        <motion.div variants={dividerVariants} className="h-px bg-terra-300" />
      </div>

      {/* Subtext */}
      <motion.p
        variants={itemVariants}
        className="font-ui text-sm text-sand-200 leading-relaxed max-w-xl mx-auto mb-8"
      >
        Handcrafted in small batches using 100% natural soy wax, wooden wicks, and botanically inspired fragrance oils from the coast of Galle.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/shop" className="btn btn-terra">
          Explore Collections
        </Link>
        <Link href="/custom-orders" className="btn btn-outline border-white/50 !text-white hover:!text-white hover:bg-white/10">
          Custom Favors
        </Link>
      </motion.div>
    </motion.div>
  );
}

const HomeClientComponents = {
  AddToCartButton,
  TestimonialsSlider,
  AnimatedHero,
};

export default HomeClientComponents;
