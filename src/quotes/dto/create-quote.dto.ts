import { InputType, Field, Int } from 'type-graphql';

@InputType()
export class QuoteInput {
  @Field()
  readonly guildID: string;

  @Field()
  readonly author: string;

  @Field()
  readonly quote: string;

  @Field()
  readonly deleted?: boolean = false;

  @Field(() => Int)
  readonly indexNum?: number = 0;

  @Field()
  readonly createdAt?: Date = new Date();
}
