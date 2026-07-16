import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { 
  ShoppingBagIcon, 
  DocumentTextIcon, 
  ChatBubbleLeftRightIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/outline';

export const revalidate = 0;

export default async function AdminDashboard() {
  const [
    productsCount,
    blogsCount,
    testimonialsCount,
    pendingTestimonialsCount,
    inquiriesCount,
    pendingInquiriesCount,
    recentInquiries
  ] = await Promise.all([
    db.product.count(),
    db.blogPost.count(),
    db.testimonial.count(),
    db.testimonial.count({ where: { approved: false } }),
    db.inquiry.count(),
    db.inquiry.count({ where: { status: 'PENDING' } }),
    db.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Welcome Header */}
      <div>
        <h1 className="text-display text-3xl font-light text-charcoal-700">Dashboard Overview</h1>
        <p className="text-xs text-charcoal-400 mt-1">Real-time studio statistics and pending actions.</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Products Stat */}
        <div className="bg-white border border-cream-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Total Products</span>
            <p className="font-ui text-3xl font-bold text-charcoal-700">{productsCount}</p>
          </div>
          <div className="p-3 bg-gold-100 rounded-xl text-gold-500">
            <ShoppingBagIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Blogs Stat */}
        <div className="bg-white border border-cream-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Blog Articles</span>
            <p className="font-ui text-3xl font-bold text-charcoal-700">{blogsCount}</p>
          </div>
          <div className="p-3 bg-gold-100 rounded-xl text-gold-500">
            <DocumentTextIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Testimonials Stat */}
        <div className="bg-white border border-cream-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Testimonials</span>
            <div className="flex items-baseline gap-2">
              <p className="font-ui text-3xl font-bold text-charcoal-700">{testimonialsCount}</p>
              {pendingTestimonialsCount > 0 && (
                <span className="text-[10px] font-ui font-bold text-rose-400">({pendingTestimonialsCount} pending)</span>
              )}
            </div>
          </div>
          <div className="p-3 bg-gold-100 rounded-xl text-gold-500">
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          </div>
        </div>

        {/* Inquiries Stat */}
        <div className="bg-white border border-cream-200 p-6 rounded-2xl flex items-center justify-between shadow-sm">
          <div className="space-y-2">
            <span className="text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">Total Inquiries</span>
            <div className="flex items-baseline gap-2">
              <p className="font-ui text-3xl font-bold text-charcoal-700">{inquiriesCount}</p>
              {pendingInquiriesCount > 0 && (
                <span className="text-[10px] font-ui font-bold text-rose-400">({pendingInquiriesCount} new)</span>
              )}
            </div>
          </div>
          <div className="p-3 bg-gold-100 rounded-xl text-gold-500">
            <EnvelopeIcon className="h-6 w-6" />
          </div>
        </div>

      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 bg-white border border-cream-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-cream-100 pb-4">
            <h3 className="font-display text-lg font-semibold text-charcoal-700">Recent Customer Inquiries</h3>
            <Link href="/admin/inquiries" className="text-xs font-ui uppercase font-bold tracking-wider text-gold-400 hover:text-gold-500 transition-colors">
              Manage Inquiries &rarr;
            </Link>
          </div>

          {recentInquiries.length === 0 ? (
            <p className="text-xs text-charcoal-400 py-6 text-center font-body">No inquiries received yet.</p>
          ) : (
            <div className="divide-y divide-cream-100">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-charcoal-700">{inq.name}</span>
                      <span className="text-[9px] font-ui text-charcoal-400">({inq.email})</span>
                    </div>
                    <p className="text-xs text-charcoal-400 font-body line-clamp-1 leading-relaxed">{inq.message}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`badge ${inq.status === 'PENDING' ? 'badge-gold' : 'badge-charcoal'} text-[8px]`}>
                      {inq.status}
                    </span>
                    <span className="text-[9px] text-charcoal-300 font-ui">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white border border-cream-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-cream-100 pb-4">
            <h3 className="font-display text-lg font-semibold text-charcoal-700">Quick Tools</h3>
          </div>
          
          <div className="flex flex-col gap-3">
            <Link href="/admin/products" className="btn btn-outline text-xs tracking-widest text-center uppercase py-3">
              Add New Product
            </Link>
            <Link href="/admin/blog" className="btn btn-outline text-xs tracking-widest text-center uppercase py-3">
              Write Blog Article
            </Link>
            {pendingTestimonialsCount > 0 && (
              <Link href="/admin/testimonials" className="btn btn-dark text-xs tracking-widest text-center uppercase py-3 bg-gold-400 hover:bg-gold-500 border-gold-400 text-charcoal-700">
                Approve Reviews ({pendingTestimonialsCount})
              </Link>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
