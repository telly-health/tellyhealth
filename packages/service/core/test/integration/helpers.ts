import axios, { AxiosResponse } from 'axios'
import ms from 'ms'
import { firebaseAdmin } from '../../src/clients'
import firebase from 'firebase'

const app = firebase.initializeApp({
  auth: {
    uid: 'alice-key',
    email: 'alice@example.com'
  },
  projectId: 'tellyhealth',
  apiKey: process.env.FIREBASE_API_KEY
})

let testAuth: firebase.auth.Auth | undefined

try {
  testAuth = app.auth()
  testAuth.useEmulator('http://localhost:9099')
} catch (e) {
  console.error(e)
}

export async function clearUserAccounts (): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:9099/emulator/v1/projects/tellyhealth/accounts'
  )
}

export async function registerUser (
  email: string,
  password: string,
  profile: Record<string, any>
): Promise<firebase.User | undefined> {
  if (testAuth == null) return undefined

  try {
    const creds = await testAuth.createUserWithEmailAndPassword(email, password)
    if (creds.user == null) return undefined
    await creds.user.updateProfile(profile)
    return creds.user
  } catch (e) {
    console.error(e)
  }

  return undefined
}

export async function clearFirestoreData (): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:8080/emulator/v1/projects/tellyhealth/databases/(default)/documents'
  )
}

export async function createJwtToken (
  uid: string,
  email: string,
  password: string,
  projectId = 'tellyhealth',
  databaseName = 'users'
): Promise<string | null | undefined> {
  if (testAuth == null) return undefined
  try {
    const creds = await testAuth.signInWithEmailAndPassword(email, password)
    if (creds.user == null) {
      return undefined
    }

    return await creds.user.getIdToken()
  } catch (e) {
    console.error(e)
  }

  return undefined
}

export async function passwordlessLoginWithEmail (
  email: string,
  emailLink: string
): Promise<string | undefined> {
  if (testAuth == null) return undefined
  try {
    const creds = await testAuth.signInWithEmailLink(email, emailLink)

    if (creds.user == null) return undefined

    const idToken = await creds.user.getIdToken()
    return idToken
  } catch (e) {
    console.error(e)
  }

  return undefined
}

export async function readDocument (
  collection: string,
  email: string
): Promise<FirebaseFirestore.DocumentData | undefined> {
  const queryRef = await firebaseAdmin
    .firestore()
    .collection(collection)
    .where('email', '==', email)

  const snapshot = await queryRef.get()
  if (snapshot.empty) return undefined

  const [doc] = snapshot.docs.map((doc) => doc.data())

  return doc
}

export async function delay (timeInSeconds: string): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms(timeInSeconds)))
}

// email verification, password reset, email link login
export async function getPendingVerificationCodes (
  projectId = 'tellyhealth'
): Promise<AxiosResponse<any>> {
  return await axios.get(
    `http://localhost:9099/emulator/v1/projects/${projectId}/oobCodes`
  )
}

export const emailVerificationLink =
  'http://localhost:9099/emulator/action?mode=verifyEmail&lang=en&oobCode=XYZ123&apiKey=fake-api-key'

export function getPasswordResetLink (updatedPassword: string): string {
  return `http://localhost:9099/emulator/action?mode=resetPassword&oobCode=XYZ!23&apiKey=fake-api-key&newPassword=${updatedPassword}`
}
