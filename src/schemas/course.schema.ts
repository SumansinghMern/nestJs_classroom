import * as mongoose from 'mongoose';
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

import { TeacherSchema } from './teacher.schema';

export const coursesSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    teacher: {
      type: ObjectId,
      required: true,
      ref: 'teacher',
    },
    students: {
      type: [ObjectId],
      default: [],
      ref: 'student',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export interface Course {
  _id: string;
  courseName: string;
  fees: number;
  teacher: string;
  students: [string];
}
