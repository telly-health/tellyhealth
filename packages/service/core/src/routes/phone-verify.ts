export const sendRoute = '/tele-health/otp/send'
export const confirmRoute = 'tele-health/otp/verify'
export const reminderRoute = 'tele-health/reminder'

import { AppRouter } from '../types'
import Router from '@koa/router'
import { prepareContext } from '../prepare-context'
import { verifyJwt } from '../firebase'
import { confirmOTPMiddleware, sendOTPMiddleware } from '../twilio'

const router = new Router() as AppRouter

router.post('/otp/send', prepareContext, verifyJwt, sendOTPMiddleware)
router.post('/oto/receive', prepareContext, verifyJwt, confirmOTPMiddleware)
