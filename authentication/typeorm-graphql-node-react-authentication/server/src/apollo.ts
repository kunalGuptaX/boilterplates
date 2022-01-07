import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user.resolver";
import type { Express } from "express";

export const initializeApollo = async (app: Express) => {
  // Add all resolvers here
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    // context is providing the req context to resolvers
    context: ({ res, req }) => ({ req, res }),
  });

  await apolloServer.start();
  // appending apolloServer middleware to app
  apolloServer.applyMiddleware({ app, cors: false });
};
