import { useState, useEffect, useMemo, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, CheckCircle, TrendingDown } from 'lucide-react';

interface CostCalculatorProps {
  onUpdate?: (costs: any) => void;
}

export default function CostCalculator({ onUpdate }: CostCalculatorProps) {
  // CORRECT EXCHANGE RATE: 1 USD = 0.385 OMR
  const USD_TO_OMR_RATE = 0.385;
  const OMR_TO_USD_RATE = 1 / USD_TO_OMR_RATE; // 1 OMR = 2.6 USD

  // Current supplier price
  const CURRENT_PRICE_OMR = 115;

  // Verified logistics costs (from research report)
  const OCEAN_FREIGHT_USD = 2500; // Per 40ft HC container
  const CONTAINER_CAPACITY = 230; // Tyres per container
  const CLEARANCE_HAULAGE_OMR = 250; // Total for entire container

  // Verified supplier scenarios
  const suppliers = [
    {
      name: 'Triangle Tyre (Recommended)',
      model: 'TR668 / TR691',
      fobMin: 175,
      fobMax: 195,
      warranty: 'Full Factory',
      contact: 'exports@triangletire.cn',
      advantage: 'Fragmented distribution, no monopolistic blocker',
      risk: 'Low-Medium',
      color: 'bg-green-50 dark:bg-green-950 border-green-500',
    },
    {
      name: 'Aeolus Tyre',
      model: 'HN08 / HN25',
      fobMin: 180,
      fobMax: 200,
      warranty: 'Full Factory',
      contact: 'export@aeolustype.com',
      advantage: 'Heavy-duty specialist, overload capability',
      risk: 'Low-Medium',
      color: 'bg-blue-50 dark:bg-blue-950 border-blue-500',
    },
    {
      name: 'Parallel Import (Westlake)',
      model: 'CM998',
      fobMin: 145,
      fobMax: 165,
      warranty: 'Void / None',
      contact: 'Sinotyre, Maxplus, Qingdao Oriental',
      advantage: 'Lowest price',
      risk: 'High (Warranty void, bead damage risk)',
      color: 'bg-red-50 dark:bg-red-950 border-red-500',
    },
  ];

  const [selectedSupplier, setSelectedSupplier] = useState(0);
  const handleSupplierChange = useCallback((index: number) => {
    setSelectedSupplier(index);
    const supplier = suppliers[index];
    setFactoryPriceUSD((supplier.fobMin + supplier.fobMax) / 2);
  }, []);
  const [factoryPriceUSD, setFactoryPriceUSD] = useState(
    (suppliers[0].fobMin + suppliers[0].fobMax) / 2
  );
  const [annualVolume, setAnnualVolume] = useState(1000);

  // Calculate landed cost - EXACT FORMULA FROM RESEARCH REPORT
  const calculateLandedCost = (fobUSD: number, volume: number) => {
    // Step 1: Calculate CIF in USD
    const insuranceUSD = fobUSD * 0.01; // 1% of FOB
    const oceanFreightPerTyreUSD = OCEAN_FREIGHT_USD / CONTAINER_CAPACITY;
    const cifUSD = fobUSD + insuranceUSD + oceanFreightPerTyreUSD;

    // Step 2: Convert CIF to OMR
    const cifOMR = cifUSD * USD_TO_OMR_RATE;

    // Step 3: Calculate Customs Duty (5% on CIF in OMR)
    const customsDutyOMR = cifOMR * 0.05;

    // Step 4: Calculate Clearance & Haulage per tyre
    const clearancePerTyreOMR = CLEARANCE_HAULAGE_OMR / CONTAINER_CAPACITY;

    // Step 5: Calculate Subtotal (Pre-VAT)
    const subtotalOMR = cifOMR + customsDutyOMR + clearancePerTyreOMR;

    // Step 6: Calculate VAT (5% on Subtotal)
    const vatOMR = subtotalOMR * 0.05;

    // Step 7: Final Landed Cost
    const totalLandedCostOMR = subtotalOMR + vatOMR;

    // Step 8: Calculate savings
    const savingsPerTyreOMR = CURRENT_PRICE_OMR - totalLandedCostOMR;

    return {
      // Components for display
      fobUSD,
      fobOMR: fobUSD * USD_TO_OMR_RATE,
      insuranceUSD,
      insuranceOMR: insuranceUSD * USD_TO_OMR_RATE,
      oceanFreightUSD: oceanFreightPerTyreUSD,
      oceanFreightOMR: oceanFreightPerTyreUSD * USD_TO_OMR_RATE,
      cifUSD,
      cifOMR,
      customsDutyOMR,
      clearanceOMR: clearancePerTyreOMR,
      subtotalOMR,
      vatOMR,

      // Total landed cost
      totalLandedCostOMR,
      totalLandedCostUSD: totalLandedCostOMR * OMR_TO_USD_RATE,

      // Savings
      savingsPerTyreOMR,
      savingsPerTyreUSD: savingsPerTyreOMR * OMR_TO_USD_RATE,
      annualSavingsOMR: savingsPerTyreOMR * volume,
      annualSavingsUSD: (savingsPerTyreOMR * OMR_TO_USD_RATE) * volume,
    };
  };

  const costs = useMemo(() => calculateLandedCost(factoryPriceUSD, annualVolume), [factoryPriceUSD, annualVolume]);

  // Update parent component when costs change
  useEffect(() => {
    if (onUpdate) {
      onUpdate({
        fobOMR: costs.fobOMR,
        insuranceOMR: costs.insuranceOMR,
        shippingOMR: costs.oceanFreightOMR,
        customsDutyOMR: costs.customsDutyOMR,
        vatOMR: costs.vatOMR,
        handlingOMR: costs.clearanceOMR,
      });
    }
  }, [costs.fobOMR, costs.insuranceOMR, costs.oceanFreightOMR, costs.customsDutyOMR, costs.vatOMR, costs.clearanceOMR, onUpdate]);

  return (
    <div className="space-y-6">
      {/* Supplier Selection */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-foreground mb-4">Select Supplier Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((supplier, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSupplier(idx);
                setFactoryPriceUSD((supplier.fobMin + supplier.fobMax) / 2);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedSupplier === idx
                  ? supplier.color + ' border-current'
                  : 'border-border hover:border-primary'
              }`}
            >
              <h4 className="font-bold text-foreground text-left">{supplier.name}</h4>
              <p className="text-sm text-muted-foreground text-left mt-2">{supplier.model}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Price Adjustment */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-foreground mb-4">Adjust Factory Price</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Factory Price (FOB): ${factoryPriceUSD.toFixed(2)} USD
            </label>
            <Slider
              value={[factoryPriceUSD]}
              onValueChange={(value) => setFactoryPriceUSD(value[0])}
              min={suppliers[selectedSupplier].fobMin}
              max={suppliers[selectedSupplier].fobMax}
              step={1}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Range: ${suppliers[selectedSupplier].fobMin} - ${suppliers[selectedSupplier].fobMax}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground">
              Annual Volume: {annualVolume.toLocaleString()} units
            </label>
            <Slider
              value={[annualVolume]}
              onValueChange={(value) => setAnnualVolume(value[0])}
              min={300}
              max={2000}
              step={100}
              className="mt-2"
            />
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-foreground mb-6">Cost Breakdown (Per Tyre)</h3>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">FOB Price</span>
            <span className="font-semibold">${costs.fobUSD.toFixed(2)} / {costs.fobOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">Insurance (1%)</span>
            <span className="font-semibold">${costs.insuranceUSD.toFixed(2)} / {costs.insuranceOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">Ocean Freight</span>
            <span className="font-semibold">${costs.oceanFreightUSD.toFixed(2)} / {costs.oceanFreightOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border bg-slate-50 dark:bg-slate-700 px-3 rounded">
            <span className="text-foreground font-medium">CIF Value</span>
            <span className="font-bold">${costs.cifUSD.toFixed(2)} / {costs.cifOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">Customs Duty (5%)</span>
            <span className="font-semibold">{costs.customsDutyOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">Clearance & Haulage</span>
            <span className="font-semibold">{costs.clearanceOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border bg-slate-50 dark:bg-slate-700 px-3 rounded">
            <span className="text-foreground font-medium">Subtotal (Pre-VAT)</span>
            <span className="font-bold">{costs.subtotalOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-foreground">VAT (5%)</span>
            <span className="font-semibold">{costs.vatOMR.toFixed(2)} OMR</span>
          </div>

          <div className="flex justify-between items-center py-3 bg-blue-50 dark:bg-blue-950 px-4 rounded-lg border-2 border-blue-500">
            <span className="text-foreground font-bold">Total Landed Cost</span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {costs.totalLandedCostOMR.toFixed(2)} OMR / ${costs.totalLandedCostUSD.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Savings Analysis */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold text-foreground mb-6">Profitability Analysis</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Savings vs Current (115 OMR)</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {costs.savingsPerTyreOMR.toFixed(2)} OMR
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ${costs.savingsPerTyreUSD.toFixed(2)} USD per tyre
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950 border-2 border-blue-500 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Annual Savings</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {(costs.annualSavingsOMR / 1000).toFixed(1)}K OMR
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              ${(costs.annualSavingsUSD / 1000).toFixed(1)}K USD at {annualVolume.toLocaleString()} units/year
            </p>
          </div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className={`p-6 rounded-lg border-2 ${suppliers[selectedSupplier].color}`}>
        <div className="flex items-start gap-3">
          {suppliers[selectedSupplier].risk.includes('High') ? (
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
          ) : (
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
          )}
          <div>
            <h4 className="font-bold text-foreground mb-2">
              {suppliers[selectedSupplier].name}
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground">Model</p>
                <p className="font-semibold text-foreground">{suppliers[selectedSupplier].model}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Warranty</p>
                <p className="font-semibold text-foreground">{suppliers[selectedSupplier].warranty}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Risk Level</p>
                <p className="font-semibold text-foreground">{suppliers[selectedSupplier].risk}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="font-semibold text-foreground text-sm">{suppliers[selectedSupplier].contact}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Key Advantage</p>
              <p className="font-semibold text-foreground">{suppliers[selectedSupplier].advantage}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Source Note */}
      <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-slate-400">
        <p className="text-sm text-muted-foreground">
          Data Source: All pricing, shipping costs, and logistics data are verified from Q4 2024 market research. Exchange Rate: 1 USD = 0.385 OMR
        </p>
      </div>
    </div>
  );
}
