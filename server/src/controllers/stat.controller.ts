import { Request, Response } from "express";
import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getStats = asyncHandler(async (req: Request, res: Response) => {
	const [totalSongs, totalAlbums, totalUsers, uniqueArtists] = await Promise.all([
		Song.countDocuments(),
		Album.countDocuments(),
		User.countDocuments(),
		Song.aggregate([
			{
				$unionWith: {
					coll: "albums",
					pipeline: [],
				},
			},
			{
				$group: {
					_id: "$artist",
				},
			},
			{
				$count: "count",
			},
		]),
	]);

	res.status(200).json({
		totalAlbums,
		totalSongs,
		totalUsers,
		totalArtists: uniqueArtists[0]?.count || 0,
	});
});
