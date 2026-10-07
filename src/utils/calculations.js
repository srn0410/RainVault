// Convert SqM to SqFt
export const sqMToSqFt = (sqm) => sqm * 10.7639;

// Convert SqFt to SqM
export const sqFtToSqM = (sqft) => sqft / 10.7639;

/**
 * Calculate expected harvested water
 * roofArea: in SqM
 * rainfall: in mm
 * runoffCoefficient: 0 to 1 (e.g. 0.85 for concrete roof)
 * Returns liters per year
 */
export const calculateHarvestedWater = (roofArea, rainfall, runoffCoefficient = 0.85) => {
  if (!roofArea || !rainfall) return 0;
  // Area (m2) * Rainfall (mm) * Runoff Coefficient = Harvest in Liters
  return Math.round(roofArea * rainfall * runoffCoefficient);
};

/**
 * Recommend a tank size based on annual harvest
 */
export const calculateRecommendedTank = (annualHarvest) => {
  // A simple heuristic: tank size could be around 5% - 10% of annual harvest for decent dry spell coverage
  // or fixed standard sizes based on harvest
  if (annualHarvest <= 10000) return 1000;
  if (annualHarvest <= 30000) return 3000;
  if (annualHarvest <= 50000) return 5000;
  if (annualHarvest <= 80000) return 7500;
  if (annualHarvest <= 120000) return 10000;
  return 15000;
};

/**
 * Estimate System Cost based on Tank Size
 */
export const estimateSystemCost = (tankSize) => {
  const baseCosts = {
    piping: 8000,
    filter: 4500,
    installation: 6500,
  };
  
  // Approximate tank cost ₹5 per liter
  const tankCost = tankSize * 5;
  
  // Recharge pit cost - recommend if harvest > 50000
  const needsRechargePit = tankSize > 5000;
  const rechargePitCost = needsRechargePit ? 12000 : 0;

  return {
    tank: tankCost,
    piping: baseCosts.piping,
    filter: baseCosts.filter,
    rechargePit: rechargePitCost,
    installation: baseCosts.installation,
    total: tankCost + baseCosts.piping + baseCosts.filter + rechargePitCost + baseCosts.installation,
    needsRechargePit
  };
};

/**
 * Calculate Payback period in years
 * Assuming water cost of ₹0.15 per liter
 */
export const calculatePayback = (systemCost, annualHarvest) => {
  const annualSavings = annualHarvest * 0.15;
  if (annualSavings === 0) return 0;
  return (systemCost / annualSavings).toFixed(1);
};
