import convict from 'convict'
import formats from 'convict-format-with-validator'

convict.addFormats(formats as { [name: string]: convict.Format })

export const config = convict({
	server: {
		host: {
			doc: 'Server host',
			env: 'APP_HOST',
			default: 'localhost',
			format: String,
		},
		port: {
			doc: 'Server port',
			env: 'APP_PORT',
			default: 3000,
			format: String,
		},
	},
	twilio: {
		accountSid: {
			format: String,
			doc: 'The Twilio Account SID',
			env: 'TWILIO_ACCOUNT_SID',
			default: undefined as any,
		},
		authToken: {
			format: String,
			doc: 'The Twilio Auth Token',
			env: 'TWILIO_AUTH_TOKEN',
			default: undefined as any,
		},
		serviceName: {
			format: String,
			doc: 'The Twilio Service Name',
			env: 'TWILIO_SERVICE_NAME',
			default: undefined as any,
		},
		serviceSid: {
			format: String,
			doc: 'The Twilio Service Identifier',
			env: 'TWILIO_SERVICE_SID',
			default: undefined as any,
		},
		twilioPhoneNumber: {
			format: String,
			doc: 'The Twilio Phone Number to send messages from',
			env: 'TWILIO_PHONE_NUMBER',
			default: undefined as any,
		},
		sendGridApiKey: {
			format: String,
			doc: 'The Sendgrid API Key for sending email',
			env: 'SENDGRID_API_KEY',
			default: undefined as any,
		},
	},
	firebase: {
		apiKey: {
			format: String,
			doc: 'Firebase API Key',
			env: 'FIREBASE_API_KEY',
			default: undefined as any,
		},
		authDomain: {
			format: String,
			doc: 'FIrebase Auth Domain',
			env: 'FIREBASE_AUTH_DOMAIN',
			default: undefined as any,
		},
		projectId: {
			format: String,
			doc: 'Firebase Project ID',
			env: 'FIREBASE_PROJECT_ID',
			default: 'tellyhealth',
		},
		storageBucket: {
			format: String,
			doc: 'Firebase Storage Bucket',
			env: 'FIREBASE_STORAGE_BUCKET',
			default: undefined as any,
		},
		messagingSenderId: {
			format: String,
			doc: 'Firebase Message Sender Id',
			env: 'FIREBASE_MESSAGING_SENDER_ID',
			default: undefined as any,
		},
		appId: {
			format: String,
			doc: 'Firebase App Id',
			env: 'FIREBASE_APP_ID',
			default: undefined as any,
		},
		measurementId: {
			format: String,
			doc: 'Firebase Measurement Id',
			env: 'FIREBASE_MEASUREMENT_ID',
			default: undefined as any,
		},
	},
	zoom: {
		clientId: {
			doc: 'Zoom OAuth2.0 Client Id',
			format: String,
			env: 'ZOOM_CLIENT_ID',
			default: undefined as any,
		},
		clientSecret: {
			doc: 'Zoom OAuth 2.0 Client Secret',
			format: String,
			env: 'ZOOM_CLIENT_SECRET',
			default: undefined as any,
		},
	},
})
