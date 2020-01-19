import * as mongoose from 'mongoose';

export const QuoteSchema = new mongoose.Schema({
  guildID: String,
  author: String,
  quote: String,
  deleted: Boolean,
  indexNum: Number,
  createdAt: { type: Date, default: Date.now, required: false },
});
