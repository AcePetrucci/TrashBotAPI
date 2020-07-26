import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommandInput {
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
  readonly createdAt?: Date = new Date();
}
