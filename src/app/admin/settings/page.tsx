'use client';

import { useState } from 'react';
import { Save, Globe, Lock, Bell, Facebook, Twitter, Instagram } from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  
  // Mock State - In the future, this will come from Supabase 'site_settings' table
  const [settings, setSettings] = useState({
    siteName: 'Capital News',
    siteDescription: 'Reporting on the issues that matter in the Great Lakes Region.',
    maintenanceMode: false,
    enableComments: true,
    socials: {
      facebook: 'https://facebook.com/capitalnews',
      twitter: 'https://twitter.com/capitalnews',
      instagram: 'https://instagram.com/capitalnews'
    },
    emailNotifications: true
  });

  const handleSave = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Settings saved successfully!");
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black font-serif text-slate-900">Settings</h1>
          <p className="text-slate-500 text-sm">Manage site configuration and preferences.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors disabled:opacity-70"
        >
          <Save className="h-4 w-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="space-y-8">

        {/* SECTION 1: GENERAL SETTINGS */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Globe className="h-4 w-4 text-slate-500" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">General Information</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="siteName" className="block text-sm font-bold text-slate-700 mb-2">Site Name</label>
              <input 
                id="siteName"
                type="text" 
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 font-serif font-bold text-lg"
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="siteDescription" className="block text-sm font-bold text-slate-700 mb-2">Site Description (SEO)</label>
              <textarea 
                id="siteDescription"
                rows={2}
                value={settings.siteDescription}
                onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-red-600 text-sm"
              ></textarea>
              <p className="text-xs text-slate-400 mt-2">This appears in search engine results.</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: FEATURE FLAGS (TOGGLES) */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Lock className="h-4 w-4 text-slate-500" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Site Controls</h3>
          </div>
          <div className="p-6 space-y-6">
            
            {/* Toggle: Maintenance Mode */}
            <div className="flex items-center justify-between">
              <div>
                <h4 id="maintenanceModeLabel" className="font-bold text-slate-900">Maintenance Mode</h4>
                <p className="text-sm text-slate-500">Hide the site from the public. Only admins can view content.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  aria-labelledby="maintenanceModeLabel"
                  title="Maintenance Mode"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              </label>
            </div>

            <div className="w-full h-px bg-slate-100"></div>

            {/* Toggle: Enable Comments */}
            <div className="flex items-center justify-between">
              <div>
                <h4 id="enableCommentsLabel" className="font-bold text-slate-900">Enable Comments</h4>
                <p className="text-sm text-slate-500">Allow readers to post comments on articles.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  aria-labelledby="enableCommentsLabel"
                  title="Enable Comments"
                  checked={settings.enableComments}
                  onChange={(e) => setSettings({...settings, enableComments: e.target.checked})}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>

          </div>
        </section>

        {/* SECTION 3: SOCIAL MEDIA */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50">
            <Bell className="h-4 w-4 text-slate-500" />
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Social Links</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Facebook className="h-5 w-5 text-blue-600 shrink-0" />
              <input 
                type="text" 
                placeholder="Facebook URL" 
                value={settings.socials.facebook}
                onChange={(e) => setSettings({...settings, socials: {...settings.socials, facebook: e.target.value}})}
                className="w-full px-4 py-2 rounded border border-slate-300 focus:outline-none focus:border-slate-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <Twitter className="h-5 w-5 text-sky-500 shrink-0" />
              <input 
                type="text" 
                placeholder="Twitter / X URL" 
                value={settings.socials.twitter}
                onChange={(e) => setSettings({...settings, socials: {...settings.socials, twitter: e.target.value}})}
                className="w-full px-4 py-2 rounded border border-slate-300 focus:outline-none focus:border-slate-500 text-sm"
              />
            </div>
            <div className="flex items-center gap-4">
              <Instagram className="h-5 w-5 text-pink-600 shrink-0" />
              <input 
                type="text" 
                placeholder="Instagram URL" 
                value={settings.socials.instagram}
                onChange={(e) => setSettings({...settings, socials: {...settings.socials, instagram: e.target.value}})}
                className="w-full px-4 py-2 rounded border border-slate-300 focus:outline-none focus:border-slate-500 text-sm"
              />
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}