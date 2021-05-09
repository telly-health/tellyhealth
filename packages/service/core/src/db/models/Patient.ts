export const schema = {
  name: String,
  phoneNumber: String,
  timeZone: String,
  languages: [String],
  completedAppointments: [String],
  upcomingAppointments: [String]
}

export const model = schema
