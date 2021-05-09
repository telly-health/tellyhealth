import admin from 'firebase-admin'
import { RouterContext } from '@koa/router'
import { Twilio } from 'twilio'

export enum VerificationStatus {
  Correct = 'approved',
  Incorrect = 'pending',
  Canceled = 'canceled'
}

export interface Attempt {
  time: string
  channel: VerificationChannel
  channelId: string
}

export enum VerificationChannel {
  Email = 'email',
  Sms = 'sms',
  Call = 'call'
}

export interface VerificationDetails {
  status: VerificationStatus
  attempts: Attempt[]
}

export interface PhoneVerification {
  sent: VerificationDetails
  completed: boolean
}

export interface ErrorResponse {
  message: string
  status?: string
}

export interface ResponsePayload {
  message: string
  phoneNumber: string
  attempts: Attempt[]
  status: VerificationStatus
}

export interface AuthenticatedUser {
  email: string
  phoneNumber: string
  uid: string
}

export interface StateAddons {
  user: AuthenticatedUser
  phoneNumber: string
  phoneVerification: Partial<PhoneVerification>
}

export interface Services {
  auth: admin.auth.Auth
  twilio: Twilio
}

export interface ContextAddons {
  services: Services
  body?: ResponsePayload | ErrorResponse
}

export type OtpContext = RouterContext<StateAddons, ContextAddons>
