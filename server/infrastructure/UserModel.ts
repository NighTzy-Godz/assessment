import { profile } from "console";
import mongoose, { Document } from "mongoose";

interface IUser extends Document {
  first_name: string;
  last_name: string;
  middle_name?: string;
  email: string;
  phone_number: string;
  profile_image: string;
}

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  middle_name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  profile_image: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
