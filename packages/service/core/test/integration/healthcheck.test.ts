import { describe, jest, it, expect } from '@jest/globals'
import * as mod from '../../src/handler'
import JestPlugin from 'serverless-jest-plugin'

jest.setTimeout(10_000)

const wrapped = JestPlugin.lambdaWrapper.wrap(mod, { handler: 'handler' })

describe('healthcheck', () => {
  it('GET /healthcheck', async () => {
    const event = {
      resource: '/healthcheck',
      path: '/healthcheck',
      httpMethod: 'GET',
      isBase64Encoded: false
    }

    const response = await wrapped.run(event as any)
    expect(response.body).toEqual('👍')
    return expect(response.statusCode).toEqual(200)
  })
})
