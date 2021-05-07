import firebase from 'firebase'

export enum Role {
  Admin = 'Admin',
  MedicalPractioner = 'MedicalPractioner',
  Individual = 'Individual',
}

// Retrieved from https://www.sgu.edu/blog/medical/ultimate-list-of-medical-specialties/
export enum MedicalSpecialization {
  AllergyAndImmunology = 'Allergy and Immunology',
  Anesthesiology = 'Anesthesiology',
  Dermatology = 'Dermatology',
  DiagnosticRadiology = 'Diagnostic radiology',
  EmergencyMedicine = 'Emergency medicine',
  FamilyMedicine = 'Family medicine',
  InternalMedicine = 'Internal medicine',
  MedicalGenetics = 'Medical genetics',
  Neurology = 'Neurology',
  NuclearMedicine = 'Nuclear medicine',
  ObstetricsAndGynecology = 'Obstetrics and gynecology',
  Ophthalmology = 'Ophthalmology',
  Pathology = 'Pathology',
  Pediatrics = 'Pediatrics',
  PhysicalMedicineAndRehabilitation = 'Physical medicine and rehabilitation',
  PreventiveMedicine = 'Preventive medicine',
  Psychiatry = 'Psychiatry',
  RadiationOncology = 'Radiation oncology',
  Surgery = 'Surgery',
  Urology = 'Urology',
}

export interface GeoPoint {
  latitude: string
  longitude: string
}

export interface Individual {
  uid: string
  authUid: string
  role: Role.Individual
  email: string
  name: string
  phoneNumber: string
  location: GeoPoint
  languages: string[]
  timezone: string
  emailVerified: boolean
  phoneVerified: boolean
}

export interface MedicalPractioner {
  uid: string
  authUid: string
  role: Role.MedicalPractioner
  email: string
  name: string
  phoneNumber: string
  location: GeoPoint
  languages: string[]
  timezone: string
  emailVerified: boolean
  phoneVerified: boolean
  specialization: MedicalSpecialization
}

export type Admin = Individual & {
  role: Role.Admin
}

export type User = MedicalPractioner | Individual | Admin

export type NewIndividualUser = Omit<Individual, 'uid'>
export type NewMedicalPractioner = Omit<MedicalPractioner, 'uid'>

export type NewUser = NewIndividualUser | NewMedicalPractioner
