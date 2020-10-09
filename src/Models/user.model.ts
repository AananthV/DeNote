import * as mongoose from "mongoose";
import User from "../Interfaces/model/user.interface";

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  mobileNumber: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationCode: String,
  passwordResetToken: String,
  lastUpdate: Date,
});

const userModel = mongoose.model<User & mongoose.Document>("User", userSchema);

export default userModel;
