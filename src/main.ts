import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as mongoose from 'mongoose';

// mongoose.set('useFindAndModify', false);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
