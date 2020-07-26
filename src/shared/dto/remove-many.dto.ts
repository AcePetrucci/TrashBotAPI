import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class RemoveManyType {
  @Field(() => Int)
  readonly ok?: number;

  @Field(() => Int)
  readonly n?: number;

  @Field(() => Int)
  readonly deletedCount?: number;
}
