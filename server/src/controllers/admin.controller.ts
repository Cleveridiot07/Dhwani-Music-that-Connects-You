import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { Song } from "../models/song.model";
import { Album } from "../models/album.model";
import cloudinary from "../lib/cloudinary";

// Helper function for Cloudinary uploads
const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
	try {
		const result = await cloudinary.uploader.upload(file.tempFilePath, {
			resource_type: "auto",
		});
		return result.secure_url;
	} catch (error) {
		console.error("Error in uploadToCloudinary", error);
		throw new Error("Error uploading to Cloudinary");
	}
};

// Create a new song
export const createSong = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.files || !req.files.audioFile || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload all files" });
		}

		const { title, artist, albumId, duration } = req.body;
		const audioFile = req.files.audioFile as UploadedFile;
		const imageFile = req.files.imageFile as UploadedFile;

		const audioUrl = await uploadToCloudinary(audioFile);
		const imageUrl = await uploadToCloudinary(imageFile);

		const song = new Song({
			title,
			artist,
			audioUrl,
			imageUrl,
			duration,
			albumId: albumId || null,
		});

		await song.save();

		// If song belongs to an album, update the album's songs array
		if (albumId) {
			await Album.findByIdAndUpdate(albumId, {
				$push: { songs: song._id },
			});
		}

		res.status(201).json(song);
	} catch (error) {
		console.error("Error in createSong", error);
		next(error);
	}
};

// Delete a song
export const deleteSong = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		const song = await Song.findById(id);
		if (!song) {
			return res.status(404).json({ message: "Song not found" });
		}

		// If song belongs to an album, update the album's songs array
		if (song.albumId) {
			await Album.findByIdAndUpdate(song.albumId, {
				$pull: { songs: song._id },
			});
		}

		await Song.findByIdAndDelete(id);

		res.status(200).json({ message: "Song deleted successfully" });
	} catch (error) {
		console.error("Error in deleteSong", error);
		next(error);
	}
};

// Create a new album
export const createAlbum = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.files || !req.files.imageFile) {
			return res.status(400).json({ message: "Please upload an album image" });
		}

		const { title, artist, releaseYear } = req.body;
		const imageFile = req.files.imageFile as UploadedFile;

		const imageUrl = await uploadToCloudinary(imageFile);

		const album = new Album({
			title,
			artist,
			imageUrl,
			releaseYear,
		});

		await album.save();

		res.status(201).json(album);
	} catch (error) {
		console.error("Error in createAlbum", error);
		next(error);
	}
};

// Delete an album
export const deleteAlbum = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.params;

		await Song.deleteMany({ albumId: id });
		await Album.findByIdAndDelete(id);

		res.status(200).json({ message: "Album deleted successfully" });
	} catch (error) {
		console.error("Error in deleteAlbum", error);
		next(error);
	}
};

// Check admin status
export const checkAdmin = async (req: Request, res: Response) => {
	res.status(200).json({ admin: true });
};
