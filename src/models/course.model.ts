import mongoose, { Document, Schema } from 'mongoose';

export interface ICourse extends Document {
  name: string;
  exam: 'JEE' | 'NEET';
  classLevel: 11 | 12;
  categoryType: 'live' | 'self' | 'test-series' | 'practice';
  subjects: string[];
  description: string[];
  price: number;
  originalPrice:number;
  taxes: number;
  language: string[];
  startDate: Date[];
  duration: number;
  aboutCourse: {
    [section: string]: string[];
  };
  FacultyImgs: {
    type: [String],
    default: [],
  },
  title:string;
  subtitle:string
  points:string[];
  badge:string;
  adminId: mongoose.Types.ObjectId;
  createdAt?: Date;
}

const CourseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  exam: { type: String, enum: ['JEE', 'NEET'], required: true },
  classLevel: { type: Number, enum: [11, 12], required: true },
  categoryType: { type: String, enum: ['live','self', 'test-series','practice'], required: true },
  subjects: [{ type: String, required: true }],
  description: [{ type: String, required: true }],
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  taxes: { type: Number, required: true },
  language: [{ type: String, required: true }],
  startDate: [{ type: Date, required: true }],
  duration: {type: Number, required: true},
  aboutCourse: {
    type: Map,
    of: [String],
    required: true,
  },
  FacultyImgs: [{ type: String }],
  title:{ type: String, required: true },
  subtitle:{ type: String, required: true },
  points:[{ type: String, required: true }],
  badge:{ type: String, required: true },
  adminId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Admin",
        },
    
  createdAt: { type: Date, default: Date.now },
});

const CourseModel = mongoose.model<ICourse>('Course', CourseSchema);
export default CourseModel;
