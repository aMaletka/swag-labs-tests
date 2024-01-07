import { faker } from "@faker-js/faker"

export interface User {
  firstname: string
  lastname: string
  postalCode: string
}

export const getUserData = (): User => {
  const firstname = faker.person.firstName()
  const lastname = faker.person.lastName()
  const postalCode = faker.location.zipCode()
  return {
    firstname,
    lastname,
    postalCode,
  }
}
