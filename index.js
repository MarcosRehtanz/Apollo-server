import { ApolloServer } from "apollo-server"
import { resolvers } from "./src/resolvers.js"
import { typeDefinitions as typeDefs } from "./src/Schema.js"

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
})