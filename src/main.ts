import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error/ http-exception.filter';
import { ErrorsInterceptor } from './error/errors.interceptor';
import { ValidationPipe } from '@nestjs/common';

require('../patch.js')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8090);
}
bootstrap();
