import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';

export const revalidate = 0;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const blog = await db.blogPost.findUnique({
    where: { slug },
    include: { author: true },
  });

  if (!blog) {
    notFound();
  }

  // Parse Tiptap JSON or render raw content
  const renderContent = () => {
    try {
      const parsed = JSON.parse(blog.content);
      if (Array.isArray(parsed)) {
        return parsed.map((block: any, idx: number) => {
          if (block.type === 'heading') {
            switch (block.level) {
              case 1:
                return (
                  <h1 key={idx} className="text-display text-3xl sm:text-4xl text-charcoal-700 mt-8 mb-4">
                    {block.children}
                  </h1>
                );
              case 3:
                return (
                  <h3 key={idx} className="text-display text-xl sm:text-2xl text-charcoal-700 mt-6 mb-3">
                    {block.children}
                  </h3>
                );
              case 4:
                return (
                  <h4 key={idx} className="text-display text-lg sm:text-xl text-charcoal-700 mt-4 mb-2">
                    {block.children}
                  </h4>
                );
              case 2:
              default:
                return (
                  <h2 key={idx} className="text-display text-2xl sm:text-3xl text-charcoal-700 mt-8 mb-4">
                    {block.children}
                  </h2>
                );
            }
          }
          return (
            <p key={idx} className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body mb-4">
              {block.children}
            </p>
          );
        });
      }
    } catch (e) {
      // Fallback if not JSON
    }

    return (
      <div 
        className="text-xs sm:text-sm text-charcoal-500 leading-relaxed font-body whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    );
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl space-y-8">
      
      {/* Back Link */}
      <div>
        <Link href="/blog" className="text-xs font-ui uppercase tracking-widest text-charcoal-400 hover:text-gold-400 transition-colors">
          &larr; Back to Journal
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-cream-200 pb-8">
        <span className="text-[10px] font-ui uppercase tracking-wider text-gold-400 font-bold">
          {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
        <h1 className="text-display text-3xl sm:text-5xl font-light text-charcoal-700 leading-tight">
          {blog.title}
        </h1>
        <div className="text-[10px] font-ui text-charcoal-400 uppercase tracking-widest pt-2">
          By {blog.author.name || 'Admin'}
        </div>
      </div>

      {/* Article Content */}
      <article className="prose max-w-none pt-4">
        {renderContent()}
      </article>

    </div>
  );
}
