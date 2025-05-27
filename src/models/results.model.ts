import mongoose, { Schema, Document } from "mongoose";

export interface IResult extends Document {
  exam: "JEE" | "JEE Advance" | "NEET";
  imageURL: string[]; 
  adminId:mongoose.Types.ObjectId;
  year: number;
}

const ResultSchema: Schema = new Schema(
  {
    exam: {
      type: String,
      enum: ["JEE", "NEET","JEE Advance"],
      required: true,
    },
    imageURL: {
      type: [String],
      default: [],
    },
    adminId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin",
          required: true,
        },
    year: {
        type: Number,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ResultModel = mongoose.model<IResult>("Result", ResultSchema);

export default ResultModel;
