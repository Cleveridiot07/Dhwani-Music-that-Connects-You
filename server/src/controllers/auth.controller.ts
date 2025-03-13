import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authCallback = asyncHandler(async (req: Request, res: Response) => {
	const { id, firstName, lastName, imageUrl }: { id: string; firstName?: string; lastName?: string; imageUrl?: string } = req.body;

	// Check if user already exists
	const user = await User.findOne({ clerkId: id });

	if (!user) {
		// Signup
		await User.create({
			clerkId: id,
			fullName: `${firstName || ""} ${lastName || ""}`.trim(),
			imageUrl,
		});
	}

	res.status(200).json({ success: true });
});
