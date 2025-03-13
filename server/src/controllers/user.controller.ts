import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Define a custom request type to include auth
interface AuthenticatedRequest extends Request {
  auth?: { userId: string };
}

export const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest; // Type assertion

    if (!authReq.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const currentUserId = authReq.auth.userId;
    const users = await User.find({ clerkId: { $ne: currentUserId } });

    res.status(200).json(users);
  }
);

export const getMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthenticatedRequest; // Type assertion

    if (!authReq.auth?.userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myId = authReq.auth.userId;
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: myId },
        { senderId: myId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  }
);
