import { AppRouter } from '../types'
import Router from '@koa/router'
import { prepareContext } from '../prepare-context'
import { createFirebaseUser, saveUserDetails } from '../user/index.js'

export const router = new Router() as AppRouter

router.prefix('/user')

router.post(
  '/register/:role',
  prepareContext,
  createFirebaseUser,
  saveUserDetails
)
