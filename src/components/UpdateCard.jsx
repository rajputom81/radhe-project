import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '@/images/logo.png';


function UpdateCard({ update }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <Link to={`/update/${update.id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 h-full flex flex-col items-center text-center group relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

        {/* Client Logo / Center Branding */}
        <div className="mb-4">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-inner mb-3 mx-auto transition-colors">
            <img
              src={logo}
              alt="Radhe Online Logo"
              className="w-8 h-8 object-contain"
            />
          </div>

          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {update.center_name}
          </p>
        </div>

        {/* Title & Category */}
        <div className="flex-1 w-full">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium mb-3">
            {update.category || 'Update'}
          </span>
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {update.title}
          </h3>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4">
            {update.description}
          </p>
        </div>

        {/* Footer */}
        <div className="w-full pt-4 border-t border-slate-50 flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(update.publish_date)}
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
            Read More <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default UpdateCard;