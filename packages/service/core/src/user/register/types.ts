import Router, { RouterContext } from '@koa/router'
import { Request } from 'koa'
import { GeoPoint, MedicalSpecialization, User } from '../../db/models/User'
import admin from 'firebase-admin'
import firebase from 'firebase'
import { MailService } from '@sendgrid/mail'

export interface MedicalPractionerRegistrationForm {
  name: string
  email: string
  password: string
  phoneNumber: string
  location: GeoPoint
  languages: string[]
  specialization: MedicalSpecialization
  timezone: string
}

export type IndividualRegistrationForm = Omit<
  MedicalPractionerRegistrationForm,
  'specialization'
>

export type RegistrationForm =
  | IndividualRegistrationForm
  | MedicalPractionerRegistrationForm

export type RegistrationRequest = Request & {
  body?: RegistrationForm
  rawBody: string
}

export interface RegisteredUser {
  name: string
  email: string
  emailVerificationLink: string
  emailVerified: boolean
  phoneNumber: string
  uid: string
  authUid: string
}

export interface RegistrationResponse {
  message: string
  user: RegisteredUser
}

export interface ErrorResponse {
  message: string
}

export interface Services {
  auth: admin.auth.Auth
  db: firebase.firestore.Firestore
  sendgrid: MailService
}


export interface ContextRequestAddons {
  services: Services
  params: Record<string, string>
  request: RegistrationRequest
  body?: RegistrationResponse | ErrorResponse
}

export interface StateAddons {
  user: Partial<User>
  emailVerificationLink?: string
}

export type AppContext = RouterContext<StateAddons, ContextRequestAddons>

export type RegistrationContext = RouterContext<Partial<StateAddons>, ContextRequestAddons>
export type RegistrationRouter = Router<
  RegistrationContext,
  Partial<StateAddons>
>
