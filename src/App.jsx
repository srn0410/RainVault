import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Designer from './pages/Designer';
import Results from './pages/Results';
import Compare from './pages/Compare';
import Installers from './pages/Installers';
import HowItWorks from './pages/HowItWorks';
import { ThemeProvider } from './contexts/ThemeContext';

const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex-grow flex flex-col w-full h-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/design" element={<PageWrapper><Designer /></PageWrapper>} />
        <Route path="/results" element={<PageWrapper><Results /></PageWrapper>} />
        <Route path="/compare" element={<PageWrapper><Compare /></PageWrapper>} />
        <Route path="/installers" element={<PageWrapper><Installers /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">
          <Navbar />
          <main className="flex-grow flex flex-col overflow-x-hidden relative">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
