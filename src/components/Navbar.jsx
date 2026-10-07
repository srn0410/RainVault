import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplet, Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = React.useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path) => location.pathname === path;
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/design' },
    { name: 'My Designs', path: '/results' },
    { name: 'Compare', path: '/compare' },
    { name: 'Installers', path: '/installers' },
    { name: 'How It Works', path: '/how-it-works' },
  ];

  return (
    <nav className="bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/50 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[72px] items-center">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all duration-300">
                <Droplet className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">RAINVAULT</span>
            </Link>
          </div>
          
          {/* Desktop Navigation — True Liquid Glass */}
          <div className="hidden lg:flex items-center relative">
            {/* Outer glass container */}
            <div 
              className="flex items-center p-1 rounded-2xl relative"
              style={{
                background: theme === 'dark' 
                  ? 'rgba(30, 41, 59, 0.5)' 
                  : 'rgba(241, 245, 249, 0.6)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: theme === 'dark' 
                  ? '1px solid rgba(148, 163, 184, 0.1)' 
                  : '1px solid rgba(255, 255, 255, 0.7)',
                boxShadow: theme === 'dark'
                  ? 'inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 3px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.15)'
                  : 'inset 0 1px 0 rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
              }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative px-4 py-2 text-[13px] font-semibold transition-all duration-300 rounded-xl z-10 ${
                    isActive(link.path) 
                      ? 'text-blue-700 dark:text-blue-300' 
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="navbar-glass-pill"
                      className="absolute inset-0 rounded-xl -z-10"
                      style={{
                        background: theme === 'dark'
                          ? 'rgba(96, 165, 250, 0.12)'
                          : 'rgba(255, 255, 255, 0.85)',
                        boxShadow: theme === 'dark'
                          ? '0 0 12px rgba(96, 165, 250, 0.15), inset 0 1px 0 rgba(255,255,255,0.05)'
                          : '0 1px 3px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.9)',
                        border: theme === 'dark'
                          ? '1px solid rgba(96, 165, 250, 0.2)'
                          : '1px solid rgba(255, 255, 255, 0.5)',
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
                    />
                  )}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{
                backdropFilter: 'blur(12px)',
                border: theme === 'dark' ? '1px solid rgba(148,163,184,0.1)' : '1px solid rgba(0,0,0,0.06)',
              }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                </motion.div>
              </AnimatePresence>
            </button>
            
            <Link
              to="/design"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02]"
            >
              Start Designing
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center lg:hidden gap-2">
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-[15px] font-semibold transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 mt-2">
                <Link
                  to="/design"
                  onClick={() => setIsOpen(false)}
                  className="block w-full px-4 py-3 text-center rounded-xl text-[15px] font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                >
                  Start Designing
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
