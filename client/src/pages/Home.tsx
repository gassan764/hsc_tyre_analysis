import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CostCalculator from '@/components/CostCalculator';
import CostBreakdownChart from '@/components/CostBreakdownChart';
import ScenarioComparisonChart from '@/components/ScenarioComparisonChart';
import ProfitabilityHeatmap from '@/components/ProfitabilityHeatmap';
import { SupplierGallery } from '@/components/SupplierDetailModal';
import LegalAndQualityInfo from '@/components/LegalAndQualityInfo';

export default function Home() {
  const [selectedSupplierData, setSelectedSupplierData] = useState({
    fobOMR: 71.23,
    insuranceOMR: 0.71,
    shippingOMR: 4.18,
    customsDutyOMR: 3.60,
    vatOMR: 3.78,
    handlingOMR: 1.09,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HSC Tyre Sourcing Analysis</h1>
          <p className="text-lg text-blue-100 mb-2">Direct Import Strategy for 12.00R24 TBR Tyres from China</p>
          <p className="text-sm text-blue-200">Verified Q4 2024 Market Data | Research-Backed Financial Analysis</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-green-600">+</span>
              <h3 className="font-semibold text-foreground">Highly Profitable</h3>
            </div>
            <p className="text-sm text-muted-foreground">Triangle Direct: 82.93 OMR landed cost vs 115 OMR current</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-blue-600">↑</span>
              <h3 className="font-semibold text-foreground">32K OMR Annual Savings</h3>
            </div>
            <p className="text-sm text-muted-foreground">At 1,000 units/year with Triangle supplier</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-3xl font-bold text-purple-600">✓</span>
              <h3 className="font-semibold text-foreground">Full Warranty</h3>
            </div>
            <p className="text-sm text-muted-foreground">Factory warranty from Triangle & Aeolus (not parallel imports)</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 dark:bg-blue-950 border-l-4 border-blue-500 p-4 rounded-lg mb-8">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Data Source:</strong> All pricing, shipping costs, and logistics data are verified from Q4 2024 market research. Adjust sliders to test different scenarios.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-md mb-8">
            <TabsTrigger value="calculator" className="text-sm md:text-base">Calculator</TabsTrigger>
            <TabsTrigger value="analysis" className="text-sm md:text-base">Analysis</TabsTrigger>
            <TabsTrigger value="suppliers" className="text-sm md:text-base">Suppliers</TabsTrigger>
            <TabsTrigger value="roadmap" className="text-sm md:text-base">Roadmap</TabsTrigger>
            <TabsTrigger value="legal" className="text-sm md:text-base">Legal & Quality</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <CostCalculator onUpdate={setSelectedSupplierData} />
            <CostBreakdownChart {...selectedSupplierData} />
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <ScenarioComparisonChart />
            <ProfitabilityHeatmap />
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-4">Supplier Comparison</h3>
              <p className="text-muted-foreground mb-6">
                Click on any supplier card to view detailed information including location, contact details, specifications, advantages, and risks.
              </p>
              <SupplierGallery />
            </div>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-foreground mb-6">Implementation Roadmap</h3>

              <div className="space-y-6">
                {/* Phase 1 */}
                <div className="border-l-4 border-blue-500 pl-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">1</div>
                    <h4 className="text-lg font-semibold text-foreground">Phase 1: Supplier Outreach (Week 1-2)</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-11">
                    <li>• Contact Triangle (exports@triangletire.cn) and Aeolus (export@aeolustype.com)</li>
                    <li>• Request binding quotations with GSO certification details</li>
                    <li>• Verify payment terms: 30% deposit, 70% on shipment</li>
                    <li>• Confirm lead times and container availability</li>
                  </ul>
                </div>

                {/* Phase 2 */}
                <div className="border-l-4 border-green-500 pl-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">2</div>
                    <h4 className="text-lg font-semibold text-foreground">Phase 2: Pilot Order (Week 3-6)</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-11">
                    <li>• Place pilot order: 1 container (230 units)</li>
                    <li>• Arrange inspection at port of origin (optional but recommended)</li>
                    <li>• Secure customs broker for Oman clearance</li>
                    <li>• Arrange local transport from port to warehouse</li>
                  </ul>
                </div>

                {/* Phase 3 */}
                <div className="border-l-4 border-purple-500 pl-6 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">3</div>
                    <h4 className="text-lg font-semibold text-foreground">Phase 3: Quality Validation (Week 7-10)</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-11">
                    <li>• Receive pilot shipment and conduct quality inspection</li>
                    <li>• Test tyres on sample tanker fleet (10-15 units)</li>
                    <li>• Validate performance and durability over 2-4 weeks</li>
                    <li>• Collect feedback from drivers and mechanics</li>
                  </ul>
                </div>

                {/* Phase 4 */}
                <div className="border-l-4 border-orange-500 pl-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">4</div>
                    <h4 className="text-lg font-semibold text-foreground">Phase 4: Scale to Full Volume (Week 11+)</h4>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-11">
                    <li>• If pilot successful, scale to 4-5 containers per quarter (1,000-1,200 units/year)</li>
                    <li>• Establish recurring purchase orders</li>
                    <li>• Implement inventory management system</li>
                    <li>• Monitor cost savings and adjust as needed</li>
                  </ul>
                </div>
              </div>

              {/* Critical Notes */}
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950 border-l-4 border-yellow-500 rounded">
                <h5 className="font-semibold text-foreground mb-3">Critical Success Factors</h5>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Never allow "doubling":</strong> Tyres must be interlaced normally. Compressed tyres have bead damage.</li>
                  <li>• <strong>GSO Certification:</strong> All tyres must have GSO certificate for GCC compliance.</li>
                  <li>• <strong>Avoid Parallel Imports:</strong> Warranty is voided. Risk of catastrophic blowout on tankers.</li>
                  <li>• <strong>Customs Broker:</strong> Hire experienced broker familiar with tyre imports to Oman.</li>
                  <li>• <strong>Container Inspection:</strong> Conduct pre-shipment inspection at origin to verify quality.</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Legal & Quality Tab */}
          <TabsContent value="legal" className="space-y-6">
            <LegalAndQualityInfo />
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <div className="bg-slate-100 dark:bg-slate-900 py-8 px-4 border-t border-border">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>HSC Tyre Sourcing Analysis | Verified Q4 2024 Market Data | Exchange Rate: 1 USD = 0.385 OMR</p>
        </div>
      </div>
    </div>
  );
}
