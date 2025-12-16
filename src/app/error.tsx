'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-4 text-center px-4">
      <h2 className="text-3xl font-black font-serif text-slate-900">Something went wrong!</h2>
      <p className="text-slate-600 max-w-md">
        We encountered an unexpected error while loading this page. Our team has been notified.
      </p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded-full bg-slate-900 px-6 py-2 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}