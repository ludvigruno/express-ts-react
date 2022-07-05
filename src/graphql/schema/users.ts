import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  avatar: string;

  @Field(() => String)
  age: string;
}

@ObjectType()
export class UserNested {
  @Field(() => User)
  user: User;
}
