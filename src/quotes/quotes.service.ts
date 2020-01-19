import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { QuoteType } from './dto/quote.dto';
import { QuoteInput } from './dto/create-quote.dto';
import { Quote } from './interfaces/quote.interface';

import { RemoveManyType } from '../shared/dto/remove-many.dto';

@Injectable()
export class QuotesService {

  constructor(
    @InjectModel('Quote') private quoteModel: Model<Quote>,
  ) { }


  /**
   * Create Quote
   */

  async create(createQuoteDto: QuoteInput): Promise<QuoteType> {
    const lastIndex = (await this.quoteModel.findOne({}, {}, {sort: {createdAt: -1}}))?.indexNum ?? 0;
    const createdQuote = new this.quoteModel({ ...createQuoteDto, ...{ indexNum: lastIndex + 1 } });
    return await createdQuote.save();
  }


  /**
   * Find Quotes
   */

  async findQuotes(quote: string): Promise<QuoteType[]> {
    return await this.quoteModel.find({deleted: false, quote: {$regex: new RegExp(quote), $options: 'i'}});
  }

  async findQuoteByIndexNum(indexNum: number): Promise<QuoteType> {
    return await this.quoteModel.findOne({indexNum});
  }

  async findAllQuotes(): Promise<QuoteType[]> {
    return await this.quoteModel.find({deleted: false}).exec();
  }

  async findDeletedQuotes(): Promise<QuoteType[]> {
    return await this.quoteModel.find({deleted: true});
  }


  /**
   * Delete Quote
   */

  async delete(id: string): Promise<QuoteType> {
    return await this.quoteModel.findByIdAndUpdate(id, {deleted: true});
  }

  async trueDelete(id: string): Promise<QuoteType> {
    return await this.quoteModel.findByIdAndDelete(id);
  }

  async deleteAll(): Promise<RemoveManyType> {
    return await this.quoteModel.deleteMany({});
  }

}
