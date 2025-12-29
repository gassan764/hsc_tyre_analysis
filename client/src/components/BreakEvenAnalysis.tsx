import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Card } from '@/components/ui/card';

interface BreakEvenPoint {
  volume: number;
  breakEvenPrice: number;
}

export default function BreakEvenAnalysis() {
  const EXCHANGE_RATE = 2.6;
  const SHIPPING_COST = 750;
  const TYRES_PER_CONTAINER = 2500;
  const CUSTOMS_DUTY_RATE = 0.05;
  const VAT_RATE = 0.05;
  const HANDLING_CLEARANCE = 200;

  const calculateBreakEvenPrice = (volume: number, targetPriceOMR: number): number => {
    const targetPriceUSD = targetPriceOMR * EXCHANGE_RATE;
    const shippingPerTyre = SHIPPING_COST / TYRES_PER_CONTAINER;
    const handlingPerTyre = HANDLING_CLEARANCE / volume;

    // Break-even: targetPrice = (factoryPrice * 1.1125) + shippingPerTyre + handlingPerTyre
    // 1.1125 = (1 + insurance 0.01) * (1 + duty 0.05) * (1 + VAT 0.05)
    const breakEvenPrice = (targetPriceUSD - shippingPerTyre - handlingPerTyre) / 1.1125;
    return breakEvenPrice;
  };

  // Generate data for different volumes
  const volumeRange = Array.from({ length: 50 }, (_, i) => 100 + i * 40);

  const currentScenarioData = volumeRange.map((volume) => ({
    volume,
    breakEvenPrice: calculateBreakEvenPrice(volume, 115),
    targetPrice: 115 * EXCHANGE_RATE,
  }));

  const growthScenarioData = volumeRange.map((volume) => ({
    volume,
    breakEvenPrice: calculateBreakEvenPrice(volume, 92.5),
    targetPrice: 92.5 * EXCHANGE_RATE,
  }));

  const currentBreakEven = calculateBreakEvenPrice(315, 115);
  const growthBreakEven = calculateBreakEvenPrice(1100, 92.5);

  return (
    <div className="space-y-6">
      {/* Current Scenario */}
      <Card className="p-6 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-2">Current Scenario Break-Even Analysis</h4>
        <p className="text-sm text-muted-foreground mb-6">
          Target Price: 115 OMR ($299 USD) | Current Volume: 315 tyres/year
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={currentScenarioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="volume" label={{ value: 'Annual Volume (tyres)', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Factory Price (USD)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `$${(value as number).toFixed(2)}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <ReferenceLine x={315} stroke="#f59e0b" strokeDasharray="5 5" label="Current Volume" />
            <Line
              type="monotone"
              dataKey="breakEvenPrice"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Break-Even Factory Price"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="targetPrice"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target Retail Price (USD)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">
            At 315 tyres/year, the break-even factory price is <strong>${currentBreakEven.toFixed(2)}</strong>. Any factory price below this is profitable.
          </p>
        </div>
      </Card>

      {/* Growth Scenario */}
      <Card className="p-6 card-elevated">
        <h4 className="text-lg font-semibold text-foreground mb-2">Growth Scenario Break-Even Analysis</h4>
        <p className="text-sm text-muted-foreground mb-6">
          Target Price: 92.5 OMR ($240.50 USD) | Growth Volume: 1,100 tyres/year
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthScenarioData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="volume" label={{ value: 'Annual Volume (tyres)', position: 'insideBottomRight', offset: -5 }} />
            <YAxis label={{ value: 'Factory Price (USD)', angle: -90, position: 'insideLeft' }} />
            <Tooltip
              formatter={(value) => `$${(value as number).toFixed(2)}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <ReferenceLine x={1100} stroke="#f59e0b" strokeDasharray="5 5" label="Growth Volume" />
            <Line
              type="monotone"
              dataKey="breakEvenPrice"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Break-Even Factory Price"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="targetPrice"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target Retail Price (USD)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-secondary rounded-lg">
          <p className="text-sm text-muted-foreground">
            At 1,100 tyres/year, the break-even factory price is <strong>${growthBreakEven.toFixed(2)}</strong>. The recommended $70-80 range is well below break-even, ensuring strong profitability.
          </p>
        </div>
      </Card>

      {/* Key Insights */}
      <Card className="p-6 card-elevated bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
        <h4 className="text-lg font-semibold text-foreground mb-4">Key Insights</h4>
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
            <p className="text-muted-foreground">
              <strong>Volume Impact:</strong> As volume increases, the break-even factory price decreases due to fixed shipping and handling costs being spread across more units.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
            <p className="text-muted-foreground">
              <strong>Current Scenario:</strong> Break-even at ${currentBreakEven.toFixed(2)} means any factory price below this generates profit at 115 OMR retail.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
            <p className="text-muted-foreground">
              <strong>Growth Scenario:</strong> Even at lower 92.5 OMR retail price, break-even is only ${growthBreakEven.toFixed(2)}, making $70-80 highly profitable.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="w-1 bg-primary rounded-full flex-shrink-0"></div>
            <p className="text-muted-foreground">
              <strong>Recommendation:</strong> Target factory price of $70-80 USD provides 40-50% margin above break-even, ensuring sustainable profitability.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
