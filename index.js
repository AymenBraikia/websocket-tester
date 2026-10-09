import { WebSocketServer } from "ws";

const PORT = 8080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server listening on ws://localhost:${PORT}`);

wss.on("connection", (ws, req) => {
    // Extract client IP (handling forwarded headers if behind a proxy)
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    console.log("\n========================================");
    console.log(`[${new Date().toISOString()}] New Connection Established`);
    console.log(`Client IP: ${clientIp}`);
    console.log("Received Headers:");
    console.dir(req.headers, { depth: null });
    console.log("========================================\n");

    ws.on("message", (message) => {
        console.log(`Received message: ${message}`);
    });

    ws.on("close", () => {
        console.log(`Connection closed for IP: ${clientIp}`);
    });

    // Send initial message to client
    ws.send(JSON.stringify({ status: "connected", ip: clientIp }));
});
