import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Query,
  UseGuards,
  Param,
  HttpException,
} from '@nestjs/common';
import { StudentServices } from './student.service';
import { CourseServices } from 'src/teachers/course.service';

import { StudentAuthGuard } from 'src/auth/student.guard';
import { query } from 'express';

@Controller('student')
export class StudentController {
  constructor(
    private readonly studentServices: StudentServices,
    private readonly courseServices: CourseServices,
  ) {}

  @UseGuards(StudentAuthGuard)
  @Get(':id')
  async getStudent(@Param() param) {
    try {
      let { id } = param;

      let [error, student] = await this.studentServices.getStudent({ _id: id });

      if (error) {
        throw new HttpException('Internal Server Error', 500);
      }

      return student;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @UseGuards(StudentAuthGuard)
  @Put(':id/update')
  async updateStudent(@Param() param, @Body() body) {
    try {
      let { id } = param;

      let [error, updatedStudent] = await this.studentServices.updateStudent(
        { _id: id },
        body,
      );

      if (error) {
        throw new HttpException('Internal Server Error', 500);
      }

      return updatedStudent;
    } catch (error) {
      throw new HttpException('Internal Server Error', 500);
    }
  }

  @UseGuards(StudentAuthGuard)
  @Post(':id/takeCourse')
  async takeCourse(@Param() param, @Body() body) {
    let { id } = param;

    let { coursIds } = body;

    let [error, student] = await this.studentServices.getStudent({ _id: id });

    if (error) {
      throw new HttpException('Internal Server Error', 500);
    }

    let presentCources = student?.courses.map((co) => co) || [];

    presentCources.push(...coursIds);

    var [err, updatedStudent] = await this.studentServices.updateStudent(
      { _id: id },
      { courses: presentCources },
    );

    if (err) {
      throw new HttpException('Internal Server Error', 500);
    }

    var [err, course] = await this.courseServices.getSingleCourse({
      _id: coursIds,
    });

    if (err) {
      throw new HttpException('Internal Server Error', 500);
    }

    let enrolledStudents = course?.students.map((st) => st) || [];

    enrolledStudents.push(updatedStudent._id);

    var [err1, updatedCources] = await this.courseServices.updateCourse(
      { _id: coursIds },
      { students: enrolledStudents },
    );

    return { updatedCources, updatedStudent };
  }
}
