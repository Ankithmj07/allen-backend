import mongoose, { Schema, Document } from "mongoose";

export interface IStudent extends Document {
  name: string;
  email: string;
  password: string;
  phNumber: string;
  gender:string;
  dob:Date;
  classLevel: number; // e.g., 11 or 12
  exam: "JEE Mains" | "JEE Advanced" | "NEET";

}

const StudentSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    phNumber: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: false,
    },
    dob: {
      type: Date,
      required: false,
    },
    classLevel: {
      type: Number,
      enum: [11, 12],
      required: true,
    },
    exam: {
      type: String,
      enum: ["JEE Mains","JEE Advanced", "NEET"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const StudentModel = mongoose.model<IStudent>("Student", StudentSchema);

export default StudentModel;
