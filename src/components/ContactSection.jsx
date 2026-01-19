import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { createContact } from '@/lib/supabase';

function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    service: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const services = [
    'Aadhaar Services',
    'PAN Card',
    'Voter ID',
    'Online Forms',
    'Government Schemes',
    'Printing Services'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createContact(formData);

    if (!/^\d{10}$/.test(formData.phone_number)) {
      toast({
        title: 'Invalid Phone Number',
        description: 'Please enter a valid 10-digit mobile number.',
        variant: 'destructive',
      });
      return;
    }


    if (result.success) {
      toast({
        title: 'Enquiry Submitted Successfully',
        description: 'We will get back to you within 24 hours.',
        className: 'bg-green-500 text-white border-none'
      });
      setFormData({ full_name: '', phone_number: '', service: '', message: '' });
    } else {
      toast({
        title: 'Submission Failed',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">Get In Touch</h2>
          <p className="text-slate-400">Ready to get started? Send us a message or visit our center.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-white mb-1">Send Enquiry</h3>
            <p className="text-slate-400 text-sm mb-6">We usually respond within 24 hours</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">PHONE NUMBER</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">+91</span>
                  <input
                    type="tel"
                    name="phone_number"
                    pattern="[0-9]{10}"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phone_number}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setFormData({ ...formData, phone_number: value });
                      }
                    }}
                    placeholder="9512991008"
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg pl-12 pr-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />

                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">SERVICE REQUIRED</label>
                <div className="relative">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-all cursor-pointer"
                    required
                  >
                    <option value="" className="text-slate-500">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service} className="bg-slate-900 text-white">{service}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe your requirement..."
                  className="w-full bg-slate-900/80 border border-slate-700 rounded-lg px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 rounded-xl text-lg font-semibold shadow-lg shadow-blue-900/20 transition-all"
              >
                {loading ? 'Sending...' : 'Submit Request'} <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </motion.div>

          {/* Right Side - Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* WhatsApp Card */}
            <a href="https://wa.me/919512991008" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5 hover:bg-slate-800/80 hover:border-green-500/30 transition-all group-hover:translate-x-1">
                <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="w-7 h-7 text-green-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">WhatsApp Us</h4>
                  <p className="text-slate-400 text-sm">Chat for instant support</p>
                </div>
              </div>
            </a>

            {/* Call Card */}
            <a href="tel:9512991008" className="block group">
              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5 hover:bg-slate-800/80 hover:border-blue-500/30 transition-all group-hover:translate-x-1">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                  <Phone className="w-7 h-7 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">Call Now</h4>
                  <p className="text-slate-400 text-sm">9512991008</p>
                </div>
              </div>
            </a>

            {/* Address Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <MapPin className="w-7 h-7 text-purple-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Visit Us</h4>
                <p className="text-slate-400 text-sm">1713, Wada Ni Pol, Old City, Khadia, Ahmedabad, Gujarat 380001</p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Clock className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg mb-1">Opening Hours</h4>
                <p className="text-slate-400 text-sm">Monday - Saturday: 9:00 AM - 10:00 PM <br /> Sunday: 9:00 AM - 2:00 PM</p>
              </div>
            </div>

            <div className="mt-12 w-full h-64 md:h-72 rounded-3xl overflow-hidden border border-white/10 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.5035179010937!2d72.59406500008743!3d23.021705460642742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84350769d217%3A0x9515d8e1851bbd95!2sRadhe%20cyber%20cafe%20-Net%20to%20phone%20-xerox!5e0!3m2!1sen!2sin!4v1768312633937!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;