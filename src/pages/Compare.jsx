import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Droplet, Wallet, CheckCircle, Info } from 'lucide-react';
import { getSavedDesigns } from '../utils/storage';
import { SAMPLE_DESIGNS } from '../data/mockData';

const Compare = () => {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    const saved = getSavedDesigns();
    if (saved.length > 0) {
      setDesigns(saved.slice(0, 3)); // Compare up to 3
    } else {
      setDesigns(SAMPLE_DESIGNS);
    }
  }, []);

  if (designs.length === 0) {
    return (
      <div className="py-20 text-center px-4">
        <h2 className="text-2xl font-bold mb-4">No designs to compare</h2>
        <Link to="/design" className="text-blue-600 hover:underline">Start a new design</Link>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-6xl mx-auto w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Compare Designs</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Evaluate different rainwater harvesting configurations side-by-side to find the best fit.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-x-auto">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950">
              <th className="p-6 w-1/4 font-semibold text-gray-600 dark:text-gray-400">Feature</th>
              {designs.map((design, i) => (
                <th key={design.id} className="p-6 w-1/4">
                  <div className="flex flex-col">
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-1">Option {String.fromCharCode(65 + i)}</span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">{design.name || `Design ${i+1}`}</span>
                    {i === 1 && <span className="mt-2 inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs px-2 py-1 rounded-full w-fit">Recommended</span>}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" /> Roof Area
              </td>
              {designs.map(design => (
                <td key={design.id} className="p-6 text-gray-600 dark:text-gray-400">
                  {design.roofAreaSqFt?.toLocaleString() || '-'} sq.ft
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Droplet className="w-4 h-4 text-gray-400 dark:text-gray-500" /> Tank Size
              </td>
              {designs.map(design => (
                <td key={design.id} className="p-6 font-semibold text-gray-900 dark:text-white">
                  {design.tankSizeLiters?.toLocaleString() || '-'} L
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300">Recharge Pit</td>
              {designs.map(design => (
                <td key={design.id} className="p-6">
                  {design.tankSizeLiters > 5000 
                    ? <span className="flex items-center gap-1 text-green-600 dark:text-green-400"><CheckCircle className="w-4 h-4" /> Yes</span>
                    : <span className="text-gray-500 dark:text-gray-500">No</span>
                  }
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300 bg-blue-50/50 dark:bg-blue-900/10">Annual Harvest</td>
              {designs.map(design => (
                <td key={design.id} className="p-6 font-bold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10">
                  {design.annualHarvest?.toLocaleString() || '-'} L
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-gray-400 dark:text-gray-500" /> Estimated Cost
              </td>
              {designs.map(design => (
                <td key={design.id} className="p-6 text-gray-900 dark:text-white">
                  ₹{design.cost?.toLocaleString() || '-'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6 font-medium text-gray-700 dark:text-gray-300">Payback Period</td>
              {designs.map(design => (
                <td key={design.id} className="p-6 text-gray-600 dark:text-gray-400">
                  {design.payback || '-'} yrs
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-6"></td>
              {designs.map((design, i) => (
                <td key={design.id} className="p-6">
                  <Link 
                    to="/installers"
                    className={`block text-center py-2.5 rounded-lg font-medium transition-colors ${
                      i === 1 
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                        : 'bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700'
                    }`}
                  >
                    Select Option {String.fromCharCode(65 + i)}
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
