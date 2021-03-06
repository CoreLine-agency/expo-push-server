/*** AUTOGENERATED FILE: you can only modify parts of the file within <keep-*> tags ***/
import { Field, ID, InputType } from 'type-graphql';

import { EntityId, EntityIdScalar } from '../EntityId';

// <keep-imports>
// </keep-imports>

@InputType()
export class FileCreateInput {
  @Field(() => String)
  public contentBase64: string;

  // <keep-methods>
  // </keep-methods>
}
