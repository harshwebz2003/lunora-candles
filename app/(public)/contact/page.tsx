import React from 'react';
import ContactForm from '@/components/public/ContactForm';

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl space-y-16">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-charcoal-700">Contact Us</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-gold-400">Get in touch with our Galle studio team</p>
        <div className="divider-gold" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Contact Info */}
        <div className="space-y-8 bg-white border border-cream-200 p-8 rounded-2xl shadow-sm">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-charcoal-700">The Galle Studio</h2>
            <p className="text-xs text-charcoal-400 font-body">Pop in to smell our fragrances or pick up your orders in person.</p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body">
            <div>
              <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">Address:</strong>
              <p>
                No.470/B, Matara Rd, Dowata,<br />
                Galle, Sri Lanka 80000
              </p>
            </div>
            <div>
              <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">WhatsApp & Call:</strong>
              <a href="https://wa.me/94769410682" className="text-gold-500 hover:text-gold-400 font-bold">+94 76 941 0682</a>
            </div>
            <div>
              <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">Email Support:</strong>
              <a href="mailto:lunoracandles.info@gmail.com" className="text-gold-500 hover:text-gold-400 font-bold">lunoracandles.info@gmail.com</a>
            </div>
            <div>
              <strong className="block text-[9px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-1">Studio Hours:</strong>
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p className="text-cream-300 italic text-[11px] mt-1">* Closed on Sundays & Poya Days</p>
            </div>
          </div>
        </div>

        {/* Contact Form Card */}
        <div className="bg-white border border-cream-200 p-8 rounded-2xl shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="font-display text-2xl font-semibold text-charcoal-700">Send Us a Message</h2>
            <p className="text-xs text-charcoal-400 font-body">Have a general question or inquiry? Fill out the form and we will reply promptly.</p>
          </div>
          <ContactForm />
        </div>

      </div>

    </div>
  );
}
