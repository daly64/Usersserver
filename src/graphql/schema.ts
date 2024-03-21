import { makeExecutableSchema } from "@graphql-tools/schema";
// import { loadSchemaSync } from "@graphql-tools/load";
// import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import resolvers from "./resolvers.js";

// A number that we'll increment over time to simulate subscription events

// const typeDefs = loadSchemaSync("graphql/typeDefs.graphql", {
//   loaders: [new GraphQLFileLoader()],
// });

const typeDefs = `
  type User {
    id: ID
    name: String!
    score: Int
  }
  input UserInput {
    name: String
    score: Int
  }
  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    currentNumber: Int
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): Boolean
  }

  type Subscription {
    numberIncremented: Int
    allUsers: [User]
  }
`;

// Create schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
