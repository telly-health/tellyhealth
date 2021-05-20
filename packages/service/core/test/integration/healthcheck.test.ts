import { afterEach, describe, it, expect, afterAll } from '@jest/globals'
import supertest from 'supertest'
import app from '../../src/'
import { delay } from './helpers'

const request = supertest(app)

describe('Healthcheck Endpoint', () => {
  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    await delay('10s')
  })

  it('GET /healthcheck', async () => {
    return await request
      .get('/healthcheck')
      .expect(200)
      .then((res) => expect(res.text).toEqual('👍'))
  })
})
