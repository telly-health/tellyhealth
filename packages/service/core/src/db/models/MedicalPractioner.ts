import { Model } from 'mongoose'

export const schema = {
	name: String,
	email: String,
	phoneNumber: String,
	location: String,
	languages: [String],
	specialization: [String],
	timeZone: String,
	availableTimeSlots: [
		{
			date: String,
			times: [
				{
					startTime: String,
					endTime: String,
				},
			],
		},
	],
}

export const model = new Model(schema)
