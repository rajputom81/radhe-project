import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getUpdates } from '@/lib/supabase';

function UpdatesSection() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      const result = await getUpdates();
      if (result.success) {
        // Filter for active/published slider updates
        const sliderUpdates = result.data.filter(u => u.is_slider_featured && u.is_published);
        setUpdates(sliderUpdates);
      }
    };

    fetchUpdates();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (updates.length === 0) return null;

  // Duplicate items for infinite loop effect if needed, but framer motion repeat is cleaner
  // For a seamless loop, we need enough items to fill screen + scroll
  // We'll duplicate the list to ensure smooth continuous scrolling
  const duplicatedUpdates = [...updates, ...updates, ...updates, ...updates];

  return (
    <section id="updates" className="py-16 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            UPDATES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
            Latest Notifications
          </h2>
        </motion.div>
      </div>

      <div className="relative w-full">
        <div className="flex">
          <motion.div
            className="flex gap-6 px-4"
            animate={{
              x: ["0%", "-50%"]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30, // Adjust speed here (higher = slower)
                ease: "linear",
              },
            }}
            whileHover={{ animationPlayState: "paused" }} // Note: Framer Motion doesn't support playState directly like CSS, logic might differ, usually handled via hover stop controls or CSS class. For simplicity in pure FM loop, hover pause is complex.
            // Using a CSS class for hover pause is often easier with standard CSS animations, but let's stick to FM structure.
            // To achieve pause on hover, we'd wrap this. For now, continuous scroll.
          >
            {duplicatedUpdates.map((update, index) => (
              <Link 
                key={`${update.id}-${index}`} 
                to={`/update/${update.id}`}
                className="flex-shrink-0 w-80 md:w-96 group"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                      R
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm truncate">
                        {update.center_name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                         <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                         Active Update
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {update.title}
                  </h4>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                    <Calendar className="w-4 h-4" />
                    {formatDate(update.publish_date)}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default UpdatesSection;