import { Next } from 'koa'
import { AppContext } from '../types'
import admin from 'firebase-admin'

export async function register(ctx: AppContext, next: Next) {
	const createRequest = ctx.request.body as admin.auth.CreateRequest
	const user = await ctx.services.firebase.auth().createUser(createRequest)
	const { uid, displayName, email, emailVerified, phoneNumber } = user
	const emailVerificationLink = await ctx.services.firebase
		.auth()
		.generateEmailVerificationLink(email)

	ctx.state.user = {
		displayName,
		email,
		emailVerified,
		phoneNumber,
		uid,
	}

	ctx.state.emailVerificationLink = emailVerificationLink

	ctx.body = {
		message: 'User registration sucessful',
		user: {
			displayName,
			email,
			emailVerified,
			phoneNumber,
			uid,
		},
	}

	ctx.status = 200
}
