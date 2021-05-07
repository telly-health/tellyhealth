import { MailService } from '@sendgrid/mail'

export async function sendEmail (client: MailService, message: any) {
  return await client.send({
    from: '',
    to: '',
    text: '',
    html: '',
    subject: ''
  })
}
