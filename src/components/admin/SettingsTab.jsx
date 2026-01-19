import React, { useState, useEffect } from 'react';
import { User, Building2, Phone, MapPin, Clock, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getSettings, updateSettings } from '@/lib/supabase';

function SettingsTab() {
  const [formData, setFormData] = useState({
    username: '',
    new_password: '',
    center_name: '',
    phone: '',
    logo_url: '',
    address: '',
    working_hours: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      const result = await getSettings();
      if (result.success) {
        setFormData({
          username: result.data.username,
          new_password: '',
          center_name: result.data.center_name,
          phone: result.data.phone,
          logo_url: result.data.logo_url || '',
          address: result.data.address,
          working_hours: result.data.working_hours
        });
      }
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updateData = { ...formData };
    if (!updateData.new_password) {
      delete updateData.new_password;
    }

    const result = await updateSettings(updateData);

    if (result.success) {
      toast({
        title: 'Settings Updated',
        description: 'Your changes have been saved successfully',
      });
    } else {
      toast({
        title: 'Update Failed',
        description: result.error || 'Please try again',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">General Settings</h2>
      <p className="text-slate-400">Configure your center details and admin credentials</p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Admin Credentials</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">USERNAME</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">NEW PASSWORD</label>
              <input
                type="password"
                value={formData.new_password}
                onChange={(e) => setFormData({ ...formData, new_password: e.target.value })}
                placeholder="••••••••"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Center Information</h3>
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">CENTER NAME</label>
                <input
                  type="text"
                  value={formData.center_name}
                  onChange={(e) => setFormData({ ...formData, center_name: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">PHONE NUMBER</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">LOGO URL</label>
              <input
                type="text"
                value={formData.logo_url}
                onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">FULL ADDRESS</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">WORKING HOURS</label>
              <input
                type="text"
                value={formData.working_hours}
                onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SettingsTab;