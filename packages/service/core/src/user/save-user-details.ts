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
