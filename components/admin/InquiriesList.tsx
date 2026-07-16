'use client';

import React, { useState } from 'react';
import axios from 'axios';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

export default function InquiriesList({ initialInquiries }: { initialInquiries: Inquiry[] }) {
  const [list, setList] = useState<Inquiry[]>(initialInquiries);
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleUpdateStatus = async (id: number, status: string) => {
    setLoadingId(id);
    try {
      const res = await axios.patch(`/api/admin/inquiries/${id}`, { status });
      if (res.data.success) {
        setList((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status } : i))
        );
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    setLoadingId(id);
    try {
      const res = await axios.delete(`/api/admin/inquiries/${id}`);
      if (res.data.success) {
        setList((prev) => prev.filter((i) => i.id !== id));
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete inquiry.');
    } finally {
      setLoadingId(null);
    }
  };

  if (list.length === 0) {
    return (
      <div className="bg-white border border-cream-200 p-8 rounded-2xl text-center">
        <p className="text-xs text-charcoal-400 font-body">No customer inquiries received yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((inq) => (
        <div 
          key={inq.id} 
          className={`bg-white border border-cream-200 p-6 rounded-2xl flex flex-col justify-between gap-4 shadow-sm ${
            inq.status === 'PENDING' ? 'border-l-4 border-l-gold-400' : ''
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cream-100 pb-3">
            <div className="space-y-0.5">
              <span className="font-ui text-xs font-bold text-charcoal-700 uppercase tracking-wide">
                {inq.name}
              </span>
              <div className="text-[10px] text-charcoal-400 font-body flex gap-3">
                <span>Email: {inq.email}</span>
                {inq.phone && <span>Phone: {inq.phone}</span>}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`badge ${
                inq.status === 'PENDING' 
                  ? 'badge-gold' 
                  : inq.status === 'READ' 
                  ? 'badge-sage' 
                  : 'badge-charcoal'
              } text-[8px]`}>
                {inq.status}
              </span>
              <span className="text-[9px] text-charcoal-300 font-ui">
                {new Date(inq.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-charcoal-500 font-body leading-relaxed whitespace-pre-wrap pl-1">
            {inq.message}
          </div>

          <div className="flex gap-3 justify-end border-t border-cream-100 pt-3 flex-wrap">
            {inq.status === 'PENDING' && (
              <button
                disabled={loadingId === inq.id}
                onClick={() => handleUpdateStatus(inq.id, 'READ')}
                className="btn btn-primary py-2 px-4 text-[10px] tracking-widest uppercase disabled:opacity-50"
              >
                Mark Read
              </button>
            )}
            {inq.status !== 'CLOSED' && (
              <button
                disabled={loadingId === inq.id}
                onClick={() => handleUpdateStatus(inq.id, 'CLOSED')}
                className="btn btn-dark py-2 px-4 text-[10px] tracking-widest uppercase disabled:opacity-50"
              >
                Close Inquiry
              </button>
            )}
            <button
              disabled={loadingId === inq.id}
              onClick={() => handleDelete(inq.id)}
              className="btn btn-outline text-rose-400 border-rose-400 hover:bg-rose-500/10 py-2 px-4 text-[10px] tracking-widest uppercase disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
