import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  ComposedChart,
} from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { 
  calculateLandedCost, 
  CURRENT_PRICE_OMR, 
  formatOMR, 
  formatK 
} from '@/lib/calculations';

// Generate scenario data with verified calculations
const generateScenarioData = () => {
  const volumes = [500, 750, 1000, 1200, 1500];
  const fobPrices = { budget: 175, target: 180, premium: 195 };
  
  return volumes.map(volume => {
    const budgetCost = calculateLandedCost(fobPrices.budget, volume);
    const targetCost = calculateLandedCost(fobPrices.target, volume);
    const premiumCost = calculateLandedCost(fobPrices.premium, volume);
    
    return {
      volume: volume.toLocaleString(),
      volumeNum: volume,
      currentCost: CURRENT_PRICE_OMR * volume,
      budgetCost: budgetCost.totalLandedCostOMR * volume,
      targetCost: targetCost.totalLandedCostOMR * volume,
      premiumCost: premiumCost.totalLandedCostOMR * volume,
      budgetSavings: budgetCost.annualSavingsOMR,
      targetSavings: targetCost.annualSavingsOMR,
      premiumSavings: premiumCost.annualSavingsOMR,
    };
  });
};

// Generate 5-year projection data
const generate5YearProjection = () => {
  const targetCost = calculateLandedCost(180, 1000);
  const annualSavings = targetCost.annualSavingsOMR;
  
  return [1, 2, 3, 4, 5].map(year => ({
    year: `Year ${year}`,
    cumulativeSavings: annualSavings * year,
    cumulativeSavingsUSD: targetCost.annualSavingsUSD * year,
  }));
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-semibold text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-semibold number-display">
              {formatK(entry.value)} OMR
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function ScenarioComparisonChart() {
  const scenarioData = generateScenarioData();
  const projectionData = generate5YearProjection();
  
  // Reference calculation at $180 FOB, 1000 units
  const referenceCost = calculateLandedCost(180, 1000);
  
  return (
    <div className="card-elevated p-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <h4 className="text-xl font-bold">Scenario Analysis</h4>
          <p className="text-gray-600 text-sm mt-1">
            Compare costs and savings across different volumes and price scenarios
          </p>
        </div>
        
        {/* Reference Calculation */}
        <div className="text-right bg-green-50 px-4 py-2 rounded-lg border border-green-200">
          <p className="text-xs text-green-700 font-medium">Triangle @ $180 FOB</p>
          <p className="text-lg font-bold text-green-700 number-display">
            {formatOMR(referenceCost.totalLandedCostOMR)} OMR
          </p>
        </div>
      </div>
      
      <Tabs defaultValue="costs">
        <TabsList className="grid w-full grid-cols-3 max-w-md mb-6">
          <TabsTrigger value="costs">Annual Costs</TabsTrigger>
          <TabsTrigger value="savings">Savings</TabsTrigger>
          <TabsTrigger value="projection">5-Year Outlook</TabsTrigger>
        </TabsList>
        
        {/* Annual Costs Tab */}
        <TabsContent value="costs">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Total annual procurement costs by volume. Current supplier: {CURRENT_PRICE_OMR} OMR/tyre.
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="volume" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar 
                  dataKey="currentCost" 
                  name="Current (115 OMR)" 
                  fill="#dc2626" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="budgetCost" 
                  name="Budget ($175 FOB)" 
                  fill="#059669" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="targetCost" 
                  name="Target ($180 FOB)" 
                  fill="#3d7ea6" 
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="premiumCost" 
                  name="Premium ($195 FOB)" 
                  fill="#d97706" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Volume labels */}
          <p className="text-center text-sm text-gray-500 mt-2">Annual Volume (units)</p>
        </TabsContent>
        
        {/* Savings Tab */}
        <TabsContent value="savings">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Annual savings compared to current supplier ({CURRENT_PRICE_OMR} OMR/tyre).
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={scenarioData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="volume" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="budgetSavings" 
                  name="Budget ($175)" 
                  fill="#dcfce7" 
                  stroke="#059669"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="targetSavings" 
                  name="Target ($180)" 
                  stroke="#3d7ea6" 
                  strokeWidth={3}
                  dot={{ fill: '#3d7ea6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="premiumSavings" 
                  name="Premium ($195)" 
                  stroke="#d97706" 
                  strokeWidth={2}
                  dot={{ fill: '#d97706', r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-2">Annual Volume (units)</p>
          
          {/* Key insight */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Key Insight:</strong> At 1,000 units/year with $180 FOB, you save{' '}
              <span className="font-bold number-display">{formatK(referenceCost.annualSavingsOMR)} OMR</span>{' '}
              annually ({referenceCost.savingsPercentage.toFixed(1)}% reduction).
            </p>
          </div>
        </TabsContent>
        
        {/* 5-Year Projection Tab */}
        <TabsContent value="projection">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Cumulative savings projection over 5 years at 1,000 units/year, $180 FOB.
            </p>
          </div>
          
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="year" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="cumulativeSavings" 
                  name="Cumulative Savings" 
                  fill="#dcfce7" 
                  stroke="#059669"
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeSavings" 
                  name="Savings (OMR)" 
                  stroke="#059669" 
                  strokeWidth={3}
                  dot={{ fill: '#059669', r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          {/* 5-year summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <p className="text-sm text-green-700">Year 1 Savings</p>
              <p className="text-2xl font-bold text-green-700 number-display">
                {formatK(projectionData[0].cumulativeSavings)} OMR
              </p>
            </div>
            <div className="p-4 bg-green-100 rounded-lg border border-green-300 text-center">
              <p className="text-sm text-green-800">Year 3 Savings</p>
              <p className="text-2xl font-bold text-green-800 number-display">
                {formatK(projectionData[2].cumulativeSavings)} OMR
              </p>
            </div>
            <div className="p-4 bg-green-200 rounded-lg border border-green-400 text-center">
              <p className="text-sm text-green-900">Year 5 Savings</p>
              <p className="text-2xl font-bold text-green-900 number-display">
                {formatK(projectionData[4].cumulativeSavings)} OMR
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
