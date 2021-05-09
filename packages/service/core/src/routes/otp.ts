import { AppRouter } from '../types'
import Router from '@koa/router'

export const reminderRoute = 'tele-health/reminder'

export const router = new Router() as AppRouter

// router.post('/otp/send', prepareContext, verifyJwt, sendOTPMiddleware)
// router.post('/otp/receive', prepareContext, verifyJwt, confirmOTPMiddleware)
