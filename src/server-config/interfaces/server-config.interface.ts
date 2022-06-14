import { Document } from 'mongoose';

export interface ServerConfig extends Document {
  readonly guildID: string;
  readonly nhenDisable: boolean;
  readonly nhenTimer: number;
}
