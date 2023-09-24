import { gql } from "apollo-server"

import { personCount } from "./personCount.js"
import { allPersons } from "./allPersons.js"
import { findPerson } from "./findPerson.js"
import { allAddress } from "./allAddress.js"

export const QueryType = gql`
type Query {
    personCount: Int!
    allPersons: [Person]!
    findPerson(name: String!): Person
    allAddress: [Address]!
}
`

export const Query = {
    personCount,
    allPersons,
    findPerson,
    allAddress,
}