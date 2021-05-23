import { AppRouter } from '../types'
import Router from '@koa/router'
import { getUser, logout, sendEmailVerificationLink, verifyJwt } from '../auth'
import { prepareContext } from '../prepare-context'
import { resetPassword } from '../auth/reset-password'
import { createFirebaseUser, saveUserDetails, updateUser } from '../user/index'
import { sendLoginEmail } from '../auth/login-with-email'

export const router = new Router() as AppRouter

router.prefix('/auth')

router.post(
  '/register/:role',
  prepareContext,
  createFirebaseUser,
  saveUserDetails
)

router.post('/login/email', prepareContext, sendLoginEmail)
router.post('/login', prepareContext, verifyJwt, getUser)

router.post('/verify-email', prepareContext, sendEmailVerificationLink)

router.post('/update_profile', prepareContext, verifyJwt, getUser, updateUser)
router.get('/logout', prepareContext, verifyJwt, logout)

router.post('/reset-password', prepareContext, getUser, resetPassword)
