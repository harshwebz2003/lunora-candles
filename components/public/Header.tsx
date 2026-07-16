'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBagIcon, 
  Bars3Icon, 
  XMarkIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  MagnifyingGlassIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { href: '/',              label: 'Home' },
  { href: '/shop',          label: 'Products' },
  { href: '/gallery',       label: 'Gallery' },
  { href: '/scent-finder',  label: 'Scent Quiz' },
  { href: '/about',         label: 'About Us' },
];

export default function Header() {
  const pathname = usePathname();
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartTotal, 
    cartCount, 
    isCartOpen, 
    setIsCartOpen 
  } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress) {
      alert('Please enter your name and delivery address.');
      return;
    }
    const phone = '94769410682';
    const itemsText = cart.map(item => `• ${item.title} (x${item.quantity}) - LKR ${(item.price * 300 * item.quantity).toLocaleString()}`).join('\n');
    const totalLKR = cartTotal * 300;
    const text = `Hello Lunora Candles! I'd like to place an order:\n\n${itemsText}\n\nTotal: LKR ${totalLKR.toLocaleString()}\n\nDelivery:\nName: ${shippingName}\nAddress: ${shippingAddress}\n\nPlease confirm. Thank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 w-full bg-sand-50/95 backdrop-blur-sm border-b border-sand-200">
        <div className="container mx-auto flex h-16 items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="relative h-8 w-8 rounded-full overflow-hidden border border-sand-300">
              <Image src="/logo.jpg" alt="Lunora" fill className="object-cover" priority />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm tracking-[0.25em] font-semibold text-ink-600 uppercase">Lunora</span>
              <span className="font-ui text-[8px] tracking-[0.3em] text-terra-400 font-medium uppercase">Candles</span>
            </div>
          </Link>

          {/* Desktop Nav — Centered */}
          <nav className="hidden lg:flex items-center gap-7 flex-1 justify-center">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-ui text-[11px] uppercase tracking-[0.14em] font-medium transition-colors pb-0.5 ${
                    isActive
                      ? 'text-ink-600 border-b border-ink-500'
                      : 'text-ink-400 hover:text-ink-600'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href="/shop"
              className="p-2 text-ink-400 hover:text-ink-600 transition-colors hidden lg:flex"
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/shop"
              className="p-2 text-ink-400 hover:text-ink-600 transition-colors hidden lg:flex"
              aria-label="Wishlist"
            >
              <HeartIcon className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/admin"
              className="p-2 text-ink-400 hover:text-ink-600 transition-colors hidden lg:flex"
              aria-label="Account"
            >
              <UserIcon className="h-4.5 w-4.5" />
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ink-400 hover:text-ink-600 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-terra-300 text-[9px] font-bold text-white font-ui">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-ink-400 hover:text-ink-600 transition-colors lg:hidden"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-sand-200 bg-sand-50 py-5 px-6 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-ui text-xs uppercase tracking-widest py-2.5 px-3 rounded-lg transition-all ${
                      isActive ? 'bg-terra-100 text-terra-500' : 'text-ink-500 hover:bg-sand-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </header>

      {/* ── Cart Drawer ── */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-ink-700/30 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-md bg-sand-50 flex flex-col h-full border-l border-sand-200 shadow-lg">
              {/* Header */}
              <div className="px-6 py-5 border-b border-sand-200 bg-white flex items-center justify-between">
                <div>
                  <h2 className="text-display text-xl text-ink-600">Shopping Cart</h2>
                  <p className="label-caps mt-0.5">{cartCount} item{cartCount !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="text-ink-300 hover:text-ink-600 transition-colors">
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-20">
                    <ShoppingBagIcon className="h-14 w-14 text-sand-300" />
                    <div>
                      <p className="text-display text-lg text-ink-600">Your cart is empty</p>
                      <p className="label-caps mt-1">Add some candles to start</p>
                    </div>
                    <Link href="/shop" onClick={() => setIsCartOpen(false)} className="btn btn-outline mt-2">
                      Browse Shop
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-white border border-sand-200 rounded-xl">
                      <div className="relative h-18 w-18 flex-shrink-0 overflow-hidden rounded-lg border border-sand-200 bg-sand-100">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display text-sm text-ink-600">{item.title}</h4>
                          <p className="font-ui text-xs text-terra-400 font-medium mt-0.5">
                            LKR {(item.price * 300).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-sand-300 rounded-lg overflow-hidden bg-sand-50">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 px-2 text-ink-400 hover:bg-sand-200 transition-colors">
                              <MinusIcon className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-medium text-ink-600">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 px-2 text-ink-400 hover:bg-sand-200 transition-colors">
                              <PlusIcon className="h-3 w-3" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-ink-300 hover:text-terra-400 p-1 transition-colors">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer checkout */}
              {cart.length > 0 && (
                <div className="border-t border-sand-200 bg-white px-6 py-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="label-caps">Subtotal</span>
                    <span className="font-ui text-base font-semibold text-ink-600">
                      LKR {(cartTotal * 300).toLocaleString()}
                    </span>
                  </div>
                  <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                      className="input text-sm"
                    />
                    <textarea
                      required
                      rows={2}
                      placeholder="Delivery address"
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="input text-sm resize-none"
                    />
                    <button type="submit" className="w-full btn btn-primary">
                      Order via WhatsApp
                    </button>
                  </form>
                  <p className="label-caps text-center">Delivery 2–4 business days island-wide</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
