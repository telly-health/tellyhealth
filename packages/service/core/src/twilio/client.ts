import twilio from 'twilio'
import sgMail from '@sendgrid/mail'

export function createClient(
	accountSid: string,
	authToken: string
): twilio.Twilio {
	return twilio(accountSid, authToken)
}

export function createEmailClient(apiKey) {
	sgMail.setApiKey(apiKey)
	return sgMail
}
