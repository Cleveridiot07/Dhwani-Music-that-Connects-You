import { Server } from "socket.io";
import { Message } from "../models/message.model";
import dotenv from "dotenv";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

interface MessageData {
  senderId: string;
  receiverId: string;
  content: string;
}

export const initializeSocket = (server: any): void => {
  const io = new Server(server, {
    cors: {
      origin: FRONTEND_URL,
      credentials: true,
    },
  });

  const userSockets = new Map<string, string>(); // { userId: socketId }
  const userActivities = new Map<string, string>(); // { userId: activity }

  io.on("connection", (socket) => {
    socket.on("user_connected", (userId: string) => {
      userSockets.set(userId, socket.id);
      userActivities.set(userId, "Idle");

      // Broadcast to all connected users
      io.emit("user_connected", userId);
      socket.emit("users_online", Array.from(userSockets.keys()));
      io.emit("activities", Array.from(userActivities.entries()));
    });

    socket.on("update_activity", ({ userId, activity }: { userId: string; activity: string }) => {
      console.log("Activity updated:", userId, activity);
      userActivities.set(userId, activity);
      io.emit("activity_updated", { userId, activity });
    });

    socket.on("send_message", async (data: MessageData) => {
      try {
        const { senderId, receiverId, content } = data;

        const message = await Message.create({ senderId, receiverId, content });

        // Send message in real-time if receiver is online
        const receiverSocketId = userSockets.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receive_message", message);
        }

        socket.emit("message_sent", message);
      } catch (error) {
        console.error("Message error:", error);
        socket.emit("message_error", (error as Error).message);
      }
    });

    socket.on("disconnect", () => {
      let disconnectedUserId: string | undefined;
      for (const [userId, socketId] of userSockets.entries()) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          userSockets.delete(userId);
          userActivities.delete(userId);
          break;
        }
      }
      if (disconnectedUserId) {
        io.emit("user_disconnected", disconnectedUserId);
      }
    });
  });
};
