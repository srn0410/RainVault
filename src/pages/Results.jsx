import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getSavedDesigns, deleteDesign } from '../utils/storage';
import { Droplet, MapPin, Calendar, Trash2, ArrowRight } from 'lucide-react';

const Results = () => {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDesigns(getSavedDesigns());
  }, []);

  const handleDelete = (id) => {
    deleteDesign(id);
    setDesigns(getSavedDesigns());
  };

  if (designs.length === 0) {
    return (
      <div className="py-20 text-center px-4 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Droplet className="w-10 h-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">No Saved Designs</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          You haven't saved any rainwater harvesting designs yet. Use our interactive map to create your first design.
        </p>
        <Link 
          to="/design" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
        >
          Start New Design
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Designs</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Review and manage your saved rainwater harvesting plans.
          </p>
        </div>
        <Link 
          to="/design" 
          className="hidden sm:inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          New Design
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div key={design.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 relative">
              <button 
                onClick={() => handleDelete(design.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                title="Delete Design"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 pr-8">{design.name || 'Untitled Design'}</h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>{design.location || 'Unknown Location'}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(design.date).toLocaleDateString()}</span>
              </div>
            </div>
            
            <div className="p-6 flex-grow flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
                <span className="text-gray-500 dark:text-gray-400">Roof Area</span>
                <span className="font-semibold text-gray-900 dark:text-white">{design.roofAreaSqFt?.toLocaleString()} sq.ft</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
                <span className="text-gray-500 dark:text-gray-400">Recommended Tank</span>
                <span className="font-semibold text-gray-900 dark:text-white">{design.tankSizeLiters?.toLocaleString()} L</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
                <span className="text-gray-500 dark:text-gray-400">Annual Harvest</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{design.annualHarvest?.toLocaleString()} L</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">Estimated Cost</span>
                <span className="font-semibold text-gray-900 dark:text-white">₹{design.cost?.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 flex gap-3">
              <Link 
                to="/compare"
                className="flex-1 bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 text-center py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                Compare
              </Link>
              <Link 
                to="/installers"
                className="flex-1 bg-blue-600 text-white text-center py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Quotes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;
