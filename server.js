const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('New client connected');


  //Automatically stream simulated data to the browser every second
  const intervalId = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
        const mockData = {
            ticker: 'BTC',
            price: (Math.random() * 10000 + 30000).toFixed(2),
            timestamp: new Date().toISOString()
        };
        ws.send(JSON.stringify(mockData));
    }
  }, 1000);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    clearInterval(intervalId);
    console.log('Client disconnected');
  });
});