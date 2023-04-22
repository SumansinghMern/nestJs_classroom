import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import Schema from '../schemas';

import { StudentController } from './student.controller';
import { StudentServices } from './student.service';
import { CourseServices } from 'src/teachers/course.service';
import { TeacherModule } from 'src/teachers/teacher.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'student', schema: Schema.studentSchema },
    ]),
    TeacherModule
  ],
  controllers: [StudentController],
  providers: [StudentServices],
  exports: [StudentServices],
})
export class StudentModule {}
