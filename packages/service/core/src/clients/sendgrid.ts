import sgMail from '@sendgrid/mail'
import { config } from '../config'

export function createSendgridClient () {
  const apiKey = config.get('twilio.sendGridApiKey')
  if (apiKey) {
	  sgMail.setApiKey(apiKey)
  }
  return sgMail
}
