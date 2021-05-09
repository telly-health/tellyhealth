import { Next } from 'koa'
import { Role, MedicalPractioner, User } from '../../db/models'
import { RegistrationContext } from './types'
import firebase from 'firebase'

export async function saveUserDetails(
  ctx: RegistrationContext,
  next: Next
): Promise<void> {
  const { role } = ctx.params

  if (role === Role.MedicalPractioner) {
    ;(ctx.state.user as MedicalPractioner).specialization =
      ctx.request.body.specialization
  }

  const userReference: firebase.firestore.DocumentReference = await ctx.services.db
    .collection('users')
    .add(ctx.state.user as firebase.firestore.DocumentData)

  ;(ctx.state.user as User).uid = userReference.id

  await next()
}
