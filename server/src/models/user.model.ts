import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the User document
export interface IUser extends Document {
  fullName: string;
  imageUrl: string;
  clerkId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the User Schema
const userSchema: Schema<IUser> = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export const User = mongoose.model<IUser>("User", userSchema);
