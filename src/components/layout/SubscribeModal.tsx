'use client';

import { useState } from 'react';
// FIX: Import the older function name
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { X, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  // Create Supabase client using public env variables
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    )
  );
  
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email }]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('You are already subscribed!');
        }
        throw error;
      }

      setStatus('success');
      setEmail('');
      
      setTimeout(() => {
        onClose();
        setStatus('idle');
      }, 3000);

    } catch (err: unknown) {
      setStatus('error');
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Something went wrong. Try again.';
      setErrorMessage(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail size={24} />
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">Join Capital News</h2>
          <p className="text-slate-500 mt-2">Get the latest stories and breaking news delivered straight to your inbox.</p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-6">
            <div className="text-green-500 mb-2 flex justify-center"><CheckCircle size={48} /></div>
            <h3 className="text-xl font-bold text-slate-900">You&apos;re Subscribed!</h3>
            <p className="text-slate-500">Thank you for joining our community.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label htmlFor="sub-email" className="sr-only">Email Address</label>
              <input
                id="sub-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:outline-none transition-all"
                disabled={status === 'loading'}
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Processing...' : 'Subscribe Now'}
            </button>
            
            <p className="text-xs text-center text-slate-400 mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}