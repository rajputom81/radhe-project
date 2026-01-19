import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { getUpdateById } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

function UpdateDetailPage() {
  const { id } = useParams();
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdate = async () => {
      const result = await getUpdateById(id);
      if (result.success) {
        setUpdate(result.data);
      }
      setLoading(false);
    };

    fetchUpdate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!update) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Update not found</h2>
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
          Return to Home
        </Link>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  return (
    <>
      <Helmet>
        <title>{update.title} - Radhe Online Services</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                  R
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{update.center_name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(update.publish_date)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Tag className="w-3 h-3 mr-1" />
                  {update.category || 'General'}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {update.title}
              </h1>

              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="whitespace-pre-line leading-relaxed">
                  {update.description}
                </p>
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default UpdateDetailPage;