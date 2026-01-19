import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Building2, Save, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getSettings, updateSettings } from '@/lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

function SettingsPage() {
  const [formData, setFormData] = useState({
    username: '',
    new_password: '',
    confirm_password: ''
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  useEffect(() => {
    const fetchSettings = async () => {
      setFetching(true);
      const result = await getSettings();
      if (result.success) {
        setFormData({
          username: result.data.username,
          new_password: '',
          confirm_password: '',

        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to load settings',
          variant: 'destructive',
        });
      }
      setFetching(false);
    };

    fetchSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      toast({
        title: 'Validation Error',
        description: 'New passwords do not match',
        variant: 'destructive',
      });
      setLoading(false);
      return;
    }

    const updateData = { ...formData };
    if (!updateData.new_password) {
      delete updateData.new_password;
    }
    delete updateData.confirm_password;

    const result = await updateSettings(updateData);

    if (result.success) {
      toast({
        title: 'Settings Updated',
        description: 'Your changes have been saved successfully',
      });
      setFormData(prev => ({ ...prev, new_password: '', confirm_password: '' }));
    } else {
      toast({
        title: 'Update Failed',
        description: result.error || 'Please try again',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Settings - Radhe Online Services</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900">
        <Navbar isAdmin />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white">General Settings</h1>
              <p className="text-slate-400 mt-1">Configure your center details and admin credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Admin Credentials Section */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <User className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Admin Credentials</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">USERNAME</label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        NEW PASSWORD
                      </label>

                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={formData.new_password}
                          onChange={(e) =>
                            setFormData({ ...formData, new_password: e.target.value })
                          }
                          placeholder="Leave blank to keep current"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        CONFIRM PASSWORD
                      </label>

                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirm_password}
                          onChange={(e) =>
                            setFormData({ ...formData, confirm_password: e.target.value })
                          }
                          placeholder="Confirm new password"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-blue-900/20"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                  </Button>
                </div>
              </div>

              {/* Center Information Section
              <div className="bg-slate-800 rounded-2xl border border-slate-700 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">Center Information</h3>
                </div>
                
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">CENTER NAME</label>
                      <input
                        type="text"
                        value={formData.center_name}
                        onChange={(e) => setFormData({ ...formData, center_name: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">LOGO URL</label>
                    <input
                      type="text"
                      value={formData.logo_url}
                      onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                      placeholder="https://example.com/logo.png"
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">FULL ADDRESS</label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">WORKING HOURS</label>
                    <input
                      type="text"
                      value={formData.working_hours}
                      onChange={(e) => setFormData({ ...formData, working_hours: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      required
                    />
                  </div>
                </div>
              </div> */}


            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SettingsPage;