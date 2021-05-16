import { beforeAll, afterAll, describe, it, expect } from '@jest/globals'
import { Server } from 'http'
import request from 'supertest'
import { app } from '../../src/'
import { config } from '../../src/config'

let server: Server
const port = config.get('server.port')

describe('Healthcheck Endpoint', () => {
  beforeAll((done) => {
    server = app.listen(port, done)
  })

  afterAll((done) => {
    if (server != null) server.close(done)
  })

  it('GET /healthcheck', async () => {
    return await request(server)
      .post('/healthcheck')
      .expect(200)
      .then((res) => expect(res.text).toEqual('👍'))
  })
})
