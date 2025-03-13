import mongoose, { Schema, Document } from "mongoose";

// Define an interface for the Message document
export interface IMessage extends Document {
  senderId: string; // Clerk user ID
  receiverId: string; // Clerk user ID
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Create the Message Schema
const messageSchema: Schema<IMessage> = new Schema(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
export const Message = mongoose.model<IMessage>("Message", messageSchema);
