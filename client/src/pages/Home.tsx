import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import CostCalculator from '@/components/CostCalculator';
import { TrendingUp, DollarSign, Package, AlertCircle, CheckCircle, ArrowRight, Mail, Phone } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('calculator');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-950 border-b border-border shadow-sm">
        <div className="container py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">HSC Tyre Analysis</h1>
            <p className="text-sm text-muted-foreground">W/Tanker Direct Import Calculator</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Exchange Rate: 1 OMR = 2.6 USD</p>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 py-12 border-b border-border">
        <div className="container">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Direct Tyre Import Analysis
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Evaluate the profitability of sourcing W/Tanker tyres directly from China. Test different scenarios, factory prices, and volumes to find your optimal sourcing strategy.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Real-time calculations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Multiple scenarios</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium">Instant profitability analysis</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="contact">Next Steps</TabsTrigger>
          </TabsList>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Interactive Cost Calculator</h3>
              <p className="text-muted-foreground mb-6">
                Adjust the sliders below to test different scenarios and see real-time profitability analysis.
              </p>
            </div>
            <CostCalculator />
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Scenario Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Detailed breakdown of three key scenarios for HSC's tyre sourcing strategy.
              </p>
            </div>

            {/* Scenario Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Current Scenario */}
              <Card className="p-6 card-elevated border-2 border-yellow-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-foreground">Current State</h4>
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-semibold">315 tyres/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">115 OMR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Spend:</span>
                      <span className="font-semibold">36,225 OMR</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Direct import is <strong>NOT economical</strong> at current volumes. Maintain current supplier relationship.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Near-Term Scenario */}
              <Card className="p-6 card-elevated border-2 border-blue-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-foreground">Near-Term</h4>
                    <Package className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-semibold">425 tyres/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">115 OMR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Spend:</span>
                      <span className="font-semibold">48,875 OMR</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Direct import becomes <strong>profitable</strong> but margins are modest. Negotiate volume discount first.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Growth Scenario */}
              <Card className="p-6 card-elevated border-2 border-green-500">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-foreground">Growth ★</h4>
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-semibold">1,100 tyres/year</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-semibold">90-95 OMR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Annual Spend:</span>
                      <span className="font-semibold">101,750 OMR</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Direct import is <strong>HIGHLY ATTRACTIVE</strong>. Generates 60,000-75,000 OMR annual savings.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Key Findings */}
            <Card className="p-8 card-elevated bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <h4 className="text-xl font-semibold text-foreground mb-4">Key Findings</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Critical Success Factor</p>
                    <p className="text-sm text-muted-foreground">
                      Achieving a 90-95 OMR retail price point is essential. This enables HSC to use the tyre for both front and rear axles, unlocking 3-4x volume multiplier.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Factory Price Target</p>
                    <p className="text-sm text-muted-foreground">
                      Negotiate factory price to $70-80 USD range. This is the key to achieving profitability at scale.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">5-Year Opportunity</p>
                    <p className="text-sm text-muted-foreground">
                      At growth volume with $80 factory price, HSC can generate 270,000+ OMR cumulative savings over 5 years.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Cost Comparison Table */}
            <Card className="p-8 card-elevated">
              <h4 className="text-xl font-semibold text-foreground mb-6">Cost Comparison: Current Supplier vs. Direct Import</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="text-left py-3 px-4 font-semibold text-foreground">Scenario</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Volume</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Current Price</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Direct Import ($70)</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Direct Import ($80)</th>
                      <th className="text-right py-3 px-4 font-semibold text-foreground">Direct Import ($90)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4 font-medium">Current</td>
                      <td className="text-right py-3 px-4">315</td>
                      <td className="text-right py-3 px-4">36,225 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+26,654 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+25,315 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+23,966 OMR</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-secondary transition-colors">
                      <td className="py-3 px-4 font-medium">Near-Term</td>
                      <td className="text-right py-3 px-4">425</td>
                      <td className="text-right py-3 px-4">48,875 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+36,003 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+34,183 OMR</td>
                      <td className="text-right py-3 px-4 text-green-600">+32,362 OMR</td>
                    </tr>
                    <tr className="hover:bg-secondary transition-colors bg-accent bg-opacity-20">
                      <td className="py-3 px-4 font-bold">Growth ★</td>
                      <td className="text-right py-3 px-4 font-bold">1,100</td>
                      <td className="text-right py-3 px-4 font-bold">101,750 OMR</td>
                      <td className="text-right py-3 px-4 font-bold text-green-600">+68,556 OMR</td>
                      <td className="text-right py-3 px-4 font-bold text-green-600">+63,845 OMR</td>
                      <td className="text-right py-3 px-4 font-bold text-green-600">+59,134 OMR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Implementation Roadmap</h3>
              <p className="text-muted-foreground mb-6">
                Follow these steps to pursue direct import from Westlake/ZC Rubber.
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {[
                {
                  week: 'Week 1-2',
                  title: 'Initial Contact & Quotation',
                  items: [
                    'Send inquiry email to Westlake (kinson@zc-rubber.com)',
                    'Request formal quotation for 1,000-1,200 units/year',
                    'Ask for product samples and technical documentation',
                    'Request factory pricing at $70-80 USD range'
                  ]
                },
                {
                  week: 'Week 3-4',
                  title: 'Evaluation & Negotiation',
                  items: [
                    'Receive quotation and samples',
                    'Conduct quality evaluation of samples',
                    'Negotiate factory price and terms',
                    'Discuss MOQ, lead times, payment terms'
                  ]
                },
                {
                  week: 'Month 2',
                  title: 'Factory Audit & Pilot Order',
                  items: [
                    'Conduct factory audit (on-site or remote)',
                    'Finalize quality requirements and specifications',
                    'Place pilot order: 300-500 units',
                    'Arrange shipping and insurance'
                  ]
                },
                {
                  week: 'Month 3-4',
                  title: 'Pilot Validation',
                  items: [
                    'Receive and inspect pilot shipment',
                    'Conduct quality testing and verification',
                    'Test performance in field operations',
                    'Evaluate supply chain and logistics'
                  ]
                },
                {
                  week: 'Month 5+',
                  title: 'Scale-Up',
                  items: [
                    'Place full volume order (1,000+ units)',
                    'Establish regular supply schedule',
                    'Optimize inventory management',
                    'Transition away from current supplier'
                  ]
                }
              ].map((phase, idx) => (
                <Card key={idx} className="p-6 card-elevated">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-lg font-semibold text-foreground">{phase.title}</h4>
                        <span className="text-xs font-medium text-muted-foreground bg-secondary px-2 py-1 rounded">
                          {phase.week}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {phase.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Contact Information */}
            <Card className="p-8 card-elevated bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
              <h4 className="text-xl font-semibold text-foreground mb-6">Westlake/ZC Rubber Contacts</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">General Contact</p>
                    <p className="text-sm text-muted-foreground">kinson@zc-rubber.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Phone</p>
                    <p className="text-sm text-muted-foreground">+86 571 8675 5920</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Alternative Contact</p>
                    <p className="text-sm text-muted-foreground">cuijianfei@zc-rubber.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="w-6 h-6 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground mb-1">Alternative Phone</p>
                    <p className="text-sm text-muted-foreground">+86 571 8675 5919</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <Card className="p-8 card-elevated border-2 border-primary">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">Ready to Get Started?</h4>
                  <p className="text-muted-foreground mb-4">
                    Use the calculator above to test different scenarios and determine your optimal sourcing strategy. Then follow the implementation roadmap to contact Westlake and negotiate pricing.
                  </p>
                  <Button className="button-primary">
                    Back to Calculator
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          <p>HSC Tyre Sourcing Analysis • Exchange Rate: 1 OMR = 2.6 USD • Report Date: December 29, 2025</p>
        </div>
      </footer>
    </div>
  );
}
