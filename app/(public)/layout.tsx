import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import PageTransition from '@/components/public/PageTransition';
import WhatsAppButton from '@/components/public/WhatsAppButton';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <main className="flex-grow flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
