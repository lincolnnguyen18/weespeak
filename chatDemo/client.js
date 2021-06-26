let ws = new WebSocket("ws://localhost:8081");
ws.onmessage = message => console.log(`received message: ${message.utf8Data}`);
ws.onclose = message => console.log('ws closed');
