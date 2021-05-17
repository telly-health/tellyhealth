import twilio from 'twilio'
import { config } from '../config'

export function createTwiloClient(): twilio.Twilio {
  const accountSid = config.get('twilio.accountSid')
  const authToken = config.get('twilio.authToken')
  return twilio(accountSid, authToken)
}
