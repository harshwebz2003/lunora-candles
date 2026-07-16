import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';

export const revalidate = 0;

export default async function BlogListingPage() {
  const blogs = await db.blogPost.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true },
  });

  return (
    <div className="container mx-auto px-4 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="text-display text-4xl sm:text-5xl font-light text-ink-600">Studio Journals</h1>
        <p className="text-xs font-ui uppercase tracking-widest text-terra-400">Insights into scent craft, lifestyle, and candle care</p>
        <div className="divider-gold" />
      </div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-20 bg-white border border-sand-200 rounded-2xl">
          <p className="font-display text-lg text-ink-500">No blog posts published yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogs.map((blog) => (
            <div 
              key={blog.id} 
              className="bg-white border border-sand-200 rounded-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between group shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-ui uppercase tracking-wider text-terra-400 font-bold">
                  {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink-600 leading-snug">
                  <Link href={`/blog/${blog.slug}`} className="hover:text-terra-400 transition-colors">
                    {blog.title}
                  </Link>
                </h3>
              </div>
              <div className="pt-6 border-t border-cream-100 mt-6 flex justify-between items-center">
                <span className="text-[10px] font-ui text-ink-400 uppercase tracking-widest">
                  By {blog.author.name || 'Admin'}
                </span>
                <Link 
                  href={`/blog/${blog.slug}`} 
                  className="text-xs font-ui uppercase font-bold tracking-wider text-terra-400 hover:text-terra-500 transition-colors flex items-center gap-1"
                >
                  Read Article &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
