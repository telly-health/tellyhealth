import { Next } from 'koa'
import { config } from './config'
import { createClient as createFirebaseClient } from './firebase'
import { createClient as createTwilioClient, createEmailClient } from './twilio'
import { AppContext } from './types'

export async function prepareContext(ctx: AppContext, next: Next) {
	const firebaseConfig = config.get('firebase')
	const accountSid = config.get('twilio.accountSid')
	const authToken = config.get('twilio.authToken')
	const sendGridApiKey = config.get('twilio.sendGridApiKey')

	ctx.services = {
		firebase: createFirebaseClient(firebaseConfig),
		twilio: createTwilioClient(accountSid, authToken),
		sendgrid: createEmailClient(sendGridApiKey),
	}

	await next()
}
