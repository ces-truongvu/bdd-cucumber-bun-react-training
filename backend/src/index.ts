import { Elysia } from 'elysia'
import { users } from './users'
import { employees } from './employees'

const API_VERSION = 'v1'
const app = new Elysia({
  prefix: `/api/${API_VERSION}`
})
  .use(users)
  .use(employees)
  .get('/version', () => API_VERSION)
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
