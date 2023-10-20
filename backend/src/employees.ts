import { Elysia } from 'elysia'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { handler } from './utils'
import { EmployeeRepository } from './employee.repository'

export type EmployeeType = {
  id: string
  name: string
  title: string
  email: string
  phone: string
  address: string
  bio: string
  image: string
}

const repository = new EmployeeRepository('./src/employees.json')

export const employees = new Elysia({ prefix: '/employees' })
  .derive(() => {
    return {
      'Content-Type': 'application/json'
    }
  })
  .get('/', async () => {
    const employees: Array<EmployeeType> = await repository.getAllEmployees()
    const data = employees.map(({ id, name, title, image }: EmployeeType) => {
      return { id, name, title, image }
    })

    return handler.response(StatusCodes.OK, { message: ReasonPhrases.OK, data })
  })
  .get('/:id', async ({ params: { id } }) => {
    const data: EmployeeType = (await repository.getEmployeeById(id)) as EmployeeType

    return handler.response(StatusCodes.OK, { message: ReasonPhrases.OK, data })
  })
