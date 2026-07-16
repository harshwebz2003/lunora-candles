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
  MinusIcon
} from '@heroicons/react/24/outline';

const NAV_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/scent-finder', label: 'Scent Quiz' },
  { href: '/fragrance-guide', label: 'Fragrances' },
  { href: '/candle-care', label: 'Candle Care' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/custom-orders', label: 'Custom Orders' },
  { href: '/contact', label: 'Contact' },
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

  // Form details for checkout
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress) {
      alert('Please enter your name and delivery address.');
      return;
    }

    const phone = '94769410682'; // Lunora Candles WhatsApp number
    let itemsText = cart.map(item => `• ${item.title} (x${item.quantity}) - LKR ${(item.price * 300 * item.quantity).toLocaleString()}`).join('\n');
    
    // Convert USD prices in db to LKR (assume 300 LKR = 1 USD for Sri Lankan Rupees)
    const totalLKR = cartTotal * 300;
    
    const text = `Hello Lunora Candles! I'd like to place an order:

${itemsText}

Total: LKR ${totalLKR.toLocaleString()}

Delivery Details:
Name: ${shippingName}
Address: ${shippingAddress}

Please confirm my order. Thank you!`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encodedText}`, '_blank');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-cream-50/90 backdrop-blur-md border-b border-cream-300 transition-all duration-200 shadow-sm">
        <div className="container mx-auto flex h-20 items-center justify-between">
          {/* Logo / Brand Name */}
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold-300">
              <Image 
                src="/logo.jpg" 
                alt="Lunora Candles Logo" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl tracking-widest font-semibold text-charcoal-700 leading-none">LUNORA</span>
              <span className="font-ui text-[9px] tracking-[0.3em] text-gold-400 font-medium uppercase mt-1">C A N D L E S</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-ui text-xs uppercase tracking-widest font-medium transition-colors hover:text-gold-400 ${
                    isActive ? 'text-gold-400 border-b border-gold-300 pb-1' : 'text-charcoal-500'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Cart Icon & Mobile Menu Toggler */}
          <div className="flex items-center gap-4">
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full border border-cream-300 bg-white hover:border-gold-300 transition-colors text-charcoal-600 hover:text-gold-400"
              aria-label="Open Cart"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-300 text-[10px] font-bold text-charcoal-700 font-ui shadow-glow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-full border border-cream-300 bg-white hover:border-gold-300 transition-colors text-charcoal-600 hover:text-gold-400 xl:hidden"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-cream-50 border-t border-cream-200 py-6 px-4 animate-fade-in shadow-md">
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`font-ui text-sm uppercase tracking-widest font-medium py-2 px-3 rounded-lg transition-all ${
                      isActive ? 'bg-gold-100 text-gold-500' : 'text-charcoal-500 hover:bg-cream-100'
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

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-charcoal-700/40 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-cream-50 shadow-xl flex flex-col h-full border-l border-cream-300">
              {/* Drawer Header */}
              <div className="px-6 py-6 border-b border-cream-300 bg-white flex items-center justify-between">
                <h2 className="text-xl font-display font-semibold text-charcoal-700">Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-charcoal-400 hover:text-charcoal-600">
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Cart Content */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                    <ShoppingBagIcon className="h-16 w-16 text-cream-300" />
                    <div>
                      <p className="font-display text-lg font-semibold text-charcoal-600">Your cart is empty</p>
                      <p className="text-xs text-charcoal-400 mt-1">Add beautiful candles to start shopping.</p>
                    </div>
                    <Link href="/shop" onClick={() => setIsCartOpen(false)} className="btn btn-primary text-xs tracking-widest mt-4">
                      Browse Shop
                    </Link>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-3 bg-white border border-cream-200 rounded-xl">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-cream-200 bg-cream-50">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-display font-semibold text-charcoal-700 text-sm">{item.title}</h4>
                          <p className="text-xs font-ui text-gold-400 font-bold mt-1">
                            LKR ${(item.price * 300).toLocaleString()}
                          </p>
                        </div>
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-cream-300 rounded-lg overflow-hidden bg-cream-50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2 text-charcoal-500 hover:bg-cream-200"
                            >
                              <MinusIcon className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-xs font-bold text-charcoal-600">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 text-charcoal-500 hover:bg-cream-200"
                            >
                              <PlusIcon className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-charcoal-300 hover:text-rose-400 p-1 transition-colors"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout */}
              {cart.length > 0 && (
                <div className="border-t border-cream-300 bg-white px-6 py-6 space-y-4 shadow-[0_-4px_12px_rgba(60,40,20,0.04)]">
                  <div className="flex justify-between items-center text-charcoal-700">
                    <span className="text-xs font-ui uppercase tracking-wider font-semibold text-charcoal-400">Subtotal</span>
                    <span className="text-lg font-ui font-bold text-gold-500">
                      LKR ${(cartTotal * 300).toLocaleString()}
                    </span>
                  </div>
                  
                  {/* WhatsApp Checkout Form */}
                  <form onSubmit={handleWhatsAppCheckout} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ruwan Kumara"
                        value={shippingName}
                        onChange={(e) => setShippingName(e.target.value)}
                        className="input text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
                        Delivery Address
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="e.g. 47/2 Galle Road, Colombo 3"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="input text-xs resize-none"
                      />
                    </div>
                    <button type="submit" className="w-full btn btn-primary py-3 text-xs tracking-widest mt-2">
                      Order via WhatsApp
                    </button>
                  </form>
                  <p className="text-[10px] text-center text-charcoal-400 leading-normal">
                    * Orders are completed and confirmed via WhatsApp chat. Delivery usually takes 2-4 business days.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
