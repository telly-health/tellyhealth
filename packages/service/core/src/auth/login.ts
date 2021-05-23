import { AppContext } from '../types'
import { Next } from 'koa'

export async function getUser (ctx: AppContext, next: Next): Promise<void> {
  const uid = ctx.state.claims.uid
  try {
    if (uid != null) {
      const user = await ctx.services.auth.getUser(uid)
      const { displayName, email, emailVerified, phoneNumber } = user

      ctx.body = {
        uid,
        name: displayName,
        email,
        emailVerified,
        phoneNumber
      }

      ctx.status = 200
    }
  } catch (e) {
    console.error(e)

    ctx.body = {
      message: e.message,
      code: e.code
    }

    ctx.status = 500
  }

  // if (ctx.request.body.email != null) {
  //   const { uid, displayName, email, emailVerified, phoneNumber } =
  //     await ctx.services.auth.getUserByEmail(ctx.request.body.email as string)

  //   ctx.state.user = {
  //     uid,
  //     name: displayName,
  //     email,
  //     emailVerified,
  //     phoneNumber
  //   }
  // }

  // if (ctx.request.body.phoneNumber != null) {
  //   const { uid, displayName, email, emailVerified, phoneNumber } =
  //     await ctx.services.auth.getUserByEmail(
  //       ctx.request.body.phoneNumber as string
  //     )

  //   ctx.state.user = {
  //     uid,
  //     name: displayName,
  //     email,
  //     emailVerified,
  //     phoneNumber
  //   }
  // }
}
