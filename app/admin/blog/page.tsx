import React from 'react';
import { db } from '@/lib/db';
import BlogManager from '@/components/admin/BlogManager';

export const revalidate = 0;

export default async function AdminBlogPage() {
  const blogs = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-display text-3xl font-light text-charcoal-700">Studio Journal Writer</h1>
        <p className="text-xs text-charcoal-400 mt-1">Publish candle care guides, scent guides, and design updates for customers.</p>
      </div>

      <BlogManager initialBlogs={blogs} />
    </div>
  );
}
