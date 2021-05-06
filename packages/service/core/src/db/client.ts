import firebase from 'firebase'

export function createClient(): firebase.firestore {
	return firebase.firestore()
}
