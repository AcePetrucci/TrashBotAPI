import { Document } from 'mongoose';

export interface Command extends Document {
  readonly guildID: string;
  readonly authorID: string;
  readonly commandName: string;
  readonly commandText: string;
  readonly deleted: boolean;
  readonly createdAt: Date;
}
