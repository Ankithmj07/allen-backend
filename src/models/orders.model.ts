// models/order.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  student: mongoose.Types.ObjectId;
  courses: mongoose.Types.ObjectId[];
  totalAmount: number;
  status: "pending" | "completed" | "failed";
  purchasedDate: Date;
  EndDate?: Date;
}

const OrderSchema: Schema = new Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    purchasedDate: { type: Date },
    EndDate: { type: Date }
  }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;
