import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { type CostBreakdown, formatOMR, CURRENT_PRICE_OMR } from '@/lib/calculations';

interface CostBreakdownChartProps {
  costs: CostBreakdown;
}

// Chart colors matching the professional palette
const CHART_COLORS = {
  fob: '#1e3a5f',       // Primary dark blue
  insurance: '#3d7ea6',  // Secondary blue
  shipping: '#0ea5e9',   // Sky blue
  customs: '#d97706',    // Amber
  vat: '#dc2626',        // Red
  handling: '#7c3aed',   // Purple
};

export default function CostBreakdownChart({ costs }: CostBreakdownChartProps) {
  const data = [
    { name: 'Factory Price (FOB)', value: costs.fobOMR, color: CHART_COLORS.fob },
    { name: 'Insurance', value: costs.insuranceOMR, color: CHART_COLORS.insurance },
    { name: 'Ocean Freight', value: costs.oceanFreightOMR, color: CHART_COLORS.shipping },
    { name: 'Customs Duty', value: costs.customsDutyOMR, color: CHART_COLORS.customs },
    { name: 'VAT', value: costs.vatOMR, color: CHART_COLORS.vat },
    { name: 'Clearance & Haulage', value: costs.clearanceOMR, color: CHART_COLORS.handling },
  ].filter(item => item.value > 0);

  const total = costs.totalLandedCostOMR;
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{item.name}</p>
          <p className="text-lg font-bold number-display" style={{ color: item.payload.color }}>
            {formatOMR(item.value)} OMR
          </p>
          <p className="text-sm text-gray-500">{percentage}% of total</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend
  const renderLegend = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
      {data.map((item) => (
        <div key={item.name} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />
          <span className="text-xs text-gray-600 truncate">{item.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card-elevated p-6">
      <h4 className="text-xl font-bold mb-2">Cost Distribution</h4>
      <p className="text-gray-600 text-sm mb-6">
        Breakdown of total landed cost: <span className="font-bold number-display">{formatOMR(total)} OMR</span>
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Detailed Breakdown */}
        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold number-display">{formatOMR(item.value)} OMR</div>
                <div className="text-xs text-gray-500">
                  {((item.value / total) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
          
          {/* Total and Comparison */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-900">Total Landed Cost</span>
              <span className="text-xl font-bold text-[#1e3a5f] number-display">
                {formatOMR(total)} OMR
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-sm text-red-700">Current Supplier (Saud Bahwan)</span>
              <span className="font-bold text-red-700 number-display">
                {formatOMR(CURRENT_PRICE_OMR)} OMR
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-green-700">Your Savings</span>
              <span className="font-bold text-green-700 number-display">
                {formatOMR(costs.savingsPerTyreOMR)} OMR ({costs.savingsPercentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {renderLegend()}
    </div>
  );
}
