import { Next } from 'koa'
import { OtpContext } from './types'

export async function findUser(ctx: OtpContext, next: Next) {
  const { uid } = ctx.state.user
  const user = await ctx.services.auth.getUser(uid)

  if (user.phoneNumber) {
    ctx.state.phoneNumber = user.phoneNumber
    await next()
  } else {
    ctx.body = {
      message: 'User did not provide a phone number'
    }

    ctx.status = 400
  }
}
