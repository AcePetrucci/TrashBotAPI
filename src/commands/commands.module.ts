import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';

import { CommandSchema } from './schemas/command.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Command',
        schema: CommandSchema,
      },
    ]),
  ],
  providers: [CommandsService, CommandsResolver],
})
export class CommandsModule { }
