'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push('/admin');
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-4">
      <div className="w-full max-w-md bg-white border border-cream-200 p-8 sm:p-10 rounded-3xl shadow-sm space-y-6">
        
        {/* Brand logo & title */}
        <div className="text-center space-y-2">
          <div className="relative h-16 w-16 mx-auto overflow-hidden rounded-full border border-gold-300">
            <Image 
              src="/logo.jpg" 
              alt="Lunora Candles Logo" 
              fill 
              className="object-cover"
            />
          </div>
          <h1 className="text-display text-2xl font-semibold text-charcoal-700">Studio Admin Panel</h1>
          <p className="text-[10px] font-ui uppercase tracking-widest text-gold-400 font-bold">Secure Access Portal</p>
        </div>

        {error && (
          <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input text-xs"
              placeholder="e.g. harshwebz2003@gmail.com"
            />
          </div>

          <div>
            <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input text-xs"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn btn-primary py-2.5 text-xs tracking-widest uppercase disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2">
          <Link href="/" className="text-[10px] font-ui uppercase tracking-widest text-charcoal-400 hover:text-gold-400 transition-colors">
            &larr; Back to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
}
