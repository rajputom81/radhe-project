import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import UpdatesSlider from './UpdatesSlider';
import { getUpdates } from '@/lib/supabase';

function UpdatesSliderSection() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      const result = await getUpdates();
      if (result.success) {
        // Filter active/enabled updates
        const activeUpdates = result.data.filter(
          u => u.is_published && u.is_slider_featured
        );

        setUpdates(activeUpdates);
      }
      setLoading(false);
    };
    fetchUpdates();
  }, []);

  const handlePrev = () => {
    document.getElementById('slider-prev')?.click();
  };

  const handleNext = () => {
    document.getElementById('slider-next')?.click();
  };

  if (!loading && updates.length === 0) return null;

  return (
    <section className="py-20 bg-slate-50 overflow-hidden relative" id="updates">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-3">
              Latest News
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Latest Updates
            </h2>
            <p className="text-slate-500 text-lg">
              Stay informed with the latest news, government notifications, and service announcements from Radhe Online Services Center.
            </p>
          </motion.div>

          {/* Navigation Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm hover:shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all shadow-sm hover:shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div className="relative -mx-4 sm:mx-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {loading ? (
              <div className="flex gap-6 overflow-hidden px-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-[320px] h-[300px] bg-white rounded-2xl animate-pulse shadow-sm border border-slate-100 flex-shrink-0" />
                ))}
              </div>
            ) : (
              <UpdatesSlider updates={updates} />
            )}
          </motion.div>
        </div>

        {/* Mobile Navigation & Dots */}
        <div className="mt-8 flex flex-col items-center gap-6 md:hidden">
          <div className="flex items-center gap-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center active:bg-blue-600 active:text-white transition-colors shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Simple Pagination Dots Indicator */}
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-600" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
              <div className="w-2 h-2 rounded-full bg-slate-300" />
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-slate-200 bg-white text-slate-600 flex items-center justify-center active:bg-blue-600 active:text-white transition-colors shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop Dots */}
        <div className="hidden md:flex justify-center mt-10">
          <div className="flex gap-2">
            {[...Array(Math.min(updates.length, 5))].map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === 0 ? 'w-8 bg-blue-600' : 'w-1.5 bg-slate-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdatesSliderSection;