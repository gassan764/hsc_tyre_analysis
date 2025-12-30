/**
 * HSC Tyre Sourcing - Cost Calculation Module
 * All numbers verified from Q4 2024 market research report
 */

// ============================================================================
// VERIFIED CONSTANTS (DO NOT MODIFY WITHOUT VERIFICATION)
// ============================================================================

// Exchange Rate - FIXED (Oman Rial pegged to USD)
export const USD_TO_OMR_RATE = 0.385;
export const OMR_TO_USD_RATE = 1 / USD_TO_OMR_RATE; // 2.5974...

// Current Supplier Pricing
export const CURRENT_PRICE_OMR = 115; // Saud Bahwan (Westlake)

// Logistics Constants
export const OCEAN_FREIGHT_USD = 2500; // Per 40ft HC container
export const CONTAINER_CAPACITY = 230; // Tyres per container (normal interlacing, NO DOUBLING)
export const CLEARANCE_HAULAGE_OMR = 250; // Total for entire container

// Tax Rates
export const CUSTOMS_DUTY_RATE = 0.05; // 5% on CIF
export const VAT_RATE = 0.05; // 5% on (CIF + Customs)
export const INSURANCE_RATE = 0.01; // 1% of FOB

// Supplier Data
export interface SupplierInfo {
  id: string;
  name: string;
  model: string;
  fobMin: number;
  fobMax: number;
  warranty: string;
  email: string;
  riskLevel: 'low' | 'low-medium' | 'medium' | 'high';
  riskLabel: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  advantages: string[];
  disadvantages: string[];
}

export const SUPPLIERS: SupplierInfo[] = [
  {
    id: 'triangle',
    name: 'Triangle Tyre',
    model: 'TR668 / TR691',
    fobMin: 175,
    fobMax: 195,
    warranty: 'Full Factory Warranty',
    email: 'exports@triangletire.cn',
    riskLevel: 'low-medium',
    riskLabel: 'Low-Medium Risk',
    color: '#059669',
    bgColor: '#dcfce7',
    borderColor: '#10b981',
    description: 'Fragmented distribution in Oman - no monopolistic blocker. Factory-direct pricing available.',
    advantages: [
      'No exclusive agency barrier in Oman',
      'Full factory warranty coverage',
      'GSO certified models available',
      'Competitive lead times (4-6 weeks production)',
    ],
    disadvantages: [
      'MOQ: 1 container (230 units)',
      'Payment: 30% deposit, 70% on B/L',
      'Longer lead time than local',
    ],
  },
  {
    id: 'aeolus',
    name: 'Aeolus Tyre',
    model: 'HN08 / HN25',
    fobMin: 180,
    fobMax: 200,
    warranty: 'Full Factory Warranty',
    email: 'export@aeolustyre.com',
    riskLevel: 'low-medium',
    riskLabel: 'Low-Medium Risk',
    color: '#3d7ea6',
    bgColor: '#e0f2fe',
    borderColor: '#0ea5e9',
    description: 'Heavy-duty specialist with superior overload capability. Pirelli technology access via ChemChina.',
    advantages: [
      'Superior overload capability',
      'Heavy-duty specialist (ideal for tankers)',
      'Pirelli technology access',
      'Proven GCC track record',
    ],
    disadvantages: [
      'Slightly higher price than Triangle',
      'MOQ: 1 container',
      'Less fragmented distribution',
    ],
  },
  {
    id: 'parallel',
    name: 'Parallel Import',
    model: 'Westlake CM998 / Chaoyang',
    fobMin: 145,
    fobMax: 165,
    warranty: 'WARRANTY VOID',
    email: 'Various trading houses',
    riskLevel: 'high',
    riskLabel: 'High Risk',
    color: '#dc2626',
    bgColor: '#fee2e2',
    borderColor: '#ef4444',
    description: 'Grey market sourcing through unauthorized channels. Lowest price but significant risks.',
    advantages: [
      'Lowest unit price',
      'Faster sourcing from traders',
    ],
    disadvantages: [
      'WARRANTY VOIDED by manufacturer',
      'Risk of "doubling" (bead damage)',
      'Serial numbers may be buffed/altered',
      'No recourse for defects',
      'Catastrophic blowout risk',
      'Potential customs issues',
    ],
  },
];

// ============================================================================
// COST CALCULATION FUNCTIONS
// ============================================================================

export interface CostBreakdown {
  // Input values
  fobUSD: number;
  volume: number;
  
