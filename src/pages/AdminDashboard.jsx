import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { FileText, MessageSquare, Bell, Users, TrendingUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/AuthContext';
import { getUpdates, getContacts } from '@/lib/supabase';
import { Button } from '@/components/ui/button';

function AdminDashboard() {
  const { adminData } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalEnquiries: 0,
    activeUpdates: 0,
    pendingContacts: 0
  });

  const [recentPosts, setRecentPosts] = useState([]);
  const [recentEnquiries, setRecentEnquiries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatesResult = await getUpdates();
      const contactsResult = await getContacts();

      if (updatesResult.success && contactsResult.success) {
        setStats({
          totalPosts: updatesResult.data.length,
          totalEnquiries: contactsResult.data.length,
          activeUpdates: updatesResult.data.filter(u => u.is_published).length,
          pendingContacts: contactsResult.data.filter(c => c.status === 'pending').length
        });
        
        setRecentPosts(updatesResult.data.slice(0, 4));
        setRecentEnquiries(contactsResult.data.slice(0, 4));
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Enquiries', value: stats.totalEnquiries, icon: MessageSquare, color: 'from-purple-500 to-purple-600' },
    { label: 'Active Updates', value: stats.activeUpdates, icon: Bell, color: 'from-orange-500 to-orange-600' },
    { label: 'Pending Contacts', value: stats.pendingContacts, icon: Users, color: 'from-green-500 to-green-600' }
  ];

  return (
    <>
      <Helmet>
        <title>Dashboard - Radhe Online Services Center</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900">
        <Navbar isAdmin />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  Welcome back, {adminData?.username}
                </h1>
                <p className="text-slate-400">
                  Here's what's happening at your center today.
                </p>
              </div>
              <div className="text-sm text-slate-500">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-slate-600 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-slate-500 group-hover:text-slate-400 transition-colors" />
                  </div>
                  <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Recent Posts */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white text-lg">Recent Posts</h3>
                  <Link to="/admin/posts" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="p-6 space-y-4">
                  {recentPosts.length > 0 ? (
                    recentPosts.map(post => (
                      <div key={post.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div>
                          <h4 className="text-white font-medium truncate max-w-[200px]">{post.title}</h4>
                          <p className="text-xs text-slate-400">{new Date(post.publish_date).toLocaleDateString()}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${post.is_published ? 'bg-green-500/10 text-green-400' : 'bg-slate-700 text-slate-400'}`}>
                          {post.is_published ? 'Active' : 'Draft'}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">No posts yet</p>
                  )}
                </div>
              </div>

              {/* Recent Enquiries */}
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center">
                  <h3 className="font-bold text-white text-lg">Recent Enquiries</h3>
                  <Link to="/admin/enquiries" className="text-blue-400 hover:text-blue-300 text-sm flex items-center">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
                <div className="p-6 space-y-4">
                  {recentEnquiries.length > 0 ? (
                    recentEnquiries.map(enquiry => (
                      <div key={enquiry.id} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-xl border border-slate-700/50">
                        <div>
                          <h4 className="text-white font-medium">{enquiry.full_name}</h4>
                          <p className="text-xs text-slate-400">{enquiry.service}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${enquiry.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-green-500/10 text-green-400'}`}>
                          {enquiry.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 text-center py-4">No enquiries yet</p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;