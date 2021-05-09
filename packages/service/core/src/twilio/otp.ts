import { Next } from 'koa'
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

export async function requestPhoneVerification (
  ctx: AppContext,
  next: Next
): Promise<void> {
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

  ctx.body = {
    message: 'An sms has been sent to the user for phone verification',
    messageSid: sid,
    attempts,
    status
  }

  ctx.status = 200
}

export async function confirmPhoneVerification (
  ctx: AppContext,
  next: Next
): Promise<void> {
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

  if (
    (ctx.state.phoneVerification.completed =
      verificationCheck.status === VerificationStatus.Correct)
  ) {
    const { uid, authUid } = ctx.state.user

    ctx.body = {
      message: 'Phone number has been verified',
      uid,
      authUid
    }

    ctx.status = 200
  }
}
