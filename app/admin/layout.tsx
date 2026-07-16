'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  HomeIcon,
  ShoppingBagIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
  EnvelopeIcon,
  ArrowLeftOnRectangleIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

const SIDEBAR_LINKS = [
  { href: '/admin', label: 'Dashboard', icon: HomeIcon },
  { href: '/admin/products', label: 'Products', icon: ShoppingBagIcon },
  { href: '/admin/blog', label: 'Blog Posts', icon: DocumentTextIcon },
  { href: '/admin/testimonials', label: 'Testimonials', icon: ChatBubbleLeftRightIcon },
  { href: '/admin/gallery', label: 'Media Gallery', icon: PhotoIcon },
  { href: '/admin/inquiries', label: 'Inquiries', icon: EnvelopeIcon },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex h-screen bg-cream-50 overflow-hidden font-ui">
      
      {/* Dark Sidebar Panel */}
      <aside className="w-64 bg-charcoal-700 text-cream-200 flex flex-col justify-between border-r border-charcoal-600">
        <div className="flex flex-col">
          {/* Sidebar Logo */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-charcoal-600 bg-charcoal-700">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gold-300">
              <Image src="/logo.jpg" alt="Lunora Candles" fill className="object-cover" />
            </div>
            <div>
              <span className="font-display text-lg font-semibold text-white tracking-widest leading-none block">LUNORA</span>
              <span className="text-[8px] font-ui tracking-[0.2em] text-gold-300 font-bold uppercase block mt-0.5">ADMIN</span>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="p-4 space-y-1">
            {SIDEBAR_LINKS.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive 
                      ? 'bg-gold-300 text-charcoal-700 shadow-sm' 
                      : 'text-charcoal-200 hover:bg-charcoal-500 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-charcoal-600 bg-charcoal-700/50 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-charcoal-200 hover:bg-charcoal-500 hover:text-white transition-all"
          >
            <GlobeAltIcon className="h-5 w-5" />
            <span>Public Site</span>
          </Link>
          
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-rose-400 hover:bg-rose-500/10 transition-all text-left"
          >
            <ArrowLeftOnRectangleIcon className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden bg-cream-50">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-cream-200 flex items-center justify-between px-8 flex-shrink-0">
          <h2 className="text-display text-xl font-semibold text-charcoal-700">Studio CMS Management</h2>
          <div className="text-xs text-charcoal-400 font-bold uppercase tracking-wider">
            Galle Studio • Sri Lanka
          </div>
        </header>

        {/* Page Inner Container */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>

    </div>
  );
}
