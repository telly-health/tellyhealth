import { AppRouter } from '../types'
import Router from '@koa/router'
import {
	getUser,
	logout,
	register,
	verifyJwt,
	updateProfile,
} from '../firebase/'
import { prepareContext } from '../prepare-context'
import { resetPassword } from '../firebase/reset-password'

const router = new Router() as AppRouter

router.post('/register', prepareContext, register)
router.post('/login', prepareContext, verifyJwt, getUser)
router.post('/update-profile', prepareContext, verifyJwt, updateProfile)
router.get('/logout', prepareContext, verifyJwt, logout)

router.post('/reset-password', prepareContext, resetPassword)
