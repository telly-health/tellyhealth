import { Next } from 'koa'
import { AppContext } from '../types'

export async function updateUser (ctx: AppContext, next: Next): Promise<void> {
  const { uid: userId, ...user } = ctx.request.body
  const { uid, displayName, email, emailVerified, phoneNumber } =
    await ctx.services.auth.updateUser(userId, user)

  ctx.state.user = { uid, name: displayName, email, emailVerified, phoneNumber }

  ctx.body = {
    uid,
    displayName,
    email,
    emailVerified,
    phoneNumber
  }

  ctx.status = 200
}
