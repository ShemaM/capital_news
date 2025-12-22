'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// 1. Import the database client
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Loader2, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  // 2. Initialize Supabase
  const [supabase] = useState(() => createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string));
  
  // 3. State to capture what the user types
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 4. The Logic to run when "Sign In" is clicked
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Success! Refresh and redirect
      router.refresh(); 
      router.push('/admin');

    } catch (error: unknown) {
      if (error instanceof Error && error.message) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error) || 'Invalid login credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-slate-100">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-black font-serif text-slate-900">Sign in</h2>
          <p className="mt-2 text-sm text-slate-600">
            Access your saved articles and preferences
          </p>
        </div>

        {/* ERROR MESSAGE DISPLAY */}
        {errorMsg && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-bold">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                required 
                // BINDING STATE
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" 
                placeholder="Email address" 
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                required 
                // BINDING STATE
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm" 
                placeholder="Password" 
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent text-sm font-bold rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin h-4 w-4" />}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
          
          {/*<div className="flex items-center justify-between text-sm">
            <Link href="/register" className="font-medium text-red-600 hover:text-red-500">
              Create an account
            </Link>
            <a href="#" className="font-medium text-slate-500 hover:text-slate-900">
              Forgot password?
            </a>
          </div>
          */} 
        </form>
      </div>
    </div>
  );
}