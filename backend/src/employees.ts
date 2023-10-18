import { Elysia } from 'elysia'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Handler } from './utils'
import { employeesCache } from './employees.mock'

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

export const employees = new Elysia({ prefix: '/employees' })
  .derive(() => {
    return {
      'Content-Type': 'application/json'
    }
  })
  .get('/', () => {
    const employees: Array<EmployeeType> = employeesCache.get('employees') as Array<EmployeeType>
    const data = employees.map(({ id, name, title, image }: EmployeeType) => {
      return { id, name, title, image }
    })

    return Handler.Response(StatusCodes.OK, { message: ReasonPhrases.OK, data })
  })
  .get('/:id', ({ params: { id } }) => {
    const employees: Array<EmployeeType> = employeesCache.get('employees') as Array<EmployeeType>
    const data = employees.find((employee: EmployeeType) => {
      return employee.id === id
    })

    return Handler.Response(StatusCodes.OK, { message: ReasonPhrases.OK, data })
  })
