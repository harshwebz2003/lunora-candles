'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-subtle">
      <div className="container mx-auto py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-sand-300">
              <Image src="/logo.jpg" alt="Lunora" fill className="object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm tracking-[0.25em] font-semibold text-ink-600 uppercase">Lunora</span>
              <span className="font-ui text-[8px] tracking-[0.3em] text-terra-400 uppercase">Candles</span>
            </div>
          </Link>
          <p className="font-ui text-xs text-ink-300 leading-relaxed max-w-[220px]">
            Luxurious handcrafted soy candles inspired by the rich nature and coastal breezes of Galle, Sri Lanka.
          </p>
          <div className="flex gap-4 pt-1">
            <a href="https://facebook.com/lunoracandles" target="_blank" rel="noopener noreferrer" className="label-caps hover:text-terra-400 transition-colors">Facebook</a>
            <a href="https://instagram.com/lunoracandles" target="_blank" rel="noopener noreferrer" className="label-caps hover:text-terra-400 transition-colors">Instagram</a>
          </div>
        </div>

        {/* Plant Trees */}
        <div className="space-y-3">
          <h4 className="label-caps text-ink-500">Shop</h4>
          <ul className="space-y-2.5">
            {[
              { href: '/shop',            label: 'All Candles' },
              { href: '/scent-finder',    label: 'Scent Finder Quiz' },
              { href: '/fragrance-guide', label: 'Fragrance Guide' },
              { href: '/custom-orders',   label: 'Custom Orders' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="font-ui text-xs text-ink-400 hover:text-terra-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div className="space-y-3">
          <h4 className="label-caps text-ink-500">Information</h4>
          <ul className="space-y-2.5">
            {[
              { href: '/about',         label: 'Our Story' },
              { href: '/faq',           label: 'FAQ' },
              { href: '/candle-care',   label: 'Candle Care' },
              { href: '/delivery',      label: 'Shipping & Returns' },
              { href: '/contact',       label: 'Contact Us' },
            ].map(l => (
              <li key={l.href}>
                <Link href={l.href} className="font-ui text-xs text-ink-400 hover:text-terra-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h4 className="label-caps text-ink-500">The Galle Studio</h4>
          <div className="font-ui text-xs text-ink-400 space-y-2.5 leading-relaxed">
            <p>No.470/B, Matara Rd, Dowata,<br />Galle, Sri Lanka 80000</p>
            <p>
              <a href="https://wa.me/94769410682" className="hover:text-terra-400 transition-colors">
                +94 76 941 0682
              </a>
            </p>
            <p>
              <a href="mailto:lunoracandles.info@gmail.com" className="hover:text-terra-400 transition-colors">
                lunoracandles.info@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-sand-200 py-5">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="label-caps">
            © {year} Lunora Candles Sri Lanka. All Rights Reserved.
          </span>
          <div className="flex gap-5">
            <Link href="/privacy" className="label-caps hover:text-terra-400 transition-colors">Privacy</Link>
            <Link href="/terms"   className="label-caps hover:text-terra-400 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
