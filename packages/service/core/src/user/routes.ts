import Router from '@koa/router'
import {} from 'twilio/lib/rest/autopilot/v1/assistant/modelBuild'
import { getUser } from '../auth/login.js'
import { verifyJwt } from '../auth/verify-jwt.js'
import { prepareContext } from '../prepare-context.js'
import {
  createFirebaseUser,
  response,
  saveUserDetails,
  verifyEmail
} from '../user/register/index.js'
import { updateUser } from './profile.js'
import { RegistrationRouter } from './register/types.js'

export const router: RegistrationRouter = new Router()

router.prefix('/user')

router.post(
  '/register/:role',
  prepareContext,
  createFirebaseUser,
  saveUserDetails,
  verifyEmail,
  response
)

router.post('/update-profile', prepareContext, verifyJwt, getUser, updateUser)
