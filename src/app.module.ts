import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TeacherModule } from './teachers/teacher.module';
import { StudentModule } from './students/student.module';
import { AuthModule } from './auth/auth.module';

let MONGO_URI =
  'mongodb+srv://sonu:t80rQQFSpbZeUg7b@cluster0.pizod.mongodb.net/nest-classroom?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI), 
    TeacherModule, 
    StudentModule, 
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
