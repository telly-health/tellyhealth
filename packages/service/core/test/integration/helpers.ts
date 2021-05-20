import axios, { AxiosResponse } from 'axios'
import ms from 'ms'
import { firebaseAdmin } from '../../src/clients'

export async function clearUserAccounts (): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:9099/emulator/v1/projects/tellyhealth/accounts'
  )
}

export async function clearFirestoreData (): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:8080/emulator/v1/projects/tellyhealth/databases/(default)/documents'
  )
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
