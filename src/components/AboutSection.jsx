import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Clock } from 'lucide-react';

function AboutSection() {
  const features = [
    { icon: Award, text: 'Expert Consultation' },
    { icon: Shield, text: '100% Secure Documentation' },
    { icon: Clock, text: 'Fast Track Processing' }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">ABOUT US</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Simplifying Government <span className="text-blue-600">Services for Everyone</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-lg mx-auto"
          >
            {/* Tilted Background Rectangle */}
            {/* Soft background card */}
            <div className="absolute -inset-4 bg-blue-100 rounded-3xl transform -rotate-3"></div>

            {/* Image */}
            <img
              src="https://plus.unsplash.com/premium_photo-1670232149329-b3f128058ce8?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Radhe Online Services Center"
              className="relative rounded-2xl shadow-2xl w-full object-cover z-10"
            // className="rounded-2xl shadow-2xl w-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-gray-700 text-lg leading-relaxed">
              At Radhe Online Services Center, we believe that accessing government services should be simple, transparent, and stress-free. Established with a vision to bridge the digital divide, we have been serving our local community with dedication and integrity.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Whether you need to apply for a PAN card, update your Aadhaar, register for Voter ID, or fill out any government forms, our expert team ensures that your application is processed accurately and efficiently.
            </p>

            <div className="space-y-4 pt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-900 font-semibold">{feature.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;