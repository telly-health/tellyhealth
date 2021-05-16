import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { Role } from '../db/models'
import { StateAddons, ContextAddons } from '../types'
import { RegistrationForm } from './types'

export async function createFirebaseUser (
  ctx: RouterContext<StateAddons, ContextAddons>,
  next: Next
): Promise<void> {
  const { role } = ctx.params

  if (![Role.Individual, Role.MedicalPractioner].includes(role as Role)) {
    ctx.status = 400
    ctx.body = {
      message: `${role} provided is invalid, use one of ${Role.Individual} or ${Role.MedicalPractioner}`
    }
  }

  const {
    name: displayName,
    email,
    phoneNumber,
    location,
    languages,
    timezone
  } = ctx.request.body as RegistrationForm

  try {
    const { uid: authUid, emailVerified } = await ctx.services.auth.createUser({
      displayName,
      email,
      phoneNumber
    })

    ctx.state.user = {
      name: displayName,
      email,
      emailVerified,
      phoneNumber,
      authUid,
      location,
      languages,
      timezone,
      phoneVerified: false
    }
  } catch (err) {
    console.error(err)
    ctx.body = err
    ctx.status = 200
    return
  }

  await next()
}
