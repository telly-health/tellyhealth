import { createFirebaseAdminClient } from './firebase-admin'
import { createSendgridClient } from './sendgrid'
import { createTwiloClient } from './twilio'

export const firebaseAdmin = createFirebaseAdminClient()
export const twilio = createTwiloClient()
export const sendgrid = createSendgridClient()
