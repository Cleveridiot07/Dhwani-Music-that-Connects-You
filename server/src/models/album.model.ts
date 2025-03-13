import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Album document
export interface IAlbum extends Document {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: mongoose.Types.ObjectId[]; // Array of song references
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Album Schema
const albumSchema: Schema<IAlbum> = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    imageUrl: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export const Album = mongoose.model<IAlbum>("Album", albumSchema);
