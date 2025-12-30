import { 
  Send, 
  Package, 
  ClipboardCheck, 
  Truck, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Users
} from 'lucide-react';

interface TimelinePhase {
  phase: number;
  title: string;
  duration: string;
  color: string;
  icon: React.ReactNode;
  tasks: string[];
}

const phases: TimelinePhase[] = [
  {
    phase: 1,
    title: 'Supplier Outreach',
    duration: 'Week 1-2',
    color: '#3d7ea6',
    icon: <Send className="w-5 h-5" />,
    tasks: [
      'Contact Triangle (exports@triangletire.cn)',
      'Contact Aeolus (export@aeolustyre.com)',
      'Request binding quotations with GSO certificates',
      'Verify payment terms: 30% deposit, 70% on B/L',
      'Confirm lead times and container availability',
    ],
  },
  {
    phase: 2,
    title: 'Pilot Order',
    duration: 'Week 3-6',
    color: '#059669',
    icon: <Package className="w-5 h-5" />,
    tasks: [
      'Place pilot order: 1 container (230 units)',
      'Open Letter of Credit with bank',
      'Arrange pre-shipment inspection (recommended)',
      'Secure customs broker for Oman clearance',
      'Prepare warehouse for receipt',
    ],
  },
  {
    phase: 3,
    title: 'Quality Validation',
    duration: 'Week 7-10',
    color: '#7c3aed',
    icon: <ClipboardCheck className="w-5 h-5" />,
    tasks: [
      'Receive pilot shipment at Port of Sohar',
      'Conduct quality inspection (GSO labels, DOT codes)',
      'Test tyres on sample tanker fleet (10-15 units)',
      'Monitor performance over 2-4 weeks',
      'Collect feedback from drivers and mechanics',
    ],
  },
  {
    phase: 4,
    title: 'Scale to Full Volume',
    duration: 'Week 11+',
    color: '#d97706',
    icon: <Truck className="w-5 h-5" />,
    tasks: [
      'If pilot successful, scale to 4-5 containers/quarter',
      'Establish recurring purchase orders',
      'Implement inventory management system',
      'Set up 2-week safety stock buffer',
      'Monitor cost savings and adjust as needed',
    ],
  },
];

const criticalFactors = [
  {
    icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
    title: 'Never Allow "Doubling"',
    description: 'Tyres must be interlaced normally in containers. Compressed/doubled tyres have permanent bead damage.',
  },
  {
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    title: 'GSO Certification Required',
    description: 'All tyres must have valid GSO certificate with QR code for GCC customs clearance.',
  },
  {
    icon: <DollarSign className="w-5 h-5 text-green-500" />,
    title: 'Payment via Letter of Credit',
    description: 'Use LC at Sight to protect funds until compliant shipping documents are presented.',
  },
  {
    icon: <Users className="w-5 h-5 text-purple-500" />,
    title: 'Experienced Customs Broker',
    description: 'Hire a broker familiar with tyre imports to Oman to avoid HS code misclassification.',
  },
];

export default function ImplementationRoadmap() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Implementation Roadmap</h3>
            <p className="text-gray-600">
              10-week pilot program from supplier contact to full-scale deployment
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-blue-700">~60 days total</span>
          </div>
        </div>
      </div>
      
      {/* Timeline */}
      <div className="card-elevated p-6">
        <h4 className="text-xl font-bold mb-6">Phase Timeline</h4>
        
        <div className="space-y-0">
          {phases.map((phase, idx) => (
            <div key={phase.phase} className="relative">
              {/* Connector Line */}
              {idx < phases.length - 1 && (
                <div 
                  className="absolute left-6 top-14 w-0.5 h-full"
                  style={{ backgroundColor: '#e5e7eb' }}
                />
              )}
              
              <div className="flex gap-6 pb-8">
                {/* Phase Number */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0 z-10"
                  style={{ backgroundColor: phase.color }}
                >
                  {phase.phase}
                </div>
                
                {/* Phase Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${phase.color}20` }}
                    >
                      <div style={{ color: phase.color }}>
                        {phase.icon}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-bold text-gray-900">{phase.title}</h5>
                      <p className="text-sm text-gray-500">{phase.duration}</p>
                    </div>
                  </div>
                  
                  <ul className="space-y-2 ml-1">
                    {phase.tasks.map((task, taskIdx) => (
                      <li 
                        key={taskIdx} 
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle 
                          className="w-4 h-4 mt-0.5 flex-shrink-0"
                          style={{ color: phase.color }}
                        />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Critical Success Factors */}
      <div className="card-elevated p-6 border-l-4 border-l-amber-500">
        <h4 className="text-xl font-bold mb-4 text-amber-800">Critical Success Factors</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalFactors.map((factor, idx) => (
            <div key={idx} className="flex gap-4 p-4 bg-amber-50 rounded-lg">
              <div className="flex-shrink-0 mt-1">
                {factor.icon}
              </div>
              <div>
                <h5 className="font-semibold text-gray-900 mb-1">{factor.title}</h5>
                <p className="text-sm text-gray-600">{factor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Payment Terms */}
      <div className="card-elevated p-6">
        <h4 className="text-xl font-bold mb-4">Payment Terms & Logistics</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-3">Payment Structure</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Deposit</span>
                <span className="font-semibold">30%</span>
              </li>
              <li className="flex justify-between">
                <span>Balance on B/L</span>
                <span className="font-semibold">70%</span>
              </li>
              <li className="flex justify-between border-t pt-2 mt-2">
                <span>Method</span>
                <span className="font-semibold">LC at Sight</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-3">Shipping Details</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>Container</span>
                <span className="font-semibold">40ft HC</span>
              </li>
              <li className="flex justify-between">
                <span>Capacity</span>
                <span className="font-semibold">230 tyres</span>
              </li>
              <li className="flex justify-between">
                <span>Transit Time</span>
                <span className="font-semibold">25-35 days</span>
              </li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-900 mb-3">Customs & Duties</h5>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex justify-between">
                <span>HS Code</span>
                <span className="font-semibold">4011.20</span>
              </li>
              <li className="flex justify-between">
                <span>Customs Duty</span>
                <span className="font-semibold">5% CIF</span>
              </li>
              <li className="flex justify-between">
                <span>VAT</span>
                <span className="font-semibold">5%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Contact Templates */}
      <div className="card-elevated p-6">
        <h4 className="text-xl font-bold mb-4">Ready-to-Use Contact Templates</h4>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold text-blue-800">Triangle Tyre Inquiry</h5>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Primary</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>To:</strong> exports@triangletire.cn
            </p>
            <p className="text-sm text-gray-600">
              Request for quotation on 12.00R24 TBR tyres (TR668/TR691), 
              GSO certification details, minimum order quantities, and CIF Sohar pricing.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h5 className="font-semibold text-green-800">Aeolus Tyre Inquiry</h5>
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Secondary</span>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              <strong>To:</strong> export@aeolustyre.com
            </p>
            <p className="text-sm text-gray-600">
              Request for quotation on 12.00R24 heavy-duty tyres (HN08/HN25), 
              emphasis on overload capability for water tanker applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
