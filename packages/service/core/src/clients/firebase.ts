import firebase from 'firebase'
import { config } from '../config'

export function createFirebaseClient (): firebase.app.App {
  const apikey = config.get('firebase.apiKey')
  const appId = config.get('firebase.appId')
  const authDomain = config.get('firebase.authDomain')
  const measurementId = config.get('firebase.measurementId')
  const messageSenderId = config.get('firebase.messagingSenderId')
  const projectId = config.get('firebase.projectId')
  const storageBucket = config.get('firebase.storageBucket')

  const firebaseConfig = {
    apikey,
    appId,
    authDomain,
    measurementId,
    messageSenderId,
    projectId,
    storageBucket
  }

  return firebase.initializeApp(firebaseConfig)
}
