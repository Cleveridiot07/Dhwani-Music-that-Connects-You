import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";

export const authCallback = async (req: Request, res: Response, next: NextFunction) => {
	try {
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
	} catch (error) {
		console.error("Error in auth callback", error);
		next(error);
	}
};
