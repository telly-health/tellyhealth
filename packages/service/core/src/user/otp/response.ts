import { OtpContext } from './types'

export function response(ctx: OtpContext) {
  const { sent, completed } = ctx.state.phoneVerification

  if (completed) {
    ctx.body = {
      message: 'Phone number has been verified'
    }

    ctx.status = 200
  }

  if (sent) {
    const { attempts, status } = sent
    ctx.body = {
      message: 'An sms has been sent to the user for phone verification',
      attempts,
      status
    }

    ctx.status = 200
  }
}
