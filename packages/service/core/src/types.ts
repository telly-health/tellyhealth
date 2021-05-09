import Router, { RouterContext } from '@koa/router'
import { Twilio } from 'twilio'
import firebase from 'firebase'
import admin from 'firebase-admin'
import { MailService } from '@sendgrid/mail'
import { User } from './db/models/User'

export interface Services {
  twilio: Twilio
  auth: admin.auth.Auth
  db: firebase.firestore.Firestore
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
  user: Partial<User>
  phoneVerification: {
    sent: VerificationDetails
    completed: boolean
  }
  // TODO: remove
  emailVerificationLink: string
  passwordResetLink: string
}

export interface ContextAddons {
  services: Services
}

export type AppContext = RouterContext<StateAddons, ContextAddons>
export type AppRouter = Router<StateAddons, ContextAddons>
