import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Query,
  Int,
} from 'type-graphql'
import { Character } from '../entity/Character'

@InputType()
class CharacterInput {
  @Field()
  name: string

  @Field(() => Int, { nullable: true })
  userId: number

  // @Field(() => Int)
  // str?: number;

  // @Field(() => Int)
  // dex?: number;

  // @Field(() => Int)
  // con?: number;

  // @Field(() => Int)
  // int?: number;

  // @Field(() => Int)
  // wis?: number;

  // @Field(() => Int)
  // cha?: number;

  // @Field(() => Int)
  // blo?: number;
}

@InputType()
class CharacterUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string
}

@Resolver()
export class CharacterResolver {
  @Mutation(() => Character)
  async createCharacter(
    @Arg('options', () => CharacterInput) options: CharacterInput
  ) {
    const character = await Character.create(options).save()
    return character
  }

  @Mutation(() => Character)
  async deleteCharacter(@Arg('id', () => Int) id: number) {
    const character = await Character.findOne({ id })

    if (character) {
      await Character.delete({ id })
      return character
    }
    return new Error('No character with that ID found')
  }

  @Mutation(() => Character)
  async updateCharacter(
    @Arg('id') id: number,
    @Arg('input', () => CharacterUpdateInput) input: CharacterUpdateInput
  ) {
    await Character.update({ id }, input)
    const character = await Character.findOne({ id })
    return character

    return new Error('No character with that ID found')
  }

  @Query(() => [Character])
  characters() {
    return Character.find({ relations: ['user'] })
  }
}
