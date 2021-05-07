import admin from 'firebase-admin'
import { Next } from 'koa'
import { AppContext } from '../types'

export async function updateUser(ctx: AppContext, next: Next) {
	const { uid: userId, ...user } = ctx.request.body
	const {
		uid,
		displayName,
		email,
		emailVerified,
		phoneNumber,
	} = await ctx.services.auth.updateUser(userId, user)

	ctx.state.user = { uid, name: displayName, email, emailVerified, phoneNumber }

	ctx.body = {
		uid,
		displayName,
		email,
		emailVerified,
		phoneNumber,
	}

	ctx.status = 200
}

export function getUserByEmail(firebase: admin.app.App, email: string) {
	return firebase.auth().getUserByEmail(email)
}

export function getUserByPhoneNumber(
	firebase: admin.app.App,
	phoneNumber: string
) {
	return firebase.auth().getUserByPhoneNumber(phoneNumber)
}
