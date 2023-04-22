import * as mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const { ObjectId } = Types;

export const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    exprience: {
      type: Number,
      default: 0,
    },
    courses: {
      type: [ObjectId],
      ref: 'course',
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Belogs to TS
export interface Teacher {
  _id: string;
  name: string;
  email: string;
  exprience: number;
  courses: [string];
  password: string;
}
