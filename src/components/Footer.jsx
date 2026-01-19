import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/images/logo.png';

function Footer() {

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative z-50 bg-slate-950 text-white pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl flex items-center justify-center
                bg-white/10 backdrop-blur-md
                border border-white/20
                shadow-md shadow-black/30">
                <img
                  src={logo}
                  alt="Radhe Online Logo"
                  className="w-7 h-7 object-contain"
                />
              </div>






              <div>
                <h3 className="font-bold text-lg leading-none">Radhe Online</h3>
                <span className="text-xs text-blue-400 font-medium">Services Center</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Your trusted partner for all government services and online documentation. We ensure accuracy, security, and speed in every application.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white text-slate-400 transition-all border border-slate-800 hover:border-blue-500">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-pink-600 hover:text-white text-slate-400 transition-all border border-slate-800 hover:border-pink-500">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center hover:bg-sky-500 hover:text-white text-slate-400 transition-all border border-slate-800 hover:border-sky-400">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Home
                </button>
              </li>

              <li>
                <button onClick={() => scrollTo('updates')}
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Updates
                </button>
              </li>

              <li>
                <button onClick={() => scrollTo('about')}
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> About Us
                </button>
              </li>

              <li>
                <button onClick={() => scrollTo('services')}
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Services
                </button>
              </li>

              <li>
                <button onClick={() => scrollTo('contact')}
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Contact
                </button>
              </li>

              <li>
                <Link to="/admin/login"
                  className="text-slate-400 hover:text-blue-400 text-sm flex items-center gap-2">
                  <ArrowRight className="w-3 h-3" /> Admin Login
                </Link>
              </li>
            </ul>

          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Our Services</h3>
            <ul className="space-y-4">
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Aadhaar Services
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> PAN Card Application
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Voter ID Registration
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Passport Seva
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Driving License
              </li>
              <li className="text-slate-400 text-sm flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> All Online Forms
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-white text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <p className="font-medium text-white">9512991008</p>
                  <p className="text-xs">Mon-Sat, 9am-10pm <br />Sun, 9am-2pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <p className="font-medium text-white">info@radheonline.com</p>
                  <p className="text-xs">Mail us anytime</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-400 group">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="pt-1">
                  <p className="font-medium text-white">1713, Wada Ni Pol, Old City, Khadia</p>
                  <p className="text-xs">Ahmedabad, Gujarat 380001</p>

                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm text-center md:text-left">
            © 2026 Radhe Online Services Center. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-600 text-xs">
            <ShieldCheck className="w-3 h-3" />
            <span>Secure & Trusted Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;