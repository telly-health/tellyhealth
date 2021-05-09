import { Next } from 'koa'
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification'
import { config } from '../../config'
import { lookupPhoneNumber } from '../../twilio'
import { Attempt, OtpContext, VerificationChannel } from './types'

export async function sendOtp(
  ctx: OtpContext,
  next: Next
): Promise<void> {
  const { phoneNumber } = ctx.state
  const { e164Format: formattedPhoneNumber } = await lookupPhoneNumber(
    ctx.services.twilio,
    phoneNumber
  )
  const serviceId = config.get('twilio.serviceSid')

  const verification: VerificationInstance = await ctx.services.twilio.verify
    .services(serviceId)
    .verifications.create({
      to: formattedPhoneNumber,
      channel: VerificationChannel.Sms
    })

  const { status, sendCodeAttempts: attempts } = verification
  ctx.state.phoneVerification.sent = {
    status: status as any,
    attempts: attempts as Attempt[]
  }

  await next()
}
