// worker2.js

const url = "ws://localhost:5000/ws";

onmessage = function (event) {
  if (event.data === "start") {
    // Create a new WebSocket connection
    const ws = new WebSocket(url);

    ws.onopen = function () {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = function (event) {
      // Handle incoming messages from the WebSocket server
      console.log("Message from server:", event.data);
      // Optionally post data back to the main thread
      postMessage(JSON.parse(event.data));
    };

    ws.onclose = function () {
      console.log("WebSocket connection closed");
    };

    ws.onerror = function (error) {
      console.error("WebSocket error:", error);
    };
  }
};
