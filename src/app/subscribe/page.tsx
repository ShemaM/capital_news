import { Check } from 'lucide-react';

export default function SubscribePage() {
  return (
    <main className="container mx-auto px-4 py-20 max-w-3xl text-center">
      <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-4 block">Support Independent Journalism</span>
      <h1 className="text-5xl font-black font-serif text-slate-900 mb-6">Stay Ahead of the Crisis.</h1>
      <p className="text-xl text-slate-600 mb-10 leading-relaxed">
        Get our daily briefing on the Great Lakes Region delivered straight to your inbox. 
        No noise, just the facts that matter.
      </p>

      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mb-12">
        <form className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 px-6 py-4 rounded-lg border border-slate-300 text-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <button className="bg-red-600 text-white text-lg font-bold px-8 py-4 rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
            Join for Free
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-4">We respect your privacy. Unsubscribe at any time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {[
          "Daily Conflict Updates",
          "Exclusive Interviews",
          "Weekly Analysis"
        ].map((item) => (
          <div key={item} className="flex items-center gap-3">
            <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
              <Check className="h-4 w-4 text-green-600" />
            </div>
            <span className="font-medium text-slate-700">{item}</span>
          </div>
        ))}
      </div>
    </main>
  );
}