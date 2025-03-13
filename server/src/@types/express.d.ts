import { IUser } from "../models/user.model";
import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      files?: {
        audioFile?: UploadedFile;
        imageFile?: UploadedFile;
      };
    }
  }
}
