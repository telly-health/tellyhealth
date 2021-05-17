import { Twilio } from 'twilio'
import { MessageInstance } from 'twilio/lib/rest/api/v2010/account/message'

export interface MessageDetails {
  from: string
  to: string
  body: string
}

export interface NotificationDetails {
  accountSid: string
  body: string
  dateSent: Date
  from: string
  sid: string
  to: string
}

export async function sendMessage(
  client: Twilio,
  messageDetails: MessageDetails
): Promise<NotificationDetails> {
  const message: MessageInstance = await client.messages.create(messageDetails)

  const { accountSid, body, dateSent, from, to, sid } = message

  return {
    accountSid,
    body,
    dateSent,
    from,
    to,
    sid
  }
}
