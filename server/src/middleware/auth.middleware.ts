import { Request, Response, NextFunction } from "express";
import { clerkClient } from "@clerk/express";
import { asyncHandler } from "../utils/asyncHandler.js";

interface AuthRequest extends Request {
  auth?: { userId?: string };
}

// Protect route middleware (only logged-in users can access)
export const protectRoute = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  console.log(req.auth?.userId);
  if (!req.auth?.userId) {
    return res.status(401).json({ message: "Unauthorized - you must be logged in" });
  }
  next();
});

// Require admin middleware (only admin users can access)
export const requireAdmin = asyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.auth?.userId) {
    return res.status(401).json({ message: "Unauthorized - you must be logged in" });
  }

  const currentUser = await clerkClient.users.getUser(req.auth.userId);
  const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

  if (!isAdmin) {
    return res.status(403).json({ message: "Unauthorized - you must be an admin" });
  }

  next();
});
