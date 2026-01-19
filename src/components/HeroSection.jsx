import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev

  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1575290970649-8490709215cf?w=1920&q=80',
      title: 'PAN Card Services',
      subtitle: 'Apply for new PAN card or correct existing details. Essential for your financial journey.'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1649056172285-79288aefaaa8?w=1920&q=80',
      title: 'Aadhaar Services',
      subtitle: 'Update your Aadhaar details securely. Address change, biometric updates, and more.'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1593739186187-4cab82309ec6?w=1920&q=80',
      title: 'Voter ID Registration',
      subtitle: 'Register to vote or update your constituency. Exercise your democratic rights today.'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1693045181676-57199422ee66?w=1920&q=80',
      title: 'Online Form Filling',
      subtitle: 'Expert assistance for all government and private sector application forms.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.querySelector('#services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-slate-900">
      {/* Background Image Slider */}
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />
          {/* Professional Dark Overlay with Blue Tint */}
          <div className="absolute inset-0 bg-slate-900/80 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-wider text-white uppercase">Official Service Center</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight">
            {slides[currentIndex].title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
            {slides[currentIndex].subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={scrollToContact}
              className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
            >
              Apply Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              onClick={scrollToServices}
              variant="outline"
              className="h-14 px-8 text-lg border-2 border-slate-600 text-white hover:bg-white hover:text-slate-900 rounded-xl transition-all hover:scale-105 bg-transparent backdrop-blur-sm"
            >
              Explore Services
            </Button>
          </div>
        </motion.div>

        {/* Navigation Arrows & Indicators */}
        <div className="absolute bottom-12 right-4 sm:right-8 lg:right-12 flex items-center gap-6">
          {/* Dots */}
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-slate-500 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full border border-slate-600 bg-black/20 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-full border border-slate-600 bg-black/20 text-white flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;