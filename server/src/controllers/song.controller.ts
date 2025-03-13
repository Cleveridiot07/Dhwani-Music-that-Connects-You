import { Request, Response } from "express";
import { Song } from "../models/song.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getAllSongs = asyncHandler(async (req: Request, res: Response) => {
	// -1 = Descending => newest -> oldest
	// 1 = Ascending => oldest -> newest
	const songs = await Song.find().sort({ createdAt: -1 });
	res.json(songs);
});

export const getFeaturedSongs = asyncHandler(async (req: Request, res: Response) => {
	// Fetch 6 random songs using MongoDB's aggregation pipeline
	const songs = await Song.aggregate([
		{
			$sample: { size: 6 },
		},
		{
			$project: {
				_id: 1,
				title: 1,
				artist: 1,
				imageUrl: 1,
				audioUrl: 1,
			},
		},
	]);

	res.json(songs);
});

export const getMadeForYouSongs = asyncHandler(async (req: Request, res: Response) => {
	const songs = await Song.aggregate([
		{
			$sample: { size: 4 },
		},
		{
			$project: {
				_id: 1,
				title: 1,
				artist: 1,
				imageUrl: 1,
				audioUrl: 1,
			},
		},
	]);

	res.json(songs);
});

export const getTrendingSongs = asyncHandler(async (req: Request, res: Response) => {
	const songs = await Song.aggregate([
		{
			$sample: { size: 4 },
		},
		{
			$project: {
				_id: 1,
				title: 1,
				artist: 1,
				imageUrl: 1,
				audioUrl: 1,
			},
		},
	]);

	res.json(songs);
});
