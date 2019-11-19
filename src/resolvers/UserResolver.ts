import { Resolver, Mutation, Arg, InputType, Field, Query } from 'type-graphql'
import { User } from '../entity/User'
import { CharacterInput } from './CharacterResolver'
import { Character } from '../entity/Character'

@InputType()
class UserInput {
  @Field()
  playerName: string

  @Field({ nullable: true })
  character: CharacterInput
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('options', () => UserInput) options: UserInput) {
    console.log(JSON.stringify(options, null, 2))

    const user = await User.create(options).save()
    let character
    if (options.character) {
      character = await Character.create(options.character).save()
      user.character = character
      character.user = user

      // not updating, maybe use update
      await user.save()
      await character.save()
    }

    return user
  }

  @Query(() => [User])
  async users() {
    return User.find({ relations: ['character'] })
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
