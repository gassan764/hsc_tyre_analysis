import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CostCalculator from '@/components/CostCalculator';
import { AlertCircle, CheckCircle, TrendingUp, Package, Truck, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HSC Tyre Sourcing Analysis</h1>
          <p className="text-lg opacity-90">
            Direct Import Strategy for 12.00R24 TBR Tyres from China
          </p>
          <p className="text-sm opacity-75 mt-2">
            Verified Q4 2024 Market Data | Research-Backed Financial Analysis
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Executive Summary */}
        <Card className="p-8 mb-12 card-elevated bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-2 border-green-500">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Highly Profitable</h3>
                <p className="text-sm text-muted-foreground">
                  Triangle Direct: 82.93 OMR landed cost vs 115 OMR current
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <TrendingUp className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">32K OMR Annual Savings</h3>
                <p className="text-sm text-muted-foreground">
                  At 1,000 units/year with Triangle supplier
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Shield className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Full Warranty</h3>
                <p className="text-sm text-muted-foreground">
                  Factory warranty from Triangle & Aeolus (not parallel imports)
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-500 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Data Source:</strong> All pricing, shipping costs, and logistics data are verified from Q4 2024 market research. Adjust sliders to test different scenarios.
                </div>
              </div>
            </div>
            <CostCalculator />
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold text-foreground mb-6">Financial Analysis Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-500">
                  <p className="text-sm text-muted-foreground mb-1">Triangle Direct Scenario</p>
                  <p className="text-2xl font-bold text-green-600">82.93 OMR</p>
                  <p className="text-xs text-muted-foreground mt-2">Landed cost per tyre</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-500">
                  <p className="text-sm text-muted-foreground mb-1">Savings Per Tyre</p>
                  <p className="text-2xl font-bold text-green-600">32.07 OMR</p>
                  <p className="text-xs text-muted-foreground mt-2">vs 115 OMR current price</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-500">
                  <p className="text-sm text-muted-foreground mb-1">Annual Savings (1,000 units)</p>
                  <p className="text-2xl font-bold text-green-600">32,070 OMR</p>
                  <p className="text-xs text-muted-foreground mt-2">~$83,000 USD</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Suppliers Tab */}
          <TabsContent value="suppliers" className="space-y-6">
            {/* Supplier Comparison */}
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold text-foreground mb-6">Verified Supplier Options</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Model</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">FOB Price</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Landed Cost</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Warranty</th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Risk</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground">Triangle Tyre</div>
                        <div className="text-xs text-muted-foreground">exports@triangletire.cn</div>
                      </td>
                      <td className="py-3 px-4">TR668 / TR691</td>
                      <td className="py-3 px-4 font-semibold">$175-195</td>
                      <td className="py-3 px-4 font-semibold text-green-600">~83 OMR</td>
                      <td className="py-3 px-4">Full Factory</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-900">Low-Medium</Badge>
                      </td>
                    </tr>
                    <tr className="border-b border-border hover:bg-secondary">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground">Aeolus Tyre</div>
                        <div className="text-xs text-muted-foreground">export@aeolustype.com</div>
                      </td>
                      <td className="py-3 px-4">HN08 / HN25</td>
                      <td className="py-3 px-4 font-semibold">$180-200</td>
                      <td className="py-3 px-4 font-semibold text-green-600">~86 OMR</td>
                      <td className="py-3 px-4">Full Factory</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-green-100 text-green-900">Low-Medium</Badge>
                      </td>
                    </tr>
                    <tr className="hover:bg-secondary">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-foreground">Parallel Import</div>
                        <div className="text-xs text-muted-foreground">Trading houses (NOT recommended)</div>
                      </td>
                      <td className="py-3 px-4">CM998 (Westlake)</td>
                      <td className="py-3 px-4 font-semibold">$145-165</td>
                      <td className="py-3 px-4 font-semibold text-orange-600">~74 OMR</td>
                      <td className="py-3 px-4">Void / None</td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-red-100 text-red-900">High</Badge>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 card-elevated border-2 border-green-500 bg-green-50 dark:bg-green-950">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Why Triangle (Recommended)
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Fragmented distribution in Oman (no monopolistic blocker)</li>
                  <li>• Full factory warranty included</li>
                  <li>• Achieves 83 OMR target price</li>
                  <li>• Export dept under pressure to increase market share</li>
                  <li>• Direct fleet deals framed as "incremental business"</li>
                </ul>
              </Card>

              <Card className="p-6 card-elevated border-2 border-red-500 bg-red-50 dark:bg-red-950">
                <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Why NOT Parallel Imports
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Warranties completely voided</li>
                  <li>• Risk of "doubling" (bead compression damage)</li>
                  <li>• Catastrophic blowouts under tanker surge loads</li>
                  <li>• Serial numbers may be buffed (warranty void)</li>
                  <li>• 1 OMR savings not worth tanker accident cost</li>
                </ul>
              </Card>
            </div>

            {/* Westlake Blocker */}
            <Card className="p-6 card-elevated bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-500">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                The Westlake "Blocker" Problem
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Direct purchase from Westlake is <strong>contractually impossible</strong> due to Oman's Commercial Agencies Law (Royal Decree 26/77). Saud Bahwan Group holds exclusive agency rights and is legally obligated to refer all direct inquiries back to them.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Solution:</strong> Triangle Tyre has fragmented distribution in Oman with no monopolistic blocker. Multiple agents exist but none have exclusive control, making direct supply negotiations possible.
              </p>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold text-foreground mb-6">10-Week Implementation Timeline</h3>
              
              <div className="space-y-6">
                {/* Week 1 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                    <div className="w-1 h-20 bg-border mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground mb-1">Week 1: Internal Alignment</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Stakeholder meeting (Finance, Fleet Manager). Send RFQs to Triangle and Aeolus with specific requirements.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      Action: Use supplier outreach emails from research report
                    </div>
                  </div>
                </div>

                {/* Week 2 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                    <div className="w-1 h-20 bg-border mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground mb-1">Week 2: Quotation & Verification</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Receive binding quotes. Verify GSO Conformity Certificates on GSO website. Select primary (Triangle) and secondary (Aeolus) suppliers.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      Critical: Demand PDF copy of GSO certificate before proceeding
                    </div>
                  </div>
                </div>

                {/* Week 3 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                    <div className="w-1 h-20 bg-border mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground mb-1">Week 3: Negotiation & PO</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Finalize pricing. Issue PO for pilot order (1x 40ft HC = 230 units). Open Irrevocable LC at Sight or send 30% deposit.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      PO must state: "Loading Method: Normal Interlacing Only. No Doubling. No Pressing."
                    </div>
                  </div>
                </div>

                {/* Weeks 4-8 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4-8</div>
                    <div className="w-1 h-20 bg-border mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground mb-1">Weeks 4-8: Production & Shipping</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Supplier manufactures. Freight forwarder arranges shipment from Qingdao or Shanghai. Transit time: ~30 days.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      Monitor: GSO labels, commercial invoices, packing lists
                    </div>
                  </div>
                </div>

                {/* Week 9 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">9</div>
                    <div className="w-1 h-20 bg-border mt-2"></div>
                  </div>
                  <div className="pb-6">
                    <h4 className="font-semibold text-foreground mb-1">Week 9: Arrival & Clearance</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Container arrives at Port of Sohar. Customs clearance (typically 2-3 days). HS Code: 4011.20.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      Port handling: ~150 OMR. Clearance: ~100 OMR. Local transport: ~100 OMR
                    </div>
                  </div>
                </div>

                {/* Week 10 */}
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">10</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Week 10: Testing & Fitment</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Inspect tyres. Fit on pilot sub-fleet. Monitor CPK (Cost Per Kilometer) and performance over 2-4 weeks.
                    </p>
                    <div className="bg-secondary p-3 rounded text-xs text-muted-foreground">
                      If pilot successful → Scale to 1,000-1,200 units/year
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Key Contacts */}
            <Card className="p-8 card-elevated">
              <h3 className="text-2xl font-bold text-foreground mb-6">Supplier Contacts</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Triangle Tyre (Primary)</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Email:</strong> exports@triangletire.cn</p>
                    <p><strong>Models:</strong> TR668 (rib-lug), TR691 (drive-position)</p>
                    <p><strong>Specs:</strong> 18-20 PR, 160K load index</p>
                    <p><strong>Advantage:</strong> Fragmented distribution in Oman</p>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-foreground mb-2">Aeolus Tyre (Secondary)</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p><strong>Email:</strong> export@aeolustype.com</p>
                    <p><strong>Alt:</strong> aileen@aeolustype.biz</p>
                    <p><strong>Models:</strong> HN08, HN25</p>
                    <p><strong>Advantage:</strong> Heavy-duty specialist</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Risk Mitigation */}
            <Card className="p-8 card-elevated bg-orange-50 dark:bg-orange-950 border-2 border-orange-500">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Risk Mitigation Strategies
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Technical Homologation Risk</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Drivers may reject new brand due to handling differences.
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Mitigation: Pilot phase with 230 units on specific sub-fleet. Involve fleet manager in brand selection.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Warranty Defects</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Direct import means no local agent to call for blowouts.
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Mitigation: 32 OMR savings per unit builds "buffer." If &lt;2% fail, savings cover replacements. Negotiate 1% "Spare Tyre Allowance" with supplier.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Supply Chain Shock</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Red Sea attacks or port strikes could delay shipment by 3 weeks.
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Mitigation: Increase safety stock from 2 weeks to 6 weeks. Maintain "emergency account" with Saud Bahwan for spot purchases.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Bead Damage (Doubling)</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Traders may compress tyres to save freight, permanently deforming beads.
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Mitigation: Explicitly ban doubling in PO. Require photographic proof of loading before releasing 70% balance payment.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Customs Rejection</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tyres may arrive without GSO labels or correct HS code.
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    Mitigation: Pre-shipment check mandatory. Verify GSO certs and label photos before shipment. Use freight forwarder experienced in GCC tyre imports.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Data Source:</strong> Verified Q4 2024 market research from deep supplier and logistics analysis. All pricing, shipping costs, and regulatory information have been cross-referenced with industry sources and supplier contacts.
          </p>
        </div>
      </div>
    </div>
  );
}