  // USD Components
  insuranceUSD: number;
  oceanFreightUSD: number;
  cifUSD: number;
  
  // OMR Components (per tyre)
  fobOMR: number;
  insuranceOMR: number;
  oceanFreightOMR: number;
  cifOMR: number;
  customsDutyOMR: number;
  clearanceOMR: number;
  subtotalOMR: number;
  vatOMR: number;
  totalLandedCostOMR: number;
  
  // USD Equivalent
  totalLandedCostUSD: number;
  
  // Savings Analysis
  savingsPerTyreOMR: number;
  savingsPercentage: number;
  annualSavingsOMR: number;
  annualSavingsUSD: number;
  
  // Container Analysis
  containersNeeded: number;
  totalContainerCostOMR: number;
}

/**
 * Calculate the complete landed cost breakdown
 * THIS IS THE VERIFIED FORMULA FROM THE RESEARCH REPORT
 */
export function calculateLandedCost(fobUSD: number, volume: number): CostBreakdown {
  // Step 1: Calculate per-tyre costs in USD
  const insuranceUSD = fobUSD * INSURANCE_RATE;
  const oceanFreightUSD = OCEAN_FREIGHT_USD / CONTAINER_CAPACITY;
  const cifUSD = fobUSD + insuranceUSD + oceanFreightUSD;
  
  // Step 2: Convert to OMR
  const fobOMR = fobUSD * USD_TO_OMR_RATE;
  const insuranceOMR = insuranceUSD * USD_TO_OMR_RATE;
  const oceanFreightOMR = oceanFreightUSD * USD_TO_OMR_RATE;
  const cifOMR = cifUSD * USD_TO_OMR_RATE;
  
  // Step 3: Calculate duties and taxes
  const customsDutyOMR = cifOMR * CUSTOMS_DUTY_RATE;
  const clearanceOMR = CLEARANCE_HAULAGE_OMR / CONTAINER_CAPACITY;
  
  // Step 4: Calculate subtotal (pre-VAT)
  const subtotalOMR = cifOMR + customsDutyOMR + clearanceOMR;
  
  // Step 5: Calculate VAT
  const vatOMR = subtotalOMR * VAT_RATE;
  
  // Step 6: Final landed cost
  const totalLandedCostOMR = subtotalOMR + vatOMR;
  const totalLandedCostUSD = totalLandedCostOMR * OMR_TO_USD_RATE;
  
  // Step 7: Calculate savings
  const savingsPerTyreOMR = CURRENT_PRICE_OMR - totalLandedCostOMR;
  const savingsPercentage = (savingsPerTyreOMR / CURRENT_PRICE_OMR) * 100;
  const annualSavingsOMR = savingsPerTyreOMR * volume;
  const annualSavingsUSD = annualSavingsOMR * OMR_TO_USD_RATE;
  
  // Container analysis
  const containersNeeded = Math.ceil(volume / CONTAINER_CAPACITY);
  const totalContainerCostOMR = totalLandedCostOMR * volume;
  
  return {
    fobUSD,
    volume,
    insuranceUSD,
    oceanFreightUSD,
    cifUSD,
    fobOMR,
    insuranceOMR,
    oceanFreightOMR,
    cifOMR,
    customsDutyOMR,
    clearanceOMR,
    subtotalOMR,
    vatOMR,
    totalLandedCostOMR,
    totalLandedCostUSD,
    savingsPerTyreOMR,
    savingsPercentage,
    annualSavingsOMR,
    annualSavingsUSD,
    containersNeeded,
    totalContainerCostOMR,
  };
}

/**
 * Verify the reference calculation
 * At FOB $180, landed cost should be 82.93 OMR
 */
export function verifyReferenceCalculation(): boolean {
  const result = calculateLandedCost(180, 1000);
  // Allow for floating point precision
  const expected = 82.93;
  const actual = Math.round(result.totalLandedCostOMR * 100) / 100;
  return Math.abs(actual - expected) < 0.01;
}

// Run verification on module load
if (!verifyReferenceCalculation()) {
  console.warn('WARNING: Cost calculation verification failed. Expected 82.93 OMR at $180 FOB');
}

/**
 * Format OMR value with proper precision
 */
export function formatOMR(value: number): string {
  return value.toFixed(2);
}

/**
 * Format USD value with proper precision
 */
export function formatUSD(value: number): string {
  return value.toFixed(2);
}

/**
 * Format large numbers with K suffix
 */
export function formatK(value: number): string {
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toFixed(0);
}
