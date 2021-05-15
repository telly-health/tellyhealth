import { Next } from 'koa'
import { AppContext } from '../types'
import admin from 'firebase-admin'

export async function verifyJwt (ctx: AppContext, next: Next): Promise<void> {
  const bearerToken = ctx.headers.authorization

  if (bearerToken == null) {
    ctx.body = {
      message: 'Missing bearer token'
    }

    ctx.status = 400
  }

  const tokenSegments = (bearerToken as string).split(' ')

  let idToken: string = ''
  if (tokenSegments.length === 1) {
    idToken = tokenSegments[1]
  }

  if (idToken == null) {
    ctx.body = {
      message: 'Missing bearer token'
    }

    ctx.status = 400
  }

  try {
    const claims: admin.auth.DecodedIdToken = await ctx.services.auth.verifyIdToken(
      idToken
    )

    ctx.state.claims = claims
    await next()
  } catch (e) {
    ctx.body = {
      message: 'Unauthorized'
    }
    ctx.status = 401
  }
}
