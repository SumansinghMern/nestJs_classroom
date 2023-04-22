import * as mongoose from 'mongoose';

export const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    age: {
      type: Number,
    },
    courses: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export interface Student {
  _id: string;
  name: string;
  email: string;
  age: number;
  courses: [string];
  password: string;
}
