import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinColumn,
  OneToOne,
} from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'
import { Character } from './Character'

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  playerName: string

  @Field(() => Character, { nullable: true })
  @OneToOne(
    () => Character,
    character => character.user
  )
  @JoinColumn()
  character: Character
}
