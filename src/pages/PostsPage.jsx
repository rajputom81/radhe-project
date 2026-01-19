import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from '@/lib/supabase';
import PostModal from '@/components/admin/PostModal';
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

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    setLoading(true);
    const result = await getUpdates();
    if (result.success) {
      setPosts(result.data);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to fetch posts',
        variant: 'destructive',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSave = async (postData) => {
    let result;
    if (editingPost) {
      result = await updateUpdate(editingPost.id, postData);
    } else {
      result = await createUpdate(postData);
    }

    if (result.success) {
      toast({
        title: editingPost ? 'Post Updated' : 'Post Created',
        description: 'Changes have been saved successfully',
      });
      fetchPosts();
      setIsModalOpen(false);
      setEditingPost(null);
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to save post',
        variant: 'destructive',
      });
    }
    return result; // Return for modal to handle loading state
  };

  const handleDelete = async () => {
    const result = await deleteUpdate(deleteId);
    if (result.success) {
      setPosts(prev => prev.filter(p => p.id !== deleteId));
      toast({
        title: 'Post Deleted',
        description: 'Post has been removed successfully',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to delete post',
        variant: 'destructive',
      });
    }
    setDeleteId(null);
  };

  const handleTogglePublish = async (post) => {
    const result = await updateUpdate(post.id, { is_published: !post.is_published });
    if (result.success) {
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, is_published: !p.is_published } : p));
      toast({
        title: post.is_published ? 'Post Unpublished' : 'Post Published',
      });
    }
  };

  const handleToggleSlider = async (post) => {
    const result = await updateUpdate(post.id, { is_slider_featured: !post.is_slider_featured });
    if (result.success) {
      setPosts(prev => prev.map(p => p.id === post.id ? { ...p, is_slider_featured: !p.is_slider_featured } : p));
      toast({
        title: post.is_slider_featured ? 'Removed from Slider' : 'Added to Slider',
      });
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.center_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Manage Posts - Radhe Online Services</title>
      </Helmet>
      <div className="min-h-screen bg-slate-900">
        <Navbar isAdmin />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold text-white">Manage Posts</h1>
                <p className="text-slate-400 mt-1">Create and manage your updates and announcements</p>
              </div>
              <Button
                onClick={() => {
                  setEditingPost(null);
                  setIsModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-900/20"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Post
              </Button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-[400px]">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-slate-400">Loading posts...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-900/50 border-b border-slate-700">
                      <tr>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title & Content</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="text-left px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Slider</th>
                        <th className="text-right px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {filteredPosts.map((post) => (
                        <tr
                          key={post.id}
                          className="hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="max-w-md">
                              <p className="font-semibold text-white mb-1">{post.title}</p>
                              <p className="text-sm text-slate-400 line-clamp-1">{post.description}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2.5 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium border border-slate-600">
                              {post.category || 'General'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="text-slate-300 text-sm">
                              {new Date(post.publish_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleTogglePublish(post)}
                              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                                post.is_published
                                  ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20'
                                  : 'bg-slate-700 text-slate-400 border-slate-600 hover:bg-slate-600'
                              }`}
                            >
                              <span className={`w-1.5 h-1.5 rounded-full ${post.is_published ? 'bg-green-400' : 'bg-slate-400'}`} />
                              {post.is_published ? 'Active' : 'Draft'}
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleToggleSlider(post)}
                              className={`p-1.5 rounded-lg transition-colors ${
                                post.is_slider_featured
                                  ? 'text-blue-400 bg-blue-500/10'
                                  : 'text-slate-500 hover:text-slate-300'
                              }`}
                              title="Toggle Slider"
                            >
                              <SlidersHorizontal className="w-4 h-4" />
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingPost(post);
                                  setIsModalOpen(true);
                                }}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                              >
                                <Edit className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                              </button>
                              <button
                                onClick={() => setDeleteId(post.id)}
                                className="p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                              >
                                <Trash2 className="w-4 h-4 text-slate-400 group-hover:text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        <PostModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handleSave}
          post={editingPost}
        />

        <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent className="bg-slate-800 border-slate-700">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete Post?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                This action cannot be undone. This will permanently remove the post from your website.
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

export default PostsPage;