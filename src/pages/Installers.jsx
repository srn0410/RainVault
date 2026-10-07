import React, { useState } from 'react';
import { MapPin, Star, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { MOCK_INSTALLERS } from '../data/mockData';

const Installers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedInstaller, setSelectedInstaller] = useState(null);

  const handleRequestQuote = (installer) => {
    setSelectedInstaller(installer);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Verified Installers</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Connect with trusted professionals to bring your RainVault design to life.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_INSTALLERS.map((installer) => (
          <div key={installer.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm text-2xl font-bold text-blue-800 dark:text-blue-400 z-10">
                {installer.name.charAt(0)}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{installer.name}</h3>
              
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{installer.location}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderStars(installer.rating)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{installer.rating}</span>
                <span className="text-sm text-gray-400 dark:text-gray-500">({installer.reviews} reviews)</span>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg mb-6 border border-slate-100 dark:border-slate-800 text-center">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Estimated Project Range</p>
                <p className="font-semibold text-gray-900 dark:text-white">{installer.priceRange}</p>
              </div>
              
              <button
                onClick={() => handleRequestQuote(installer)}
                className="w-full bg-white dark:bg-slate-900 border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-2.5 rounded-lg font-medium transition-colors flex justify-center items-center gap-2"
              >
                Request Quote
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Quote Requested!</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Your design details have been sent to <strong>{selectedInstaller?.name}</strong>. They will contact you shortly.
            </p>
            <div className="w-full bg-gray-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full animate-[progress_3s_ease-in-out]"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Installers;
