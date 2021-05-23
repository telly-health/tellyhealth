import { AppContext } from '../types'

export async function sendEmailVerificationLink (
  ctx: AppContext
): Promise<void> {
  const { email } = ctx.request.body
  try {
    const url = await ctx.services.auth.generateEmailVerificationLink(email)

    ctx.body = {
      url,
      message: 'Sent an email verification link'
    }

    ctx.status = 200
  } catch (e) {
    console.error(e)
    ctx.body = {
      message: 'Could not send email verification link'
    }
    ctx.status = 500
  }
}
