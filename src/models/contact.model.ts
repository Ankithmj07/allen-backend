import mongoose, { Schema, Document } from "mongoose";

// 1. Interface for TypeScript
export interface IPhoneCall extends Document {
  name: string;
  mobile: string;
  class: string;
  goal: string;
  course: string;
  state: string;
  createdAt?: Date;
}

// 2. Mongoose Schema
const PhoneCallSchema: Schema = new Schema<IPhoneCall>(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true },
    class: { type: String, required: true },
    goal: { type: String, required: true },
    course: { type: String, required: true },
    state: { type: String, required: true },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// 3. Model
const PhoneCall =
  mongoose.models.PhoneCall ||
  mongoose.model<IPhoneCall>("PhoneCall", PhoneCallSchema);

export default PhoneCall;
