import { Next } from 'koa'
import { AppContext } from './types'
import { twilio, firebase, sendgrid, firebaseAdmin } from './clients'

export async function prepareContext(
  ctx: AppContext,
  next: Next
): Promise<void> {
  ctx.services = {
    auth: firebaseAdmin.auth(),
    db: firebase.firestore(),
    twilio,
    sendgrid
  }

  await next()
}
