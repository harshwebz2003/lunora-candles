import React from 'react';

export default function DeliveryPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8 font-body text-xs sm:text-sm text-ink-500 leading-relaxed">
      <h1 className="text-display text-3xl sm:text-5xl font-light text-ink-600 text-center mb-6">Delivery & Return Policies</h1>
      
      <p className="italic text-ink-400">Last updated: July 16, 2026</p>
      
      <h2 className="text-display text-xl text-ink-600 font-semibold mt-6">1. Island-wide Delivery (Sri Lanka)</h2>
      <p>
        We offer delivery throughout Sri Lanka. All orders placed on our website are confirmed via WhatsApp. 
      </p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Free Delivery:</strong> Applied automatically for orders totaling LKR 8,000 or more.</li>
        <li><strong>Standard Shipping:</strong> A flat shipping rate of LKR 450 is charged for orders under LKR 8,000.</li>
        <li><strong>Delivery Times:</strong> Orders within Galle and nearby districts are delivered within 1-2 business days. Island-wide deliveries (Colombo, Kandy, Jaffna, etc.) take between 2 to 4 business days.</li>
      </ul>

      <h2 className="text-display text-xl text-ink-600 font-semibold mt-6">2. Returns and Replacements</h2>
      <p>
        Because our candles are handcrafted and fragile, we do not accept returns or exchanges for change-of-mind purchases. However, we take utmost care in packaging our jars. 
      </p>
      <p>
        If your candle jar arrives broken or damaged during shipping, please take a photo of the package immediately and send it to our WhatsApp support at <a href="https://wa.me/94769410682" className="text-terra-400 font-bold hover:underline">+94 76 941 0682</a> within 24 hours of delivery. We will gladly send you a free replacement candle.
      </p>

      <h2 className="text-display text-xl text-ink-600 font-semibold mt-6">3. Custom Orders</h2>
      <p>
        Please note that custom event favors and wholesale corporate orders require a non-refundable deposit of 50% prior to production. Custom orders cannot be cancelled once production has started.
      </p>
    </div>
  );
}
