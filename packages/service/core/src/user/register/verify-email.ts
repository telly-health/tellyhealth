import { Next } from 'koa'
import { User } from '../../db/models/User'
import { AppContext } from '../../types'

export async function verifyEmail(ctx: AppContext, next: Next): Promise<void> {
  const { authUid, email, emailVerified } = ctx.state.user as User
  if (authUid != null && email != null && !emailVerified) {
    const link = await ctx.services.auth.generateEmailVerificationLink(email, {
      url: 'https://telly.health/login'
    })
    console.log({
      message: 'Generated an email verification link',
      email,
      link
    })

    ctx.state.emailVerificationLink = link

    // TODO send email using something like
    // ctx.services.sendgrid.send({
    // 	from: 'noreply@telly.health',
    // 	to: email,
    // 	text: `Welcome to telly.health. To verify your email, please click ${link}`,
    // })
  }

  await next()
}
