import { Request, Response } from "express";
import { Album } from "../models/album.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get all albums
export const getAllAlbums = asyncHandler(async (req: Request, res: Response) => {
	const albums = await Album.find();
	res.status(200).json(albums);
});

// Get album by ID
export const getAlbumById = asyncHandler(async (req: Request, res: Response) => {
	const { albumId } = req.params;

	const album = await Album.findById(albumId).populate("songs");

	if (!album) {
		return res.status(404).json({ message: "Album not found" });
	}

	res.status(200).json(album);
});
