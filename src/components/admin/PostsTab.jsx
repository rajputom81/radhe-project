import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getUpdates, createUpdate, updateUpdate, deleteUpdate } from '@/lib/supabase';
import PostModal from './PostModal';
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

function PostsTab() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    const result = await getUpdates();
    if (result.success) {
      setPosts(result.data);
    }
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
  };

  const handleDelete = async () => {
    const result = await deleteUpdate(deleteId);
    if (result.success) {
      toast({
        title: 'Post Deleted',
        description: 'Post has been removed successfully',
      });
      fetchPosts();
    }
    setDeleteId(null);
  };

  const handleTogglePublish = async (post) => {
    const result = await updateUpdate(post.id, { is_published: !post.is_published });
    if (result.success) {
      toast({
        title: post.is_published ? 'Post Unpublished' : 'Post Published',
      });
      fetchPosts();
    }
  };

  const handleToggleSlider = async (post) => {
    const result = await updateUpdate(post.id, { is_slider_featured: !post.is_slider_featured });
    if (result.success) {
      toast({
        title: post.is_slider_featured ? 'Removed from Slider' : 'Added to Slider',
      });
      fetchPosts();
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.center_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Manage Posts</h2>
        <Button
          onClick={() => {
            setEditingPost(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Post
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-700/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="absolute right-4 top-1/2 -translate-y-1/2">
          <Filter className="w-5 h-5 text-slate-400 hover:text-white transition-colors" />
        </button>
      </div>

      <div className="bg-slate-700/30 rounded-xl border border-slate-600/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Title & Content</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-4 text-sm font-semibold text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {filteredPosts.map((post) => (
                <motion.tr
                  key={post.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="font-semibold text-white mb-1">{post.title}</p>
                      <p className="text-sm text-slate-400 line-clamp-2">{post.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                      Aadhaar
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white text-sm">{new Date(post.publish_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePublish(post)}
                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          post.is_published
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-slate-600/50 text-slate-400'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${post.is_published ? 'bg-green-400' : 'bg-slate-500'}`} />
                        {post.is_published ? 'Active' : 'Draft'}
                      </button>
                    </div>
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
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
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
            <AlertDialogTitle className="text-white">Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This action cannot be undone. This will permanently delete the post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default PostsTab;