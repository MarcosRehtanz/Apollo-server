import { ApolloServer, UserInputError, gql } from "apollo-server"
import { v4 as uuid } from "uuid"

const persons = [
    {
        age: 25,
        name: "Juan",
        phone: "044-123456",
        street: 'Calle Frontent',
        city: 'Barcelona',
        id: '3d594650-3436-11e9-bc57-8b80ba54c431'
    },
    {
        age: 15,
        name: 'Youseff',
        phone: '034-1234567',
        street: 'Avenida Fullstack',
        city: 'Mataro',
        id: '3d594650-3436-11e9-bc57-8b80ba54c432'
    },
    {
        age: 18,
        name: 'Marcos',
        phone: '011-1234567',
        street: 'Pasaje Testing',
        city: 'Ibiza',
        id: '3d594650-3436-11e9-bc57-8b80ba54c433'
    }
]

const typeDefinitions = gql`
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

    type Query {
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
        allAddress: [Address]!
    }

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

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const { name } = args
            return persons.find(person => person.name === name)
        },
        allAddress: () => {
            return persons.map( p => {
                return {
                    id: p.id,
                    street: p.street,
                    city: p.city,
                }
            })
        }
    },
    Mutation: {
        addPerson: (root, args) => {
            if( persons.some( p => p.name === args.name)){
                throw new UserInputError('Name must be unique', {
                    invalidArgs: args.name
                })
            }

            const person = {...args, id: uuid()}
            persons.push(person)
            return person
        }
    },
    Person: {
        canDrink: (root) => root.age >= 18,
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
})