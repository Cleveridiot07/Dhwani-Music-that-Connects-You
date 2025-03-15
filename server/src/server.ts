import { createServer } from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { initializeSocket } from "./lib/socket.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server
const httpServer = createServer(app);

// Initialize WebSockets
initializeSocket(httpServer);

connectDB();

// Start the server
httpServer.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});
