import { AppRouter } from '../types'
import Router from '@koa/router'
import { getUser, logout, verifyJwt } from '../auth'
import { prepareContext } from '../prepare-context'
import { resetPassword } from '../auth/reset-password'
import {
  createFirebaseUser,
  saveUserDetails,
  updateUser
} from '../user/index.js'

export const router = new Router() as AppRouter

router.prefix('/auth')

router.post(
  '/register/:role',
  prepareContext,
  createFirebaseUser,
  saveUserDetails
)
router.post('/login', prepareContext, verifyJwt, getUser)
router.post('/update-profile', prepareContext, verifyJwt, getUser, updateUser)
router.get('/logout', prepareContext, verifyJwt, logout)

router.post('/reset-password', prepareContext, getUser, resetPassword)
