import { Elysia, t } from 'elysia'
import { faker } from '@faker-js/faker'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Handler } from './utils'

export const employees = new Elysia({ prefix: '/employees' })
  .derive(() => {
    return {
      'Content-Type': 'application/json'
    }
  })
  .get('/', () => {
    const createEmployee = () => {
      return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        title: faker.person.jobTitle(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        bio: faker.person.bio(),
        image: faker.image.urlLoremFlickr({ width: 151, height: 151, category: 'portrait,bw' })
      }
    }

    const data = faker.helpers.multiple(createEmployee, { count: 16 })
    return Handler.Response(StatusCodes.OK, { message: ReasonPhrases.OK, data })
  })
