import {
  describe,
  jest,
  it,
  expect,
  beforeEach,
  afterEach
} from '@jest/globals'
import supertest from 'supertest'
import app from '../../src'
import { clearFirestoreData, clearUserAccounts } from './helpers'

const request = supertest(app)

describe('app', () => {
  beforeEach(async () => {
    return await Promise.all([clearUserAccounts(), clearFirestoreData()])
  })
  afterEach(async () => {
    return await app.close()
  })

  it('POST /user/register/MedicalPractioner', async () => {
    const body = {
      name: 'Gabrielle Maguire',
      email: 'GabrielleMaguire@yahoo.com',
      password: 'a!123456',
      phoneNumber: '+61 491 570 156',
      specialization: 'Neurology',
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

    return await request
      .post('/user/register/MjedicalPractioner')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(body)
      .expect(200)
      .then((response) => {
        const actual = JSON.parse(response.text)
        return expect(actual).toEqual(expected)
      })
  })

  it('POST /user/register/Patient', async () => {
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

    return await request
      .post('/user/register/Patient')
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
