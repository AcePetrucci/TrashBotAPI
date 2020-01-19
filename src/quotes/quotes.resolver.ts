import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { QuotesService } from './quotes.service';

import { Quote } from './interfaces/quote.interface';
import { QuoteType } from './dto/quote.dto';
import { QuoteInput } from './dto/create-quote.dto';

import { RemoveManyType } from '../shared/dto/remove-many.dto';

@Resolver()
export class QuotesResolver {

  constructor(
    private quotesService: QuotesService,
  ) { }


  /**
   * Create Quote
   */

  @Mutation(() => QuoteType)
  async createQuote(@Args('quote') quote: QuoteInput): Promise<QuoteType> {
    return this.quotesService.create({ ...quote, ...{ createdAt: new Date() } });
  }


  /**
   * Find Quotes
   */

  @Query(() => [QuoteType])
  async findQuotes(@Args('quoteText') quoteText: string): Promise<QuoteType[]> {
    return this.quotesService.findQuotes(quoteText);
  }

  @Query(() => QuoteType)
  async findQuoteByIndexNum(@Args('indexNum') indexNum: number): Promise<QuoteType> {
    return this.quotesService.findQuoteByIndexNum(indexNum);
  }

  @Query(() => [QuoteType])
  async findAllQuotes(): Promise<QuoteType[]> {
    return this.quotesService.findAllQuotes();
  }

  @Query(() => [QuoteType])
  async findDeletedQuotes(): Promise<QuoteType[]> {
    return this.quotesService.findDeletedQuotes();
  }


  /**
   * Delete Quote
   */

  @Mutation(() => QuoteType)
  async deleteQuote(@Args('id') id: string): Promise<QuoteType> {
    return this.quotesService.delete(id);
  }

  @Mutation(() => QuoteType)
  async trueDeleteQuote(@Args('id') id: string): Promise<QuoteType> {
    return this.quotesService.trueDelete(id);
  }

  @Mutation(() => RemoveManyType)
  async deleteAllQuotes(): Promise<RemoveManyType> {
    return this.quotesService.deleteAll();
  }

}
