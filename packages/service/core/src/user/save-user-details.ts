import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { Role, MedicalPractioner } from '../db/models'
import { StateAddons, ContextAddons } from '../types'

export async function saveUserDetails(
  ctx: RouterContext<StateAddons, ContextAddons>,
  next: Next
): Promise<void> {
  const { role } = ctx.params

  if (role === Role.MedicalPractioner) {
    ;(ctx.state.user as MedicalPractioner).specialization =
      ctx.request.body.specialization
  }

  const { id } = await ctx.services.db.collection('users').add(ctx.state.user)

  ctx.state.user.uid = id
  const { name, email, emailVerified, phoneNumber, authUid } = ctx.state.user

  if (email != null) {
    const verificationLink =
      await ctx.services.auth.generateEmailVerificationLink(email)
    console.log('Verification link', verificationLink)

    await ctx.services.sendgrid.send({
      from: { email: 'noreply@telly.health' },
      to: { email },
      subject: 'Verify your email',
      content: [
        {
          type: 'text',
          value: `Welcome to telly.health, please verify your email by clicking on ${verificationLink}`
        }
      ],
      mailSettings: {
        sandboxMode: {
          enable: process.env.NODE_ENV === 'test'
        }
      }
    })
  }

  ctx.body = {
    message: 'User registration sucessful',
    user: {
      name,
      email,
      emailVerified,
      phoneNumber,

      uid: id,
      authUid
    }
  }

  ctx.status = 200
}
