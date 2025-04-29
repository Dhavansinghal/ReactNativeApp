export type MetalPrice = {
  price: number;
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