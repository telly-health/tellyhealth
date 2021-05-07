import { config } from '../config'
import admin from 'firebase-admin'

export function createFirebaseAdminClient() {
	return admin.initializeApp({
		credential: admin.credential.applicationDefault(),
	})
}
