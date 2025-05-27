import mongoose, { Schema, Document } from "mongoose";

export interface ITestimonial extends Document {
  data: string;
  author: string;
  exam: string;
  year: number;
  imageURL: string[];
  score?: number;
  totalScore?:number;
  AIR?:number,
  adminId: mongoose.Types.ObjectId;
}

const TestimonialSchema: Schema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    imageURL: {
      type: [String],
      default: [],
    },
    exam: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: false,
    },
    totalScore: {
      type: Number,
      required: false,
    },
    AIR: {
      type: Number,
      required: false,
    },
    adminId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Admin",
              required: true,
    }
  },
  {
    timestamps: true,
  }
);

const TestimonialModel = mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);

export default TestimonialModel;
