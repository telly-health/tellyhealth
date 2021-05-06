import { Next } from 'koa'
import { config } from './config'
import { createClient as createFirebaseClient } from './auth'
import { createClient as createTwilioClient, createEmailClient } from './twilio'
import { AppContext } from './types'

export async function prepareContext(ctx: AppContext, next: Next) {
	const firebaseConfig = config.get('firebase') as any
	const accountSid = config.get('twilio.accountSid')
	const authToken = config.get('twilio.authToken')
	const sendGridApiKey = config.get('twilio.sendGridApiKey')

	// TODO: create individual clients for firebase.

	/*
	  {
			auth: <client>
      db: <client>
		}
	*/

	ctx.services = {
		firebase: createFirebaseClient(firebaseConfig),
		twilio: createTwilioClient(accountSid, authToken),
		sendgrid: createEmailClient(sendGridApiKey),
	}

	await next()
}
