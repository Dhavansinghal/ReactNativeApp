export type MetalPrice = {
  buy: number;
  sell: number;
  change: number;
  changePercent: number;
  time: string;
};

export type MetalData = {
  Ask: number;
  Bid: number;
  Close: number;
  Difference: number;
  High: number;
  LTP: number;
  Low: number;
  Name: string;
  Open: string;
  Time: string;
  symbol: string;
}


export interface McxItem {
  id: string; // e.g., "gold_mcx_present"
  title: string; // e.g., "GOLD MCX PRESENT"
  metalType: 'gold' | 'silver'; // To distinguish for selection logic
  contractName: string; // e.g., "GOLD MCX PRESENT" to display
  buy: number;
  sell: number;
  high: number;
  low: number;
  open: number;
  close: number;
}

export interface PremiumDetails {
  buy: number;
  sell: number;
}

// This interface will be used by the Bhav page to structure data for display cards
export interface CalculatedDisplayItem {
  id: string;
  title: string; // e.g. "GOLD 995 (10g)" - from selected McxItem.contractName
  baseBuy: number;
  baseSell: number;
  premiumBuy: number;
  premiumSell: number;
  finalBuy: number;
  finalSell: number;
  metalType: 'gold' | 'silver';
}
