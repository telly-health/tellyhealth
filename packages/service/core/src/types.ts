import { ParameterizedContext } from 'koa'
import Router from '@koa/router'
import { Twilio } from 'twilio'
import admin from 'firebase-admin'
import { MailService } from '@sendgrid/mail'

export interface User {
	displayName: string
	email: string
	emailVerified: boolean
	phoneNumber?: string
	uid: string
}

export interface Services {
	twilio: Twilio
	firebase: admin.app.App
	sendgrid: MailService
}

export enum VerificationStatus {
	Correct = 'approved',
	Incorrect = 'pending',
	Canceled = 'canceled',
}

export interface Attempt {
	time: string
	channel: VerificationChannel
	channelId: string
}

export enum VerificationChannel {
	Email = 'email',
	Sms = 'sms',
	Call = 'call',
}

export interface VerificationDetails {
	sid: string
	serviceSid: string
	status: VerificationStatus
	attempts: Attempt[]
}

export interface StateAddons {
	claims: admin.auth.DecodedIdToken
	user: User
	phoneVerification: {
		sent: VerificationDetails
		completed: boolean
	}
	emailVerificationLink: string
	passwordResetLink: string
}

export interface ContextAddons {
	services: Services
}

export type AppContext = ParameterizedContext<StateAddons, ContextAddons>
export type AppRouter = Router<StateAddons, ContextAddons>
