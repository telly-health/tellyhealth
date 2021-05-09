import { Next } from 'koa'
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck'
import { config } from '../../config'
import { lookupPhoneNumber } from '../../twilio'
import { OtpContext, VerificationStatus } from './types'

export async function confirmOtp(ctx: OtpContext, next: Next) {
  const { phoneNumber } = ctx.state.user

  if (!phoneNumber) {
    ctx.body = {
      message: 'User has not provided a phone number'
    }
    ctx.status = 400
  } else {
    const { otp } = ctx.request.body

    const { e164Format: formattedPhoneNumber } = await lookupPhoneNumber(
      ctx.services.twilio,
      phoneNumber
    )
    const serviceId = config.get('twilio.serviceSid')

    const verificationCheck: VerificationCheckInstance = await ctx.services.twilio.verify
      .services(serviceId)
      .verificationChecks.create({
        to: formattedPhoneNumber,
        code: otp
      })

    const completed = verificationCheck.status === VerificationStatus.Correct

    if (completed) {
      ctx.state.phoneVerification.completed = completed
      await next()
    } else {
      ctx.body = {
        message: 'Phone verification failed',
        status: verificationCheck.status
      }

      ctx.status = 400
    }
  }
}
