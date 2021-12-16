import { Document, model, Schema } from "mongoose";
import { IUser } from "./User";

export interface IMeeting extends Document {
  user: [IUser["_id"]];

  date: Date;
}

const meetingSchema: Schema = new Schema({
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  date: {
    type: Date,
  },
});

const Meeting = model<IMeeting>("Profile", meetingSchema);

export default Meeting;
