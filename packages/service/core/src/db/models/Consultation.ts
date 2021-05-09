export const schema = {
  title: String,
  description: String,
  date: Date,
  time: String,
  languages: [String],
  maximumParticipants: Number,
  meetingLink: String,
  recordingLink: String
}

export const model = schema
