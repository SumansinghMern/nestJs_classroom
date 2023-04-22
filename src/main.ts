import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import {Request,Response} from 'express'

import MongoStore = require('connect-mongo');
import  * as session from 'express-session';
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// const swaggerUi = require('swagger-ui-express');

import * as swaggerUi from 'swagger-ui-express'

import { Req , Res,Session} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const MONGODB_URI =
    'mongodb+srv://sonu:t80rQQFSpbZeUg7b@cluster0.pizod.mongodb.net/nest-classroom?retryWrites=true&w=majority';

  let cookesOptions = {
    path: '/',
    httpOnly: true,
    expires: 1 * 60 * 60 * 1000,
  };

  app.use(
    session({
      key: 'session_key',
      secret: 'super secret key',
      resave: false,
      saveUninitialized: false,
      cookie: cookesOptions,
      store: MongoStore.create({
        mongoUrl: MONGODB_URI,
      }),
    }),
  );




  await app.listen(3000);
}
bootstrap();
