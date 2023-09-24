import { gql } from "apollo-server"
import { QueryType } from "./Query/Query.js"
import { MutationType } from "./Mutation/Mutation.js"


export const typeDefinitions = gql`

type Person {
    age: Int!
    canDrink: Boolean
    name: String!
    phone: String
    address: Address!
    id: ID!
}

type Address {
    id: ID
    street: String!
    city: String!
}

${QueryType}
${MutationType}
`