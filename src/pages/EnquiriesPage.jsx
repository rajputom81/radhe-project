import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Search, Trash2, CheckCircle, Mail, Phone, Clock, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useToast } from '@/components/ui/use-toast';
import { getContacts, updateContactStatus, updateContactContacted, deleteContact } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [deleteId, setDeleteId] = useState(null);
  const { toast } = useToast();

  const fetchEnquiries = async () => {
    setLoading(true);
    const result = await getContacts();
    if (result.success) {
      setEnquiries(result.data);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to fetch enquiries.',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    const result = await updateContactStatus(id, status);
    if (result.success) {
      setEnquiries(prev => prev.map(e => e.id === id ? { ...e, status } : e));
      toast({
        title: 'Status Updated',
        description: `Enquiry marked as ${status}`,
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    const result = await deleteContact(deleteId);
    if (result.success) {
      setEnquiries(prev => prev.filter(e => e.id !== deleteId));
      toast({
        title: 'Enquiry Deleted',
        description: 'Enquiry has been removed',
      });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to delete enquiry',
        variant: 'destructive',
      });
    }
    setDeleteId(null);
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.phone_number.includes(searchTerm);
    const matchesFilter = filter === 'all' || enquiry.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Helmet>
        <title>Manage Enquiries - Radhe Online Services</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900">
        <Navbar isAdmin />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">Manage Enquiries</h1>
                <p className="text-slate-400 mt-1">Track and respond to customer requests</p>
              </div>
              <button 
                onClick={fetchEnquiries}
                className="text-sm text-blue-400 hover:text-blue-300 underline"
              >
                Refresh Data
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === 'all' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('pending')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === 'pending' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setFilter('contacted')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === 'contacted' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Contacted
                </button>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-slate-400">Loading enquiries...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 border-b border-slate-700">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Customer</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Service</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                            No enquiries found matching your filters.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enquiry) => (
                          <tr
                            key={enquiry.id}
                            className="hover:bg-slate-700/30 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-semibold text-white">{enquiry.full_name}</p>
                                <div className="flex items-center gap-1.5 mt-1 text-sm text-slate-400">
                                  <Phone className="w-3 h-3" />
                                  {enquiry.phone_number}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2.5 py-1 bg-slate-700/50 text-slate-300 rounded-lg text-xs font-medium border border-slate-600/50 mb-1 inline-block">
                                {enquiry.service}
                              </span>
                              <p className="text-xs text-slate-400 line-clamp-1 max-w-[200px]">{enquiry.message}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                                <Clock className="w-3 h-3" />
                                {new Date(enquiry.created_at).toLocaleDateString()}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button
                                onClick={() => handleStatusChange(enquiry.id, enquiry.status === 'pending' ? 'contacted' : 'pending')}
                                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                                  enquiry.status === 'contacted'
                                    ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                    : 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${enquiry.status === 'contacted' ? 'bg-green-400' : 'bg-orange-400'}`} />
                                {enquiry.status === 'contacted' ? 'Contacted' : 'Pending'}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center justify-end gap-2">
                                {enquiry.status === 'pending' && (
                                  <button
                                    onClick={() => handleStatusChange(enquiry.id, 'contacted')}
                                    className="p-2 hover:bg-green-500/20 rounded-lg transition-colors group"
                                    title="Mark as contacted"
                                  >
                                    <CheckCircle className="w-4 h-4 text-slate-400 group-hover:text-green-400" />
                                  </button>
                                )}
                                <button
                                  onClick={() => setDeleteId(enquiry.id)}
                                  className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                                  title="Delete enquiry"
                                >
                                  <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Enquiry?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                This will permanently delete this enquiry record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default EnquiriesPage;