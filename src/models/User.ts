import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
}

const userSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
