import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ServerConfigType {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  readonly guildID?: string;

  @Field()
  readonly nhenDisable?: boolean;

  @Field()
  readonly nhenTimer?: number;
}
