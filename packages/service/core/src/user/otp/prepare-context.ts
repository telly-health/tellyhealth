import { Next } from 'koa'
import { firebaseAdmin, twilio } from '../../clients'

export async function prepareContext(ctx: any, next: Next) {
  ctx.services = {
    auth: firebaseAdmin.auth(),
    twilio,
  }
}
