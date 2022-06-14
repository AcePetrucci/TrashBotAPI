import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ServerConfigService } from './server-config.service';
import { ServerConfigResolver } from './server-config.resolver';

import { ServerConfigSchema } from './schemas/server-config.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'ServerConfig',
        schema: ServerConfigSchema,
      },
    ]),
  ],
  providers: [ServerConfigService, ServerConfigResolver],
})
export class ServerConfigModule { }
