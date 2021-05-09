import { Next } from 'koa'
import { LoginContext } from './types'

export async function response(ctx: LoginContext, next: Next) {
  const { accessToken } = ctx.state.user

  if (accessToken) {
    ctx.body = {
      message: 'Login successful',
      accessToken
    }

    ctx.status = 200
  }
}
