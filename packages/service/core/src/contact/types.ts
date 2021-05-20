import { GeoPoint } from '../db/models/User'

export interface ContactForm {
  name: string
  email: string
  phoneNumber: string
  country: string
  location: GeoPoint
  message: string
}
