import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Mail, Phone, Globe, AlertCircle, CheckCircle } from 'lucide-react';

interface SupplierInfo {
  name: string;
  model: string;
  image: string;
  location: string;
  country: string;
  email: string;
  phone?: string;
  website?: string;
  warranty: string;
  risk: string;
  fobMin: number;
  fobMax: number;
  description: string;
  specs: string[];
  advantages: string[];
  disadvantages: string[];
}

const suppliers: SupplierInfo[] = [
  {
    name: 'Triangle Tyre',
    model: 'TR668 / TR691',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    location: 'Qingdao',
    country: 'China',
    email: 'exports@triangletire.cn',
    phone: '+86-532-8888-8888',
    website: 'www.triangletire.com',
    warranty: 'Full Factory Warranty',
    risk: 'Low-Medium',
    fobMin: 175,
    fobMax: 195,
    description: 'Triangle Tyre is one of China\'s leading tyre manufacturers with global distribution. Their TR668 and TR691 models are specifically designed for heavy-duty truck applications.',
    specs: [
      'Load Index: 160K',
      'Ply Rating: 18-20 PR',
      'Pattern: Rib-lug (TR668) / Drive-position (TR691)',
      'Bead Type: Steel wire reinforced',
      'Tread Depth: 17mm (new)',
    ],
    advantages: [
      'Fragmented distribution in Oman (no monopolistic blocker)',
      'Factory-direct pricing available',
      'Full warranty coverage',
      'Competitive lead times (4-6 weeks)',
      'GSO certified models available',
    ],
    disadvantages: [
      'Minimum order quantity: 1 container (230 units)',
      'Payment: 30% deposit, 70% on shipment',
      'Longer lead time than local suppliers',
      'Language barrier (English-speaking export dept)',
    ],
  },
  {
    name: 'Aeolus Tyre',
    model: 'HN08 / HN25',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop',
    location: 'Weihai',
    country: 'China',
    email: 'export@aeolustype.com',
    phone: '+86-631-5388-8888',
    website: 'www.aeolustype.com',
    warranty: 'Full Factory Warranty',
    risk: 'Low-Medium',
    fobMin: 180,
    fobMax: 200,
    description: 'Aeolus is a specialized heavy-duty tyre manufacturer with expertise in tanker and truck applications. Known for durability and overload capability.',
    specs: [
      'Load Index: 160K+',
      'Ply Rating: 20 PR',
      'Pattern: Heavy-duty lug design',
      'Bead Type: Steel wire reinforced',
      'Tread Depth: 18mm (new)',
    ],
    advantages: [
      'Heavy-duty specialist (ideal for tankers)',
      'Superior overload capability',
      'Full factory warranty',
      'Competitive pricing',
      'Proven track record in GCC region',
    ],
    disadvantages: [
      'Slightly higher price than Triangle',
      'Minimum order: 1 container',
      'Less fragmented distribution',
      'Longer lead times',
    ],
  },
  {
    name: 'Parallel Import (Westlake)',
    model: 'CM998',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    location: 'Multiple (Gray Market)',
    country: 'China',
    email: 'Various traders',
    phone: 'N/A',
    website: 'N/A',
    warranty: 'Void / None',
    risk: 'High',
    fobMin: 145,
    fobMax: 165,
    description: 'Parallel imports are Westlake tyres sourced through unauthorized channels. While cheaper, they carry significant risks.',
    specs: [
      'Load Index: 160K',
      'Ply Rating: 18 PR',
      'Pattern: Rib-lug',
      'Bead Type: Steel wire',
      'Tread Depth: 17mm (new)',
    ],
    advantages: [
      'Lowest price (8-10 OMR cheaper per tyre)',
      'Same Westlake quality (if authentic)',
      'Faster sourcing from traders',
    ],
    disadvantages: [
      'WARRANTY VOIDED - Westlake will not honor claims',
      'Risk of "doubling" (bead compression damage)',
      'Serial numbers may be buffed/altered',
      'No recourse for defects',
      'Catastrophic blowout risk on tankers',
      'Potential customs issues',
    ],
  },
];

