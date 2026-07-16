'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function CustomOrderForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('wedding');
  const [qty, setQty] = useState('50-100');
  const [scent, setScent] = useState('lavender');
  const [details, setDetails] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const fullMessage = `Custom Order Request:
- Event Type: ${eventType}
- Quantity: ${qty}
- Scent Preference: ${scent}
- Additional Details: ${details}`;

      const res = await axios.post('/api/inquiries', {
        name,
        email,
        phone,
        message: fullMessage,
      });

      if (res.data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setDetails('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {success && (
        <div className="bg-sage-100 border border-sage-200 text-sage-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ✓ Thank you! Your custom order inquiry has been received. Our Galle studio team will get back to you within 24 hours.
        </div>
      )}
      
      {error && (
        <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Your Name *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input text-xs"
            placeholder="e.g. Ruwan Kumara"
          />
        </div>
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input text-xs"
            placeholder="e.g. ruwan@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input text-xs"
            placeholder="e.g. +94 76 941 0682"
          />
        </div>
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Event / Order Type
          </label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="input text-xs bg-cream-50"
          >
            <option value="wedding">Wedding Favors</option>
            <option value="corporate">Corporate Gifting</option>
            <option value="hotel">Hotel / Villa Aromatics</option>
            <option value="birthday">Private Parties & Birthdays</option>
            <option value="other">Other / Custom Wholesale</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Estimated Quantity
          </label>
          <select
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="input text-xs bg-cream-50"
          >
            <option value="20-50">20 to 50 jars</option>
            <option value="50-100">50 to 100 jars</option>
            <option value="100-250">100 to 250 jars</option>
            <option value="250+">More than 250 jars</option>
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
            Preferred Scent Category
          </label>
          <select
            value={scent}
            onChange={(e) => setScent(e.target.value)}
            className="input text-xs bg-cream-50"
          >
            <option value="lavender">Calming & Floral (Lavender, Rose)</option>
            <option value="vanilla">Warm & Sweet (Vanilla, Amberwood)</option>
            <option value="cinnamon">Spicy & Festive (Cinnamon, Clove)</option>
            <option value="sage">Earthy & Coastal (Sage, Sea Salt)</option>
            <option value="undecided">Help me choose (Assorted / Custom)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
          Design Details & Customization Requests *
        </label>
        <textarea
          required
          rows={5}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="input text-xs"
          placeholder="Please describe your color theme, custom logo sticker requirements, delivery date, and any specific packaging details..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn btn-primary py-3 text-xs tracking-widest uppercase disabled:opacity-50"
      >
        {loading ? 'Submitting request...' : 'Submit Custom Order Request'}
      </button>
    </form>
  );
}
