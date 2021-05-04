import twilio from 'twilio'

export function createClient(
	accountSid: string,
	authToken: string
): twilio.Twilio {
	return twilio(accountSid, authToken)
}
