import axios, { AxiosResponse } from 'axios'
import ms from 'ms'

export async function clearUserAccounts(): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:9099/emulator/v1/projects/tellyhealth/accounts'
  )
}

export async function clearFirestoreData(): Promise<AxiosResponse<any>> {
  return await axios.delete(
    'http://localhost:8080/emulator/v1/projects/tellyhealth/databases/(default)/documents'
  )
}

export async function readDocument(uid: string): Promise<AxiosResponse<any>> {
  return await axios.get(
    `http://localhost:8080/emulator/v1/projects/tellyhealth/databases/(default)/documents/users/${uid}`
  )
}

export async function delay(timeInSeconds: string): Promise<void> {
  return await new Promise((resolve) => setTimeout(resolve, ms(timeInSeconds)))
}
