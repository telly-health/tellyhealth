import { Model } from 'mongoose'

export const schema = {
  practitionerId: String,
  patientIds: String,
  consultationId: String
}

export const model = new Model(schema)