interface SupplierDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: SupplierInfo;
}

export function SupplierDetailModal({ isOpen, onClose, supplier }: SupplierDetailModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{supplier.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="w-full h-64 rounded-lg overflow-hidden bg-secondary">
            <img
              src={supplier.image}
              alt={supplier.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Location & Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Location</h4>
              </div>
              <p className="text-sm text-muted-foreground">{supplier.location}, {supplier.country}</p>
            </div>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground">Email</h4>
              </div>
              <p className="text-sm text-muted-foreground break-all">{supplier.email}</p>
            </div>

            {supplier.phone && (
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Phone</h4>
                </div>
                <p className="text-sm text-muted-foreground">{supplier.phone}</p>
              </div>
            )}

            {supplier.website && supplier.website !== 'N/A' && (
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <h4 className="font-semibold text-foreground">Website</h4>
                </div>
                <p className="text-sm text-muted-foreground">{supplier.website}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="font-semibold text-foreground mb-2">About</h4>
            <p className="text-sm text-muted-foreground">{supplier.description}</p>
          </div>

          {/* Specifications */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Tyre Specifications</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {supplier.specs.map((spec, idx) => (
                <div key={idx} className="p-2 bg-secondary rounded text-sm text-muted-foreground">
                  • {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Advantages */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Advantages
            </h4>
            <ul className="space-y-2">
              {supplier.advantages.map((adv, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-green-600 font-bold">✓</span>
                  {adv}
                </li>
              ))}
            </ul>
          </div>

          {/* Disadvantages */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              Disadvantages
            </h4>
            <ul className="space-y-2">
              {supplier.disadvantages.map((dis, idx) => (
                <li key={idx} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-red-600 font-bold">✗</span>
                  {dis}
                </li>
              ))}
            </ul>
          </div>

          {/* Warranty & Risk */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-500">
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Warranty</p>
              <p className="font-semibold text-foreground">{supplier.warranty}</p>
            </div>
            <div className={`p-4 rounded-lg border ${
              supplier.risk === 'High'
                ? 'bg-red-50 dark:bg-red-950 border-red-500'
                : 'bg-green-50 dark:bg-green-950 border-green-500'
            }`}>
              <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Risk Level</p>
              <p className="font-semibold text-foreground">{supplier.risk}</p>
            </div>
          </div>

          {/* FOB Price Range */}
          <div className="p-4 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">FOB Price Range</p>
            <p className="text-2xl font-bold text-primary">${supplier.fobMin} - ${supplier.fobMax} USD</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SupplierCardProps {
  supplier: SupplierInfo;
}

export function SupplierCard({ supplier }: SupplierCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Card
        className="p-4 cursor-pointer hover:shadow-lg transition-shadow card-elevated"
        onClick={() => setIsOpen(true)}
      >
        <div className="mb-4 h-32 rounded-lg overflow-hidden bg-secondary">
          <img
            src={supplier.image}
            alt={supplier.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        <h3 className="font-semibold text-foreground mb-1">{supplier.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{supplier.model}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
          <MapPin className="w-4 h-4" />
          {supplier.location}, {supplier.country}
        </div>
        <div className="flex gap-2 mb-3">
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 rounded text-xs font-medium">
            ${supplier.fobMin}-${supplier.fobMax}
          </span>
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            supplier.risk === 'High'
              ? 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100'
              : 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100'
          }`}>
            {supplier.risk} Risk
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Click to view details →</p>
      </Card>

      <SupplierDetailModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        supplier={supplier}
      />
    </>
  );
}

export function SupplierGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {suppliers.map((supplier) => (
        <SupplierCard key={supplier.name} supplier={supplier} />
      ))}
    </div>
  );
}
