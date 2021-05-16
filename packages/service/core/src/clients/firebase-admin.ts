import admin from 'firebase-admin'

export function createFirebaseAdminClient(): admin.app.App {
  return admin.initializeApp({
    credential: admin.credential.applicationDefault()
  })
}
