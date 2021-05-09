import { AppRouter } from '../types'
import Router from '@koa/router'
import { prepareContext } from '../prepare-context'
import { verifyJwt } from '../auth'
import { confirmOTPMiddleware, sendOTPMiddleware } from '../twilio'

export const sendRoute = '/tele-health/otp/send'
export const confirmRoute = 'tele-health/otp/verify'
export const reminderRoute = 'tele-health/reminder'

export const router = new Router() as AppRouter

router.post('/otp/send', prepareContext, verifyJwt, sendOTPMiddleware)
router.post('/otp/receive', prepareContext, verifyJwt, confirmOTPMiddleware)
