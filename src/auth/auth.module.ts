import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TeacherAuthService, StudentAuthService } from './auth.service';
// import { TeacherServices } from 'src/teachers/teacher.service';
// import { StudentServices } from 'src/students/student.service';

import { TeacherModule } from 'src/teachers/teacher.module';
import { StudentModule } from 'src/students/student.module';
import { TeacherAuthGuard } from './teacher.guard';
import { StudentAuthGuard } from './student.guard';
@Module({
  imports: [TeacherModule, StudentModule],
  controllers: [AuthController],
  providers: [
    TeacherAuthService,
    StudentAuthService,
    TeacherAuthGuard,
    StudentAuthGuard,
  ],
  exports: [TeacherAuthGuard, StudentAuthGuard],
})
export class AuthModule {}
