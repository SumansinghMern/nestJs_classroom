import {
  Injectable,
  UnauthorizedException,
  HttpException,
  Logger,
  Req,
} from '@nestjs/common';
import { TeacherServices } from 'src/teachers/teacher.service';
import { StudentServices } from 'src/students/student.service';

import { Utils } from 'src/utils/utils';

@Injectable()
export class TeacherAuthService {
  constructor(private teacherService: TeacherServices) {}

  async signIn(@Req() req): Promise<any> {
    try {
      let { email, password } = req.body;
      const [error, user] = await this.teacherService.getTeacher({
        email: email,
      });
      if (error) {
        throw new HttpException('Internal Server Error', 500);
      }
      if (!user) {
        throw new HttpException('User not Found', 404);
      }
      let matchPass = await Utils.compare(password, user.password);
      console.log(
        '🚀 ~ file: auth.service.ts:22 ~ TeacherAuthService ~ signIn ~ matchPass:',
        matchPass,
      );

      if (!matchPass) {
        throw new UnauthorizedException();
      }

      let payload = {
        userId: user._id,
        Role: 'Teacher',
      };
      // Generate a JWT and return it here
      let token = Utils.signJwt(payload);

      req.session.userId = user._id;
      req.session.token = token;

      return { token, role: 'Teacher', userId: user._id };
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:51 ~ TeacherAuthService ~ signIn ~ error:',
        error,
      );
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async signUp(teacherData: {
    name: string;
    email: string;
    exprience: number;
    password: string;
  }) {
    // let { name, email, exprience, password } = teacherData;
    let [err, checkTeacher] = await this.teacherService.getTeacher({
      email: teacherData?.email,
    });

    if (err) {
      throw new HttpException('We have Some Internal Server Error', 500);
    }

    if (checkTeacher) {
      throw new HttpException('User Present with this mail', 409);
    }

    let encryptedPassword = await Utils.createHash(teacherData.password);
    teacherData.password = encryptedPassword;

    let [error, newTeacher] = await this.teacherService.addTeacher(teacherData);

    if (error) {
      throw new HttpException('We have Some Internal Server Error', 500);
    }

    return newTeacher;
  }
}

@Injectable()
export class StudentAuthService {
  constructor(private studentService: StudentServices) {}

  async signIn(@Req() req): Promise<any> {
    try {
      let { email, password } = req.body;
      const [error, user] = await this.studentService.getStudent({
        email: email,
      });
      if (error) {
        throw new HttpException('Internal Server Error', 500);
      }
      if (!user) {
        throw new HttpException('User not Found', 404);
      }
      let matchPass = await Utils.compare(password, user.password);
      console.log(
        '🚀 ~ file: auth.service.ts:22 ~ TeacherAuthService ~ signIn ~ matchPass:',
        matchPass,
      );

      if (!matchPass) {
        throw new UnauthorizedException();
      }

      let payload = {
        userId: user._id,
        Role: 'Student',
      };
      // Generate a JWT and return it here
      let token = Utils.signJwt(payload);

      req.session.userId = user._id;
      req.session.token = token;

      return { token, role: 'Student', userId: user._id };
    } catch (error) {
      console.log(
        '🚀 ~ file: auth.service.ts:129 ~ StudentAuthService ~ signIn ~ error:',
        error,
      );

      throw new HttpException('Internal Server Error', 500);
    }
  }

  async signUp(studentData: {
    name: string;
    email: string;
    age: number;
    password: string;
  }) {
    // let { name, email, exprience, password } = teacherData;
    let [err, checkStudent] = await this.studentService.getStudent({
      email: studentData?.email,
    });

    console.log(
      '🚀 ~ file: auth.service.ts:145 ~ StudentAuthService ~ checkStudent:',
      checkStudent,
    );

    if (err) {
      throw new HttpException('We have Some Internal Server Error', 500);
    }

    if (checkStudent) {
      throw new HttpException('User Present with this mail', 409);
    }

    let encryptedPassword = await Utils.createHash(studentData.password);
    studentData.password = encryptedPassword;

    let [error, newStudent] = await this.studentService.addStudent(studentData);

    if (error) {
      throw new HttpException('We have Some Internal Server Error', 500);
    }

    return newStudent;
  }
}
