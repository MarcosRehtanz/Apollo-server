import { persons } from "../ultils/persons.js";

export const findPerson = (root, args) => {
    const { name } = args
    return persons.find(person => person.name === name)
}