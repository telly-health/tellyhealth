import { Next } from 'koa'
import { AppContext } from '../types'

export async function resetPassword(
  ctx: AppContext,
  next: Next
): Promise<void> {
  const { email } = ctx.request.body
  if (ctx.state.user.email == null) {
    ctx.body = {
      message: 'User with email does not exist'
    }

    ctx.status = 400
  }

  if (ctx.state.user.email === email) {
    const resetLink = await ctx.services.auth.generatePasswordResetLink(email)

    ctx.body = {
      message: 'Password Reset Link Generated',
      resetLink
    }

    ctx.status = 200
  }
}
