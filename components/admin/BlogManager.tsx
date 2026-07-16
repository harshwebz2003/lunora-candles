'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  createdAt: Date;
  author: { name: string | null };
}

export default function BlogManager({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [list, setList] = useState<BlogPost[]>(initialBlogs);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Add Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');

  const [formError, setFormError] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');

    try {
      // Build a simple paragraphs JSON structure for content compatibility
      const paragraphs = content.split('\n').filter(p => p.trim() !== '').map(p => ({
        type: 'paragraph',
        children: p.trim()
      }));

      const res = await axios.post('/api/admin/blogs', {
        title,
        slug,
        content: JSON.stringify(paragraphs),
      });

      if (res.data.success) {
        window.location.reload();
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.response?.data?.message || 'Failed to publish article.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      const res = await axios.delete(`/api/admin/blogs/${id}`);
      if (res.data.success) {
        setList((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete article.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex justify-between items-center bg-white border border-cream-200 p-4 rounded-xl shadow-sm">
        <span className="text-xs font-ui text-charcoal-400 font-bold uppercase">Actions</span>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-primary py-2 px-4 text-xs tracking-widest uppercase"
        >
          {showAddForm ? 'Close Form' : 'Write New Article'}
        </button>
      </div>

      {/* Add Blog Form Panel */}
      {showAddForm && (
        <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl shadow-sm animate-fade-in space-y-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-charcoal-700">Write Studio Journal</h3>
            <p className="text-xs text-charcoal-400 font-body">Publish a new article to the public studio journals feed.</p>
          </div>

          <form onSubmit={handleAddBlog} className="space-y-6">
            {formError && (
              <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-3 rounded-xl font-ui font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  className="input text-xs"
                  placeholder="e.g. Caring for your wooden wicks"
                />
              </div>
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Slug * (auto-generated)
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="input text-xs"
                  placeholder="e.g. caring-for-wooden-wicks"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                Article Body Content * (paragraphs separated by newlines)
              </label>
              <textarea
                required
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="input text-xs"
                placeholder="Write your article body here. Hit enter twice to create separate paragraphs..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 text-xs tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Publishing Article...' : 'Publish Article'}
            </button>
          </form>
        </div>
      )}

      {/* Blogs Table */}
      <div className="bg-white border border-cream-200 rounded-2xl shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="p-8 text-center text-charcoal-400 font-body text-xs">
            No blog posts published yet. Write some to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-100/50 border-b border-cream-200 text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">
                  <th className="py-4 px-6">Article</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Published Date</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 text-xs">
                {list.map((blog) => (
                  <tr key={blog.id} className="hover:bg-cream-50/40">
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-ui font-bold text-charcoal-700 block">{blog.title}</span>
                        <span className="text-[10px] text-charcoal-400 font-body block">{blog.slug}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-charcoal-500 font-body">
                      {blog.author.name || 'Admin'}
                    </td>
                    <td className="py-4 px-6 font-ui text-charcoal-600">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="btn btn-outline text-rose-400 border-rose-400 hover:bg-rose-500/10 py-1 px-3 text-[9px] uppercase tracking-wider rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
