import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProviders = [
  MongooseModule.forRootAsync({
    imports: [ConfigModule.forRoot()],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get('DB_URI'),
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  }),
];
