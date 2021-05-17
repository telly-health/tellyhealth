export interface Individual {
    name: string
    email: string
    phoneNumber: string
    country: {
      code: string
      label: string
    }
    preferredSpecialist: string
    languages: string[]
    recaptcha: string
    preferredConsultation: string[]
    additionalMessage: string
    preferredConsultationDate: Date
  }

  export interface MedicalPractitoner {
    name: string
    email: string
    phoneNumber: string
    country: {
      code: string
      label: string
    }
    specialization: string
    languages: string[]
    recaptcha: string
    preferredConsultation: string[]
  }

