import { Card } from '@/components/ui/card';

interface HeatmapCell {
  volume: number;
  factoryPrice: number;
  savings: number;
  isProfitable: boolean;
}

export default function ProfitabilityHeatmap() {
  const EXCHANGE_RATE = 2.6;
  const SHIPPING_COST = 750;
  const TYRES_PER_CONTAINER = 2500;
  const CUSTOMS_DUTY_RATE = 0.05;
  const VAT_RATE = 0.05;
  const HANDLING_CLEARANCE = 200;

  const volumes = [300, 500, 750, 1000, 1250, 1500];
  const factoryPrices = [60, 70, 80, 90, 100, 110];
  const targetPrice = 92.5; // Growth scenario target
  const targetPriceUSD = targetPrice * EXCHANGE_RATE;

  const calculateSavings = (volume: number, factoryPrice: number): number => {
    const shippingPerTyre = SHIPPING_COST / TYRES_PER_CONTAINER;
    const handlingPerTyre = HANDLING_CLEARANCE / volume;
    const insurance = factoryPrice * 0.01;
    const cifValue = factoryPrice + insurance + shippingPerTyre;
    const customsDuty = cifValue * CUSTOMS_DUTY_RATE;
    const vat = (cifValue + customsDuty) * VAT_RATE;
    const landedCostUSD = cifValue + customsDuty + vat + handlingPerTyre;
    const savingsPerTyreUSD = targetPriceUSD - landedCostUSD;
    return savingsPerTyreUSD * volume;
  };

  const getColorClass = (savings: number): string => {
    if (savings < 0) return 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100';
    if (savings < 20000) return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100';
    if (savings < 40000) return 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100';
    return 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100';
  };

  return (
    <Card className="p-6 card-elevated">
      <h4 className="text-lg font-semibold text-foreground mb-2">Profitability Heatmap</h4>
      <p className="text-sm text-muted-foreground mb-6">
        Annual savings (OMR) at different volumes and factory prices. Target price: 92.5 OMR.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-foreground bg-secondary rounded-tl-lg">
                Volume / Factory Price
              </th>
              {factoryPrices.map((price) => (
                <th key={price} className="text-center py-3 px-2 font-semibold text-foreground bg-secondary">
                  ${price}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {volumes.map((volume) => (
              <tr key={volume}>
                <td className="py-3 px-4 font-medium text-foreground bg-secondary">{volume} tyres</td>
                {factoryPrices.map((factoryPrice) => {
                  const savings = calculateSavings(volume, factoryPrice);
                  const isProfitable = savings > 0;
                  return (
                    <td
                      key={`${volume}-${factoryPrice}`}
                      className={`text-center py-3 px-2 font-semibold rounded transition-all ${getColorClass(savings)}`}
                    >
                      <div className="text-xs">
                        {isProfitable ? '+' : ''}
                        {(savings / 1000).toFixed(0)}K
                      </div>
                      <div className="text-xs opacity-75">
                        {((savings / volume) / 2.6).toFixed(0)} OMR/tyre
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-secondary rounded-lg">
        <h5 className="font-semibold text-foreground mb-3">Legend</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900"></div>
            <span className="text-muted-foreground">Not Profitable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900"></div>
            <span className="text-muted-foreground">Low Savings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900"></div>
            <span className="text-muted-foreground">Moderate Savings</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-100 dark:bg-green-900"></div>
            <span className="text-muted-foreground">High Savings</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
