import { Next } from 'koa'
import { LoginContext } from './types'

export async function login(ctx: LoginContext, next: Next): Promise<void> {
  const { email, password } = ctx.request.body

  if (email == null || password == null) {
    ctx.body = {
      message: 'Must provide email and password to login'
    }
  }

  const user = await ctx.services.auth.getUserByEmail(email)
  const token = await ctx.services.auth.createCustomToken(user.uid)

  ctx.state.user = {
    uid: user.uid,
    accessToken: token
  }

  if (user.displayName) {
    ctx.state.user.name = user.displayName
  }

  if (user.phoneNumber) {
    ctx.state.user.phoneNumber = user.phoneNumber
  }

  await next()
}
