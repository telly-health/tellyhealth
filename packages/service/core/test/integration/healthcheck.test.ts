import { afterEach, describe, it, expect, beforeEach } from '@jest/globals'
import { Server } from 'http'
import supertest from 'supertest'
import app from '../../src/'

const request = supertest(app)

describe('Healthcheck Endpoint', () => {
  afterEach(async () => {
    return app.close()
  })

  it('GET /healthcheck', async () => {
    return await request
      .get('/healthcheck')
      .expect(200)
      .then((res) => expect(res.text).toEqual('👍'))
  })
})
