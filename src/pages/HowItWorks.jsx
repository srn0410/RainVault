import React from 'react';
import { Link } from 'react-router-dom';
import { Map, Calculator, CloudRain, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <Map className="w-8 h-8 text-blue-600" />,
      title: "Draw your roof",
      description: "Use our interactive satellite map to locate your building and trace the outline of your roof."
    },
    {
      id: 2,
      icon: <Calculator className="w-8 h-8 text-blue-600" />,
      title: "Calculate roof area",
      description: "Our system automatically calculates your roof's total square footage and catchment potential."
    },
    {
      id: 3,
      icon: <CloudRain className="w-8 h-8 text-blue-600" />,
      title: "Simulate rainfall",
      description: "We apply local historical rainfall data to estimate your potential annual water harvest."
    },
    {
      id: 4,
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Get a right-sized design",
      description: "Receive recommendations for tank size, recharge pit needs, and estimated costs."
    }
  ];

  return (
    <div className="py-16 px-4 max-w-5xl mx-auto w-full">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">How RainVault Works</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Four simple steps to design your personalized rainwater harvesting system.
        </p>
      </div>

      <div className="relative">
        {/* Connecting line for desktop */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-blue-100 dark:bg-slate-800 -translate-y-1/2 z-0"></div>
        
        <div className="grid md:grid-cols-4 gap-8 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 text-center relative group hover:shadow-md transition-shadow">
              <div className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-gray-500 font-bold rounded-full flex items-center justify-center text-sm">
                {step.id}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20 text-center">
        <Link 
          to="/design" 
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-sm"
        >
          Start Your Design Now
        </Link>
      </div>
    </div>
  );
};

export default HowItWorks;
