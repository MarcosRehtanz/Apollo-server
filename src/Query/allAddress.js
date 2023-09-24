import { persons } from "../ultils/persons.js";

export const allAddress = () => {
    return persons.map(p => {
        return {
            id: p.id,
            street: p.street,
            city: p.city,
        }
    })
}