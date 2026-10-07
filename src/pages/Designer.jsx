import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MapDesigner from '../components/MapDesigner';
import { MOCK_CITIES } from '../data/mockData';
import { 
  calculateHarvestedWater, 
  calculateRecommendedTank, 
  estimateSystemCost, 
  calculatePayback,
  sqMToSqFt
} from '../utils/calculations';
import { saveDesign } from '../utils/storage';
import { MapPin, Save, AlertCircle, Droplet, Wallet, CheckCircle, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Designer = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [activeCity, setActiveCity] = useState(MOCK_CITIES[0]);
  const [roofAreaSqM, setRoofAreaSqM] = useState(0);
  const [roofPolygon, setRoofPolygon] = useState(null);
  const [step, setStep] = useState(1);
  const [designName, setDesignName] = useState('My RainVault Design');
  const [showInstruction, setShowInstruction] = useState(true);

  const roofAreaSqFt = sqMToSqFt(roofAreaSqM);
  const annualHarvest = calculateHarvestedWater(roofAreaSqM, activeCity.rainfallMm);
  const tankSize = calculateRecommendedTank(annualHarvest);
  const costEstimate = estimateSystemCost(tankSize);
  const paybackPeriod = calculatePayback(costEstimate.total, annualHarvest);

  const handleAreaCalculated = (areaSqM, geojson) => {
    setRoofAreaSqM(areaSqM);
    setRoofPolygon(geojson);
  };

  const handleCityChange = (e) => {
    const city = MOCK_CITIES.find(c => c.id === e.target.value);
    if (city) setActiveCity(city);
  };

  const handleContinue = () => {
    if (roofAreaSqM > 0) setStep(2);
  };

  const handleSaveDesign = () => {
    const designToSave = {
      name: designName,
      location: activeCity.name,
      roofAreaSqFt: Math.round(roofAreaSqFt),
      rainfallMm: activeCity.rainfallMm,
      tankSizeLiters: tankSize,
      annualHarvest: annualHarvest,
      cost: costEstimate.total,
      payback: paybackPeriod,
      polygon: roofPolygon
    };
    saveDesign(designToSave);
    navigate('/results');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full relative">
      {/* Top control bar */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 z-10 shadow-sm relative transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-800 px-3 py-2 rounded-lg border border-gray-200 dark:border-slate-700">
            <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <select 
              value={activeCity.id}
              onChange={handleCityChange}
              className="bg-transparent border-none text-gray-900 dark:text-white font-medium focus:ring-0 cursor-pointer outline-none"
            >
              {MOCK_CITIES.map(city => (
                <option key={city.id} value={city.id} className="dark:bg-slate-800">{city.name}</option>
              ))}
            </select>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-2 border-l border-gray-200 dark:border-slate-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">Annual Rainfall:</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">{activeCity.rainfallMm} mm</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 text-center">
            <div className={`transition-opacity ${roofAreaSqM > 0 ? 'opacity-100' : 'opacity-50'}`}>
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Roof Area</p>
              <p className="font-bold text-gray-900 dark:text-white">
                {Math.round(roofAreaSqFt).toLocaleString()} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">sq.ft</span>
              </p>
            </div>
            
            {step === 1 ? (
              <div className="group/tip relative">
                <button 
                  onClick={handleContinue}
                  disabled={roofAreaSqM === 0}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    roofAreaSqM > 0 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20' 
                      : 'bg-gray-100 dark:bg-slate-800 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Simulate Harvest
                </button>
                {roofAreaSqM === 0 && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-700 text-white text-[11px] font-bold rounded-lg opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-50 border border-slate-700 dark:border-slate-600">
                    Draw a roof polygon first
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-slate-900 dark:bg-slate-700 border-t border-l border-slate-700 dark:border-slate-600 rotate-45"></div>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => setStep(1)}
                className="px-6 py-2 rounded-full font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              >
                Edit Roof
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        <div className={`flex-1 transition-all duration-500 relative z-0 p-4 pb-8 ${step === 2 ? 'md:w-1/2 lg:w-2/3' : 'w-full'}`}>
          <MapDesigner 
            onAreaCalculated={handleAreaCalculated} 
            centerLocation={[activeCity.lat, activeCity.lng]} 
            theme={theme}
          />
          
          {step === 1 && roofAreaSqM === 0 && showInstruction && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] text-center">
              <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md px-10 py-6 rounded-full shadow-2xl border border-gray-200 dark:border-slate-700 animate-[pulse_3s_ease-in-out_infinite] relative pr-16 transition-colors">
                <button 
                  onClick={() => setShowInstruction(false)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full p-1.5"
                >
                  <X className="w-5 h-5" />
                </button>
                <p className="font-semibold text-gray-900 dark:text-white text-lg">Locate your building and draw the roof</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Use the polygon tool in the top right</p>
              </div>
            </div>
          )}
        </div>

        {/* Results Panel */}
        <div className={`absolute top-0 right-0 h-full bg-gray-50 dark:bg-slate-800 border-l border-gray-200 dark:border-slate-700 shadow-2xl transition-transform duration-500 ease-in-out overflow-y-auto z-20 ${
          step === 2 ? 'translate-x-0 w-full md:w-1/2 lg:w-1/3' : 'translate-x-full w-full md:w-1/2 lg:w-1/3'
        }`}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">System Design</h2>
              <button onClick={() => setStep(1)} className="md:hidden text-gray-500 hover:text-gray-900 dark:hover:text-white">
                Close
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 ml-2">Design Name</label>
              <input 
                type="text" 
                value={designName}
                onChange={(e) => setDesignName(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-full px-5 py-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                placeholder="e.g. My Home System"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Harvest Potential</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Based on {activeCity.rainfallMm}mm annual rainfall</p>
                </div>
              </div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mb-1">
                {annualHarvest.toLocaleString()} <span className="text-lg font-medium text-gray-500 dark:text-gray-400">Liters/year</span>
              </div>
              
              <div className="mt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Estimated Monthly Spread</p>
                <div className="flex items-end gap-1 h-16">
                  {[
                    { m: 'J', h: 12 }, { m: 'F', h: 15 }, { m: 'M', h: 18 }, { m: 'A', h: 25 },
                    { m: 'M', h: 45 }, { m: 'J', h: 85 }, { m: 'J', h: 95 }, { m: 'A', h: 80 },
                    { m: 'S', h: 70 }, { m: 'O', h: 40 }, { m: 'N', h: 20 }, { m: 'D', h: 15 }
                  ].map((data, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                      <div className="w-full bg-blue-200 dark:bg-blue-600/50 rounded-t-sm group-hover:bg-blue-400 dark:group-hover:bg-blue-500 transition-colors" style={{ height: `${data.h}%` }}></div>
                      <span className="text-[10px] text-gray-400">{data.m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-sm mb-6 transition-colors">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" /> Recommended Setup
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-gray-600 dark:text-gray-400">Storage Tank</span>
                  <span className="font-bold text-gray-900 dark:text-white">{tankSize.toLocaleString()} L</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100 dark:border-slate-800">
                  <span className="text-gray-600 dark:text-gray-400">Recharge Pit</span>
                  <span className={`font-semibold ${costEstimate.needsRechargePit ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                    {costEstimate.needsRechargePit ? 'Recommended' : 'Not Required'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Filter Type</span>
                  <span className="font-semibold text-gray-900 dark:text-white">First-flush & Mesh</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg mb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
              
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-teal-400" /> Financial Estimate
              </h3>
              
              <div className="space-y-2 text-sm text-gray-300 mb-4">
                <div className="flex justify-between"><span>Tank & Setup</span><span>₹{costEstimate.tank.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Piping & Filters</span><span>₹{(costEstimate.piping + costEstimate.filter).toLocaleString()}</span></div>
                {costEstimate.needsRechargePit && (
                  <div className="flex justify-between"><span>Recharge Pit</span><span>₹{costEstimate.rechargePit.toLocaleString()}</span></div>
                )}
                <div className="flex justify-between"><span>Installation</span><span>₹{costEstimate.installation.toLocaleString()}</span></div>
              </div>
              
              <div className="border-t border-slate-700 pt-3 flex justify-between items-end mb-4">
                <span className="text-gray-400 font-medium">Estimated Total</span>
                <span className="text-2xl font-bold text-teal-400">₹{costEstimate.total.toLocaleString()}</span>
              </div>

              <div className="bg-slate-800 rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-400 uppercase">Estimated Payback</p>
                  <p className="font-bold">{paybackPeriod} years</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase">Annual Savings</p>
                  <p className="font-bold text-green-400">~₹{(annualHarvest * 0.15).toLocaleString()}</p>
                </div>
              </div>
            </div>

            <button 
              onClick={handleSaveDesign}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/30"
            >
              <Save className="w-5 h-5" /> Save This Design
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <AlertCircle className="w-3 h-3" /> Estimates are indicative
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designer;
