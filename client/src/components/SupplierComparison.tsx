import { useState } from 'react';
import { 
  SUPPLIERS, 
  calculateLandedCost, 
  formatOMR, 
  type SupplierInfo 
} from '@/lib/calculations';
import { 
  CheckCircle, 
  AlertTriangle, 
  MapPin, 
  Mail, 
  Shield, 
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface SupplierCardProps {
  supplier: SupplierInfo;
  isRecommended?: boolean;
}

function SupplierCard({ supplier, isRecommended }: SupplierCardProps) {
  const [expanded, setExpanded] = useState(false);
  
  // Calculate costs at midpoint FOB
  const midFob = Math.round((supplier.fobMin + supplier.fobMax) / 2);
  const costs = calculateLandedCost(midFob, 1000);
  
  const isHighRisk = supplier.riskLevel === 'high';
  
  return (
    <div 
      className={`card-elevated overflow-hidden transition-all ${
        isRecommended ? 'ring-2 ring-green-500' : ''
      }`}
    >
      {/* Header */}
      <div 
        className="p-5"
        style={{ 
          backgroundColor: supplier.bgColor,
          borderBottom: `3px solid ${supplier.borderColor}`
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            {isRecommended && (
              <span className="inline-block px-2 py-1 bg-green-600 text-white text-xs font-bold rounded mb-2">
                RECOMMENDED
              </span>
            )}
            <h3 className="text-xl font-bold text-gray-900">{supplier.name}</h3>
            <p className="text-gray-600">{supplier.model}</p>
          </div>
          
          {isHighRisk ? (
            <AlertTriangle className="w-8 h-8 text-red-500" />
          ) : (
            <CheckCircle className="w-8 h-8 text-green-500" />
          )}
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">FOB Range</p>
            <p className="font-bold text-gray-900 number-display">
              ${supplier.fobMin} - ${supplier.fobMax}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Landed Cost*</p>
            <p className="font-bold text-gray-900 number-display">
              ~{formatOMR(costs.totalLandedCostOMR)} OMR
            </p>
          </div>
        </div>
      </div>
      
      {/* Body */}
      <div className="p-5">
        {/* Risk & Warranty */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isHighRisk 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}
          >
            {supplier.riskLabel}
          </span>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${
              isHighRisk 
                ? 'bg-red-100 text-red-700' 
                : 'bg-blue-100 text-blue-700'
            }`}
          >
            <Shield className="w-3 h-3" />
            {supplier.warranty}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-sm text-gray-600 mb-4">{supplier.description}</p>
        
        {/* Contact */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
          <Mail className="w-4 h-4 text-gray-400" />
          <span>{supplier.email}</span>
        </div>
        
        {/* Expandable Section */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-between py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          <span>{expanded ? 'Hide Details' : 'Show Details'}</span>
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expanded && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {/* Advantages */}
            <div>
              <h5 className="font-semibold text-green-700 mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Advantages
              </h5>
              <ul className="space-y-1">
                {supplier.advantages.map((adv, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-green-500 font-bold mt-0.5">+</span>
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Disadvantages */}
            <div>
              <h5 className="font-semibold text-red-700 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Considerations
              </h5>
              <ul className="space-y-1">
                {supplier.disadvantages.map((dis, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                    <span className="text-red-500 font-bold mt-0.5">-</span>
                    {dis}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Savings Projection */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
                Annual Savings at 1,000 Units
              </p>
              <p className="text-2xl font-bold number-display" style={{ color: supplier.color }}>
                {costs.annualSavingsOMR.toLocaleString()} OMR
              </p>
              <p className="text-xs text-gray-500 mt-1">
                *Based on ${midFob} FOB midpoint
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SupplierComparison() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card-elevated p-6">
        <h3 className="text-2xl font-bold mb-2">Supplier Comparison</h3>
        <p className="text-gray-600">
          Compare verified suppliers for 12.00R24 TBR tyres. All calculations based on Q4 2024 market data.
        </p>
        
        {/* Quick Comparison Table */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Supplier</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">FOB Range</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Landed Cost</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Warranty</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-700">Risk</th>
              </tr>
            </thead>
            <tbody>
              {SUPPLIERS.map((supplier, idx) => {
                const midFob = Math.round((supplier.fobMin + supplier.fobMax) / 2);
                const costs = calculateLandedCost(midFob, 1000);
                const isHighRisk = supplier.riskLevel === 'high';
                
                return (
                  <tr 
                    key={supplier.id} 
                    className={`border-b border-gray-100 ${idx === 0 ? 'bg-green-50' : ''}`}
                  >
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: supplier.color }}
                        />
                        <span className="font-medium">{supplier.name}</span>
                        {idx === 0 && (
                          <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center number-display">
                      ${supplier.fobMin}-${supplier.fobMax}
                    </td>
                    <td className="py-3 px-2 text-center font-semibold number-display">
                      {formatOMR(costs.totalLandedCostOMR)} OMR
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span className={`text-xs font-medium ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                        {supplier.warranty}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          isHighRisk 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {supplier.riskLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Supplier Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {SUPPLIERS.map((supplier, idx) => (
          <SupplierCard 
            key={supplier.id} 
            supplier={supplier} 
            isRecommended={idx === 0}
          />
        ))}
      </div>
      
      {/* Important Notice */}
      <div className="card-elevated p-6 border-l-4 border-l-amber-500">
        <h4 className="font-bold text-amber-800 mb-2">Important: Parallel Import Warning</h4>
        <p className="text-sm text-gray-700">
          While parallel imports offer the lowest unit price, they carry significant risks including 
          <strong> voided warranties</strong>, potential <strong>bead damage from "doubling"</strong>, 
          and no recourse for defective units. For safety-critical applications like water tankers, 
          we strongly recommend Triangle or Aeolus with full factory warranty.
        </p>
      </div>
    </div>
  );
}
