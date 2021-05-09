import Router from '@koa/router'
import { Request } from 'koa'
import { GeoPoint, MedicalSpecialization } from '../../db/models/User'
import { AppContext, StateAddons } from '../../types'

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

export interface ContextRequestAddons {
  params: Record<string, string>
  request: RegistrationRequest
  body?: RegistrationResponse | ErrorResponse
}

export type RegistrationContext = AppContext & ContextRequestAddons
export type RegistrationRouter = Router<
  RegistrationContext,
  Partial<StateAddons>
>
