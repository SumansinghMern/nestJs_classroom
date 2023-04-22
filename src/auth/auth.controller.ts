import { Controller, Post, Req } from '@nestjs/common';

import { TeacherAuthService, StudentAuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly teacherAuthServices: TeacherAuthService,
    private readonly studentAuthServices: StudentAuthService,
  ) {}

  @Post('teacherSignUp')
  async signUpTeacher(@Req() req) {
    let { name, email, exprience, password } = req.body;

    let newTeacher = await this.teacherAuthServices.signUp(req.body);

    return newTeacher;
  }

  @Post('teacherSignIn')
  async signInTeacher(@Req() req) {
    let { email, password } = req.body;

    // check for incoming Body

    let signedIn = await this.teacherAuthServices.signIn(req);

    return signedIn;
  }

  @Post('studentSignUp')
  async signUpStudent(@Req() req) {
    let { name, email, age, password } = req.body;

    // check for incoming Body

    let newStudent = await this.studentAuthServices.signUp(req.body);

    return newStudent;
  }

  @Post('studentSignIn')
  async signInStudent(@Req() req) {
    let signedIn = await this.studentAuthServices.signIn(req);

    return signedIn;
  }
}
