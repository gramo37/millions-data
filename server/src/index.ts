import express from "express";
import cors from "cors";
import http from "http";
import WebSocket from "ws";

import route1 from "./routes/route1";
import route2 from "./routes/route2";
import { generateStockData } from "./utils";

const app = express();
const port = 5000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

app.use(cors());

// Web Socket Requests
wss.on("connection", (ws: WebSocket) => {
  console.log("New WebSocket connection");

  // Send data to the client every 3 seconds
  const interval = setInterval(() => {
    const data = generateStockData(10000);
    ws.send(JSON.stringify(data));
  }, 3000);

  // Clean up on connection close
  ws.on("close", () => {
    console.log("WebSocket connection closed");
    clearInterval(interval);
  });
});

// HTTP requests
app.use("/api/v1", route1);
app.use("/api/v2", route2);

// Upgrade HTTP to WebSocket connections
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/ws") {
    wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
      wss.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
