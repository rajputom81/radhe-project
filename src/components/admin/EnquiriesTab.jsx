import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Trash2, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getContacts, updateContactStatus, deleteContact } from '@/lib/supabase';

function EnquiriesTab() {
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const fetchEnquiries = async () => {
    const result = await getContacts();
    if (result.success) {
      setEnquiries(result.data);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleStatusChange = async (id, status) => {
    const result = await updateContactStatus(id, status);
    if (result.success) {
      toast({
        title: 'Status Updated',
        description: `Enquiry marked as ${status}`,
      });
      fetchEnquiries();
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteContact(id);
    if (result.success) {
      toast({
        title: 'Enquiry Deleted',
        description: 'Enquiry has been removed',
      });
      fetchEnquiries();
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const matchesSearch = enquiry.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         enquiry.phone_number.includes(searchTerm);
    const matchesFilter = filter === 'all' || enquiry.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Manage Enquiries</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 bg-slate-700/50 p-1 rounded-xl border border-slate-600">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'pending' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('contacted')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'contacted' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Contacted
          </button>
        </div>
      </div>

      {filteredEnquiries.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No enquiries found matching your filters.
        </div>
      ) : (
        <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Service</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {filteredEnquiries.map((enquiry) => (
                  <motion.tr
                    key={enquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-slate-700/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-white">{enquiry.full_name}</p>
                        <p className="text-sm text-slate-400">{enquiry.phone_number}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{enquiry.service}</p>
                      <p className="text-xs text-slate-400 line-clamp-1">{enquiry.message}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-sm">{new Date(enquiry.created_at).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusChange(enquiry.id, enquiry.status === 'pending' ? 'contacted' : 'pending')}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          enquiry.status === 'contacted'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-orange-500/20 text-orange-400'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${enquiry.status === 'contacted' ? 'bg-green-400' : 'bg-orange-400'}`} />
                        {enquiry.status === 'contacted' ? 'Contacted' : 'Pending'}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStatusChange(enquiry.id, 'contacted')}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                          title="Mark as contacted"
                        >
                          <CheckCircle className="w-4 h-4 text-slate-400 group-hover:text-green-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry.id)}
                          className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                        >
                          <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnquiriesTab;