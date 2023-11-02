import { Elysia, t } from 'elysia'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { handler } from './utils'
import { faker } from '@faker-js/faker'

export type SignIn = {
  username: string
  password: string
}

export const users = new Elysia({ prefix: '/users' })
  .model({
    'user.model': t.Object({
      username: t.String(),
      password: t.String()
    })
  })
  .derive(() => {
    return {
      'Content-Type': 'application/json'
    }
  })
  .post(
    '/sign-in',
    ({ body, set }) => {
      const { username, password } = body
      if (username !== String(process.env.USERNAME) || password !== String(process.env.PASSWORD)) {
        return handler.response(StatusCodes.UNAUTHORIZED, { message: ReasonPhrases.UNAUTHORIZED })
      }

      set.status = StatusCodes.OK
      return handler.response(StatusCodes.OK, {
        message: ReasonPhrases.OK,
        data: {
          username,
          token: faker.string.nanoid(50)
        }
      })
    },
    {
      body: 'user.model'
      // response: { message: t.String() }
    }
  )
