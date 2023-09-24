import { Query } from "./Query/Query.js"
import { Mutation } from "./Mutation/Mutation.js"

export const resolvers = {
    Query,
    Mutation,
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