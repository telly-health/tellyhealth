import { AppRouter } from '../types'
import Router from '@koa/router'
import { getUser, logout, verifyJwt } from '../auth'
import { prepareContext } from '../prepare-context'
import { resetPassword } from '../auth/reset-password'
import { updateUser } from '../user/index'

export const router = new Router() as AppRouter

router.prefix('/auth')

router.post('/login', prepareContext, verifyJwt, getUser)
router.post('/update-profile', prepareContext, verifyJwt, getUser, updateUser)
router.get('/logout', prepareContext, verifyJwt, logout)

router.post('/reset-password', prepareContext, getUser, resetPassword)
