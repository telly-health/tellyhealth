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
      additionalMessage
    } = ctx.request.body
    ctx.state.user = {
      ...ctx.state.user,
      role: Role.Individual,
      preferredConsultation,
      preferredConsultationDate,
      preferredSpecialist,
      additionalMessage
    }
  }

  try {
    const { id } = await ctx.services.db.collection('users').add(ctx.state.user)

    const { name, email, emailVerified, phoneNumber, authUid } = ctx.state.user

    ctx.body = {
      message: 'User was created successfully',
      user: {
        name,
        email,
        emailVerified,
        phoneNumber,
        id,
        authUid
      }
    }
    ctx.status = 200
  } catch (err) {
    ctx.body = err
    ctx.status = 500
  }
}
