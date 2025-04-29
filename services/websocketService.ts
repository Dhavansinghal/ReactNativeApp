// import { Platform } from 'react-native';
// import { MetalPrice } from '@/types/metals';

// let ws: WebSocket | null = null;
// let reconnectInterval: NodeJS.Timeout | null = null;
// let isConnected = false;

// type WebSocketCallbacks = {
//   onGoldUpdate: (data: MetalPrice) => void;
//   onSilverUpdate: (data: MetalPrice) => void;
//   onOpen?: () => void;
//   onError?: (error: Event) => void;
// };

// let callbacks: WebSocketCallbacks = {
//   onGoldUpdate: () => {},
//   onSilverUpdate: () => {},
// };

// // Mock data since we can't actually use API keys in the example
// const mockPriceData = {
//   gold: {
//     price: 2120.45,
//     change: 12.50,
//     changePercent: 0.59,
//   },
//   silver: {
//     price: 26.82,
//     change: -0.24,
//     changePercent: -0.89,
//   }
// };

// export const connectWebSocket = (newCallbacks: WebSocketCallbacks) => {
//   callbacks = newCallbacks;
  
//   // In a real implementation, we would connect to actual WebSocket
//   // But for this example, we will simulate WebSocket with mock data
  
//   if (Platform.OS === 'web') {
//     // For web platform, simulate WebSocket connection
//     simulateWebSocketForWeb();
//   } else {
//     // For native platforms, you would use a real WebSocket
//     // This is just a simulation
//     simulateWebSocketForNative();
//   }
// };

// const simulateWebSocketForWeb = () => {
//   // Simulate WebSocket connection opening after a delay
//   setTimeout(() => {
//     isConnected = true;
//     callbacks.onOpen?.();
    
//     // Send initial price data
//     callbacks.onGoldUpdate({
//       price: mockPriceData.gold.price,
//       change: mockPriceData.gold.change,
//       changePercent: mockPriceData.gold.changePercent,
//     });
    
//     callbacks.onSilverUpdate({
//       price: mockPriceData.silver.price,
//       change: mockPriceData.silver.change,
//       changePercent: mockPriceData.silver.changePercent,
//     });
    
//     // Simulate price updates every few seconds
//     if (reconnectInterval) {
//       clearInterval(reconnectInterval);
//     }
    
//     reconnectInterval = setInterval(() => {
//       if (!isConnected) return;
      
//       // Update gold price with small random changes
//       const goldChange = (Math.random() * 2 - 1) * 5;
//       const newGoldPrice = parseFloat((mockPriceData.gold.price + goldChange).toFixed(2));
//       const goldChangePercent = parseFloat(((goldChange / mockPriceData.gold.price) * 100).toFixed(2));
      
//       mockPriceData.gold = {
//         price: newGoldPrice,
//         change: goldChange,
//         changePercent: goldChangePercent,
//       };
      
//       callbacks.onGoldUpdate(mockPriceData.gold);
      
//       // Update silver price with small random changes
//       const silverChange = (Math.random() * 2 - 1) * 0.5;
//       const newSilverPrice = parseFloat((mockPriceData.silver.price + silverChange).toFixed(2));
//       const silverChangePercent = parseFloat(((silverChange / mockPriceData.silver.price) * 100).toFixed(2));
      
//       mockPriceData.silver = {
//         price: newSilverPrice,
//         change: silverChange,
//         changePercent: silverChangePercent,
//       };
      
//       callbacks.onSilverUpdate(mockPriceData.silver);
      
//     }, 5000); // Update every 5 seconds
//   }, 1000);
// };

// const simulateWebSocketForNative = () => {
//   // This would be similar to web implementation, but might use native APIs
//   // For this example, we'll just reuse the web implementation
//   simulateWebSocketForWeb();
// };

// export const closeWebSocket = () => {
//   isConnected = false;
  
//   if (ws) {
//     ws.close();
//     ws = null;
//   }
  
//   if (reconnectInterval) {
//     clearInterval(reconnectInterval);
//     reconnectInterval = null;
//   }
// };

import io from 'socket.io-client';
import { MetalPrice } from '@/types/metals';

let sock: any = null;

type WebSocketCallbacks = {
  onGoldUpdate: (data: MetalPrice) => void;
  onSilverUpdate: (data: MetalPrice) => void;
  onFullRefresh:  (data: any) => void;
  onOpen?: () => void;
  onError?: (error: Event) => void;
};

let callbacks: WebSocketCallbacks = {
  onGoldUpdate: () => {},
  onFullRefresh: () => {},
  onSilverUpdate: () => {},
};

export const connectWebSocket = (newCallbacks: WebSocketCallbacks) => {
  callbacks = newCallbacks;

  // In a real implementation, we would connect to actual WebSocket
  // Using socket.io-client to establish the connection with the server
  sock = io('https://starlinesupport.co.in:10001', {
    transports: ['websocket'],
    reconnection: false,
    rejectUnauthorized: false, // Ignore certificate issues if any
  });

  sock.on('connect', () => {
    sock.emit('room', 'lawatjewellers');
    sock.emit('Client', 'lawatjewellers');
    callbacks.onOpen?.();
  });

  // sock.on('message', (data: any) => {
  //   console.log('Board →', data);
  //   // Process the data and update the UI
  //   const goldData = data.Rate.find((item: any) => item.Source === 'Gold');
  //   const silverData = data.Rate.find((item: any) => item.Source === 'Silver');

  //   if (goldData) {
  //     callbacks.onGoldUpdate({
  //       price: parseFloat(goldData.Bid),
  //       change: parseFloat(goldData.Diff),
  //       changePercent: (parseFloat(goldData.Diff) / parseFloat(goldData.Bid)) * 100,
  //     });
  //   }

  //   if (silverData) {
  //     callbacks.onSilverUpdate({
  //       price: parseFloat(silverData.Bid),
  //       change: parseFloat(silverData.Diff),
  //       changePercent: (parseFloat(silverData.Diff) / parseFloat(silverData.Bid)) * 100,
  //     });
  //   }
  // });

  sock.on('Liverate', (data: any) => {


    // Live rate handling can be done similarly
    const liveGold = data.find((item: any) => item.symbol === 'gold');
    const liveSilver = data.find((item: any) => item.symbol === 'silver');

    if (liveGold) {
      callbacks.onGoldUpdate({
        price: parseFloat(liveGold.Bid),
        change: parseFloat(liveGold.Difference),
        changePercent: (parseFloat(liveGold.Difference) / parseFloat(liveGold.Bid)) * 100,
        time: liveGold.Time
      });
    }

    if (liveSilver) {
      callbacks.onSilverUpdate({
        price: parseFloat(liveSilver.Bid),
        change: parseFloat(liveSilver.Difference),
        changePercent: (parseFloat(liveSilver.Difference) / parseFloat(liveSilver.Bid)) * 100,
        time: liveGold.Time
      });
    }
    callbacks.onFullRefresh(data);
    
  });

  sock.on('disconnect', () => {
    // console.log('Disconnected');
  });
};

export const closeWebSocket = () => {
  if (sock) {
    sock.disconnect();
    sock = null;
  }
};
