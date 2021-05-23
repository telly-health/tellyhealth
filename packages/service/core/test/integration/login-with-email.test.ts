import { describe, jest, it, beforeEach, expect } from '@jest/globals'
import * as mod from '../../src/handler'
import JestPlugin from 'serverless-jest-plugin'
import {
  clearFirestoreData,
  clearUserAccounts,
  getPendingVerificationCodes,
  registerUser
} from './helpers'
import qs from 'qs'

jest.setTimeout(10_000)

const wrapped = JestPlugin.lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('passwordless login with email', () => {
  beforeEach(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  afterAll(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  it('logs the user in provided they have the correct email link', async () => {
    const email = 'GabrielleMaguire@yahoo.com'

    await registerUser(email, 'a!123456', {
      name: 'Gabrielle Maguire',
      phoneNumber: '+61 491 570 156',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    })

    const event = {
      body: `{"email":"${email}" }`,
      resource: '/auth/login/email',
      path: '/auth/login/email',
      httpMethod: 'POST',
      isBase64Encoded: false,

      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      requestContext: {
        accountId: '123456789012',
        resourceId: '123456',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        path: '/auth/login/email',
        httpMethod: 'POST',
        apiId: '1234567890',
        protocol: 'HTTP/1.1'
      }
    }

    const response = await wrapped.run(event as any)
    const expectedBaseUrl = 'http://localhost:9099/emulator/action'

    const { data: verificationCodes } = await getPendingVerificationCodes()
    const mostRecentOobCode =
      verificationCodes.oobCodes[verificationCodes.oobCodes.length - 1].oobCode

    const expectedQueryParams = {
      mode: 'signIn',
      lang: 'en',
      apiKey: 'fake-api-key',
      continueUrl: 'https://tellyhealth.com/verify',
      oobCode: mostRecentOobCode
    }

    expect(response.body).toBeDefined()
    expect(response.statusCode).toEqual(200)

    const { url } = JSON.parse(response.body as any)

    expect(url).toBeDefined()

    const [baseUrl, queryStr] = url.split('?')
    const queryParams = qs.parse(queryStr)

    expect(baseUrl).toEqual(expectedBaseUrl)
    expect(queryParams).toEqual(expectedQueryParams)
  })
})
