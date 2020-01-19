import { ObjectType, Field, Int, ID } from 'type-graphql';

@ObjectType()
export class QuoteType {
  @Field(() => ID)
  readonly id?: string;

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
  readonly createdAt?: Date;
}
