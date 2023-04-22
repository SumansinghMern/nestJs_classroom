import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from '../schemas/teacher.schema';

@Injectable()
export class TeacherServices {
  constructor(
    @InjectModel('teacher') private readonly teacherModel: Model<Teacher>,
  ) {}

  getAllTeacher() {
    return this.teacherModel.find({}).populate('courses');
  }

  getTeacher(query) {
    return new Promise<any>((resolve, reject) => {
      this.teacherModel
        .findOne(query)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    });
  }

  addTeacher(data: {
    name: string;
    email: string;
    exprience: number;
    password: string;
  }) {
    return new Promise<[Boolean | Error, Teacher | {}]>((resolve, reject) => {
      this.teacherModel
        .create(data)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    });
  }

  updateTeacher(query: { _id: string }, data) {
    return this.teacherModel.findOneAndUpdate(
      query,
      { $set: data },
      { new: true },
    );
  }
}
