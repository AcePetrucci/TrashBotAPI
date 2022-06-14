import * as mongoose from 'mongoose';

export const ServerConfigSchema = new mongoose.Schema({
  guildID: { type: String, unique: true },
  nhenDisable: Boolean,
  nhenTimer: Number,
});
