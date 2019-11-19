import 'reflect-metadata'
import { createConnection } from 'typeorm'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { CharacterResolver } from './resolvers/CharacterResolver'
import { UserResolver } from './resolvers/UserResolver'
;(async () => {
  const port = 4000
  const app = express()

  await createConnection()

  let apolloServer

  const resolvers = [CharacterResolver, UserResolver]

  try {
    apolloServer = new ApolloServer({
      schema: await buildSchema({
        resolvers,
      }),
      context: ({ req, res }) => ({ req, res }),
    })
  } catch (err) {
    console.log('Error building schema')
    console.log('---------------------------------------')
    console.log(err)
    console.log('---------------------------------------')
  }

  if (apolloServer) apolloServer.applyMiddleware({ app, cors: false })

  app.listen(port, () => {
    console.log(`Server start on port ${port}`)
  })
})()
