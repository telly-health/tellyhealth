import { MailService } from '@sendgrid/mail'

export function sendEmail(client: MailService, message: any) {
	return client.send({
		from: '',
		to: '',
		text: '',
		html: '',
		subject: '',
	})
}
