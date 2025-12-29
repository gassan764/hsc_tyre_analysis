import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '@/components/ui/card';

interface CostBreakdownChartProps {
  fobOMR: number;
  insuranceOMR: number;
  shippingOMR: number;
  customsDutyOMR: number;
  vatOMR: number;
  handlingOMR: number;
}

export default function CostBreakdownChart({
  fobOMR,
  insuranceOMR,
  shippingOMR,
  customsDutyOMR,
  vatOMR,
  handlingOMR,
}: CostBreakdownChartProps) {
  const data = [
    { name: 'Factory Price', value: fobOMR, fill: '#1e40af' },
    { name: 'Insurance', value: insuranceOMR, fill: '#3b82f6' },
    { name: 'Shipping', value: shippingOMR, fill: '#60a5fa' },
    { name: 'Customs Duty', value: customsDutyOMR, fill: '#f59e0b' },
    { name: 'VAT', value: vatOMR, fill: '#ef4444' },
    { name: 'Handling', value: handlingOMR, fill: '#8b5cf6' },
  ].filter(item => item.value > 0);

  const total = fobOMR + insuranceOMR + shippingOMR + customsDutyOMR + vatOMR + handlingOMR;

  return (
    <Card className="p-6 card-elevated">
      <h4 className="text-lg font-semibold text-foreground mb-6">Cost Breakdown Distribution</h4>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="w-full lg:w-1/2">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `${(value as number).toFixed(2)} OMR`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full lg:w-1/2 space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold text-foreground">{item.value.toFixed(2)} OMR</div>
                <div className="text-xs text-muted-foreground">{((item.value / total) * 100).toFixed(1)}%</div>
              </div>
            </div>
          ))}
          <div className="pt-3 border-t border-border mt-4">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total Landed Cost</span>
              <span className="text-lg font-bold text-primary">{total.toFixed(2)} OMR</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
