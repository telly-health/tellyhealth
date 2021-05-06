import { Next } from 'koa'
import { AppContext } from '../types'

export async function logout(ctx: AppContext, next: Next) {
	const claims = ctx.state.claims
	await ctx.services.firebase.auth().revokeRefreshTokens(claims.sub)
	ctx.body = {
		message: 'Log out successful.',
	}
	ctx.status = 200
}
