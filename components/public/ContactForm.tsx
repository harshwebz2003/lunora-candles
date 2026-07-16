'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await axios.post('/api/inquiries', {
        name,
        email,
        phone,
        message,
      });

      if (res.data.success) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success && (
        <div className="bg-sage-100 border border-sage-200 text-sage-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ✓ Message sent successfully! Our Galle studio team will get back to you shortly.
        </div>
      )}
      
      {error && (
        <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-4 rounded-xl font-ui font-semibold animate-fade-in">
          ⚠️ {error}
        </div>
      )}

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
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
        <div>
          <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
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
      </div>

      <div>
        <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">
          Your Message *
        </label>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="input text-xs"
          placeholder="How can we help? Inquire about fragrances, order status, or wholesale deals..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full btn btn-primary py-2.5 text-xs tracking-widest uppercase disabled:opacity-50"
      >
        {loading ? 'Sending message...' : 'Send Message'}
      </button>
    </form>
  );
}
