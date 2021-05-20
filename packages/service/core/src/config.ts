import convict from 'convict'
import formats from 'convict-format-with-validator'

convict.addFormats(formats as { [name: string]: convict.Format })

export const config = convict({
  server: {
    host: {
      doc: 'Server host',
      env: 'APP_HOST',
      default: 'localhost',
      format: String
    },
    port: {
      doc: 'Server port',
      env: 'APP_PORT',
      default: null,
      format: String
    }
  },
  twilio: {
    accountSid: {
      format: String,
      doc: 'The Twilio Account SID',
      env: 'TWILIO_ACCOUNT_SID',
      default: undefined as any
    },
    authToken: {
      format: String,
      doc: 'The Twilio Auth Token',
      env: 'TWILIO_AUTH_TOKEN',
      default: undefined as any
    },
    serviceName: {
      format: String,
      doc: 'The Twilio Service Name',
      env: 'TWILIO_SERVICE_NAME',
      default: undefined as any
    },
    serviceSid: {
      format: String,
      doc: 'The Twilio Service Identifier',
      env: 'TWILIO_SERVICE_SID',
      default: undefined as any
    },
    twilioPhoneNumber: {
      format: String,
      doc: 'The Twilio Phone Number to send messages from',
      env: 'TWILIO_PHONE_NUMBER',
      default: undefined as any
    },
    sendGridApiKey: {
      format: String,
      doc: 'The Sendgrid API Key for sending email',
      env: 'SENDGRID_API_KEY',
      default: undefined as any
    }
  },
  firebase: {
    credentials: {
      // firebase-admin picks this up automatically, adding this here for documentation.
      format: String,
      doc: 'Service Account Credentials file used to initialize the admin client',
      env: 'GOOGLE_APPLICATION_CREDENTIALS'
    },
    emulators: {
      token: {
        format: String,
        doc: 'A JWT token linked to an IRL google account, used on CI by firebase-cli to authenticate and identify the project to emulate',
        env: 'FIREBASE_TOKEN',
        default: undefined as any
      },
      authUrl: {
        // this variable is picked up automatically by firebase-admin.
        format: String,
        doc: 'The URL where the auth emulator is running',
        env: 'FIREBASE_AUTH_EMULATOR_HOST',
        default: undefined as any
      },
      firestoreUrl: {
        // this variable is picked up automatically by firebase-admin
        format: String,
        doc: 'The URL where the firestore emulator is running',
        env: 'FIRESTORE_EMULATOR_HOST',
        default: undefined as any
      }
    }
  },
  zoom: {
    clientId: {
      doc: 'Zoom OAuth2.0 Client Id',
      format: String,
      env: 'ZOOM_CLIENT_ID',
      default: undefined as any
    },
    clientSecret: {
      doc: 'Zoom OAuth 2.0 Client Secret',
      format: String,
      env: 'ZOOM_CLIENT_SECRET',
      default: undefined as any
    }
  }
})
