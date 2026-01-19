import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, LayoutDashboard, FileText, MessageSquare, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import logo from '../images/logo.png';

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



function Navbar({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowLogoutDialog(false);
    navigate('/admin/login');
  };

  const publicLinks = [
    { name: 'Home', path: '/', hash: '#home' },
    { name: 'Updates', path: '/', hash: '#updates' },
    { name: 'About Us', path: '/', hash: '#about' },
    { name: 'Services', path: '/', hash: '#services' },
    { name: 'Contact', path: '/', hash: '#contact' }
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Posts', path: '/admin/posts', icon: FileText },
    { name: 'Enquiries', path: '/admin/enquiries', icon: MessageSquare },
    { name: 'Settings', path: '/admin/settings', icon: Settings }
  ];

  const links = isAdmin ? adminLinks : publicLinks;

  const handleLinkClick = (hash) => {
    setIsOpen(false);
    if (hash && location.pathname === '/') {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isAdmin || location.pathname.includes('/update/')
          ? 'bg-slate-900/95 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="Radhe Online Logo"
                className="h-10 w-10 object-contain rounded-xl shadow-lg group-hover:shadow-xl transition-shadow"
              />
              <span className="text-white font-bold text-lg hidden sm:block">
                Radhe Online Services Center
              </span>
            </Link>


            <div className="hidden md:flex items-center gap-6">
              {!isAdmin ? (
                // ✅ PUBLIC NAVBAR
                publicLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.path + link.hash}
                    onClick={() => handleLinkClick(link.hash)}
                    className={`text-sm font-medium transition-colors ${location.hash === link.hash
                      ? 'text-blue-400'
                      : 'text-slate-300 hover:text-white'
                      }`}
                  >
                    {link.name}
                  </a>
                ))
              ) : (
                // ✅ ADMIN NAVBAR
                isAuthenticated && (
                  <div className="flex items-center gap-4">
                    {adminLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className={`text-sm font-medium transition-colors flex items-center gap-2 ${location.pathname === link.path
                          ? 'text-blue-400'
                          : 'text-slate-300 hover:text-white'
                          }`}
                      >
                        {link.icon && <link.icon className="w-4 h-4" />}
                        {link.name}
                      </Link>
                    ))}

                    {/* Logout */}
                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="ml-4 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )
              )}
            </div>


            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-slate-900/98 backdrop-blur-lg border-t border-slate-800"
            >
              <div className="px-4 py-4 space-y-2">
                {!isAdmin ? (
                  publicLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.path + link.hash}
                      onClick={() => handleLinkClick(link.hash)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${location.hash === link.hash || (!location.hash && link.hash === '')
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                      {link.name}
                    </a>
                  ))
                ) : (
                  adminLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${location.pathname === link.path
                        ? 'bg-blue-500/10 text-blue-400'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`}
                    >
                      {link.icon && <link.icon className="w-4 h-4" />}
                      {link.name}
                    </Link>
                  ))
                )}

                {isAuthenticated && isAdmin && (
                  <>
                    <div className="px-4 py-3 bg-slate-800 rounded-lg flex items-center gap-2 mt-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-semibold">A</span>
                      </div>
                      <span className="text-white text-sm">admin</span>
                    </div>
                    <button
                      onClick={() => setShowLogoutDialog(true)}
                      className="w-full px-4 py-3 rounded-lg text-left text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </>
                )}

                {!isAuthenticated && !isAdmin && (
                  <Link to="/admin/login" onClick={() => setIsOpen(false)}>
                    <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                      Admin Login
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to log out of the admin panel?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white">
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Navbar;