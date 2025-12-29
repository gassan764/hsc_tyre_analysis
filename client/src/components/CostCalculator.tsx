import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight, TrendingUp, DollarSign, Package } from 'lucide-react';

interface CalculationResult {
  factoryPrice: number;
  insurance: number;
  shipping: number;
  cifValue: number;
  customsDuty: number;
  vat: number;
  handling: number;
  landedCostUSD: number;
  landedCostOMR: number;
  savingsPerTyre: number;
  savingsPerTyreOMR: number;
  savingsPercentage: number;
  annualSavingsOMR: number;
  annualSavingsUSD: number;
}

export default function CostCalculator() {
  const [volume, setVolume] = useState(1100);
  const [factoryPrice, setFactoryPrice] = useState(80);
  const [targetPrice, setTargetPrice] = useState(92.5);
  const [activeScenario, setActiveScenario] = useState('growth');

  const EXCHANGE_RATE = 2.6;
  const SHIPPING_COST = 750;
  const TYRES_PER_CONTAINER = 2500;
  const CUSTOMS_DUTY_RATE = 0.05;
  const VAT_RATE = 0.05;
  const HANDLING_CLEARANCE = 200;

  const scenarios = {
    current: { volume: 315, targetPrice: 115, label: 'Current (315 tyres)' },
    nearTerm: { volume: 425, targetPrice: 115, label: 'Near-Term (425 tyres)' },
    growth: { volume: 1100, targetPrice: 92.5, label: 'Growth (1,100 tyres)' },
  };

  const handleScenarioChange = (scenario: string) => {
    setActiveScenario(scenario);
    const s = scenarios[scenario as keyof typeof scenarios];
    setVolume(s.volume);
    setTargetPrice(s.targetPrice);
  };

  const calculation = useMemo((): CalculationResult => {
    const shippingPerTyre = SHIPPING_COST / TYRES_PER_CONTAINER;
    const handlingPerTyre = HANDLING_CLEARANCE / volume;
    const insurance = factoryPrice * 0.01;
    const cifValue = factoryPrice + insurance + shippingPerTyre;
    const customsDuty = cifValue * CUSTOMS_DUTY_RATE;
    const vat = (cifValue + customsDuty) * VAT_RATE;
    const landedCostUSD = cifValue + customsDuty + vat + handlingPerTyre;
    const landedCostOMR = landedCostUSD / EXCHANGE_RATE;

    const targetPriceUSD = targetPrice * EXCHANGE_RATE;
    const savingsPerTyreUSD = targetPriceUSD - landedCostUSD;
    const savingsPerTyreOMR = targetPrice - landedCostOMR;
    const savingsPercentage = (savingsPerTyreUSD / targetPriceUSD) * 100;
    const annualSavingsUSD = savingsPerTyreUSD * volume;
    const annualSavingsOMR = savingsPerTyreOMR * volume;

    return {
      factoryPrice,
      insurance,
      shipping: shippingPerTyre,
      cifValue,
      customsDuty,
      vat,
      handling: handlingPerTyre,
      landedCostUSD,
      landedCostOMR,
      savingsPerTyre: savingsPerTyreUSD,
      savingsPerTyreOMR,
      savingsPercentage,
      annualSavingsOMR,
      annualSavingsUSD,
    };
  }, [volume, factoryPrice, targetPrice]);

  const formatCurrency = (value: number, currency: string = 'USD') => {
    if (currency === 'OMR') {
      return `${value.toFixed(2)} OMR`;
    }
    return `$${value.toFixed(2)}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  const isProfit = calculation.annualSavingsOMR > 0;

  return (
    <div className="w-full space-y-8">
      {/* Scenario Selector */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">Select Scenario</h3>
        <Tabs value={activeScenario} onValueChange={handleScenarioChange}>
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="nearTerm">Near-Term</TabsTrigger>
            <TabsTrigger value="growth">Growth</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Volume Slider */}
        <Card className="p-6 card-elevated">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              <label className="text-sm font-semibold text-foreground">Annual Volume</label>
            </div>
            <Slider
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              min={100}
              max={2000}
              step={50}
              className="w-full"
            />
            <div className="text-3xl font-bold text-primary">{formatNumber(volume)} tyres</div>
            <p className="text-sm text-muted-foreground">
              Adjust volume to see impact on landed costs and savings
            </p>
          </div>
        </Card>

        {/* Factory Price Slider */}
        <Card className="p-6 card-elevated">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              <label className="text-sm font-semibold text-foreground">Factory Price</label>
            </div>
            <Slider
              value={[factoryPrice]}
              onValueChange={(val) => setFactoryPrice(val[0])}
              min={50}
              max={120}
              step={5}
              className="w-full"
            />
            <div className="text-3xl font-bold text-primary">${factoryPrice.toFixed(0)} USD</div>
            <p className="text-sm text-muted-foreground">
              Negotiate with Westlake for best pricing
            </p>
          </div>
        </Card>
      </div>

      {/* Cost Breakdown */}
      <Card className="p-8 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-6">Cost Breakdown (Per Tyre)</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Factory Price (FOB)</span>
            <span className="font-semibold">${calculation.factoryPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Insurance (1%)</span>
            <span className="font-semibold">${calculation.insurance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Shipping</span>
            <span className="font-semibold">${calculation.shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm text-muted-foreground">Handling & Clearance</span>
            <span className="font-semibold">${calculation.handling.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-sm text-muted-foreground">Customs Duty (5%)</span>
            <span className="font-semibold">${calculation.customsDuty.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pb-3 border-b border-border">
            <span className="text-sm text-muted-foreground">VAT (5%)</span>
            <span className="font-semibold">${calculation.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-3 bg-accent bg-opacity-30 px-4 py-3 rounded-lg">
            <span className="font-semibold text-foreground">Total Landed Cost</span>
            <div className="text-right">
              <div className="font-bold text-lg text-primary">${calculation.landedCostUSD.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground">{calculation.landedCostOMR.toFixed(2)} OMR</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Profitability Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Per Tyre Savings */}
        <Card className={`p-6 card-elevated border-2 ${isProfit ? 'border-green-500' : 'border-red-500'}`}>
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Savings Per Tyre</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Target Price</span>
                <span className="font-semibold">{formatCurrency(targetPrice * EXCHANGE_RATE)} ({targetPrice} OMR)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Landed Cost</span>
                <span className="font-semibold">{formatCurrency(calculation.landedCostUSD)} ({calculation.landedCostOMR.toFixed(2)} OMR)</span>
              </div>
            </div>
            <div className={`p-4 rounded-lg ${isProfit ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
              <div className={`text-3xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : ''}{formatCurrency(calculation.savingsPerTyre)}
              </div>
              <div className={`text-sm ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : ''}{calculation.savingsPerTyreOMR.toFixed(2)} OMR ({calculation.savingsPercentage.toFixed(1)}%)
              </div>
            </div>
          </div>
        </Card>

        {/* Annual Savings */}
        <Card className={`p-6 card-elevated border-2 ${isProfit ? 'border-green-500' : 'border-red-500'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${isProfit ? 'text-green-600' : 'text-red-600'}`} />
              <h4 className="text-lg font-semibold text-foreground">Annual Savings ({volume} tyres)</h4>
            </div>
            <div className={`p-4 rounded-lg ${isProfit ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
              <div className={`text-3xl font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : ''}{formatCurrency(calculation.annualSavingsUSD)}
              </div>
              <div className={`text-sm ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {isProfit ? '+' : ''}{formatNumber(calculation.annualSavingsOMR)} OMR
              </div>
            </div>
            <div className="text-xs text-muted-foreground pt-2">
              {isProfit ? '✓ Direct import is profitable' : '✗ Direct import is not profitable'}
            </div>
          </div>
        </Card>
      </div>

      {/* Recommendation */}
      <Card className="p-6 card-elevated bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-primary">
        <div className="flex items-start gap-4">
          <ArrowRight className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-foreground mb-2">Recommendation</h4>
            {isProfit ? (
              <p className="text-sm text-foreground">
                At <strong>{volume} tyres/year</strong> with a factory price of <strong>${factoryPrice}</strong>, direct import generates <strong>{formatNumber(calculation.annualSavingsOMR)} OMR</strong> in annual savings. This is a <strong>highly profitable opportunity</strong>.
              </p>
            ) : (
              <p className="text-sm text-foreground">
                At <strong>{volume} tyres/year</strong> with a factory price of <strong>${factoryPrice}</strong>, direct import is <strong>not economical</strong>. Consider negotiating with your current supplier or increasing volume.
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
