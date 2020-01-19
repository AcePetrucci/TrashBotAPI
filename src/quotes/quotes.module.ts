import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';

import { QuoteSchema } from './schemas/quote.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Quote',
        schema: QuoteSchema,
      },
    ]),
  ],
  providers: [QuotesService, QuotesResolver],
})
export class QuotesModule { }
