import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class CommandType {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly guildID: string;

  @Field()
  readonly authorID: string;

  @Field()
  readonly commandName: string;

  @Field()
  readonly commandText: string;

  @Field()
  readonly deleted?: boolean = false;

  @Field()
  readonly createdAt?: Date;
}
