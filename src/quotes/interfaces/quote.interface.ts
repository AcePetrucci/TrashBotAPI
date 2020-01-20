import { Document } from 'mongoose';

export interface Quote extends Document {
  readonly guildID: string;
  readonly authorID: string;
  readonly quote: string;
  readonly deleted: boolean;
  readonly indexNum: number;
  readonly createdAt: Date;
}
