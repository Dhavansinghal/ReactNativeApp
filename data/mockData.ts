export const mockChartData = {
  gold: {
    // day: [
    //   { time: "00:00", price: 2105.36 },
    //   { time: "01:00", price: 2107.45 },
    //   { time: "02:00", price: 2109.23 },
    //   { time: "03:00", price: 2110.17 },
    //   { time: "04:00", price: 2114.89 },
    //   { time: "05:00", price: 2118.52 },
    //   { time: "06:00", price: 2116.24 },
    //   { time: "07:00", price: 2115.42 },
    //   { time: "08:00", price: 2117.36 },
    //   { time: "09:00", price: 2122.48 },
    //   { time: "10:00", price: 2125.18 },
    //   { time: "11:00", price: 2123.74 },
    //   { time: "12:00", price: 2120.45 },
    // ],
    // week: [
    //   { time: "Mon", price: 2090.12 },
    //   { time: "Tue", price: 2095.45 },
    //   { time: "Wed", price: 2102.36 },
    //   { time: "Thu", price: 2110.89 },
    //   { time: "Fri", price: 2118.74 },
    //   { time: "Sat", price: 2123.56 },
    //   { time: "Sun", price: 2120.45 },
    // ],
    // month: [
    //   { time: "Week 1", price: 2075.34 },
    //   { time: "Week 2", price: 2090.12 },
    //   { time: "Week 3", price: 2105.45 },
    //   { time: "Week 4", price: 2120.45 },
    // ],
    // year: [
    //   { time: "Jan", price: 1925.64 },
    //   { time: "Feb", price: 1950.23 },
    //   { time: "Mar", price: 1975.42 },
    //   { time: "Apr", price: 2010.18 },
    //   { time: "May", price: 2025.36 },
    //   { time: "Jun", price: 2045.89 },
    //   { time: "Jul", price: 2060.74 },
    //   { time: "Aug", price: 2080.23 },
    //   { time: "Sep", price: 2095.67 },
    //   { time: "Oct", price: 2105.42 },
    //   { time: "Nov", price: 2110.56 },
    //   { time: "Dec", price: 2120.45 },
    // ],
  },
  silver: {
    // day: [
    //   { time: "00:00", price: 26.12 },
    //   { time: "01:00", price: 26.24 },
    //   { time: "02:00", price: 26.36 },
    //   { time: "03:00", price: 26.48 },
    //   { time: "04:00", price: 26.62 },
    //   { time: "05:00", price: 26.78 },
    //   { time: "06:00", price: 26.92 },
    //   { time: "07:00", price: 26.86 },
    //   { time: "08:00", price: 26.74 },
    //   { time: "09:00", price: 26.68 },
    //   { time: "10:00", price: 26.82 },
    //   { time: "11:00", price: 26.94 },
    //   { time: "12:00", price: 26.82 },
    // ],
    // week: [
    //   { time: "Mon", price: 25.74 },
    //   { time: "Tue", price: 25.92 },
    //   { time: "Wed", price: 26.18 },
    //   { time: "Thu", price: 26.42 },
    //   { time: "Fri", price: 26.68 },
    //   { time: "Sat", price: 26.94 },
    //   { time: "Sun", price: 26.82 },
    // ],
    // month: [
    //   { time: "Week 1", price: 25.36 },
    //   { time: "Week 2", price: 25.74 },
    //   { time: "Week 3", price: 26.42 },
    //   { time: "Week 4", price: 26.82 },
    // ],
    // year: [
    //   { time: "Jan", price: 22.34 },
    //   { time: "Feb", price: 22.86 },
    //   { time: "Mar", price: 23.24 },
    //   { time: "Apr", price: 23.68 },
    //   { time: "May", price: 24.12 },
    //   { time: "Jun", price: 24.56 },
    //   { time: "Jul", price: 24.92 },
    //   { time: "Aug", price: 25.24 },
    //   { time: "Sep", price: 25.68 },
    //   { time: "Oct", price: 26.12 },
    //   { time: "Nov", price: 26.48 },
    //   { time: "Dec", price: 26.82 },
    // ],
  },
};

export const mockHistoryData = [
  {
    id: '1',
    metal: 'gold',
    price: 2120.45,
    change: 0.59,
    timestamp: '10:34 AM, Today'
  },
  {
    id: '2',
    metal: 'silver',
    price: 26.82,
    change: -0.89,
    timestamp: '10:32 AM, Today'
  },
  
];


import type { McxItem } from '@/types/metals';

export const mcxData: McxItem[] = [
  {
    id: 'gold_mcx_present',
    title: 'GOLD MCX PRESENT (10g)', // Added weight for clarity as in image
    metalType: 'gold',
    contractName: 'GOLD MCX PRESENT (10g)',
    buy: 68979, // Example base price
    sell: 69786, // Example base price
    high: 89897,
    low: 89098,
    open: 79878,
    close: 89987,
  },
  {
    id: 'silver_mcx_present',
    title: 'SILVER MCX PRESENT (1kg)', // Added weight for clarity as in image
    metalType: 'silver',
    contractName: 'SILVER MCX PRESENT (1kg)',
    buy: 88979, // Example base price
    sell: 89786, // Example base price
    high: 89897,
    low: 89098,
    open: 79878,
    close: 89987,
  },
  {
    id: 'gold_mcx_next',
    title: 'GOLD MCX NEXT (10g)',
    metalType: 'gold',
    contractName: 'GOLD MCX NEXT (10g)',
    buy: 69200, 
    sell: 70000,
    high: 89897,
    low: 89098,
    open: 79878,
    close: 89987,
  },
  {
    id: 'silver_mcx_next',
    title: 'SILVER MCX NEXT (1Kg)',
    metalType: 'silver',
    contractName: 'SILVER MCX NEXT (1Kg)',
    buy: 89200, 
    sell: 90000,
    high: 91300,
    low: 90300,
    open: 90800,
    close: 90750,
  },
  // Add more items as needed, e.g., Gold Mini, Silver Mini etc.
];
