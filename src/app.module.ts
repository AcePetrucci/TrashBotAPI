import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './database/database.module';

import { QuotesModule } from './quotes/quotes.module';
import { CommandsModule } from './commands/commands.module';
import { ServerConfigModule } from './server-config/server-config.module';

@Module({
  imports: [
    QuotesModule,
    CommandsModule,
    ServerConfigModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
