import { useState, useMemo, useCallback } from 'react';
import { Slider } from './Slider';
import { 
  calculateLandedCost, 
  SUPPLIERS, 
  CURRENT_PRICE_OMR,
  formatOMR,
  formatUSD,
  formatK,
  USD_TO_OMR_RATE,
  type CostBreakdown,
  type SupplierInfo 
} from '@/lib/calculations';
import { CheckCircle, AlertTriangle, Info, TrendingUp, Package, DollarSign } from 'lucide-react';

interface CostCalculatorProps {
  onUpdate?: (costs: CostBreakdown) => void;
}

// Preset volume buttons
const VOLUME_PRESETS = [
  { label: '500', value: 500 },
  { label: '1,000', value: 1000 },
  { label: '1,200', value: 1200 },
  { label: '1,500', value: 1500 },
];

export default function CostCalculator({ onUpdate }: CostCalculatorProps) {
  const [selectedSupplierIndex, setSelectedSupplierIndex] = useState(0);
  const [factoryPriceUSD, setFactoryPriceUSD] = useState(180); // Default to reference price
  const [annualVolume, setAnnualVolume] = useState(1000);
  
  const selectedSupplier = SUPPLIERS[selectedSupplierIndex];
  
  // Memoized cost calculation
  const costs = useMemo(() => {
    const result = calculateLandedCost(factoryPriceUSD, annualVolume);
    onUpdate?.(result);
    return result;
  }, [factoryPriceUSD, annualVolume, onUpdate]);
  
  // Handle supplier change
  const handleSupplierChange = useCallback((index: number) => {
    setSelectedSupplierIndex(index);
    const supplier = SUPPLIERS[index];
    // Set to midpoint of supplier's FOB range
    setFactoryPriceUSD(Math.round((supplier.fobMin + supplier.fobMax) / 2));
  }, []);
  
  // Handle FOB price input
  const handleFobInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= selectedSupplier.fobMin && value <= selectedSupplier.fobMax) {
      setFactoryPriceUSD(value);
    }
  }, [selectedSupplier]);
  
  // Handle volume input
  const handleVolumeInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 100 && value <= 2500) {
      setAnnualVolume(value);
    }
  }, []);
  
  return (
    <div className="space-y-6">
      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-5 border-l-4 border-l-[#059669]">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-[#059669]" />
            <span className="text-sm font-medium text-gray-500">Landed Cost</span>
          </div>
          <div className="number-display text-3xl font-bold text-[#059669]">
            {formatOMR(costs.totalLandedCostOMR)} <span className="text-lg font-normal">OMR</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            vs. {CURRENT_PRICE_OMR} OMR current
          </div>
        </div>
        
        <div className="card p-5 border-l-4 border-l-[#3d7ea6]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-[#3d7ea6]" />
            <span className="text-sm font-medium text-gray-500">Savings Per Tyre</span>
          </div>
          <div className="number-display text-3xl font-bold text-[#3d7ea6]">
            {formatOMR(costs.savingsPerTyreOMR)} <span className="text-lg font-normal">OMR</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {costs.savingsPercentage.toFixed(1)}% reduction
          </div>
        </div>
        
        <div className="card p-5 border-l-4 border-l-[#1e3a5f]">
          <div className="flex items-center gap-2 mb-2">
            <Package className="w-5 h-5 text-[#1e3a5f]" />
            <span className="text-sm font-medium text-gray-500">Annual Savings</span>
          </div>
          <div className="number-display text-3xl font-bold text-[#1e3a5f]">
            {formatK(costs.annualSavingsOMR)} <span className="text-lg font-normal">OMR</span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            ${formatK(costs.annualSavingsUSD)} USD at {annualVolume.toLocaleString()} units
          </div>
        </div>
      </div>
      
      {/* Supplier Selection */}
      <div className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-4">Select Supplier Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SUPPLIERS.map((supplier, idx) => (
            <button
              key={supplier.id}
              onClick={() => handleSupplierChange(idx)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedSupplierIndex === idx
                  ? `border-[${supplier.borderColor}] bg-[${supplier.bgColor}] shadow-md`
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
              style={{
                borderColor: selectedSupplierIndex === idx ? supplier.borderColor : undefined,
                backgroundColor: selectedSupplierIndex === idx ? supplier.bgColor : undefined,
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-gray-900">{supplier.name}</h4>
                {supplier.riskLevel === 'high' ? (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                ) : (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{supplier.model}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  ${supplier.fobMin}-${supplier.fobMax} FOB
                </span>
                <span 
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    supplier.riskLevel === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {supplier.riskLabel}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      {/* Calculator Controls */}
      <div className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-6">Adjust Parameters</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FOB Price Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-gray-700">Factory Price (FOB)</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#3d7ea6] number-display">
                  ${factoryPriceUSD}
                </span>
                <span className="text-gray-500">USD</span>
              </div>
            </div>
            
            <Slider
              value={[factoryPriceUSD]}
              onValueChange={(value) => setFactoryPriceUSD(value[0])}
              min={selectedSupplier.fobMin}
              max={selectedSupplier.fobMax}
              step={1}
              className="mb-3"
            />
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>${selectedSupplier.fobMin} (Budget)</span>
              <span>${selectedSupplier.fobMax} (Premium)</span>
            </div>
            
            <div className="mt-4 flex items-center gap-2">
              <label className="text-sm text-gray-600">Exact value:</label>
              <input
                type="number"
                value={factoryPriceUSD}
                onChange={handleFobInput}
                min={selectedSupplier.fobMin}
                max={selectedSupplier.fobMax}
                className="w-24 px-3 py-1.5 text-sm border-2 border-gray-200 rounded-lg focus:border-[#3d7ea6] focus:outline-none number-display"
              />
              <span className="text-sm text-gray-500">USD</span>
            </div>
          </div>
          
          {/* Volume Control */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="font-semibold text-gray-700">Annual Volume</label>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#1e3a5f] number-display">
                  {annualVolume.toLocaleString()}
                </span>
                <span className="text-gray-500">units</span>
              </div>
            </div>
            
            <Slider
              value={[annualVolume]}
              onValueChange={(value) => setAnnualVolume(value[0])}
              min={100}
              max={2500}
              step={50}
              className="mb-3"
            />
            
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span>100 units</span>
              <span>2,500 units</span>
            </div>
            
            {/* Preset Buttons */}
            <div className="flex flex-wrap gap-2">
              {VOLUME_PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setAnnualVolume(preset.value)}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    annualVolume === preset.value
                      ? 'bg-[#1e3a5f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cost Breakdown */}
      <div className="card-elevated p-6">
        <h3 className="text-xl font-bold mb-6">Cost Breakdown (Per Tyre)</h3>
        
        <div className="space-y-1">
          <CostRow 
            label="FOB Price" 
            valueOMR={costs.fobOMR} 
            valueUSD={costs.fobUSD}
            showUSD 
          />
          <CostRow 
            label="Insurance (1% of FOB)" 
            valueOMR={costs.insuranceOMR} 
            valueUSD={costs.insuranceUSD}
            showUSD 
          />
          <CostRow 
            label="Ocean Freight" 
            valueOMR={costs.oceanFreightOMR} 
            valueUSD={costs.oceanFreightUSD}
            showUSD 
          />
          <CostRow 
            label="CIF Value" 
            valueOMR={costs.cifOMR} 
            valueUSD={costs.cifUSD}
            highlight 
            showUSD 
          />
          <CostRow 
            label="Customs Duty (5%)" 
            valueOMR={costs.customsDutyOMR} 
          />
          <CostRow 
            label="Clearance & Haulage" 
            valueOMR={costs.clearanceOMR} 
          />
          <CostRow 
            label="Subtotal (Pre-VAT)" 
            valueOMR={costs.subtotalOMR} 
            highlight 
          />
          <CostRow 
            label="VAT (5%)" 
            valueOMR={costs.vatOMR} 
          />
          
          {/* Total */}
          <div className="cost-row total mt-4">
            <span className="font-bold">Total Landed Cost</span>
            <div className="text-right">
              <span className="text-2xl font-bold number-display">
                {formatOMR(costs.totalLandedCostOMR)} OMR
              </span>
              <div className="text-sm opacity-80">
                ${formatUSD(costs.totalLandedCostUSD)} USD
              </div>
            </div>
          </div>
        </div>
        
        {/* Verification Note */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-600">
              <strong>Verified Data:</strong> Exchange rate 1 USD = {USD_TO_OMR_RATE} OMR. 
              Container capacity: 230 tyres. Freight: $2,500/container. 
              Based on Q4 2024 market research.
            </div>
          </div>
        </div>
      </div>
      
      {/* Supplier Details */}
      <div 
        className="card-elevated p-6 border-l-4"
        style={{ borderLeftColor: selectedSupplier.borderColor }}
      >
        <div className="flex items-start gap-4">
          {selectedSupplier.riskLevel === 'high' ? (
            <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />
          )}
          
          <div className="flex-1">
            <h4 className="text-xl font-bold mb-1">{selectedSupplier.name}</h4>
            <p className="text-gray-600 mb-4">{selectedSupplier.description}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Model</p>
                <p className="font-semibold">{selectedSupplier.model}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Warranty</p>
                <p className={`font-semibold ${selectedSupplier.riskLevel === 'high' ? 'text-red-600' : ''}`}>
                  {selectedSupplier.warranty}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Contact</p>
                <p className="font-semibold text-sm">{selectedSupplier.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Risk Level</p>
                <span 
                  className={`risk-badge ${
                    selectedSupplier.riskLevel === 'high' ? 'high' : 
                    selectedSupplier.riskLevel === 'medium' ? 'medium' : 'low'
                  }`}
                >
                  {selectedSupplier.riskLabel}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold text-green-700 mb-2">Advantages</h5>
                <ul className="space-y-1">
                  {selectedSupplier.advantages.map((adv, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-green-500 font-bold">+</span>
                      {adv}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h5 className="font-semibold text-red-700 mb-2">Considerations</h5>
                <ul className="space-y-1">
                  {selectedSupplier.disadvantages.map((dis, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-red-500 font-bold">-</span>
                      {dis}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for cost rows
interface CostRowProps {
  label: string;
  valueOMR: number;
  valueUSD?: number;
  highlight?: boolean;
  showUSD?: boolean;
}

function CostRow({ label, valueOMR, valueUSD, highlight, showUSD }: CostRowProps) {
  return (
    <div className={`cost-row ${highlight ? 'highlight' : ''}`}>
      <span className="text-gray-700">{label}</span>
      <div className="text-right">
        <span className="font-semibold number-display">{formatOMR(valueOMR)} OMR</span>
        {showUSD && valueUSD !== undefined && (
          <span className="text-sm text-gray-500 ml-2">
            (${formatUSD(valueUSD)})
          </span>
        )}
      </div>
    </div>
  );
}
