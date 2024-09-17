import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker'
import { writeJson } from './write.js'

function createRandomUser() {
  let firstName = faker.person.firstName()
  let lastName = faker.person.lastName()
  let email = faker.internet.email({ firstName, lastName }).toLowerCase()
  let username = firstName.toLowerCase()

  return {
    id: uuid(),
    displayName: `${firstName} ${lastName}`,
    email,
    username: username.toLowerCase(),
  }
}

let data = []

for (let i = 0; i < 30; i++) {
  data.push(createRandomUser())
}

writeJson('users', data)
