import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Droplet, Map as MapIcon, BarChart3, ShieldCheck, CheckCircle2, ArrowRight, ChevronUp } from 'lucide-react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Scroll-triggered section wrapper
const RevealSection = ({ children, className = '', delay = 0 }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full bg-white dark:bg-slate-900 transition-colors duration-300">
      
      {/* ═══════════════════════════════════════════════
          1. HERO SECTION — with animated gradient orbs
         ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-20 pb-32 lg:pt-28 lg:pb-40 px-4 border-b border-gray-100/50 dark:border-slate-800/50">
        
        {/* Raindrop texture */}
        <div className="absolute inset-0 bg-raindrops opacity-70 dark:opacity-40 pointer-events-none"></div>

        {/* Animated background orbs */}
        <div 
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-15 blur-3xl pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)',
            animation: 'orb-drift-1 15s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-[-15%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-25 dark:opacity-10 blur-3xl pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(20,184,166,0.4) 0%, transparent 70%)',
            animation: 'orb-drift-2 18s ease-in-out infinite'
          }}
        />
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
          {/* Left — Copy */}
          <motion.div 
            className="flex-1 space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold text-sm border border-blue-200/50 dark:border-blue-500/20">
              <Droplet className="w-4 h-4 fill-current" />
              Smarter rainwater harvesting
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Design smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-teal-400 bg-[length:200%_auto]" style={{ animation: 'gradient-shift 6s ease-in-out infinite' }}>
                Harvest more rain.
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Stop guessing. Plan a right-sized rainwater harvesting system instantly using your exact roof area and local rainfall data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link 
                to="/design" 
                className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                Design My System <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#how-it-works" 
                className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center hover:shadow-md"
              >
                See How It Works
              </a>
            </div>
          </motion.div>
          
          {/* Right — Floating preview card */}
          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-xl relative"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div 
              className="bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700/50 relative z-10"
              style={{ animation: 'float 6s ease-in-out infinite' }}
            >
              <div className="flex flex-col items-center gap-6">
                {/* Map Blueprint UI Preview */}
                <div className="w-full h-48 bg-slate-100 dark:bg-slate-800/80 rounded-2xl relative overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                  {/* Grid background */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
                  
                  {/* Map pin UI */}
                  <div className="absolute top-4 right-4 bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                    <MapIcon className="w-4 h-4 text-slate-400 dark:text-slate-300" />
                  </div>
                  
                  {/* Drawn Polygon SVG */}
                  <svg className="w-full h-full relative z-10" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid slice">
                    <polygon 
                      points="60,80 100,20 160,40 130,90" 
                      className="fill-blue-500/20 stroke-blue-500 stroke-2" 
                      strokeDasharray="4" 
                    />
                    {/* Node points */}
                    <circle cx="60" cy="80" r="3.5" className="fill-white dark:fill-slate-800 stroke-blue-500 stroke-2" />
                    <circle cx="100" cy="20" r="3.5" className="fill-white dark:fill-slate-800 stroke-blue-500 stroke-2" />
                    <circle cx="160" cy="40" r="3.5" className="fill-white dark:fill-slate-800 stroke-blue-500 stroke-2" />
                    <circle cx="130" cy="90" r="3.5" className="fill-white dark:fill-slate-800 stroke-blue-500 stroke-2" />
                  </svg>
                  
                  {/* Floating Tooltip */}
                  <div className="absolute top-1/2 left-[55%] transform -translate-x-1/2 -translate-y-12 bg-slate-900 dark:bg-blue-600 text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg z-20 whitespace-nowrap animate-bounce">
                    Roof Area: 1,200 sq.ft
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-blue-600 rotate-45"></div>
                  </div>
                </div>
                
                {/* Stats */}
                <div className="flex gap-4 w-full">
                  <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 text-center border border-slate-100 dark:border-slate-700">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">Harvest</p>
                    <p className="text-2xl font-black text-blue-600 dark:text-blue-400">72,000 L</p>
                  </div>
                  <div className="flex-1 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 text-center border border-slate-100 dark:border-slate-700">
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">Savings</p>
                    <p className="text-2xl font-black text-teal-600 dark:text-teal-400">₹13,000</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative blur behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-blue-400/20 to-teal-400/20 dark:from-blue-600/10 dark:to-teal-600/10 rounded-[2rem] blur-2xl -z-10"></div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          2. IMPACT BANNER — Problem statement with stats
         ═══════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)' }}></div>
        
        <RevealSection>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-snug">
              Cities are running dry, yet we let <br className="hidden md:block" />the monsoon wash away.
            </h2>
            <p className="text-blue-100/90 dark:text-slate-300 text-lg max-w-3xl mx-auto mb-12 leading-relaxed">
              An average 1,000 sq.ft roof in a city like Bengaluru can harvest over 60,000 liters of water annually. Most people don't know where to start. RainVault makes it effortless.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/15 dark:border-slate-700 pt-10">
              {[
                { val: '60k+', label: 'Liters per home' },
                { val: '4.5', label: 'Year Avg. Payback' },
                { val: 'Zero', label: 'Guesswork' },
                { val: '100%', label: 'Free Design' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</p>
                  <p className="text-blue-200/80 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════════
          3. HOW IT WORKS — 4-step visual walkthrough
         ═══════════════════════════════════════════════ */}
      <section id="how-it-works" className="py-24 lg:py-32 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Simple Process</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">How RainVault Works</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                Four simple steps to design your personalized system — no technical knowledge required.
              </p>
            </div>
          </RevealSection>
          
          <div className="grid md:grid-cols-4 gap-6 lg:gap-8">
            {[
              { step: '01', title: 'Find Your Roof', desc: 'Search your address and locate your building on our interactive map.' },
              { step: '02', title: 'Calculate Area', desc: 'Draw your roof polygon and we instantly calculate the exact catchment area.' },
              { step: '03', title: 'Simulate Rain', desc: 'We apply historical local rainfall data to estimate your harvest potential.' },
              { step: '04', title: 'Get Design', desc: 'Receive right-sized tank recommendations, costs, and installer quotes.' }
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 0.1}>
                <div className="relative group h-full">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-500 group-hover:border-blue-200 dark:group-hover:border-blue-500/30">
                    <div className="text-5xl font-black text-slate-200/80 dark:text-slate-700/60 mb-6 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-500">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          4. FEATURES — Why use RainVault?
         ═══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-4 bg-slate-50 dark:bg-slate-950 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-3">Features</p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why use RainVault?</h2>
              <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                The smartest way to transition to sustainable water usage.
              </p>
            </div>
          </RevealSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MapIcon, bgLight: 'bg-blue-50', bgDark: 'dark:bg-blue-500/10', textLight: 'text-blue-600', textDark: 'dark:text-blue-400', title: 'Interactive Mapping', desc: 'Stop guessing your roof size. Use our precision map tools to calculate your catchment area down to the square meter.' },
              { icon: ShieldCheck, bgLight: 'bg-teal-50', bgDark: 'dark:bg-teal-500/10', textLight: 'text-teal-600', textDark: 'dark:text-teal-400', title: 'Right-sized Designs', desc: 'Avoid overpaying for massive tanks you don\'t need, or undersizing and losing water. We calculate the sweet spot.' },
              { icon: BarChart3, bgLight: 'bg-orange-50', bgDark: 'dark:bg-orange-500/10', textLight: 'text-orange-600', textDark: 'dark:text-orange-400', title: 'Financial Clarity', desc: 'See exactly how much the system will cost, your expected annual savings, and your break-even payback period.' },
            ].map((feature, i) => (
              <RevealSection key={i} delay={i * 0.12}>
                <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-500 h-full group">
                  <div className={`w-14 h-14 ${feature.bgLight} ${feature.bgDark} ${feature.textLight} ${feature.textDark} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          5. SDG ALIGNMENT
         ═══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 px-4 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <div className="text-center mb-16">
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Global Impact</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">Contributing to Global Goals</h2>
              <p className="text-slate-500 dark:text-slate-400">RainVault aligns with the United Nations Sustainable Development Goals.</p>
            </div>
          </RevealSection>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { num: '6', color: 'bg-[#00AED9]', title: 'Clean Water', desc: 'Practical groundwater recharge through rooftop collection' },
              { num: '11', color: 'bg-[#FD9D24]', title: 'Sustainable Cities', desc: 'Reduces urban stormwater strain on city drainage' },
              { num: '12', color: 'bg-[#BF8B2E]', title: 'Responsible Use', desc: 'Efficient, data-driven resource planning for homes' },
              { num: '13', color: 'bg-[#3F7E44]', title: 'Climate Action', desc: 'Building resilience against erratic monsoon patterns' }
            ].map((sdg, i) => (
              <RevealSection key={i} delay={i * 0.08}>
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center hover:shadow-lg hover:scale-[1.03] transition-all duration-500 h-full group">
                  <div className={`w-20 h-20 ${sdg.color} text-white flex items-center justify-center rounded-2xl font-black text-4xl mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                    {sdg.num}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2">{sdg.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{sdg.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          6. FINAL CTA
         ═══════════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-36 px-4 bg-slate-900 dark:bg-slate-950 border-t border-slate-800 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.3) 0%, transparent 60%)' }}></div>
        
        <RevealSection>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Ready to secure your <br className="hidden md:block" />water future?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Map your roof and get a free system design in under 60 seconds. No signup required.
            </p>
            <Link 
              to="/design" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)] hover:scale-[1.03]"
            >
              Start Designing Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div className="mt-10 flex items-center justify-center gap-2 text-slate-500">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> No credit card required. 100% Free.
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ═══════════════════════════════════════════════
          BACK TO TOP BUTTON
         ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};


export default Home;
