import { Twilio } from 'twilio'
import { VerificationInstance } from 'twilio/lib/rest/verify/v2/service/verification'
import { VerificationCheckInstance } from 'twilio/lib/rest/verify/v2/service/verificationCheck'

export enum VerificationStatus {
  Correct = 'approved',
  Incorrect = 'pending',
  Canceled = 'canceled',
}

export enum VerificationChannel {
  Email = 'email',
  Sms = 'sms',
  Call = 'call',
}

export interface Attempt {
  time: string
  channel: VerificationChannel
  channelId: string
}

export interface VerificationDetails {
  sid: string
  serviceSid: string
  status: VerificationStatus
  attempts: Attempt[]
}

export async function sendOTP (
  client: Twilio,
  serviceId: string,
  phoneNumber: string
): Promise<VerificationDetails> {
  const verification: VerificationInstance = await client.verify
    .services(serviceId)
    .verifications.create({
      to: phoneNumber,
      channel: VerificationChannel.Sms
    })

  const { sid, status, sendCodeAttempts: attempts, serviceSid } = verification

  return {
    sid,
    serviceSid,
    status: status as VerificationStatus,
    attempts: attempts as Attempt[]
  }
}

/**
 *
 * @param client Twilio Client
 * @param details {VerificationDetails} Verification Sid and other details
 * @param phoneNumber The phone number that needs to be verified.
 * @param providedCode The OTP code provided by the user.
 */
export async function confirmOTP (
  client: Twilio,
  details: VerificationDetails,
  phoneNumber: string,
  providedCode: string
): Promise<boolean> {
  const verificationCheck: VerificationCheckInstance = await client.verify
    .services(details.serviceSid)
    .verificationChecks.create({
      to: phoneNumber,
      code: providedCode
    })

  return verificationCheck.status === VerificationStatus.Correct
}
