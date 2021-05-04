import mongoose from 'mongoose'
import EventEmitter from 'node:events'

export async function createClient(url: string): Promise<typeof mongoose> {
	return await mongoose.connect(url, { useNewUrlParser: true })
}

export function registerConnectionEvents(connection: EventEmitter): void {
	connection.on('connecting', () => {
		console.log('Establishing an initial connection to mongodb server')
	})

	connection.on('connected', () => {
		console.log('Connection established with mongodb')
	})

	connection.on('disconnected', () => {
		console.log('Disconnected from mongodb')
	})

	connection.on('close', () => {
		console.log('mongodb Connection closed')
	})

	connection.on('error', (err) => {
		console.error(err)
	})

	connection.on('reconnecting', () => {
		console.log('re-establishing a connection with mongodb')
	})
}
