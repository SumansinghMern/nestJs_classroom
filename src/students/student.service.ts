import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Student } from 'src/schemas/student.schema';

@Injectable()
export class StudentServices {
  constructor(
    @InjectModel('student') private readonly studentModel: Model<Student>,
  ) {}

  addStudent(data: {
    name: string;
    age: number;
    email: string;
    password: string;
  }) {
    return new Promise<any>((resolve, reject) => {
      this.studentModel
        .create(data)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          console.log(
            '🚀 ~ file: student.service.ts:27 ~ StudentServices ~ error:',
            error,
          );
          resolve([error, {}]);
        });
    });
  }

  getStudent(query) {
    return new Promise<any>((resolve, reject) => {
      this.studentModel
        .findOne(query)
        .then((doc) => {
          resolve([false, doc]);
        })
        .catch((error) => {
          resolve([error, {}]);
        });
    });
  }

  updateStudent(query,data) {
    return new Promise<any>((resolve, reject) => {
      this.studentModel.findOneAndUpdate(
        query,
        {$set: data},
        {new: true}
      )
      .then((doc) => {
        resolve([false,doc])
      })
      .catch((error) => {
        resolve([error, {}])
      })
    })
  }
}
