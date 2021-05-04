import convict from 'convict'

export const config = convict({
	server: {
		host: {
			doc: 'Server host',
			env: 'APP_HOST',
			default: 'localhost',
			type: String,
		},
		port: {
			doc: 'Server port',
			env: 'APP_PORT',
			default: 3000,
			type: String,
		},
	},
	twilio: {
		accountSid: {
			type: String,
			doc: 'The Twilio Account SID',
			env: 'TWILIO_ACCOUNT_SID',
			default: undefined as any,
		},
		authToken: {
			type: String,
			doc: 'The Twilio Auth Token',
			env: 'TWILIO_AUTH_TOKEN',
			default: undefined as any,
		},
		serviceName: {
			type: String,
			doc: 'The Twilio Service Name',
			env: 'TWILIO_SERVICE_NAME',
			default: undefined as any,
		},
		serviceSid: {
			type: String,
			doc: 'The Twilio Service Identifier',
			env: 'TWILIO_SERVICE_SID',
			default: undefined as any,
		},
		twilioPhoneNumber: {
			type: String,
			doc: 'The Twilio Phone Number to send messages from',
			env: 'TWILIO_PHONE_NUMBER',
			default: undefined as any,
		},
		sendGridApiKey: {
			type: String,
			doc: 'The Sendgrid API Key for sending email',
			env: 'SENDGRID_API_KEY',
			default: undefined as any,
		},
	},
	firebase: {
		apiKey: {
			type: String,
			doc: 'Firebase API Key',
			env: 'FIREBASE_API_KEY',
			default: undefined as any,
		},
		authDomain: {
			type: String,
			doc: 'FIrebase Auth Domain',
			env: 'FIREBASE_AUTH_DOMAIN',
			default: undefined as any,
		},
		projectId: {
			type: String,
			doc: 'Firebase Project ID',
			env: 'FIREBASE_PROJECT_ID',
			default: 'tellyhealth',
		},
		storageBucket: {
			type: String,
			doc: 'Firebase Storage Bucket',
			env: 'FIREBASE_STORAGE_BUCKET',
			default: undefined as any,
		},
		messagingSenderId: {
			type: String,
			doc: 'Firebase Message Sender Id',
			env: 'FIREBASE_MESSAGING_SENDER_ID',
			default: undefined as any,
		},
		appId: {
			type: String,
			doc: 'Firebase App Id',
			env: 'FIREBASE_APP_ID',
			default: undefined as any,
		},
		measurementId: {
			type: String,
			doc: 'Firebase Measurement Id',
			env: 'FIREBASE_MEASUREMENT_ID',
			default: undefined as any,
		},
	},
	zoom: {
		clientId: {
			doc: 'Zoom OAuth2.0 Client Id',
			type: String,
			env: 'ZOOM_CLIENT_ID',
			default: undefined as any,
		},
		clientSecret: {
			doc: 'Zoom OAuth 2.0 Client Secret',
			type: String,
			env: 'ZOOM_CLIENT_SECRET',
			default: undefined as any,
		},
	},
	redis: {
		host: {
			doc: 'Redis Host',
			type: String,
			env: 'REDIS_HOST',
			default: 'localhost',
		},
		port: {
			doc: 'Redis Port',
			type: String,
			env: 'REDIS_PORT',
			default: '6379',
		},
		password: {
			doc: 'Redis Password',
			type: String,
			env: 'REDIS_PASSWORD',
			sensitive: true,
			default: undefined as any,
		},
	},
	mongo: {
		connectionUrl: {
			doc: 'MongoDB Connection URL',
			type: String,
			env: 'MONGO_CONNECTION_URL',
			default: 'mongodb://localhost:27017/myapp',
		},
	},
	revokeRefreshTokensUponLogout: {
		type: String,
		doc:
			'Time before auth cookie expires. Use vercel/ms notation for the value',
		default: '5d',
		env: 'AUTH_SESSION_EXPIRES_IN',
	},
})
