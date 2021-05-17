import axios, { AxiosResponse } from 'axios'

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
