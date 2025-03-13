import { IUser } from "../models/user.model.js";
import { UploadedFile } from "express-fileupload";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
