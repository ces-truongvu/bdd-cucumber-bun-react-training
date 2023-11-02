import { Elysia, t } from 'elysia'
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
  .model({
    sign: t.Object({
      id: t.String(),
      name: t.String(),
      title: t.String(),
      email: t.String(),
      phone: t.String(),
      address: t.String(),
      bio: t.String(),
      image: t.String()
    })
  })
  .derive(() => {
    return {
      'Content-Type': 'application/json'
    }
  })
  .onError(({ code, error }) => {
    console.log(code, error)
    switch (code) {
      case 'VALIDATION':
        console.log(error.all)

        // Find a specific error name (path is OpenAPI Schema compliance)
        const name = error.all.find((x) => x.path === '/name')

        // If has validation error, then log it
        if (name) console.log(name)
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
  .put(
    '/',
    async ({ body, set }) => {
      const payload: EmployeeType = body as EmployeeType
      const employee = await repository.updateEmployee(payload)

      return employee
    },
    {
      body: 'sign',
      response: 'sign'
    }
  )
