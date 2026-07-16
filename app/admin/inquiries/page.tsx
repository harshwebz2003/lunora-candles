import React from 'react';
import { db } from '@/lib/db';
import InquiriesList from '@/components/admin/InquiriesList';

export const revalidate = 0;

export default async function AdminInquiriesPage() {
  const inquiries = await db.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-display text-3xl font-light text-charcoal-700">Studio Inquiries</h1>
        <p className="text-xs text-charcoal-400 mt-1">Manage contact inquiries and custom wholesale / wedding orders.</p>
      </div>

      <InquiriesList initialInquiries={inquiries} />
    </div>
  );
}
