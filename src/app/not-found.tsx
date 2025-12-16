import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h2 className="text-4xl font-black font-serif text-slate-900">404: Page Not Found</h2>
      <p className="text-slate-600 max-w-md">
        The article you are looking for might have been removed or is temporarily unavailable.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-full bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}