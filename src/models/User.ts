import mongoose, { Schema, model, Document } from "mongoose";

export interface UserDocument extends Document {
  _id: string;
  email: string;
  password?: string; // Optional
  name?: string; // Optional
  phone?: string; // Optional
  image?: string; // Optional
  provider?: string; // Optional
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email is invalid",
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
    },
    name: {
      type: String,
      required: function () {
        return this.provider === "credentials";
      },
    },
    phone: {
      type: String,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;