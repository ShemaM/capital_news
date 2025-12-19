export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded mb-4"></div>
        <div className="h-4 w-48 bg-slate-100 rounded mb-8"></div>
        <div className="space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex gap-6 border-b border-slate-100 pb-8">
              <div className="w-48 h-32 bg-slate-200 rounded"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}