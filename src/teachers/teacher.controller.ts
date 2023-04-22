import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { TeacherServices } from './teacher.service';
import { CourseServices } from './course.service';

import { TeacherAuthGuard } from 'src/auth/teacher.guard';

@Controller('teachers')
export class TeacherController {
  constructor(
    public readonly teacherServices: TeacherServices,
    public readonly courseService: CourseServices,
  ) {}

  @Get()
  getAllTeachers() {
    return this.teacherServices.getAllTeacher();
  }

  @Get('courses')
  async getCourses(@Query() query) {
    try {
      let { skip, limit, search , teacherId} = query;
      let data = {
        skip: skip ? skip : 0,
        limit: limit ? limit : 10,
      };
      if (search) {
        data['search'] = search;
      }
      if (teacherId){
        data['teacherId'] = teacherId;
      }
        let [error, courses] = await this.courseService.getAllCourse(data);
      if (error) {
        throw new HttpException(error.message, 500);
      }

      return courses;
    } catch (error) {
      console.log(
        '🚀 ~ file: teacher.controller.ts:33 ~ TeacherController ~ getCourses ~ error:',
        error,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @UseGuards(TeacherAuthGuard)
  @Post('addCourse')
  async addCource(
    @Body() data: { courseName: string; fees: number; teacher: string },
  ) {
    try {
      let courseData = {
        courseName: data?.courseName || '',
        fees: data?.fees || 0,
        teacher: data.teacher,
      };

      let newCourse = await this.courseService.createCourse(courseData);

      let [error, teacher] = await this.teacherServices.getTeacher({
        _id: data.teacher,
      });

      if (error) {
        throw new HttpException('Internal Server Error', 500);
      }

      console.log(
        '🚀 ~ file: teacher.controller.ts:54 ~ TeacherController ~ teacher:',
        teacher,
      );

      let presentCources =
        teacher?.courses.map((cu) => {
          return cu;
        }) || [];

      presentCources.push(newCourse._id);

      let updateTeacher = await this.teacherServices.updateTeacher(
        { _id: data.teacher },
        { courses: presentCources },
      );

      return { newCourse, updateTeacher };
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
