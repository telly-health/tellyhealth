import { config } from '../config'

import { Next } from 'koa'
import { AppContext } from '../types'
import admin from 'firebase-admin'

export async function verifyJwt(ctx: AppContext, next: Next) {
	const bearerToken = ctx.headers.authorization
	const idToken = bearerToken.split(' ')[1]

	try {
		const claims: admin.auth.DecodedIdToken = await ctx.services.auth.verifyIdToken(
			idToken
		)

		ctx.state.claims = claims
		await next()
	} catch (e) {
		ctx.body = {
			message: 'Unauthorized',
		}
		ctx.status = 401
	}
}
