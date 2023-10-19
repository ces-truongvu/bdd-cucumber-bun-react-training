import { Elysia, t } from 'elysia'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Handler } from './utils'
import { faker } from '@faker-js/faker'

export type SignIn = {
  username: string
  password: string
}

export const users = new Elysia({ prefix: '/users' })
  .model({
    sign: t.Object({
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
        return Handler.Response(StatusCodes.UNAUTHORIZED, { message: ReasonPhrases.UNAUTHORIZED })
      }

      set.status = StatusCodes.OK
      return Handler.Response(StatusCodes.OK, {
        message: ReasonPhrases.OK,
        data: {
          username,
          token: faker.string.nanoid(50)
        }
      })
    },
    {
      body: 'sign'
      // response: { message: t.String() }
    }
  )
