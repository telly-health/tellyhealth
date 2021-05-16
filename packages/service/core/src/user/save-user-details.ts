import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { Role } from '../db/models'
import { StateAddons, ContextAddons } from '../types'

export async function saveUserDetails (
  ctx: RouterContext<StateAddons, ContextAddons>,
  next: Next
): Promise<void> {
  const { role } = ctx.params

  if (role === Role.MedicalPractioner) {
    const { specialization } = ctx.request.body
    ctx.state.user = {
      ...ctx.state.user,
      role: Role.MedicalPractioner,
      specialization
    }
  } else if (role === Role.Individual) {
    const {
      preferredConsultation,
      preferredConsultationDate,
      preferredSpecialist,
      additonalMessage
    } = ctx.request.body
    ctx.state.user = {
      ...ctx.state.user,
      role: Role.Individual,
      preferredConsultation,
      preferredConsultationDate,
      preferredSpecialist,
      additonalMessage
    }
  }

  try {
    const { id } = await ctx.services.db.collection('users').add(ctx.state.user)

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
  } catch (err) {
    ctx.body = err
    ctx.status = 500
  }
}
