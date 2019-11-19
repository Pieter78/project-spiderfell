import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { User } from './User'

@ObjectType()
@Entity()
export class Character extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column()
  name: string

  @Field(() => User, { nullable: true })
  @OneToOne(
    () => User,
    user => user.character
  )
  @JoinColumn()
  user: User
}
