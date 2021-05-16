import { beforeAll, afterAll, describe, it, expect } from '@jest/globals'
import request from 'supertest'
import { app } from '../../src/'
import { config } from '../../src/config'

let server
const port = config.get('port')

describe('Healthcheck Endpoint', () => {
  beforeAll(() => {
    server = app.listen(port)
  })

  afterAll(() => {
    if (server != null) server.close()
  })

  afterAll(() => {})
  it('GET /healthcheck', async () => {
    return await request(server)
      .post('/healthcheck')
      .expect(200)
      .then((res) => expect(res.text).toEqual('👍'))
  })
})
