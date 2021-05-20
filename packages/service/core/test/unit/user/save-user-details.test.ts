import { saveUserDetails } from '../../../src/user/save-user-details'
import { jest, describe, it, expect, beforeEach } from '@jest/globals'
import { MailDataRequired } from '@sendgrid/helpers/classes/mail'
import admin from 'firebase-admin'

describe('saveUserDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('saves the user details to firebase firestore', async () => {
    const verificationLink =
      'http://localhost:9099/emulator/action?mode=verifyEmail&lang=en&oobCode=KrTWHAK_5lUjNz-CdZ1crEv6lwzq4er9DDLJR9YCREOP79jYp6qvit&apiKey=fake-api-key'

    const body = {
      name: 'Lily Farrow',
      email: 'lil_sparrow@outlook.com',
      password: 'a!123456',
      phoneNumber: '+61 491 570 158',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    }

    const user = {
      name: 'Lily Farrow',
      email: 'lil_sparrow@outlook.com',
      emailVerified: false,
      phoneNumber: '+61 491 570 158',
      authUid: 'fq5rfAhTyMGLIKSPJyL27kYtbojp'
    }

    const mockVerifyEmail = jest
      .fn<Promise<string>, [string]>()
      .mockResolvedValue(verificationLink)

    const mockSendEmail = jest
      .fn<Promise<void>, [MailDataRequired]>()
      .mockResolvedValue(undefined)

    const mockAddDocument = jest
      .fn<Promise<admin.firestore.DocumentData>, [Record<string, any>]>()
      .mockResolvedValue({
        id: 'MHfYQV4JhuvVeWtDUdw5'
      })

    const ctx = {
      request: {
        body
      },
      params: {
        role: 'Patient'
      },
      state: {
        user
      },
      services: {
        auth: {
          generateEmailVerificationLink: mockVerifyEmail
        },
        sendgrid: {
          send: mockSendEmail
        },
        db: {
          collection: (name: string) => ({
            add: mockAddDocument
          })
        }
      }
    } as any

    await saveUserDetails(ctx)

    expect(mockAddDocument).toBeCalledWith(user)
    expect(mockVerifyEmail).toBeCalledWith(user.email)
    expect(mockSendEmail).toBeCalledWith({
      from: { email: 'noreply@telly.health' },
      to: { email: user.email },
      subject: 'Verify your email',
      content: [
        {
          type: 'text',
          value: `Welcome to telly.health, please verify your email by clicking on ${verificationLink}`
        }
      ],
      mailSettings: {
        sandboxMode: {
          enable: process.env.NODE_ENV === 'test'
        }
      }
    })

    expect(ctx.status).toEqual(200)
    expect(ctx.body).toEqual({
      message: 'User registration sucessful',
      user: {
        ...user,
        uid: 'MHfYQV4JhuvVeWtDUdw5'
      }
    })
  })
})
