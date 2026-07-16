'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

interface Product {
  id: number;
  slug: string;
  title: string;
  price: number;
  fragrance: string | null;
  description: string;
  images: { url: string }[];
}

const QUESTIONS = [
  {
    id: 1,
    text: 'Where will your candle be burned most often?',
    options: [
      { value: 'bedroom', label: 'Bedroom / Meditation Space', desc: 'Spaces of rest and quiet reflection' },
      { value: 'living', label: 'Living Room / Foyer', desc: 'Welcoming spaces for gathering' },
      { value: 'kitchen', label: 'Kitchen / Dining Space', desc: 'Inviting, culinary atmospheres' },
      { value: 'bathroom', label: 'Bathroom / Spa Area', desc: 'Clean, fresh wellness sanctuaries' },
    ]
  },
  {
    id: 2,
    text: 'What kind of mood are you aiming to create?',
    options: [
      { value: 'calm', label: 'Serenity & Relaxation', desc: 'To melt away stress and rest deeply' },
      { value: 'cozy', label: 'Cozy Warmth & Comfort', desc: 'For quiet reading or warm evenings' },
      { value: 'focus', label: 'Focus & Inward Energy', desc: 'To purify the mind and remain alert' },
      { value: 'romantic', label: 'Elegance & Romanticism', desc: 'Capturing floral gardens and classic style' },
    ]
  },
  {
    id: 3,
    text: 'What scent notes are you naturally drawn to?',
    options: [
      { value: 'lavender', label: 'Herbal French Lavender', desc: 'Sweet chamomile and white musk' },
      { value: 'vanilla', label: 'Warm Madagascar Vanilla', desc: 'Sweet amber and sandalwood' },
      { value: 'cinnamon', label: 'Sri Lankan Spices & Clove', desc: 'Rich cinnamon and nutmeg' },
      { value: 'sage', label: 'Earthy Sage & Sea Salt', desc: 'Driftwood and marine ocean air' },
      { value: 'rose', label: 'English Blush Rose & Geranium', desc: 'Dewy green leaves and fresh ivy' },
    ]
  }
];

export default function ScentFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [match, setMatch] = useState<Product | null>(null);

  const handleSelectOption = (val: string) => {
    const nextAnswers = [...answers, val];
    setAnswers(nextAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      calculateMatch(nextAnswers);
    }
  };

  const calculateMatch = async (finalAnswers: string[]) => {
    setLoading(true);
    try {
      // Scent mapping algorithm
      let targetSlug = 'lavender-breeze'; // Default fallback
      
      const space = finalAnswers[0];
      const mood = finalAnswers[1];
      const note = finalAnswers[2];

      if (note === 'vanilla' || mood === 'cozy') {
        targetSlug = 'vanilla-amberwood';
      } else if (note === 'cinnamon' || space === 'kitchen') {
        targetSlug = 'cinnamon-spice';
      } else if (note === 'sage' || space === 'bathroom') {
        targetSlug = 'sage-sea-salt';
      } else if (note === 'rose' || mood === 'romantic') {
        targetSlug = 'blush-rose';
      } else if (space === 'bedroom' || mood === 'calm' || note === 'lavender') {
        targetSlug = 'lavender-breeze';
      }

      // Query product catalog via shop search endpoint or load from db
      const res = await axios.get('/api/admin/products');
      if (res.data.success && Array.isArray(res.data.products)) {
        const found = res.data.products.find((p: Product) => p.slug === targetSlug) || res.data.products[0];
        setMatch(found);
      }
    } catch (e) {
      console.error('Error fetching quiz match:', e);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setMatch(null);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700 font-serif italic">Scent Finder Quiz</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Discover Scent Profiles to Match Your Aura</p>
        <div className="divider-gold" />
      </div>

      {/* Quiz Board */}
      <div className="bg-white border border-cream-200 p-8 sm:p-12 rounded-3xl shadow-sm min-h-[360px] flex flex-col justify-between">
        
        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center space-y-4 my-auto py-12">
            <div className="skeleton w-16 h-16 rounded-full" />
            <p className="text-xs font-ui uppercase tracking-widest text-gold-400 font-bold animate-pulse">Analyzing Scent Profile...</p>
          </div>
        )}

        {/* Question step */}
        {!loading && !match && (
          <div className="space-y-8 flex-grow flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] font-ui uppercase tracking-wider text-gold-400 font-bold">
                Question {step + 1} of {QUESTIONS.length}
              </span>
              <h2 className="text-display text-2xl font-light text-charcoal-700 leading-tight">
                {QUESTIONS[step].text}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {QUESTIONS[step].options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleSelectOption(opt.value)}
                  className="w-full text-left p-4 rounded-xl border border-cream-200 hover:border-gold-300 hover:bg-cream-50/50 transition-all group space-y-1"
                >
                  <strong className="font-ui text-xs font-bold text-charcoal-700 group-hover:text-gold-500 uppercase tracking-wide block">
                    {opt.label}
                  </strong>
                  <span className="text-[10px] text-charcoal-400 font-body block">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results match page */}
        {!loading && match && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-ui uppercase tracking-wider text-sage-400 font-bold">Your Perfect Fragrance Match</span>
              <h2 className="text-display text-3xl text-charcoal-700 font-light leading-snug">
                Meet <span className="font-serif italic text-gold-300">{match.title}</span>
              </h2>
              <div className="divider-gold" />
            </div>

            <div className="flex flex-col sm:flex-row gap-8 items-center bg-cream-50 p-6 rounded-2xl border border-cream-200">
              <div className="relative w-40 h-40 overflow-hidden rounded-xl border border-cream-200 bg-cream-100 flex-shrink-0">
                <Image 
                  src={match.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg'} 
                  alt={match.title} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  {match.fragrance && (
                    <span className="text-[10px] font-ui uppercase tracking-wider text-sage-400 font-semibold block mb-1">
                      Scent profile: {match.fragrance}
                    </span>
                  )}
                  <p className="text-xs text-charcoal-500 leading-relaxed font-body line-clamp-3">
                    {match.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-4 items-center">
                  <span className="font-ui text-sm font-bold text-gold-500">
                    LKR ${(match.price * 300).toLocaleString()}
                  </span>
                  <Link href={`/products/${match.slug}`} className="btn btn-primary py-2 px-6 text-[10px] tracking-widest uppercase">
                    View Product details
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-cream-200 flex justify-between items-center flex-wrap gap-4">
              <button onClick={handleReset} className="text-xs font-ui uppercase tracking-widest font-bold text-charcoal-400 hover:text-gold-400 transition-colors">
                &larr; Retake Quiz
              </button>
              <Link href="/shop" className="text-xs font-ui uppercase tracking-widest font-bold text-gold-400 hover:text-gold-500 transition-colors">
                Browse Shop Catalog &rarr;
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
