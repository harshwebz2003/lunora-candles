'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal-700 text-cream-100 border-t border-charcoal-500/40">
      {/* Main Footer Links */}
      <div className="container mx-auto py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="font-display text-2xl tracking-widest font-semibold text-white leading-none">LUNORA</span>
            <span className="font-ui text-[9px] tracking-[0.3em] text-gold-300 font-medium uppercase mt-1">C A N D L E S</span>
          </div>
          <p className="text-xs text-charcoal-200 leading-relaxed font-body">
            Luxurious handcrafted scented soy candles inspired by the rich nature and coastal breezes of Galle, Sri Lanka. Safe, non-toxic, and slow-burning.
          </p>
          <div className="flex gap-4 pt-2">
            <a 
              href="https://facebook.com/lunoracandles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-ui tracking-wider text-gold-300 hover:text-gold-200 transition-colors"
            >
              Facebook
            </a>
            <a 
              href="https://instagram.com/lunoracandles" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-ui tracking-wider text-gold-300 hover:text-gold-200 transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="font-display text-base font-semibold text-white tracking-wider">Shop & Explore</h4>
          <ul className="space-y-2 text-xs text-charcoal-200">
            <li><Link href="/shop" className="hover:text-gold-300 transition-colors">Our Candle Collections</Link></li>
            <li><Link href="/fragrance-guide" className="hover:text-gold-300 transition-colors">Fragrance & Scent Guide</Link></li>
            <li><Link href="/candle-care" className="hover:text-gold-300 transition-colors">Candle Care & Burn Safety</Link></li>
            <li><Link href="/custom-orders" className="hover:text-gold-300 transition-colors">Custom Favors & Orders</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="space-y-4">
          <h4 className="font-display text-base font-semibold text-white tracking-wider">Information</h4>
          <ul className="space-y-2 text-xs text-charcoal-200">
            <li><Link href="/about" className="hover:text-gold-300 transition-colors">Our Story & Studio</Link></li>
            <li><Link href="/testimonials" className="hover:text-gold-300 transition-colors">Customer Testimonials</Link></li>
            <li><Link href="/faq" className="hover:text-gold-300 transition-colors">Frequently Asked Questions</Link></li>
            <li><Link href="/delivery" className="hover:text-gold-300 transition-colors">Delivery & Return Policies</Link></li>
          </ul>
        </div>

        {/* Contact info & Galle Address */}
        <div className="space-y-4">
          <h4 className="font-display text-base font-semibold text-white tracking-wider">The Galle Studio</h4>
          <div className="text-xs text-charcoal-200 space-y-3 leading-relaxed">
            <p>
              No.470/B, Matara Rd, Dowata,<br />
              Galle, Sri Lanka 80000
            </p>
            <p>
              <strong>Phone/WhatsApp:</strong> <br />
              <a href="https://wa.me/94769410682" className="text-gold-300 hover:text-gold-200">+94 76 941 0682</a>
            </p>
            <p>
              <strong>Email:</strong> <br />
              <a href="mailto:lunoracandles.info@gmail.com" className="text-gold-300 hover:text-gold-200">lunoracandles.info@gmail.com</a>
            </p>
          </div>
        </div>

      </div>

      {/* Copyright & Legal Links */}
      <div className="border-t border-charcoal-600 bg-charcoal-700 py-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-ui text-charcoal-300 uppercase tracking-widest">
          <span>&copy; {currentYear} Lunora Candles Sri Lanka. All Rights Reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-gold-300">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gold-300">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
