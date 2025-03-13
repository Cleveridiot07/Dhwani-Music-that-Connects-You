import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Song document
export interface ISong extends Document {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId?: mongoose.Types.ObjectId; // Optional reference to an album
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Song Schema
const songSchema: Schema<ISong> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    albumId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: false,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export const Song = mongoose.model<ISong>("Song", songSchema);
