import {
  afterEach,
  describe,
  it,
  expect,
  jest,
  afterAll,
  beforeEach
} from '@jest/globals'
import { Server } from 'http'
import request from 'supertest'
import { app } from '../../src/'
import { config } from '../../src/config'

jest.setTimeout(20_000)
const port = config.get('server.port')
let server: Server

describe('Healthcheck Endpoint', () => {
  beforeEach(() => {
    server = app.listen(port)
  })

  afterEach((done) => {
    if (server != null) server.close(done)
  })

  afterAll(async () => {
    await new Promise((resolve) => setTimeout(() => resolve(true), 10000)) // avoid jest open handle error
  })

  it('GET /healthcheck', async () => {
    return await request(server)
      .get('/healthcheck')
      .expect(200)
      .then((res) => expect(res.text).toEqual('👍'))
  })
})
