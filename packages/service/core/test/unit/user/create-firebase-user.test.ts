import { afterAll, beforeEach, describe, expect, it, jest } from '@jest/globals'
import { createFirebaseUser } from '../../../src/user/create-firebase-user'
import admin from 'firebase-admin'
import { Role } from '../../../src/db/models'

describe('Create Firebase User Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  it('saves a user to firebase auth', async () => {
    const body = {
      name: 'Gabrielle Maguire',
      email: 'GabrielleMaguire@yahoo.com',
      password: 'a!123456',
      phoneNumber: '+61 491 570 156',
      specialization: 'Neurology',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    }

    const userRecord: admin.auth.UserRecord = {
      uid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
      displayName: 'Gabrielle Maguire',
      email: 'GabrielleMaguire@yahoo.com',
      phoneNumber: '+61 491 570 156',
      providerData: [
        {
          uid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
          displayName: 'Gabrielle Maguire',
          email: 'GabrielleMaguire@yahoo.com',
          phoneNumber: '+61 491 570 156',
          photoURL: 'https://example.com',
          providerId: 'foobar',
          toJSON: () => ({
            uid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
            displayName: 'Gabrielle Maguire',
            email: 'GabrielleMaguire@yahoo.com',
            phoneNumber: '+61 491 570 156',
            photoURL: 'https://example.com',
            providerId: 'foobar'
          })
        }
      ],
      emailVerified: false,
      disabled: false,
      metadata: {
        creationTime: '2020-03-11',
        lastSignInTime: '2020-03-11',
        toJSON: () => ({
          creationTime: '2020-03-11',
          lastSignInTime: null
        })
      },
      toJSON: () => ({
        uid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
        displayName: 'Gabrielle Maguire',
        email: 'GabrielleMaguire@yahoo.com',
        phoneNumber: '+61 491 570 156',
        providerData: [
          {
            uid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
            displayName: 'Gabrielle Maguire',
            email: 'GabrielleMaguire@yahoo.com',
            phoneNumber: '+61 491 570 156',
            photoURL: 'https://example.com',
            providerId: 'foobar'
          }
        ],
        emailVerified: false,
        disabled: false,
        metadata: {
          creationTime: '2020-03-11',
          lastSignInTime: '2020-03-11'
        }
      })
    }

    const next = jest.fn<Promise<void>, any>()
    const ctx = {
      params: { role: Role.MedicalPractioner },
      request: {
        body
      },
      services: {
        auth: {
          createUser: jest
            .fn<Promise<admin.auth.UserRecord>, [admin.auth.CreateRequest]>()
            .mockResolvedValue(userRecord)
        }
      },
      state: {}
    } as any

    await createFirebaseUser(ctx, next)

    expect(ctx.state.user).toEqual({
      authUid: 'BLVHCZGlXbfOkEnwsEVd87EKQJr0',
      email: 'GabrielleMaguire@yahoo.com',
      emailVerified: false,
      phoneNumber: '+61 491 570 156',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      name: 'Gabrielle Maguire',
      timezone: 'Australia/Sydney',
      phoneVerified: false
    })

    return expect(ctx.services.auth.createUser).toBeCalledWith({
      displayName: 'Gabrielle Maguire',
      email: 'GabrielleMaguire@yahoo.com',
      phoneNumber: '+61 491 570 156'
    })
  })
})
