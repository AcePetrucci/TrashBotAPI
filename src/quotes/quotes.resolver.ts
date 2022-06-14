import { Resolver, Query, Mutation, Args, ArgsOptions } from '@nestjs/graphql';

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
  async createQuote(
    @Args('quote') quote: QuoteInput,
  ): Promise<QuoteType> {
    return this.quotesService.create({ ...quote, ...{ createdAt: new Date() } });
  }


  /**
   * Find Quotes
   */

  @Query(() => [QuoteType])
  async findQuotes(
    @Args('quoteText') quoteText: string,
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<QuoteType[]> {
    return this.quotesService.findQuotes(quoteText, guildID);
  }

  @Query(() => QuoteType)
  async findQuoteByIndexNum(
    @Args('indexNum') indexNum: number,
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<QuoteType> {
    return this.quotesService.findQuoteByIndexNum(indexNum, guildID);
  }


  /**
   * Dev Find Quotes
   */

  @Query(() => [QuoteType])
  async findAllQuotes(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<QuoteType[]> {
    return this.quotesService.findAllQuotes(guildID);
  }

  @Query(() => [QuoteType])
  async findDeletedQuotes(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<QuoteType[]> {
    return this.quotesService.findDeletedQuotes(guildID);
  }


  /**
   * Delete Quote
   */

  @Mutation(() => QuoteType)
  async deleteQuote(
    @Args('id') id: string,
  ): Promise<QuoteType> {
    return this.quotesService.delete(id);
  }

  @Mutation(() => QuoteType)
  async deleteByIndexNumQuote(
    @Args('indexNum') indexNum: number,
    @Args('guildID') guildID: string,
  ): Promise<QuoteType> {
    return this.quotesService.deleteByIndexNum(indexNum, guildID);
  }

  @Mutation(() => QuoteType)
  async trueDeleteQuote(
    @Args('id') id: string,
  ): Promise<QuoteType> {
    return this.quotesService.trueDelete(id);
  }

  @Mutation(() => RemoveManyType)
  async deleteAllQuotes(
    @Args({
      name: 'guildID',
      nullable: true,
      type: () => String,
    }) guildID?: string,
  ): Promise<RemoveManyType> {
    return this.quotesService.deleteAll(guildID);
  }

}
