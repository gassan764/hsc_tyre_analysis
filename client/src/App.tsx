import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/Tabs';
import CostCalculator from './components/CostCalculator';
import CostBreakdownChart from './components/CostBreakdownChart';
import ScenarioComparisonChart from './components/ScenarioComparisonChart';
import ProfitabilityHeatmap from './components/ProfitabilityHeatmap';
import SupplierComparison from './components/SupplierComparison';
import ImplementationRoadmap from './components/ImplementationRoadmap';
import LegalAndQuality from './components/LegalAndQuality';
import { 
  calculateLandedCost, 
  CURRENT_PRICE_OMR, 
  formatOMR, 
  formatK,
  type CostBreakdown 
} from './lib/calculations';
import { 
  Calculator, 
  BarChart3, 
  Users, 
  Map, 
  Scale,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle
} from 'lucide-react';

export default function App() {
  // Reference calculation for hero metrics
  const referenceCosts = calculateLandedCost(180, 1000);
  const [currentCosts, setCurrentCosts] = useState<CostBreakdown>(referenceCosts);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="hero-gradient text-white py-16 px-4 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  Q4 2024 Verified Data
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                HSC Tyre Sourcing Analysis
              </h1>
              <p className="text-xl text-blue-100 mb-2">
                Direct Import Strategy for 12.00R24 TBR Tyres
              </p>
              <p className="text-blue-200">
                Research-backed financial analysis for supply chain optimization
              </p>
            </div>
            
            {/* Hero Metrics */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                  <span className="text-sm text-blue-100">Annual Savings</span>
                </div>
                <div className="text-3xl font-bold number-display text-green-300">
                  {formatK(referenceCosts.annualSavingsOMR)}
                </div>
                <div className="text-sm text-blue-200">OMR/year</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="w-5 h-5 text-blue-300" />
                  <span className="text-sm text-blue-100">Landed Cost</span>
                </div>
                <div className="text-3xl font-bold number-display">
                  {formatOMR(referenceCosts.totalLandedCostOMR)}
                </div>
                <div className="text-sm text-blue-200">OMR/tyre</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 min-w-[160px]">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-yellow-300" />
                  <span className="text-sm text-blue-100">vs. Current</span>
                </div>
                <div className="text-3xl font-bold number-display text-yellow-300">
                  {referenceCosts.savingsPercentage.toFixed(0)}%
                </div>
                <div className="text-sm text-blue-200">cost reduction</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Key Message Banner */}
      <div className="bg-green-600 text-white py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left">
          <CheckCircle className="w-6 h-6 flex-shrink-0" />
          <p className="font-medium">
            <span className="font-bold">Verified Opportunity:</span> Triangle Direct at $180 FOB delivers{' '}
            <span className="font-bold number-display">{formatOMR(referenceCosts.totalLandedCostOMR)} OMR</span> landed cost 
            vs. <span className="font-bold number-display">{CURRENT_PRICE_OMR} OMR</span> current price — 
            <span className="font-bold"> {formatK(referenceCosts.annualSavingsOMR)} OMR</span> annual savings with full factory warranty.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Data Source Notice */}
        <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-blue-900">Research-Backed Analysis</p>
              <p className="text-sm text-blue-700">
                All pricing, shipping costs, and logistics data verified from Q4 2024 market research. 
                Exchange rate: 1 USD = 0.385 OMR (fixed peg). Container capacity: 230 tyres/40ft HC.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs defaultValue="calculator" className="w-full">
          <div className="overflow-x-auto pb-2 mb-6">
            <TabsList className="inline-flex w-full md:w-auto min-w-max">
              <TabsTrigger value="calculator" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Calculator</span>
              </TabsTrigger>
              <TabsTrigger value="analysis" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span className="hidden sm:inline">Analysis</span>
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Suppliers</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                <span className="hidden sm:inline">Roadmap</span>
              </TabsTrigger>
              <TabsTrigger value="legal" className="flex items-center gap-2">
                <Scale className="w-4 h-4" />
                <span className="hidden sm:inline">Legal & Quality</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {/* Calculator Tab */}
          <TabsContent value="calculator">
            <div className="space-y-6">
              <CostCalculator onUpdate={setCurrentCosts} />
              <CostBreakdownChart costs={currentCosts} />
            </div>
          </TabsContent>
          
          {/* Analysis Tab */}
          <TabsContent value="analysis">
            <div className="space-y-6">
              <ScenarioComparisonChart />
              <ProfitabilityHeatmap />
            </div>
          </TabsContent>
          
          {/* Suppliers Tab */}
          <TabsContent value="suppliers">
            <SupplierComparison />
          </TabsContent>
          
          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            <ImplementationRoadmap />
          </TabsContent>
          
          {/* Legal & Quality Tab */}
          <TabsContent value="legal">
            <LegalAndQuality />
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-white">HSC Tyre Sourcing Analysis</p>
              <p className="text-sm">
                Verified Q4 2024 Market Data | Exchange Rate: 1 USD = 0.385 OMR
              </p>
            </div>
            <div className="text-sm text-center md:text-right">
              <p>12.00R24 TBR Tyres | 160K Load Index | 18-20 Ply Rating</p>
              <p className="text-gray-500">For HSC Management Decision Support</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
