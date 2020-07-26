import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as mongoose from 'mongoose';

// mongoose.set('useFindAndModify', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, '127.0.0.1');
}
bootstrap();
