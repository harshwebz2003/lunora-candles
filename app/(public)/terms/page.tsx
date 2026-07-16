import React from 'react';

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8 font-body text-xs sm:text-sm text-charcoal-500 leading-relaxed">
      <h1 className="text-display text-3xl sm:text-5xl font-light text-charcoal-700 text-center mb-6">Terms of Service</h1>
      
      <p className="italic text-charcoal-400">Last updated: July 16, 2026</p>
      
      <p>
        Welcome to Lunora Candles. By accessing our website, purchasing our handcrafted products, or visiting our Galle studio, you agree to be bound by the following terms and conditions. Please read them carefully.
      </p>

      <h2 className="text-display text-xl text-charcoal-700 font-semibold mt-6">1. Handcrafted Product Disclaimer</h2>
      <p>
        Because all Lunora Candles are hand-poured in small batches, slight variations in color, wax texture, or scent throw may occur. These are natural characteristics of 100% soy wax and organic wooden wicks and are not considered product defects.
      </p>

      <h2 className="text-display text-xl text-charcoal-700 font-semibold mt-6">2. Pricing and Payments</h2>
      <p>
        All prices listed on our website are subject to change without notice. Orders placed via our shopping cart are confirmed and completed via WhatsApp. We accept bank transfers and cash on delivery (COD) within Sri Lanka.
      </p>

      <h2 className="text-display text-xl text-charcoal-700 font-semibold mt-6">3. Proper Candle Use & Safety</h2>
      <p>
        It is the customer&apos;s responsibility to burn candles safely. Lunora Candles is not liable for any fire damage, property damage, or physical injury resulting from improper candle burning, unattended burning, or failure to follow the instructions listed on our Candle Care page.
      </p>

      <h2 className="text-display text-xl text-charcoal-700 font-semibold mt-6">4. Contact Information</h2>
      <p>
        For inquiries regarding our terms, please email us at <a href="mailto:lunoracandles.info@gmail.com" className="text-gold-400 font-bold hover:underline">lunoracandles.info@gmail.com</a>.
      </p>
    </div>
  );
}
