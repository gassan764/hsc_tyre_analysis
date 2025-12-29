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
} from 'recharts';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ScenarioData {
  scenario: string;
  volume: number;
  currentPrice: number;
  factory70: number;
  factory80: number;
  factory90: number;
}

export default function ScenarioComparisonChart() {
  const scenarioData: ScenarioData[] = [
    {
      scenario: 'Current',
      volume: 315,
      currentPrice: 36225,
      factory70: 9571,
      factory80: 10915,
      factory90: 12260,
    },
    {
      scenario: 'Near-Term',
      volume: 425,
      currentPrice: 48875,
      factory70: 12873,
      factory80: 14712,
      factory90: 16551,
    },
    {
      scenario: 'Growth',
      volume: 1100,
      currentPrice: 101750,
      factory70: 33198,
      factory80: 37906,
      factory90: 42614,
    },
  ];

  const savingsData = [
    {
      scenario: 'Current',
      factory70: 26654,
      factory80: 25315,
      factory90: 23966,
    },
    {
      scenario: 'Near-Term',
      factory70: 36003,
      factory80: 34183,
      factory90: 32362,
    },
    {
      scenario: 'Growth',
      factory70: 68556,
      factory80: 63845,
      factory90: 59134,
    },
  ];

  const projectionData = [
    { year: 'Year 1', factory70: 63845, factory80: 59134, factory90: 54423 },
    { year: 'Year 2', factory70: 127690, factory80: 118268, factory90: 108846 },
    { year: 'Year 3', factory70: 191535, factory80: 177402, factory90: 163269 },
    { year: 'Year 4', factory70: 255380, factory80: 236536, factory90: 217692 },
    { year: 'Year 5', factory70: 319225, factory80: 295670, factory90: 272115 },
  ];

  return (
    <Card className="p-6 card-elevated">
      <h4 className="text-lg font-semibold text-foreground mb-6">Scenario Analysis & Projections</h4>
      <Tabs defaultValue="costs" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary mb-6">
          <TabsTrigger value="costs">Annual Costs</TabsTrigger>
          <TabsTrigger value="savings">Annual Savings</TabsTrigger>
          <TabsTrigger value="projection">5-Year Projection</TabsTrigger>
        </TabsList>

        {/* Annual Costs Comparison */}
        <TabsContent value="costs" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Comparison of annual costs across all scenarios at different factory prices.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={scenarioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${(value as number).toLocaleString()} OMR`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="currentPrice" fill="#ef4444" name="Current Supplier (115 OMR)" />
              <Bar dataKey="factory70" fill="#10b981" name="Direct Import ($70)" />
              <Bar dataKey="factory80" fill="#3b82f6" name="Direct Import ($80)" />
              <Bar dataKey="factory90" fill="#f59e0b" name="Direct Import ($90)" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        {/* Annual Savings Comparison */}
        <TabsContent value="savings" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Annual savings potential at different factory prices compared to current supplier.
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={savingsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${(value as number).toLocaleString()} OMR`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Bar dataKey="factory70" fill="#10b981" name="Factory $70" />
              <Bar dataKey="factory80" fill="#3b82f6" name="Factory $80" />
              <Bar dataKey="factory90" fill="#f59e0b" name="Factory $90" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>

        {/* 5-Year Projection */}
        <TabsContent value="projection" className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Cumulative savings over 5 years for the Growth scenario (1,100 tyres/year).
          </p>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip
                formatter={(value) => `${(value as number).toLocaleString()} OMR`}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="factory70"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
                activeDot={{ r: 7 }}
                name="Factory $70"
              />
              <Line
                type="monotone"
                dataKey="factory80"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 5 }}
                activeDot={{ r: 7 }}
                name="Factory $80"
              />
              <Line
                type="monotone"
                dataKey="factory90"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: '#f59e0b', r: 5 }}
                activeDot={{ r: 7 }}
                name="Factory $90"
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
