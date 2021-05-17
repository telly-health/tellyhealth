import { GeoPoint, MedicalSpecialization } from '../db/models/User'

export interface MedicalPractionerRegistrationForm {
  role: string
  name: string
  email: string
  phoneNumber: string
  country: string
  location: GeoPoint
  languages: string[]
  specialization: MedicalSpecialization
  preferredConsultation: string[]
  timezone: string
}

export interface IndividualRegistrationForm {
  role: string
  name: string
  email: string
  phoneNumber: string
  country: string
  location: GeoPoint
  languages: string[]
  preferredSpecialist: MedicalSpecialization
  preferredConsultation: string[]
  preferredConsultationDate: string
  additionalMessage: string
  timezone: string
}

export type RegistrationForm =
  | IndividualRegistrationForm
  | MedicalPractionerRegistrationForm
