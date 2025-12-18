import { UserCog, Shield, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 font-serif">System Settings</h1>
        <p className="text-slate-500 font-medium">Configure roles, permissions, and site defaults</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ADMIN PROFILE */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-16 w-16 bg-slate-900 rounded-full flex items-center justify-center text-white text-2xl font-black">A</div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Admin User</h2>
              <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold uppercase">Super Admin</span>
            </div>
          </div>
          <form className="space-y-4">
            <div>
              <label htmlFor="displayName" className="block text-xs font-bold uppercase text-slate-500 mb-2">Display Name</label>
              <input id="displayName" name="displayName" type="text" title="Display Name" placeholder="Display name" className="w-full p-3 border rounded-lg" defaultValue="Capital News Desk" />
            </div>
            <div>
              <label htmlFor="emailAddress" className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
              <input id="emailAddress" name="email" type="email" title="Email Address" placeholder="admin@capitalnews.org" className="w-full p-3 border rounded-lg" defaultValue="admin@capitalnews.org" />
            </div>
            <button type="submit" className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold uppercase text-xs tracking-wider">Update Profile</button>
          </form>
        </div>

        {/* ROLE MANAGEMENT */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" /> Active Roles
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-bold text-slate-900">Super Admin</p>
                  <p className="text-xs text-slate-500">Full access to database & logs</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3">
                <UserCog className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-bold text-slate-900">Editor</p>
                  <p className="text-xs text-slate-500">Can publish & edit articles</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">2 Users</span>
            </div>
          </div>
        </div>

        {/* SITE CONFIG */}
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-500" /> Feature Toggles
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
             <ToggleCard title="Public Comments" description="Allow users to comment on stories" active={false} />
             <ToggleCard title="Maintenance Mode" description="Take the site offline" active={false} />
             <ToggleCard title="Auto-Publishing" description="Schedule posts for later" active={true} />
          </div>
        </div>

      </div>
    </div>
  );
}

type ToggleCardProps = {
  title: string;
  description: string;
  active: boolean;
}

function ToggleCard({ title, description, active }: ToggleCardProps) {
  return (
    <div className="p-4 border rounded-lg flex justify-between items-start">
      <div>
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>
      <div className={`w-10 h-6 rounded-full p-1 transition-colors ${active ? 'bg-emerald-500' : 'bg-slate-200'}`}>
        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${active ? 'translate-x-4' : 'translate-x-0'}`}></div>
      </div>
    </div>
  )
}