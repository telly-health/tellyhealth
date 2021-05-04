import admin from 'firebase-admin'

export function createClient(config: admin.AppOptions): admin.app.App {
	return admin.initializeApp(config)
}
