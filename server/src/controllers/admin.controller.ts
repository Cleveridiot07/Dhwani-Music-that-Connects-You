import { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Extend Request to handle file uploads properly
interface FileRequest extends Request {
	files?: { [key: string]: UploadedFile | UploadedFile[] } | null;
  }
  

// Helper function for Cloudinary uploads
const uploadToCloudinary = async (file: UploadedFile): Promise<string> => {
	if (!file || !file.tempFilePath) throw new Error("Invalid file upload");
	const result = await cloudinary.uploader.upload(file.tempFilePath, {
	  resource_type: "auto",
	});
	return result.secure_url;
  };
  

// Create a new song
export const createSong = asyncHandler(async (req: FileRequest, res: Response) => {
	if (!req.files || !req.files.audioFile || !req.files.imageFile) {
	  return res.status(400).json({ message: "Please upload both audio and image files" });
	}
  
	const { title, artist, albumId, duration } = req.body;
	const audioFile = Array.isArray(req.files.audioFile) ? req.files.audioFile[0] : req.files.audioFile;
	const imageFile = Array.isArray(req.files.imageFile) ? req.files.imageFile[0] : req.files.imageFile;
  
	if (!audioFile || !imageFile) {
	  return res.status(400).json({ message: "Invalid file upload" });
	}
  
	const [audioUrl, imageUrl] = await Promise.all([
	  uploadToCloudinary(audioFile),
	  uploadToCloudinary(imageFile),
	]);
  
	const song = await new Song({
	  title,
	  artist,
	  audioUrl,
	  imageUrl,
	  duration,
	  albumId: albumId || null,
	}).save();
  
	if (albumId) {
	  await Album.findByIdAndUpdate(albumId, { $push: { songs: song._id } });
	}
  
	res.status(201).json(song);
  });
  

// Delete a song
export const deleteSong = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Song ID is required" });

  const song = await Song.findById(id);
  if (!song) return res.status(404).json({ message: "Song not found" });

  if (song.albumId) {
    await Album.findByIdAndUpdate(song.albumId, { $pull: { songs: song._id } });
  }

  await Song.findByIdAndDelete(id);
  res.status(200).json({ message: "Song deleted successfully" });
});

// Create a new album
export const createAlbum = asyncHandler(async (req: FileRequest, res: Response) => {
	if (!req.files || !req.files.imageFile) {
	  return res.status(400).json({ message: "Please upload an album image" });
	}
  
	// Ensure imageFile is a single UploadedFile
	const imageFile = Array.isArray(req.files.imageFile) ? req.files.imageFile[0] : req.files.imageFile;
  
	if (!imageFile) {
	  return res.status(400).json({ message: "Invalid file upload" });
	}
  
	const { title, artist, releaseYear } = req.body;
	const imageUrl = await uploadToCloudinary(imageFile); // Pass single file
  
	const album = await new Album({
	  title,
	  artist,
	  imageUrl,
	  releaseYear,
	}).save();
  
	res.status(201).json(album);
  });
  

// Delete an album
export const deleteAlbum = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Album ID is required" });

  await Song.deleteMany({ albumId: id });
  await Album.findByIdAndDelete(id);

  res.status(200).json({ message: "Album deleted successfully" });
});

// Check admin status
export const checkAdmin = asyncHandler(async (_req: Request, res: Response) => {
  res.status(200).json({ admin: true });
});
