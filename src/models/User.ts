import mongoose, { Model, Document } from "mongoose";
import { userSchema } from "../schemas/user.schema";


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
