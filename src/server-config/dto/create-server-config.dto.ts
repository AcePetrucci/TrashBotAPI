import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateServerConfigInput {
  @Field()
  readonly guildID: string;

  @Field()
  readonly nhenDisable?: boolean = false;

  @Field()
  readonly nhenTimer?: number = 86400000; //A Day
}
