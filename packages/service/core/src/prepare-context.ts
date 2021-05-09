import { Next } from 'koa'
import { twilio, firebase, sendgrid, firebaseAdmin } from './clients'
import { RegistrationContext } from './user/register/types'

export async function prepareContext(
  ctx: RegistrationContext,
  next: Next
): Promise<void> {
  ctx.services = {
    auth: firebaseAdmin.auth(),
    db: firebase.firestore(),
    twilio,
    sendgrid
  }

  ctx.state = {}

  await next()
}
