import AdminSidebar from '@/app/admin/Sidebar'; // Ensure you have the Sidebar component created

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* 1. The Sidebar stays fixed on the left */}
      <AdminSidebar />
      
      {/* 2. The Page Content is pushed to the right */}
      <main className="flex-1 ml-64"> 
        {children}
      </main>
    </div>
  );
}