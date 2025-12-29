import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function LegalAndQualityInfo() {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="legal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-md">
          <TabsTrigger value="legal">Legal Framework</TabsTrigger>
          <TabsTrigger value="quality">Quality Assessment</TabsTrigger>
        </TabsList>

        {/* Legal Framework Tab */}
        <TabsContent value="legal" className="space-y-6">
          <Card className="p-6 card-elevated">
            <h4 className="text-lg font-semibold text-foreground mb-4">Oman Commercial Agencies Law</h4>
            <p className="text-sm text-muted-foreground mb-4">
              The Gulf Cooperation Council (GCC) markets operate under distinct commercial agency laws. In Oman, the Commercial Agencies Law (Royal Decree 26/77 and amendments) protects local merchants who invest in developing foreign brands. This creates three distinct scenarios for direct purchasing:
            </p>
          </Card>

          {/* Westlake Scenario */}
          <Card className="p-6 card-elevated border-l-4 border-red-500">
            <h5 className="text-lg font-semibold text-foreground mb-4">Scenario 1: Westlake (Direct Purchase NOT Possible)</h5>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                <p className="text-sm font-semibold text-red-900 dark:text-red-100 mb-2">Status: Blocked</p>
                <p className="text-sm text-red-900 dark:text-red-100">Direct purchase from Westlake/ZC Rubber is contractually impossible.</p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Why It's Blocked:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Saud Bahwan Automotive LLC holds the exclusive agency for Westlake in Oman</li>
                  <li>• This exclusivity is registered with the Ministry of Commerce, Industry and Investment Promotion (MoCIIP)</li>
                  <li>• Saud Bahwan has legal right to block unauthorized imports at customs</li>
                  <li>• When ZC Rubber (Westlake manufacturer) receives direct inquiries from Oman, they are contractually required to forward them to Saud Bahwan</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">The "Forwarding Protocol":</h6>
                <p className="text-sm text-muted-foreground mb-2">
                  When HSC contacts ZC Rubber's export department (sales@zc-rubber.com), the sales representative checks the region. Seeing "Oman," they are contractually required to forward the lead to Saud Bahwan. ZC Rubber will not jeopardize their multimillion-dollar relationship with Saud Bahwan for a single fleet order.
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Current Cost Structure:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• HSC's current price: 115 OMR per tyre</li>
                  <li>• This includes: ZC Rubber margin + Shipping & Logistics + Saud Bahwan's distributor markup (showroom, sales staff, warehousing, marketing)</li>
                  <li>• Saud Bahwan's markup is substantial due to their extensive infrastructure investment</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Triangle Scenario */}
          <Card className="p-6 card-elevated border-l-4 border-green-500">
            <h5 className="text-lg font-semibold text-foreground mb-4">Scenario 2: Triangle Tyre (Direct Purchase Possible)</h5>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                <p className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">Status: Open for Direct Import</p>
                <p className="text-sm text-green-900 dark:text-green-100">Direct purchase from Triangle is legally and commercially possible.</p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Why It's Possible:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Triangle has either no exclusive agent in Oman, or agents with weak enforcement</li>
                  <li>• No registered exclusivity at MoCIIP (unlike Westlake/Saud Bahwan)</li>
                  <li>• Triangle's export department will negotiate directly with HSC for volumes exceeding 1,000 units/year</li>
                  <li>• This creates a "Project Direct Supply Account" for fleet volumes</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Contact & Negotiation:</h6>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Email:</strong> exports@triangletire.cn
                </p>
                <p className="text-sm text-muted-foreground">
                  Mention: "Project Direct Supply Account for 1,000-1,200 units/year of TR668/TR691 12.00R24 TBR tyres. Seeking FOB pricing and GSO certification details."
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Pricing Advantage:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• FOB Factory Price: $175-195 USD</li>
                  <li>• No middleman markup (direct from manufacturer)</li>
                  <li>• Landed cost in Oman: 82.93 OMR per tyre</li>
                  <li>• Savings vs. Saud Bahwan: 32.07 OMR per tyre (28% reduction)</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Strategic Advantage:</h6>
                <p className="text-sm text-muted-foreground">
                  If Triangle later establishes an exclusive agent in Oman with strict enforcement, HSC will already have an established supply chain and customer relationship. This provides first-mover advantage.
                </p>
              </div>
            </div>
          </Card>

          {/* Aeolus Scenario */}
          <Card className="p-6 card-elevated border-l-4 border-blue-500">
            <h5 className="text-lg font-semibold text-foreground mb-4">Scenario 3: Aeolus Tyre (Direct Purchase Possible)</h5>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">Status: Open for Direct Import</p>
                <p className="text-sm text-blue-900 dark:text-blue-100">Direct purchase from Aeolus is legally and commercially possible.</p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Why It's Possible:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Aeolus is a heavy-duty specialist with less consolidated distribution in GCC</li>
                  <li>• No registered exclusive agent blocking imports</li>
                  <li>• Export department actively seeks fleet contracts</li>
                </ul>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Contact & Negotiation:</h6>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Email:</strong> export@aeolustype.com
                </p>
                <p className="text-sm text-muted-foreground">
                  Mention: "Fleet procurement inquiry for 1,000-1,200 units/year of HN08/HN25 12.00R24 TBR tyres for water tanker operations. Seeking competitive FOB pricing and GSO certification."
                </p>
              </div>

              <div>
                <h6 className="font-semibold text-foreground mb-2">Pricing & Advantage:</h6>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• FOB Factory Price: $180-200 USD</li>
                  <li>• Landed cost in Oman: ~85-90 OMR per tyre</li>
                  <li>• Slightly higher than Triangle but still 25-30 OMR savings vs. Saud Bahwan</li>
                  <li>• Specialty: Heavy-duty and overload capability (ideal for tankers)</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Summary Table */}
          <Card className="p-6 card-elevated">
            <h5 className="text-lg font-semibold text-foreground mb-4">Direct Purchase Comparison</h5>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Supplier</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Direct Purchase</th>
                    <th className="text-left py-3 px-4 font-semibold text-foreground">Reason</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Current Price</th>
                    <th className="text-center py-3 px-4 font-semibold text-foreground">Direct Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Westlake (via Saud Bahwan)</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 rounded text-xs font-medium">Not Possible</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">Exclusive agency registered with MoCIIP</td>
                    <td className="text-center py-3 px-4 font-semibold">115 OMR</td>
                    <td className="text-center py-3 px-4 text-muted-foreground">N/A</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Triangle Tyre</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-xs font-medium">Possible</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">No exclusive agent enforcement</td>
                    <td className="text-center py-3 px-4 font-semibold">N/A</td>
                    <td className="text-center py-3 px-4 font-semibold">82.93 OMR</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4 font-medium text-foreground">Aeolus Tyre</td>
                    <td className="text-center py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 rounded text-xs font-medium">Possible</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">No exclusive agent enforcement</td>
                    <td className="text-center py-3 px-4 font-semibold">N/A</td>
                    <td className="text-center py-3 px-4 font-semibold">85-90 OMR</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Quality Assessment Tab */}
        <TabsContent value="quality" className="space-y-6">
          <Card className="p-6 card-elevated">
            <h4 className="text-lg font-semibold text-foreground mb-4">Quality & Technical Comparison</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Based on verified market research (Q4 2024), the quality gap between Tier-1 Chinese manufacturers and premium brands has narrowed significantly for TBR (Truck and Bus Radial) applications.
            </p>
          </Card>

          {/* Tier Classification */}
          <Card className="p-6 card-elevated">
            <h5 className="text-lg font-semibold text-foreground mb-4">Chinese Tyre Industry Tiers</h5>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border-l-4 border-blue-500">
                <h6 className="font-semibold text-foreground mb-2">Tier 1: State-Owned/Publicly Listed Giants</h6>
                <p className="text-sm text-muted-foreground mb-3">
                  Examples: ZC Rubber (Westlake), Triangle, Linglong, Sailun, Aeolus
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Global R&D centers and advanced manufacturing</li>
                  <li>• OEM contracts with major truck manufacturers (SINOTRUK, FAW, Caterpillar)</li>
                  <li>• Consistent quality control and ISO certifications</li>
                  <li>• Suitable for critical applications (tankers, long-haul)</li>
                </ul>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950 rounded-lg border-l-4 border-amber-500">
                <h6 className="font-semibold text-foreground mb-2">Tier 2: Large Private Enterprises</h6>
                <p className="text-sm text-muted-foreground mb-3">
                  Examples: Double Coin, Longmarch
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Strong export focus</li>
                  <li>• Good quality but less R&D investment</li>
                </ul>
              </div>

              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border-l-4 border-red-500">
                <h6 className="font-semibold text-foreground mb-2">Tier 3/4: Smaller Factories/Private Brands</h6>
                <p className="text-sm text-muted-foreground">
                  Variable quality control, price-focused, not recommended for critical applications.
                </p>
              </div>
            </div>
          </Card>

          {/* Quality Gap Analysis */}
          <Card className="p-6 card-elevated">
            <h5 className="text-lg font-semibold text-foreground mb-4">Quality Gap: Chinese Tier-1 vs. Premium Brands</h5>
            <p className="text-sm text-muted-foreground mb-4">
              Market research finding: "The quality gap between Tier-1 Chinese brands (Westlake, Triangle, Linglong) and premium Japanese/European brands (Bridgestone, Michelin) has narrowed significantly in the TBR segment, particularly for rough-service applications where casing durability is paramount."
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <h6 className="font-semibold text-foreground mb-2">For Water Tanker Operations:</h6>
                <p className="text-sm text-muted-foreground mb-3">
                  Chinese Tier-1 tyres are particularly well-suited because:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Robust casing design handles surge loads from liquid cargo</li>
                  <li>• Excellent sidewall rigidity against impact and heat</li>
                  <li>• Cost-Per-Kilometer (CPK) heavily favors Chinese tyres for this application</li>
                  <li>• Tanker damage is typically from road hazards (cuts/impacts), not tread wear</li>
                  <li>• Lower capital cost of Chinese tyres means better ROI despite similar durability</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Supplier Quality Profiles */}
          <Card className="p-6 card-elevated">
            <h5 className="text-lg font-semibold text-foreground mb-4">Triangle Tyre Quality Profile</h5>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Manufacturer Status</p>
                <p className="text-sm text-muted-foreground">Tier-1, state-owned, globally recognized</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">OEM Contracts</p>
                <p className="text-sm text-muted-foreground">SINOTRUK, FAW, Caterpillar (proof of quality standards)</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Technical Specs</p>
                <p className="text-sm text-muted-foreground">Load Index 160K, Ply Rating 18-20PR (exceeds HSC requirement)</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Warranty</p>
                <p className="text-sm text-muted-foreground">Full factory warranty (not voided like parallel imports)</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Certification</p>
                <p className="text-sm text-muted-foreground">GSO certified models available for GCC markets</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 card-elevated">
            <h5 className="text-lg font-semibold text-foreground mb-4">Aeolus Tyre Quality Profile</h5>
            <div className="space-y-3">
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Manufacturer Status</p>
                <p className="text-sm text-muted-foreground">Tier-1, heavy-duty specialist</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Specialty</p>
                <p className="text-sm text-muted-foreground">Heavy-duty and overload applications (ideal for tankers)</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Technical Specs</p>
                <p className="text-sm text-muted-foreground">Load Index 160K+, Ply Rating 20PR (exceeds HSC requirement)</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Warranty</p>
                <p className="text-sm text-muted-foreground">Full factory warranty</p>
              </div>
              <div className="p-3 bg-secondary rounded">
                <p className="text-sm font-semibold text-foreground">Track Record</p>
                <p className="text-sm text-muted-foreground">Proven in GCC region for tanker and heavy-haul operations</p>
              </div>
            </div>
          </Card>

          {/* Recommendation */}
          <Card className="p-6 card-elevated bg-green-50 dark:bg-green-950 border-l-4 border-green-500">
            <h5 className="text-lg font-semibold text-foreground mb-3">Quality Recommendation</h5>
            <p className="text-sm text-muted-foreground mb-3">
              Both Triangle and Aeolus are Tier-1 manufacturers with quality suitable for HSC's tanker operations. The quality is comparable to Westlake for this application, while offering 28-30% cost savings.
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Recommendation:</strong> Start with Triangle (better pricing) for pilot phase. If any quality concerns arise, switch to Aeolus (premium heavy-duty option).
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
