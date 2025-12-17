import { latestArticles } from '@/lib/placeholder-data'; // We use mock data for the UI preview

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-black font-serif text-slate-900 mb-8">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Posts</h3>
          <p className="text-4xl font-black text-slate-900">12</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Total Views</h3>
          <p className="text-4xl font-black text-slate-900">45.2k</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-slate-500 text-sm font-bold uppercase tracking-wider mb-2">Subscribers</h3>
          <p className="text-4xl font-black text-slate-900">890</p>
        </div>
      </div>

      {/* Recent Posts Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900">Recent Stories</h3>
          <button className="text-sm text-red-600 font-bold hover:underline">View All</button>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {latestArticles.map((article) => (
              <tr key={article.id} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{article.title}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase rounded-full">
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-green-600 font-bold">Published</td>
                <td className="px-6 py-4 text-slate-500">{new Date(article.publishedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}