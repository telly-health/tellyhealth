import { AppRouter } from '../types'
import Router from '@koa/router'
import { getUser, logout, register, verifyJwt, updateProfile } from '../auth'
import { prepareContext } from '../prepare-context'
import { resetPassword } from '../auth/reset-password'

export const router = new Router() as AppRouter

router.prefix('/auth')

router.post('/register', prepareContext, register)
router.post('/login', prepareContext, verifyJwt, getUser)
router.post(
	'/update-profile',
	prepareContext,
	verifyJwt,
	getUser,
	updateProfile
)
router.get('/logout', prepareContext, verifyJwt, logout)

router.post('/reset-password', prepareContext, getUser, resetPassword)
