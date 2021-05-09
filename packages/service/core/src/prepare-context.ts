import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { twilio, firebase, sendgrid, firebaseAdmin } from './clients'
import { Services } from './types'

export async function prepareContext(
  ctx: RouterContext<{ services: Services }, any>,
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
