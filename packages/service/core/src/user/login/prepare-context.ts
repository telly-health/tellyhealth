import { Next } from 'koa'
import { firebaseAdmin } from '../../clients'
import { LoginContext } from './types'

export async function prepareContext(ctx: LoginContext, next: Next) {
  ctx.services = {
    auth: firebaseAdmin.auth()
  }

  await next()
}
