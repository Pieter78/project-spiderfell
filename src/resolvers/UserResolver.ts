import { Resolver, Mutation, Arg, InputType, Field, Query } from 'type-graphql'
import { User } from '../entity/User'

@InputType()
class UserInput {
  @Field()
  playerName: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('options', () => UserInput) options: UserInput) {
    const user = await User.create(options).save()
    return user
  }

  @Query(() => [User])
  User() {
    return User.find()
  }
}

// @Mutation(() => Character)
// async deleteCharacter(@Arg('id', () => Int) id: number) {
//   const character = await Character.findOne({ id })

//   if (character) {
//     await Character.delete({ id })
//     return character
//   }
//   return new Error('No character with that ID found')
// }

// @Mutation(() => Character)
// async updateCharacter(
//   @Arg('id') id: number,
//   @Arg('input', () => CharacterUpdateInput) input: CharacterUpdateInput
// ) {
//   await Character.update({ id }, input)
//   const character = await Character.findOne({ id })
//   return character

//   return new Error('No character with that ID found')
// }
