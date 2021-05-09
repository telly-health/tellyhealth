import Router from '@koa/router'

import * as register from './register/index.js'
import * as otp from './otp/index.js'
import * as login from './login/index.js'

export const router = new Router<any, any>()

router.get(
  '/user/otp/send',
  otp.prepareContext,
  otp.verifyJwt,
  otp.findUser,
  otp.sendOtp,
  otp.response
)

router.post(
  '/user/otp/confirm',
  otp.prepareContext,
  otp.verifyJwt,
  otp.findUser,
  otp.confirmOtp,
  otp.response
)

router.post(
  '/user/register/:role',
  register.prepareContext,
  register.createFirebaseUser,
  register.saveUserDetails,
  register.verifyEmail,
  register.response
)

router.post('/user/login', login.prepareContext, login.login, login.response)
