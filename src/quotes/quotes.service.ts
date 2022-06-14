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
    const lastIndex = (await this.quoteModel.find({guildID: createQuoteDto.guildID}, {})).slice(-1)[0]?.indexNum ?? 0;
    const createdQuote = new this.quoteModel({ ...createQuoteDto, ...{ indexNum: lastIndex + 1 } });
    return createdQuote.authorID === 'null' ? await Promise.reject() : await createdQuote.save();
  }


  /**
   * Find Quotes
   */

  async findQuotes(quote: string, guildID?: string): Promise<QuoteType[]> {
    return await this.quoteModel.find({
      deleted: false,
      quote: {$regex: new RegExp(quote), $options: 'i'},
      ...guildID ? { guildID } : {},
    });
  }

  async findQuoteByIndexNum(indexNum: number, guildID?: string): Promise<QuoteType> {
    return await this.quoteModel.findOne({
      indexNum,
      ...guildID ? { guildID } : {},
    });
  }

  async findAllQuotes(guildID?: string): Promise<QuoteType[]> {
    return await this.quoteModel.find({
      deleted: false,
      ...guildID ? { guildID } : {},
    }).exec();
  }

  async findDeletedQuotes(guildID?: string): Promise<QuoteType[]> {
    return await this.quoteModel.find({
      deleted: true,
      ...guildID ? { guildID } : {},
    });
  }


  /**
   * Delete Quote
   */

  async delete(id: string): Promise<QuoteType> {
    return await this.quoteModel.findByIdAndUpdate(id, {deleted: true});
  }

  async deleteByIndexNum(indexNum: number, guildID: string): Promise<QuoteType> {
    const filter = { indexNum, guildID };

    return await this.quoteModel.findOneAndDelete(filter);
  }

  async trueDelete(id: string): Promise<QuoteType> {
    return await this.quoteModel.findByIdAndDelete(id);
  }

  async deleteAll(guildID?: string): Promise<RemoveManyType> {
    return await this.quoteModel.deleteMany({
      ...guildID ? { guildID } : {},
    });
  }

}
