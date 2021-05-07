import { Next } from 'koa'
import twilio from 'twilio'
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification'
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck'
import { config } from '../config'
import {
  AppContext,
  Attempt,
  VerificationChannel,
  VerificationStatus
} from '../types'
import { lookupPhoneNumber } from './lookup-phone'

export async function requestPhoneVerification (ctx: AppContext, next: Next) {
  const { phoneNumber } = ctx.request.body
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

  const { sid, status, sendCodeAttempts: attempts, serviceSid } = verification
  ctx.state.phoneVerification.sent = {
    sid,
    status: status as any,
    attempts: attempts as Attempt[],
    serviceSid
  }
}

export async function confirmPhoneVerification (ctx: AppContext, next: Next) {
  const { phoneNumber, otp } = ctx.request.body

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

  ctx.state.phoneVerification.completed =
		verificationCheck.status === VerificationStatus.Correct
}
