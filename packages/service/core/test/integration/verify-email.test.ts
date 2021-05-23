import { describe, jest, it, beforeEach, expect } from '@jest/globals'
import * as mod from '../../src/handler'
import JestPlugin from 'serverless-jest-plugin'
import {
  clearFirestoreData,
  clearUserAccounts,
  registerUser,
  getPendingVerificationCodes
} from './helpers'

import qs from 'qs'

jest.setTimeout(10_000)

const wrapped = JestPlugin.lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('Verify Email', () => {
  beforeEach(async () => {
    await clearUserAccounts()
    await clearFirestoreData()
  })

  afterAll(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  it('works i hope', async () => {
    const email = 'GabrielleMaguire@yahoo.com'

    await registerUser(email, 'a!123456', {
      name: 'Gabrielle Maguire',
      phoneNumber: '+61 491 570 156',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    })

    const event = {
      body: `{ "email": "${email}" }`,
      resource: '/auth/verify-email',
      path: '/auth/verify-email',
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
        path: '/auth/verify-email',
        httpMethod: 'POST',
        apiId: '1234567890',
        protocol: 'HTTP/1.1'
      }
    }

    const response = await wrapped.run(event as any)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()

    const { url } = JSON.parse(response.body as any)
    const expectedBaseUrl = 'http://localhost:9099/emulator/action'

    const { data: verificationCodes } = await getPendingVerificationCodes()
    const mostRecentOobCode =
      verificationCodes.oobCodes[verificationCodes.oobCodes.length - 1].oobCode

    const expectedQueryParams = {
      mode: 'verifyEmail',
      lang: 'en',
      apiKey: 'fake-api-key',
      oobCode: mostRecentOobCode
    }

    const [baseUrl, queryStr] = url.split('?')

    const queryParams = qs.parse(queryStr)

    expect(baseUrl).toEqual(expectedBaseUrl)
    expect(queryParams).toEqual(expectedQueryParams)
  })
})
