import { describe, jest, it, beforeEach, expect } from '@jest/globals'
import * as mod from '../../src/handler'
import JestPlugin from 'serverless-jest-plugin'
import {
  clearFirestoreData,
  clearUserAccounts,
  createJwtToken,
  registerUser
} from './helpers'

jest.setTimeout(10_000)

const wrapped = JestPlugin.lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('login', () => {
  beforeEach(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  afterAll(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  it('logs in with the email and password', async () => {
    const email = 'GabrielleMaguire@yahoo.com'
    const password = 'a!123456'

    const body = {
      email,
      password
    }

    await registerUser(email, password, {
      name: 'Gabrielle Maguire',
      phoneNumber: '+61 491 570 156',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    })

    const token = await createJwtToken(email, password)

    expect(token).toBeDefined()

    const event = {
      body: `${JSON.stringify(body)}`,
      resource: '/auth/login',
      path: '/auth/login',
      httpMethod: 'POST',
      isBase64Encoded: false,

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token as string}`
      },
      requestContext: {
        accountId: '123456789012',
        resourceId: '123456',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        path: '/auth/login',
        httpMethod: 'POST',
        apiId: '1234567890',
        protocol: 'HTTP/1.1'
      }
    }

    const response = await wrapped.run(event as any)

    console.log(response.body)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()
  })
})
