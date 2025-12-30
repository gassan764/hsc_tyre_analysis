import { 
  Scale, 
  Shield, 
  FileCheck, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Info,
  Building2,
  Truck
} from 'lucide-react';

export default function LegalAndQuality() {
  return (
    <div className="space-y-6">
      {/* Why Westlake Direct is Blocked */}
      <div className="card-elevated p-6 border-l-4 border-l-red-500">
        <div className="flex items-start gap-4">
          <Scale className="w-8 h-8 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Why Westlake Direct Purchase is Blocked
            </h3>
            <p className="text-gray-700 mb-4">
              Oman's <strong>Commercial Agencies Law (Royal Decree 26/77)</strong> grants exclusive 
              territorial rights to registered agents. Saud Bahwan Group holds the exclusive 
              Westlake/ZC Rubber agency for Oman.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <XCircle className="w-4 h-4" />
                  What Happens If You Contact ZC Rubber
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Your inquiry is forwarded to Saud Bahwan</li>
                  <li>You receive the standard 115 OMR retail quote</li>
                  <li>No direct factory pricing available</li>
                  <li>Agency law protects distributor margins</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Why Triangle/Aeolus Works
                </h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Fragmented distribution in Oman</li>
                  <li>No monopolistic exclusive agent</li>
                  <li>Multiple small importers already active</li>
                  <li>Factory willing to sell to fleet end-users</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* GSO Certification */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4 mb-6">
          <Shield className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">GSO Certification (Mandatory)</h3>
            <p className="text-gray-600">
              Gulf Standardization Organization (GSO) certificate is required for all tyres 
              entering GCC countries. Without valid GSO labels, customs will reject shipment.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">Required Labels</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Rolling Resistance classification</li>
              <li>Wet Grip rating</li>
              <li>External rolling noise (dB)</li>
              <li>QR code linking to GSO database</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h5 className="font-semibold text-gray-800 mb-2">Verification Steps</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Request PDF copy of GSO certificate</li>
              <li>Verify certificate on GSO website</li>
              <li>Check specific size (12.00R24) is covered</li>
              <li>Get photo of actual tyre label</li>
            </ul>
          </div>
          
          <div className="p-4 bg-red-50 rounded-lg">
            <h5 className="font-semibold text-red-800 mb-2">Parallel Import Risk</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>Tyres for Africa/LATAM markets lack GSO</li>
              <li>Customs rejection at port</li>
              <li>Forced re-export or destruction</li>
              <li>100% financial loss</li>
            </ul>
          </div>
        </div>
        
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Action Required:</strong> Before sending any deposit, obtain PDF copy of 
            GSO certificate AND photo of actual tyre sidewall showing GSO label with QR code.
          </p>
        </div>
      </div>
      
      {/* Quality Comparison */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4 mb-6">
          <FileCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Quality Comparison: Chinese Tier-1 vs. Premium</h3>
            <p className="text-gray-600">
              For TBR tyres in fleet applications, Chinese Tier-1 manufacturers have 
              significantly closed the quality gap with premium Western brands.
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3 font-semibold text-gray-700">Factor</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-700">Chinese Tier-1</th>
                <th className="text-center py-3 px-3 font-semibold text-gray-700">Premium (Michelin/Bridgestone)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-3">FOB Price</td>
                <td className="py-3 px-3 text-center font-semibold text-green-600">$160-200</td>
                <td className="py-3 px-3 text-center text-red-600">$400-550</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="py-3 px-3">Tread Life</td>
                <td className="py-3 px-3 text-center">Good (80-90% of premium)</td>
                <td className="py-3 px-3 text-center">Excellent</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-3">Cut/Puncture Resistance</td>
                <td className="py-3 px-3 text-center">Comparable</td>
                <td className="py-3 px-3 text-center">Excellent</td>
              </tr>
              <tr className="border-b border-gray-100 bg-gray-50">
                <td className="py-3 px-3">Heat Resistance (50°C+)</td>
                <td className="py-3 px-3 text-center">Good</td>
                <td className="py-3 px-3 text-center">Excellent</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-3">Retreadability</td>
                <td className="py-3 px-3 text-center">1-2 retreads</td>
                <td className="py-3 px-3 text-center">2-3 retreads</td>
              </tr>
              <tr className="border-b border-gray-100 bg-green-50">
                <td className="py-3 px-3 font-semibold">Cost Per Kilometer (CPK)</td>
                <td className="py-3 px-3 text-center font-bold text-green-600">Lower (better value)</td>
                <td className="py-3 px-3 text-center">Higher</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Key Insight:</strong> For water tanker fleets where tyre damage is primarily 
            impact/cut-driven (not tread wear), the Cost Per Kilometer (CPK) heavily favors 
            lower capital cost Chinese Tier-1 tyres over premium brands.
          </p>
        </div>
      </div>
      
      {/* The "Doubling" Danger */}
      <div className="card-elevated p-6 border-l-4 border-l-red-500">
        <div className="flex items-start gap-4">
          <AlertTriangle className="w-8 h-8 text-red-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold text-red-800 mb-2">
              Critical: The "Doubling" Danger
            </h3>
            <p className="text-gray-700 mb-4">
              Some traders compress tyres and nest them inside each other ("doubling") to fit 
              more units per container, saving ~1 OMR per tyre in freight. This practice causes 
              permanent bead wire damage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h5 className="font-semibold text-red-800 mb-2">Engineering Problem</h5>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>12.00R24 tube-type has stiff steel bead wire</li>
                  <li>Compression permanently deforms/kinks wire</li>
                  <li>Creates stress concentration points</li>
                  <li>Under water surge loads: catastrophic blowout</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h5 className="font-semibold text-green-800 mb-2">Mandatory Safeguard</h5>
                <p className="text-sm text-gray-600 mb-2">
                  Purchase orders must explicitly state:
                </p>
                <div className="bg-white p-3 rounded border border-green-300 text-sm font-mono">
                  "Loading Method: Normal Interlacing Only.<br/>
                  No Doubling. No Pressing."
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Require photographic proof of loading before releasing 70% balance.
                </p>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Risk vs. Reward:</strong> Saving 1 OMR per tyre through doubling is 
                negligible compared to the 85 OMR replacement cost or potential accident 
                liability from a blowout on a loaded water tanker.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customs Compliance */}
      <div className="card-elevated p-6">
        <div className="flex items-start gap-4 mb-6">
          <Building2 className="w-8 h-8 text-purple-500 flex-shrink-0" />
          <div>
            <h3 className="text-xl font-bold mb-2">Customs Compliance Checklist</h3>
            <p className="text-gray-600">
              Ensure all documentation is accurate and consistent to avoid delays and penalties.
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          {[
            { item: 'Correct HS Code', detail: '4011.20 ("New pneumatic tyres, of rubber, of a kind used on buses or lorries")', status: 'critical' },
            { item: 'GSO Certificate', detail: 'Valid certificate matching exact tyre size and brand', status: 'critical' },
            { item: 'Document Consistency', detail: 'Commercial Invoice, Packing List, and B/L must match exactly', status: 'critical' },
            { item: 'Certificate of Origin', detail: 'Required for customs clearance', status: 'required' },
            { item: 'Pre-Shipment Inspection', detail: 'Optional but recommended for first orders', status: 'recommended' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className={`flex items-start gap-3 p-4 rounded-lg ${
                item.status === 'critical' ? 'bg-red-50' : 
                item.status === 'required' ? 'bg-amber-50' : 'bg-gray-50'
              }`}
            >
              <CheckCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                item.status === 'critical' ? 'text-red-500' : 
                item.status === 'required' ? 'text-amber-500' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-semibold text-gray-900">{item.item}</p>
                <p className="text-sm text-gray-600">{item.detail}</p>
              </div>
              <span className={`ml-auto px-2 py-1 rounded text-xs font-semibold ${
                item.status === 'critical' ? 'bg-red-200 text-red-800' : 
                item.status === 'required' ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-700'
              }`}>
                {item.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-800">
            <strong>Tip:</strong> Discrepancies between documents trigger physical inspection 
            (~100 OMR cost + delays). Ensure quantity, weight, and descriptions match exactly 
            across all paperwork.
          </p>
        </div>
      </div>
    </div>
  );
}
