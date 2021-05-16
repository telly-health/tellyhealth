import Router from '@koa/router'
import { AppRouter } from './../types'

const router = new Router() as AppRouter

router.get('/healthcheck', (ctx) => {
  ctx.body = '👍'
})

export { router as authRouter } from './auth'
export { router as otpRouter } from './otp'
export { router as userRouter } from './user'
export default router
