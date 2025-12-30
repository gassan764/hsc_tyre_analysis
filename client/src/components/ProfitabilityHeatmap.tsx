import { useState } from 'react';
import { calculateLandedCost, CURRENT_PRICE_OMR, formatOMR, formatK } from '@/lib/calculations';

interface HeatmapCell {
  volume: number;
  fobPrice: number;
  landedCost: number;
  savings: number;
  annualSavings: number;
  savingsPercent: number;
}

export default function ProfitabilityHeatmap() {
  const [hoveredCell, setHoveredCell] = useState<HeatmapCell | null>(null);
  
  // Define ranges
  const volumes = [500, 750, 1000, 1200, 1500, 2000];
  const fobPrices = [145, 155, 165, 175, 180, 185, 195];
  
  // Generate heatmap data
  const generateCellData = (volume: number, fobPrice: number): HeatmapCell => {
    const costs = calculateLandedCost(fobPrice, volume);
    return {
      volume,
      fobPrice,
      landedCost: costs.totalLandedCostOMR,
      savings: costs.savingsPerTyreOMR,
      annualSavings: costs.annualSavingsOMR,
      savingsPercent: costs.savingsPercentage,
    };
  };
  
  // Get color based on annual savings
  const getColor = (annualSavings: number): string => {
    if (annualSavings >= 40000) return 'bg-green-600 text-white';
    if (annualSavings >= 30000) return 'bg-green-500 text-white';
    if (annualSavings >= 20000) return 'bg-green-400 text-white';
    if (annualSavings >= 15000) return 'bg-green-300 text-green-900';
    if (annualSavings >= 10000) return 'bg-green-200 text-green-900';
    if (annualSavings >= 5000) return 'bg-yellow-200 text-yellow-900';
    if (annualSavings > 0) return 'bg-yellow-100 text-yellow-900';
    return 'bg-red-100 text-red-900';
  };
  
  // Reference point: Triangle at $180, 1000 units
  const referenceCell = generateCellData(1000, 180);
  
  return (
    <div className="card-elevated p-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold">Profitability Heatmap</h4>
          <p className="text-gray-600 text-sm mt-1">
            Annual savings potential at different volumes and FOB prices
          </p>
        </div>
        
        {/* Hover info */}
        {hoveredCell && (
          <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg">
            <p className="text-sm font-medium mb-1">
              {hoveredCell.volume.toLocaleString()} units @ ${hoveredCell.fobPrice} FOB
            </p>
            <p className="text-lg font-bold number-display">
              {formatK(hoveredCell.annualSavings)} OMR/year
            </p>
            <p className="text-xs opacity-75">
              {formatOMR(hoveredCell.landedCost)} OMR landed ({hoveredCell.savingsPercent.toFixed(1)}% off)
            </p>
          </div>
        )}
      </div>
      
      {/* Heatmap Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-3 px-2 font-semibold text-gray-700 bg-gray-100 rounded-tl-lg">
                Volume / FOB
              </th>
              {fobPrices.map((price) => (
                <th 
                  key={price} 
                  className={`text-center py-3 px-2 font-semibold bg-gray-100 ${
                    price === 180 ? 'text-[#3d7ea6]' : 'text-gray-700'
                  }`}
                >
                  ${price}
                  {price === 180 && (
                    <span className="block text-xs font-normal text-[#3d7ea6]">Target</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volumes.map((volume, vIdx) => (
              <tr key={volume}>
                <td className={`py-2 px-2 font-medium text-gray-700 bg-gray-50 ${
                  volume === 1000 ? 'text-[#1e3a5f] font-bold' : ''
                }`}>
                  {volume.toLocaleString()}
                  {volume === 1000 && (
                    <span className="block text-xs font-normal text-[#3d7ea6]">Baseline</span>
                  )}
                </td>
                {fobPrices.map((fobPrice, pIdx) => {
                  const cell = generateCellData(volume, fobPrice);
                  const isReference = volume === 1000 && fobPrice === 180;
                  
                  return (
                    <td
                      key={`${volume}-${fobPrice}`}
                      className={`text-center py-2 px-1 cursor-pointer transition-all ${getColor(cell.annualSavings)} ${
                        isReference ? 'ring-2 ring-[#1e3a5f] ring-offset-1' : ''
                      }`}
                      onMouseEnter={() => setHoveredCell(cell)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="font-bold number-display">
                        {formatK(cell.annualSavings)}
                      </div>
                      <div className="text-xs opacity-75">
                        {formatOMR(cell.savings)}/tyre
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Legend */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h5 className="font-semibold text-gray-700 mb-3">Legend (Annual Savings)</h5>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-600"></div>
            <span className="text-sm text-gray-600">40K+ OMR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-500"></div>
            <span className="text-sm text-gray-600">30-40K OMR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-400"></div>
            <span className="text-sm text-gray-600">20-30K OMR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-300"></div>
            <span className="text-sm text-gray-600">15-20K OMR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-green-200"></div>
            <span className="text-sm text-gray-600">10-15K OMR</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-yellow-200"></div>
            <span className="text-sm text-gray-600">5-10K OMR</span>
          </div>
        </div>
      </div>
      
      {/* Key Insight */}
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Recommended:</strong> At 1,000 units with $180 FOB (Triangle), 
          you achieve <span className="font-bold number-display">{formatK(referenceCell.annualSavings)} OMR</span> annual 
          savings with a landed cost of <span className="font-bold number-display">{formatOMR(referenceCell.landedCost)} OMR</span> per tyre.
        </p>
      </div>
    </div>
  );
}
