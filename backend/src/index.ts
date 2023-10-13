import { Elysia } from 'elysia'
import { users } from './users'
import { employees } from './employees'

const API_VERSION = 'v1'
const plugin =
  (prefix: string = `/api/${API_VERSION}`) =>
  (customPlugin: any) => {
    return new Elysia({ prefix }).use(customPlugin)
  }

const app = new Elysia()
  .use(plugin()(users))
  .use(plugin()(employees))
  .get('/version', () => API_VERSION)
  .listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
