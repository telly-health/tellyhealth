import firebase from 'firebase'

export function createClient(): firebase.app.App {
	return firebase.auth()
}
