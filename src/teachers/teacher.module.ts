import { Module } from '@nestjs/common';
import { TeacherController } from './teacher.controller';
import { TeacherServices } from './teacher.service';
import { CourseServices } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import Schemas from 'src/schemas';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'teacher', schema: Schemas.TeacherSchema },
      { name: 'course', schema: Schemas.coursesSchema },
    ]),
  ],
  controllers: [TeacherController],
  providers: [TeacherServices, CourseServices],
  exports: [TeacherServices, CourseServices],
})
export class TeacherModule {}
