import { Elysia, t } from 'elysia'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'
import { Handler } from './utils'

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
      return Handler.Response(StatusCodes.OK, { message: ReasonPhrases.OK })
    },
    {
      // with auto-completion for existing model name
      body: 'sign',
      response: { message: t.String() }
    }
  )
  .get('/profile', ({ set }) => {
    set.status = 404

    return Handler.Response(StatusCodes.NOT_FOUND, { message: ReasonPhrases.NOT_FOUND })
  })
