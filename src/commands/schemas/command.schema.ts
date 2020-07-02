import * as mongoose from 'mongoose';

export const CommandSchema = new mongoose.Schema({
  guildID: String,
  authorID: String,
  commandName: String,
  commandText: String,
  deleted: Boolean,
  createdAt: { type: Date, default: Date.now, required: false },
});
