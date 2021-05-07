import { GeoPoint, MedicalSpecialization } from '../db/models/User'

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
