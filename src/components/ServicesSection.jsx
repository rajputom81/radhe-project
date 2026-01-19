import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, FileText, Vote, Globe, Gift, Printer } from 'lucide-react';

function ServicesSection() {
  const services = [
    {
      icon: FileText,
      title: 'Aadhaar Services',
      description: 'New enrollment, address updates, mobile linking, and all Aadhaar-related services',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: CreditCard,
      title: 'PAN Card',
      description: 'Apply for new PAN card or request reprints through our streamlined online portal',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Vote,
      title: 'Voter ID',
      description: 'Register for new Voter ID, corrections, and address change requests',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Globe,
      title: 'Online Forms',
      description: 'Professional form filling services for all government and private sector requirements',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      icon: Gift,
      title: 'Government Schemes',
      description: 'Check eligibility and apply for various government welfare schemes and benefits',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Printer,
      title: 'Printing & Scanning',
      description: 'High-quality printing, scanning, and photocopying services available',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">WHAT WE OFFER</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Our Core Services</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            One-stop destination for all your government documentation and online service needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 group"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;