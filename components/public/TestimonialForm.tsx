'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function TestimonialForm() {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('/api/testimonials', {
        author,
        content,
        rating: Number(rating),
      });

      if (res.data.success) {
        setSuccess(true);
        setAuthor('');
        setContent('');
        setRating(5);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-sage-100 border border-sage-200 text-sage-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ✓ Review submitted! Thank you. Your testimonial will appear on the website once approved by our team.
        </div>
      )}
      
      {error && (
        <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
          Your Name *
        </label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="input text-xs"
          placeholder="e.g. Ruwan Kumara"
        />
      </div>

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
          Rating (1 to 5 Stars) *
        </label>
        <select
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="input text-xs bg-cream-50"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5 - Exceptional)</option>
          <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
          <option value={3}>⭐⭐⭐ (3 - Satisfactory)</option>
          <option value={2}>⭐⭐ (2 - Needs Improvement)</option>
          <option value={1}>⭐ (1 - Unsatisfactory)</option>
        </select>
      </div>

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
          Your Review / Message *
        </label>
        <textarea
          required
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input text-xs"
          placeholder="Share your experience with our fragrance quality, burn cleanlines, packaging, or customer service..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn btn-primary py-2.5 text-xs tracking-widest uppercase disabled:opacity-50"
      >
        {loading ? 'Submitting review...' : 'Submit Review'}
      </button>
    </form>
  );
}
