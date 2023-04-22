import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Course } from '../schemas/course.schema';

@Injectable()
export class CourseServices {
  constructor(
    @InjectModel('course') private readonly courseModel: Model<Course>,
  ) {}

  getAllCourse(data) {
    let { skip, limit, search } = data;
    let query = {};
    if (search) {
      query['courseName'] = { $regex: `${search}`, $options: 'i' };
    }

    return new Promise<any>((resolve, reject) => {
      this.courseModel
        .find(query)
        .skip(skip)
        .limit(limit)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    });
  }

  getSingleCourse(query){
    return new Promise<any>((resolve, reject) => {
      this.courseModel
        .findOne(query)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    })
  }

  createCourse(data: { courseName: string; fees: number; teacher: string }) {
    return this.courseModel.create(data);
  }

  updateCourse(query, data) {
    return new Promise<any>((resolve, reject) => {
      this.courseModel
        .findOneAndUpdate(query, { $set: data }, { new: true })
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    });
  }
}
