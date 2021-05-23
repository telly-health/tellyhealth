import { describe, jest, it, beforeEach, expect } from '@jest/globals'
import * as mod from '../../src/handler'
import JestPlugin from 'serverless-jest-plugin'
import { clearFirestoreData, clearUserAccounts } from './helpers'

jest.setTimeout(10_000)

const wrapped = JestPlugin.lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('app', () => {
  beforeEach(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  afterAll(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  it('POST /auth/register/medical_practioner', async () => {
    const event = {
      body: '{"name":"Gabrielle Maguire","email":"GabrielleMaguire@yahoo.com","password":"a!123456","phoneNumber":"+61 491 570 156","location":{"latitude":33.8688,"longitude":151.2093},"languages":["English","French","Japanese"],"timezone":"Australia/Sydney"}',
      resource: '/auth/register/{role}',
      path: '/auth/register/{role}',
      httpMethod: 'POST',
      isBase64Encoded: false,
      pathParameters: {
        role: 'medical_practioner'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      requestContext: {
        accountId: '123456789012',
        resourceId: '123456',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        path: '/auth/register/{role}',
        httpMethod: 'POST',
        apiId: '1234567890',
        protocol: 'HTTP/1.1'
      }
    }

    const response = await wrapped.run(event as any)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()

    const body = JSON.parse(response.body as string)

    return expect(body).toEqual({
      message: 'User registration sucessful',
      user: {
        name: 'Gabrielle Maguire',
        email: 'GabrielleMaguire@yahoo.com',
        emailVerified: false,
        phoneNumber: '+61 491 570 156',
        uid: expect.any(String),
        authUid: expect.any(String)
      }
    })
  })

  it('POST /auth/register/Patient', async () => {
    const event = {
      body: '{"name":"Lily Farrow","email":"lil_sparrow@outlook.com","password":"a!123456","phoneNumber":"+61 491 570 158","location":{"latitude":33.8688,"longitude":151.2093},"languages":["English","French","Japanese"],"timezone":"Australia/Sydney"}',
      resource: '/auth/register/{role}',
      path: '/auth/register/:role',
      httpMethod: 'POST',
      isBase64Encoded: false,
      pathParameters: {
        role: 'Patient'
      },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      requestContext: {
        accountId: '123456789012',
        resourceId: '123456',
        requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
        path: '/auth/register/{role}',
        httpMethod: 'POST',
        apiId: '1234567890',
        protocol: 'HTTP/1.1'
      }
    }

    const response = await wrapped.run(event as any)
    expect(response.statusCode).toEqual(200)
    expect(response.body).toBeDefined()

    const body = JSON.parse(response.body as string)

    return expect(body).toEqual({
      message: 'User registration sucessful',
      user: {
        name: 'Lily Farrow',
        email: 'lil_sparrow@outlook.com',
        emailVerified: false,
        phoneNumber: '+61 491 570 158',
        uid: expect.any(String),
        authUid: expect.any(String)
      }
    })
  })
})
