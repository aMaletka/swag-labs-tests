import { faker } from "@faker-js/faker"

export interface User {
  firstname: string
  lastname: string
  postelCode: string
}

export const getUserData = (): User => {
  const firstname = faker.person.firstName()
  const lastname = faker.person.lastName()
  const postelCode = faker.location.zipCode()
  return {
    firstname,
    lastname,
    postelCode,
  }
}
