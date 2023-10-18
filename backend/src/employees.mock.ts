import { faker } from '@faker-js/faker'
import { Cache } from 'memory-cache'
import { EmployeeType } from './employees'

const createEmployee = (): EmployeeType => {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    title: faker.person.jobTitle(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    bio: faker.lorem.paragraphs(),
    image: faker.image.urlLoremFlickr({ width: 151, height: 151, category: 'portrait,bw' })
  }
}

const employeesInCache: Array<EmployeeType> = faker.helpers.multiple(createEmployee, { count: 16 })
export const employeesCache = new Cache()
employeesCache.put('employees', employeesInCache)
