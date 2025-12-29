import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, TrendingDown, AlertTriangle } from 'lucide-react';

export default function CostCalculator() {
  // Verified data from research report (Q4 2024)
  const EXCHANGE_RATE = 0.385; // 1 OMR = 0.385 USD (or 1 USD = 2.6 OMR)
  const CURRENT_PRICE_OMR = 115; // Current supplier (Saud Bahwan/Westlake)

  // Verified logistics costs
  const OCEAN_FREIGHT_USD = 2500; // Per 40ft HC container
  const CONTAINER_CAPACITY = 230; // Tyres per container (normal loading, no doubling)
  const PORT_HANDLING_OMR = 150; // Per container
  const CLEARANCE_OMR = 100; // Per container
  const LOCAL_TRANSPORT_OMR = 100; // Per container

  // Verified supplier scenarios from research report
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
  const [factoryPrice, setFactoryPrice] = useState(
    (suppliers[0].fobMin + suppliers[0].fobMax) / 2
  );
  const [annualVolume, setAnnualVolume] = useState(1000);

  // Calculate landed cost
  const calculateLandedCost = (fobPrice: number, volume: number) => {
    const insurance = fobPrice * 0.01; // 1% of FOB
    const cifValue = fobPrice + insurance;
    const cifValueOMR = cifValue * EXCHANGE_RATE;

    const shippingPerTyre = (OCEAN_FREIGHT_USD / CONTAINER_CAPACITY) / (1 / EXCHANGE_RATE);
    const portHandlingPerTyre = PORT_HANDLING_OMR / CONTAINER_CAPACITY;
    const clearancePerTyre = CLEARANCE_OMR / CONTAINER_CAPACITY;
    const transportPerTyre = LOCAL_TRANSPORT_OMR / CONTAINER_CAPACITY;

    const customsDuty = cifValueOMR * 0.05; // 5% on CIF
    const vat = (cifValueOMR + customsDuty) * 0.05; // 5% on CIF + duty

    const totalLandedCostOMR =
      (cifValue / EXCHANGE_RATE) +
      (customsDuty / EXCHANGE_RATE) +
      (vat / EXCHANGE_RATE) +
      shippingPerTyre +
      portHandlingPerTyre +
      clearancePerTyre +
      transportPerTyre;

    return {
      fobUSD: fobPrice,
      fobOMR: fobPrice * EXCHANGE_RATE,
      insurance,
      shipping: shippingPerTyre,
      customsDuty: customsDuty / CONTAINER_CAPACITY,
      vat: vat / CONTAINER_CAPACITY,
      portHandling: portHandlingPerTyre,
      clearance: clearancePerTyre,
      transport: transportPerTyre,
      totalLandedCostOMR,
      totalLandedCostUSD: totalLandedCostOMR / EXCHANGE_RATE,
      savingsPerTyre: CURRENT_PRICE_OMR - totalLandedCostOMR,
      annualSavings: (CURRENT_PRICE_OMR - totalLandedCostOMR) * volume,
    };
  };

  const supplier = suppliers[selectedSupplier];
  const costs = calculateLandedCost(factoryPrice, annualVolume);
  const isProfitable = costs.savingsPerTyre > 0;
  const targetPrice = 95; // HSC's target to unlock volume growth
  const meetsTarget = costs.totalLandedCostOMR <= targetPrice;

  // Helper function to convert USD to OMR
  const usdToOmr = (usd: number) => usd / EXCHANGE_RATE;

  return (
    <div className="space-y-8">
      {/* Supplier Selection */}
      <Card className="p-6 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-4">Select Supplier Strategy</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((sup, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedSupplier(idx);
                setFactoryPrice((sup.fobMin + sup.fobMax) / 2);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedSupplier === idx
                  ? `${sup.color} border-current`
                  : 'border-border bg-secondary'
              }`}
            >
              <p className="font-semibold text-foreground mb-1">{sup.name}</p>
              <p className="text-sm text-muted-foreground mb-2">{sup.model}</p>
              <p className="text-xs font-medium text-muted-foreground">
                FOB: ${sup.fobMin}-${sup.fobMax}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Risk: {sup.risk}</p>
            </button>
          ))}
        </div>
      </Card>

      {/* Supplier Details */}
      <Card className={`p-6 card-elevated border-2 ${supplier.color}`}>
        <h4 className="text-lg font-semibold text-foreground mb-6">{supplier.name}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-background dark:bg-slate-900 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Model</p>
            <p className="font-semibold text-foreground text-sm">{supplier.model}</p>
          </div>
          <div className="p-4 bg-background dark:bg-slate-900 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Warranty</p>
            <p className="font-semibold text-foreground text-sm">{supplier.warranty}</p>
          </div>
          <div className="p-4 bg-background dark:bg-slate-900 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Risk Level</p>
            <p className="font-semibold text-foreground text-sm">{supplier.risk}</p>
          </div>
          <div className="p-4 bg-background dark:bg-slate-900 rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Contact</p>
            <p className="font-semibold text-foreground text-xs break-all">{supplier.contact}</p>
          </div>
        </div>
        <div className="mt-4 p-4 bg-background dark:bg-slate-900 rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Key Advantage</p>
          <p className="font-semibold text-foreground">{supplier.advantage}</p>
        </div>
        {selectedSupplier === 2 && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 rounded-lg border border-red-500">
            <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ High Risk Warning</p>
            <p className="text-sm text-red-900 dark:text-red-100">Parallel imports have voided warranties and risk of bead damage from "doubling" (compressing tyres to save freight). Not recommended for tanker operations.</p>
          </div>
        )}
      </Card>
      {/* Calculator Controls */}
      <Card className="p-6 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-6">Adjust Parameters</h4>
        <div className="space-y-8">
          {/* Factory Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">Factory Price (FOB USD)</label>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${factoryPrice.toFixed(0)}</p>
                <p className="text-xs text-muted-foreground">
                  {supplier.fobMin}-{supplier.fobMax} range
                </p>
              </div>
            </div>
            <Slider
              value={[factoryPrice]}
              onValueChange={(val) => setFactoryPrice(val[0])}
              min={supplier.fobMin}
              max={supplier.fobMax}
              step={5}
              className="w-full"
            />
          </div>

          {/* Annual Volume Slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">Annual Volume (Tyres)</label>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{annualVolume.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Current: 315 | Growth target: 1,100</p>
              </div>
            </div>
            <Slider
              value={[annualVolume]}
              onValueChange={(val) => setAnnualVolume(val[0])}
              min={300}
              max={1200}
              step={50}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Results Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profitability Status */}
        <Card className={`p-6 card-elevated ${isProfitable ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
          <div className="flex items-start gap-4">
            {isProfitable ? (
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
            )}
            <div>
              <h5 className="font-semibold text-foreground mb-2">
                {isProfitable ? 'Profitable ✓' : 'Not Profitable'}
              </h5>
              <p className="text-sm text-muted-foreground mb-3">
                {isProfitable
                  ? `Each tyre saves ${costs.savingsPerTyre.toFixed(2)} OMR vs current supplier`
                  : 'Cost exceeds current supplier price'}
              </p>
              {meetsTarget && (
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded text-xs text-green-900 dark:text-green-100 font-medium">
                  ✓ Meets 95 OMR target price for volume unlock
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Annual Impact */}
        <Card className="p-6 card-elevated">
          <div className="flex items-start gap-4">
            <TrendingDown className="w-8 h-8 text-primary flex-shrink-0" />
            <div>
              <h5 className="font-semibold text-foreground mb-2">Annual Savings</h5>
              <p className="text-3xl font-bold text-primary mb-1">
                {(costs.annualSavings / 1000).toFixed(0)}K OMR
              </p>
              <p className="text-sm text-muted-foreground">
                At {annualVolume.toLocaleString()} tyres/year
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed Cost Breakdown */}
      <Card className="p-6 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-4">Cost Breakdown (Per Tyre)</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Factory Price (FOB)</span>
            <span className="font-semibold">${costs.fobUSD.toFixed(2)} ({(costs.fobUSD / EXCHANGE_RATE).toFixed(2)} OMR)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Insurance (1%)</span>
            <span className="font-semibold">${costs.insurance.toFixed(2)} ({(costs.insurance / EXCHANGE_RATE).toFixed(2)} OMR)</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Ocean Freight</span>
            <span className="font-semibold">{(costs.shipping).toFixed(2)} OMR (${(costs.shipping * EXCHANGE_RATE).toFixed(2)})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Customs Duty (5%)</span>
            <span className="font-semibold">{(costs.customsDuty).toFixed(2)} OMR (${(costs.customsDuty * EXCHANGE_RATE).toFixed(2)})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">VAT (5%)</span>
            <span className="font-semibold">{(costs.vat).toFixed(2)} OMR (${(costs.vat * EXCHANGE_RATE).toFixed(2)})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Port Handling & Clearance</span>
            <span className="font-semibold">{(costs.portHandling + costs.clearance).toFixed(2)} OMR (${((costs.portHandling + costs.clearance) * EXCHANGE_RATE).toFixed(2)})</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-secondary rounded">
            <span className="text-sm font-medium">Local Transport</span>
            <span className="font-semibold">{(costs.transport).toFixed(2)} OMR (${(costs.transport * EXCHANGE_RATE).toFixed(2)})</span>
          </div>
          <div className="border-t border-border pt-3 mt-3">
            <div className="flex justify-between items-center p-3 bg-primary text-primary-foreground rounded font-semibold">
              <span>Total Landed Cost</span>
              <span>{costs.totalLandedCostOMR.toFixed(2)} OMR (${(costs.totalLandedCostOMR * EXCHANGE_RATE).toFixed(2)})</span>
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded font-semibold">
            <span>Savings vs Current (115 OMR)</span>
            <span>+{costs.savingsPerTyre.toFixed(2)} OMR/tyre</span>
          </div>
        </div>
      </Card>

      {/* Important Notes */}
      <Card className="p-6 card-elevated bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-500">
        <h4 className="font-semibold text-foreground mb-3">⚠️ Important Notes</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• <strong>Data Source:</strong> Verified Q4 2024 market research. Shipping rates and supplier pricing are current.</li>
          <li>• <strong>Container Capacity:</strong> 230 tyres assumes normal interlaced loading. NEVER allow "doubling" (compression) as it damages bead integrity.</li>
          <li>• <strong>Westlake Direct:</strong> Contractually blocked by Oman's Commercial Agencies Law. Triangle is the recommended alternative.</li>
          <li>• <strong>Pilot Phase:</strong> Start with 1 container (230 units) to validate quality and logistics before scaling to 1,000+ units/year.</li>
          <li>• <strong>GSO Certification:</strong> Mandatory for all tyres entering GCC countries. Verify certificates before transferring deposit.</li>
        </ul>
      </Card>
    </div>
  );
}
