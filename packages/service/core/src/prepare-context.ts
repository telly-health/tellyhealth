import { Next } from 'koa'
import { config } from './config'
import { AppContext } from './types'
import { twilio, firebase, sendgrid, firebaseAdmin } from './clients'

export async function prepareContext(ctx: AppContext, next: Next) {
	ctx.services = {
		auth: firebaseAdmin.auth(),
		db: firebase.firestore(),
		twilio,
		sendgrid,
	}

	await next()
}
