import React from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'What wax do you use in your candles?',
    a: 'We use 100% natural soy wax sourced from sustainable soy farms. It is completely free from paraffin, toxic petroleum, animal by-products, and chemical binders. This ensures a clean, soot-free burn that is safe for children, pets, and the environment.',
  },
  {
    q: 'Why do you use wooden wicks?',
    a: 'We use organic wooden wicks that emit a gentle crackling sound, reminiscent of a cozy wood fireplace. Wooden wicks also produce a wider heat pool, allowing the fragrance to diffuse more effectively and cleanly into your space compared to standard cotton wicks.',
  },
  {
    q: 'How long does a Lunora Candle burn?',
    a: 'Our signature amber jar candles burn for approximately 40 to 45 hours, provided the wick is kept trimmed to 1/4 inch and burn sessions do not exceed 4 hours at a time.',
  },
  {
    q: 'Do you deliver island-wide in Sri Lanka?',
    a: 'Yes, we offer reliable island-wide delivery. Delivery is free for orders over LKR 8,000. For orders below LKR 8,000, a flat delivery fee of LKR 450 is applied. Delivery to Galle and nearby coastal towns usually takes 1-2 days, while island-wide shipping takes 2-4 business days.',
  },
  {
    q: 'Can I order custom favors for weddings or corporate events?',
    a: 'Absolutely! We specialize in custom-scented candle favors with bespoke label designs for weddings, birthdays, hotels, villas, and corporate events. Please visit our Custom Orders page to submit an inquiry and get a customized quote.',
  },
  {
    q: 'How do I prevent my candle from tunneling?',
    a: 'The first burn is critical! When lighting your candle for the first time, allow it to burn for 2 to 3 hours until the melted wax pool reaches the very edges of the glass jar. This sets the soy wax memory, ensuring it burns flat and evenly for all future lights.',
  },
];

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700">Frequently Asked Questions</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Everything you need to know about our craft and orders</p>
        <div className="divider-gold" />
      </div>

      {/* Accordions */}
      <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl shadow-sm divide-y divide-cream-200">
        {FAQS.map((faq, idx) => (
          <details key={idx} className="group py-5 cursor-pointer outline-none">
            <summary className="flex justify-between items-center font-display text-base sm:text-lg font-semibold text-charcoal-700 list-none outline-none">
              <span>{faq.q}</span>
              <span className="text-gold-400 group-open:rotate-180 transition-transform duration-200">&darr;</span>
            </summary>
            <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed font-body mt-3 pl-1 group-open:animate-fade-in">
              {faq.a}
            </p>
          </details>
        ))}
      </div>

      {/* Support CTA */}
      <div className="text-center space-y-4 pt-6">
        <p className="text-xs text-charcoal-400 font-body">Still have a question? We are happy to help.</p>
        <Link href="/contact" className="btn btn-primary text-xs tracking-widest uppercase">
          Contact Our Team
        </Link>
      </div>

    </div>
  );
}
