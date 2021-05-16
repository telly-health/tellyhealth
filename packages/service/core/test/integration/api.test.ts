import {
  describe,
  jest,
  it,
  expect,
  beforeEach,
  beforeAll,
  afterAll
} from '@jest/globals'
import { Server } from 'http'
import request from 'supertest'
import { app } from '../../src/'
import { config } from '../../src/config'
import { clearFirestoreData, clearUserAccounts } from './helpers'

jest.setTimeout(40_000)
let server: Server
const port = config.get('server.port')

describe('app', () => {
  beforeAll((done) => {
    server = app.listen(port, done)
  })

  afterAll((done) => {
    if (server != null) {
      server.close(done)
    }
  })

  beforeEach(async () => {
    await clearUserAccounts()
    return await clearFirestoreData()
  })

  it('POST /auth/register/MedicalPractioner', async () => {
    const body = {
      name: 'Gabrielle Maguire',
      email: 'GabrielleMaguire@yahoo.com',
      password: 'a!123456',
      phoneNumber: '+61 491 570 156',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    }

    const expected = {
      message: 'User registration sucessful',
      user: {
        name: 'Gabrielle Maguire',
        email: 'GabrielleMaguire@yahoo.com',
        emailVerified: false,
        phoneNumber: '+61 491 570 156',
        uid: expect.any(String),
        authUid: expect.any(String)
      }
    }

    return await request(server)
      .post('/auth/register/MedicalPractioner')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then((response) => {
        const actual = JSON.parse(response.text)
        return expect(actual).toEqual(expected)
      })
  })

  it('POST /auth/register/Patient', async () => {
    const body = {
      name: 'Lily Farrow',
      email: 'lil_sparrow@outlook.com',
      password: 'a!123456',
      phoneNumber: '+61 491 570 158',
      location: { latitude: 33.8688, longitude: 151.2093 },
      languages: ['English', 'French', 'Japanese'],
      timezone: 'Australia/Sydney'
    }

    const expected = {
      message: 'User registration sucessful',
      user: {
        name: 'Lily Farrow',
        email: 'lil_sparrow@outlook.com',
        emailVerified: false,
        phoneNumber: '+61 491 570 158',
        uid: expect.any(String),
        authUid: expect.any(String)
      }
    }

    return await request(server)
      .post('/auth/register/Patient')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then((response) => {
        const actual = JSON.parse(response.text)
        return expect(actual).toEqual(expected)
      })
  })
})
