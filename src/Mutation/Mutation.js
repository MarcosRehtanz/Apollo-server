import { UserInputError, gql } from "apollo-server"
import { v4 as uuid } from "uuid"
import { persons } from "../ultils/persons.js"

export const MutationType = gql`
type Mutation {
    addPerson(
        age: Int!
        name: String!
        phone: String
        street: String!
        city: String!
    ) : Person
}
`

export const Mutation = {
    addPerson: (root, args) => {
        if (persons.some(p => p.name === args.name)) {
            throw new UserInputError('Name must be unique', {
                invalidArgs: args.name
            })
        }

        const person = { ...args, id: uuid() }
        persons.push(person)
        return person
    }
}