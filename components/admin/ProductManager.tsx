'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  fragrance: string | null;
  stock: number;
  images: { id: number; url: string }[];
}

export default function ProductManager({ initialProducts }: { initialProducts: Product[] }) {
  const [list, setList] = useState<Product[]>(initialProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Add Form state
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(25.00);
  const [fragrance, setFragrance] = useState('');
  const [stock, setStock] = useState(10);
  const [imageUrl, setImageUrl] = useState('');

  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFormError('');
    setFormSuccess(false);

    try {
      const res = await axios.post('/api/admin/products', {
        title,
        slug,
        description,
        price: Number(price),
        fragrance,
        stock: Number(stock),
        imageUrl,
      });

      if (res.data.success) {
        // Fetch products list fresh to include relation
        window.location.reload();
      }
    } catch (err: any) {
      console.error(err);
      setFormError(err.response?.data?.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePriceStock = async (id: number, currentPrice: number, currentStock: number) => {
    const newPrice = prompt('Enter new price (USD):', currentPrice.toString());
    if (newPrice === null) return;
    const newStock = prompt('Enter new stock quantity:', currentStock.toString());
    if (newStock === null) return;

    try {
      const res = await axios.patch(`/api/admin/products/${id}`, {
        price: Number(newPrice),
        stock: Number(newStock),
      });

      if (res.data.success) {
        setList((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, price: Number(newPrice), stock: Number(newStock) } : p
          )
        );
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update product details.');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await axios.delete(`/api/admin/products/${id}`);
      if (res.data.success) {
        setList((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete product.');
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
          {showAddForm ? 'Close Form' : 'Add New Product'}
        </button>
      </div>

      {/* Add Product Form Panel */}
      {showAddForm && (
        <div className="bg-white border border-cream-200 p-6 sm:p-8 rounded-2xl shadow-sm animate-fade-in space-y-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-charcoal-700">New Candle Creation</h3>
            <p className="text-xs text-charcoal-400 font-body">Create and publish a new candle product to the online shop.</p>
          </div>

          <form onSubmit={handleAddProduct} className="space-y-6">
            {formError && (
              <div className="bg-rose-100 border border-rose-200 text-rose-400 text-xs p-3 rounded-xl font-ui font-semibold">
                ⚠️ {formError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  className="input text-xs"
                  placeholder="e.g. Lavender breeze"
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
                  placeholder="e.g. lavender-breeze"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Price ($ USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="input text-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Fragrance Blend
                </label>
                <input
                  type="text"
                  value={fragrance}
                  onChange={(e) => setFragrance(e.target.value)}
                  className="input text-xs"
                  placeholder="e.g. Calming Lavender, Chamomile"
                />
              </div>
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Initial Stock *
                </label>
                <input
                  type="number"
                  required
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                  className="input text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                  Product Image URL / Local Path *
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input text-xs"
                  placeholder="e.g. /assets/631734611_17911290213317246_3639787322669815310_n.jpg"
                />
                <span className="text-[9px] text-charcoal-300 font-ui leading-normal mt-1 block">
                  * Put a local asset path (such as one of the pre-seeded files in public/assets/) or a web link.
                </span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold mb-2">
                Detailed Description *
              </label>
              <textarea
                required
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input text-xs"
                placeholder="Describe fragrance highlights, wax volume, safety info..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 text-xs tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Creating Product...' : 'Publish Product'}
            </button>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white border border-cream-200 rounded-2xl shadow-sm overflow-hidden">
        {list.length === 0 ? (
          <div className="p-8 text-center text-charcoal-400 font-body text-xs">
            No products found. Add some to get started.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream-100/50 border-b border-cream-200 text-[10px] font-ui uppercase tracking-wider text-charcoal-400 font-bold">
                  <th className="py-4 px-6">Product</th>
                  <th className="py-4 px-6">Fragrance</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-100 text-xs">
                {list.map((prod) => {
                  const img = prod.images[0]?.url || '/assets/552807669_1339286778208115_6571929007844017528_n.jpg';
                  return (
                    <tr key={prod.id} className="hover:bg-cream-50/40">
                      <td className="py-4 px-6 flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-cream-200 bg-cream-50 flex-shrink-0">
                          <Image src={img} alt={prod.title} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-ui font-bold text-charcoal-700 block">{prod.title}</span>
                          <span className="text-[10px] text-charcoal-400 font-body block">{prod.slug}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-charcoal-500 font-body">
                        {prod.fragrance || '(None)'}
                      </td>
                      <td className="py-4 px-6 font-ui font-bold text-gold-500">
                        LKR ${(prod.price * 300).toLocaleString()}
                      </td>
                      <td className="py-4 px-6 font-ui font-bold text-charcoal-600">
                        {prod.stock} units
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => handleUpdatePriceStock(prod.id, prod.price, prod.stock)}
                          className="btn btn-outline py-1 px-3 text-[9px] uppercase tracking-wider rounded-md"
                        >
                          Edit Details
                        </button>
                        <button
                          onClick={() => handleDelete(prod.id)}
                          className="btn btn-outline text-rose-400 border-rose-400 hover:bg-rose-500/10 py-1 px-3 text-[9px] uppercase tracking-wider rounded-md"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
