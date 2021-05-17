import { AppRouter } from '../types'
import Router from '@koa/router'
import { prepareContext } from '../prepare-context'
import { saveContactDetails } from '../contact/index.js'

export const router = new Router() as AppRouter

router.prefix('/contact')

router.post('/save', prepareContext, saveContactDetails)
