/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../EntityId';

// <keep-imports>
// </keep-imports>

@InputType()
export class TokenCreateInput {
  @Field(() => String)
  public content: string;

  // <keep-methods>
  // </keep-methods>
}
