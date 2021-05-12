import sgMail from '@sendgrid/mail'
import { config } from '../config'

export function createSendgridClient(): sgMail.MailService {
  const apiKey = config.get('twilio.sendGridApiKey') as string
  if (apiKey != null) {
    sgMail.setApiKey(apiKey)
  }
  return sgMail
}
