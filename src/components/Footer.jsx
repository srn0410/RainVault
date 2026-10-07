import React from 'react';
import { Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-xl">
                <Droplet className="h-5 w-5 text-white fill-current" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">RAINVAULT</span>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed mb-6">
              Helping homeowners design right-sized rainwater harvesting systems using interactive mapping and local rainfall data.
            </p>
            <div className="flex gap-2">
              {['6', '11', '12', '13'].map(n => (
                <span key={n} className="w-8 h-8 bg-slate-800 text-slate-300 text-xs font-bold rounded-lg flex items-center justify-center border border-slate-700">
                  {n}
                </span>
              ))}
              <span className="text-xs text-slate-500 self-center ml-2">UN SDGs</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
            <ul className="space-y-3">
              <li><Link to="/design" className="hover:text-white transition-colors">Roof Designer</Link></li>
              <li><Link to="/results" className="hover:text-white transition-colors">My Designs</Link></li>
              <li><Link to="/compare" className="hover:text-white transition-colors">Compare</Link></li>
              <li><Link to="/installers" className="hover:text-white transition-colors">Find Installers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Learn</h4>
            <ul className="space-y-3">
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
