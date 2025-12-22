'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';
import { Save, Shield, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '', 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  ));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [profile, setProfile] = useState({
    email: '',
    displayName: '',
  });

  const [toggles, setToggles] = useState({
    public_comments: false,
    maintenance_mode: false,
    auto_publishing: true
  });

  // Fetch Data on Load
  useEffect(() => {
    async function loadSettings() {
      try {
        setLoading(true);
        
        // A. Get User Profile
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
          console.error('Auth error:', userError);
          throw userError;
        }
        
        if (user) {
          setProfile({
            email: user.email || '',
            displayName: user.user_metadata?.full_name || user.user_metadata?.display_name || ''
          });
        }

        // B. Get Site Settings
        const { data: settings, error: settingsError } = await supabase
          .from('site_settings')
          .select('*')
          .eq('id', 1)
          .single();
        
        console.log('Settings data:', settings);
        console.log('Settings error:', settingsError);
        
        if (settingsError) {
          console.log('No settings found or table missing:', settingsError.message);
          // Don't throw, just use defaults
        } else if (settings) {
          setToggles({
            public_comments: settings.public_comments || false,
            maintenance_mode: settings.maintenance_mode || false,
            auto_publishing: settings.auto_publishing !== false // Default to true if undefined
          });
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error('Error loading settings', error);
        setMessage({ 
          type: 'error', 
          text: 'Failed to load settings' 
        });
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [supabase]);

  // Handle Profile Update - SIMPLIFIED version
  const handleUpdateProfile = async () => {
    console.log('Update profile clicked');
    setSaving(true);
    setMessage(null);

    try {
      // Validate inputs
      if (!profile.email || !profile.email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }
      
      if (!profile.displayName || profile.displayName.trim().length < 2) {
        throw new Error('Display name must be at least 2 characters');
      }

      console.log('Updating profile:', profile);
      
      // Update Supabase Auth User
      const { error } = await supabase.auth.updateUser({
        email: profile.email.trim(),
        data: { 
          full_name: profile.displayName.trim(),
          display_name: profile.displayName.trim()
        }
      });

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Profile updated successfully');
      
      setMessage({ 
        type: 'success', 
        text: 'Profile updated successfully!' 
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Update profile error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile' 
      });
    } finally {
      setSaving(false);
    }
  };

  // Handle Toggle Switch
  const handleToggleSetting = async (key: keyof typeof toggles) => {
    console.log('Toggle clicked:', key);
    const newValue = !toggles[key];
    const originalValue = toggles[key];
    
    // Optimistic Update
    setToggles(prev => ({ ...prev, [key]: newValue }));

    try {
      console.log('Updating toggle in DB:', key, newValue);
      
      // First, check if row exists
      const { data: existing } = await supabase
        .from('site_settings')
        .select('id')
        .eq('id', 1)
        .single();
      
      let result;
      if (existing) {
        // Update existing
        result = await supabase
          .from('site_settings')
          .update({ 
            [key]: newValue,
            updated_at: new Date().toISOString()
          })
          .eq('id', 1);
      } else {
        // Insert new row
        result = await supabase
          .from('site_settings')
          .insert({
            id: 1,
            public_comments: key === 'public_comments' ? newValue : false,
            maintenance_mode: key === 'maintenance_mode' ? newValue : false,
            auto_publishing: key === 'auto_publishing' ? newValue : true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }
      
      if (result.error) {
        console.error('Toggle update error:', result.error);
        throw result.error;
      }
      
      console.log('Toggle updated successfully');
      
      setMessage({
        type: 'success',
        text: `Setting updated successfully`
      });
      
      setTimeout(() => setMessage(null), 2000);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Revert if failed
      console.error('Failed to update toggle:', error);
      setToggles(prev => ({ ...prev, [key]: originalValue }));
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update setting' 
      });
    }
  };

  // Test database connection
  const testDB = async () => {
    console.log('=== Testing Database Connection ===');
    
    try {
      // Test 1: Check auth
      const { data: authData } = await supabase.auth.getUser();
      console.log('Auth user:', authData.user?.email);
      
      // Test 2: Check settings table
      const { data: settings, error } = await supabase
        .from('site_settings')
        .select('*');
      
      console.log('Settings table exists?', !error);
      console.log('Settings data:', settings);
      console.log('Settings error:', error);
      
      if (error?.code === '42P01') {
        console.log('ERROR: site_settings table does not exist!');
        console.log('Run this SQL in Supabase SQL Editor:');
        console.log(`
          CREATE TABLE site_settings (
            id SERIAL PRIMARY KEY,
            public_comments BOOLEAN DEFAULT false,
            maintenance_mode BOOLEAN DEFAULT false,
            auto_publishing BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
          );
          
          INSERT INTO site_settings (id) VALUES (1);
        `);
      }
      
    } catch (err) {
      console.error('Test failed:', err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 pl-72 flex items-center justify-center min-h-screen bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-slate-900" />
          <p className="text-slate-600 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-50 min-h-screen pl-72">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 font-serif">System Settings</h1>
        <p className="text-slate-500 font-medium">Configure roles, permissions, and site defaults</p>
        
        {/* Debug button */}
        <button 
          onClick={testDB}
          className="mt-4 px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-700"
        >
          Test Database Connection
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: PROFILE */}
        <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm h-fit">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {profile.displayName ? profile.displayName[0].toUpperCase() : 'A'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Admin User</h2>
              <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Super Admin</span>
            </div>
          </div>

          {/* FORM REMOVED - Using div instead to prevent default behavior */}
          <div className="space-y-4">
            <div>
              <label htmlFor="displayName" className="text-xs font-bold uppercase text-slate-500 block mb-1">
                Display Name
              </label>
              <input 
                id="displayName"
                title="Display Name"
                placeholder="Enter display name"
                type="text" 
                value={profile.displayName}
                onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                disabled={saving}
                required
                minLength={2}
              />
            </div>
            <div>
              <label htmlFor="email" className="text-xs font-bold uppercase text-slate-500 block mb-1">
                Email Address
              </label>
              <input 
                id="email"
                title="Email Address"
                placeholder="name@example.com"
                type="email" 
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full p-3 border border-slate-200 rounded-lg font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition"
                disabled={saving}
                required
              />
            </div>

            {message && (
              <div className={`p-3 rounded-lg flex items-center gap-2 text-sm font-bold ${
                message.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                  : 'bg-red-50 text-red-600 border border-red-100'
              }`}>
                {message.type === 'success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
                {message.text}
              </div>
            )}

            <button 
              type="button" 
              onClick={handleUpdateProfile}
              disabled={saving}
              className="bg-slate-900 text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-slate-800 transition-colors w-full flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              {saving ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ROLES & TOGGLES */}
        <div className="space-y-8">
          
          {/* ACTIVE ROLES */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Shield className="h-4 w-4 text-red-600" /> Active Roles
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Super Admin</p>
                  <p className="text-xs text-slate-500">Full access to database & logs</p>
                </div>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Editor</p>
                  <p className="text-xs text-slate-500">Can publish & edit articles</p>
                </div>
                <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">2 Users</span>
              </div>
            </div>
          </div>

          {/* FEATURE TOGGLES */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
              Feature Toggles
            </h3>
            <div className="space-y-6">
              
              {/* Toggle 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Public Comments</p>
                  <p className="text-xs text-slate-500">Allow users to comment on stories</p>
                </div>
                <button 
                  onClick={() => handleToggleSetting('public_comments')}
                  disabled={saving}
                  className={`w-12 h-6 rounded-full transition-colors relative ${toggles.public_comments ? 'bg-emerald-500' : 'bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles.public_comments ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Toggle 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Maintenance Mode</p>
                  <p className="text-xs text-slate-500">Take the public site offline</p>
                </div>
                <button 
                  onClick={() => handleToggleSetting('maintenance_mode')}
                  disabled={saving}
                  className={`w-12 h-6 rounded-full transition-colors relative ${toggles.maintenance_mode ? 'bg-red-500' : 'bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles.maintenance_mode ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              {/* Toggle 3 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900 text-sm">Auto-Publishing</p>
                  <p className="text-xs text-slate-500">Schedule posts for later</p>
                </div>
                <button 
                  onClick={() => handleToggleSetting('auto_publishing')}
                  disabled={saving}
                  className={`w-12 h-6 rounded-full transition-colors relative ${toggles.auto_publishing ? 'bg-emerald-500' : 'bg-slate-200'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${toggles.auto_publishing ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}