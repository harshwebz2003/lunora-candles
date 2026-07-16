import React from 'react';
import AnnouncementBar from '@/components/public/AnnouncementBar';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import PageTransition from '@/components/public/PageTransition';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow flex flex-col">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
