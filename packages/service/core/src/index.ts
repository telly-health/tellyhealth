// use a koa backend.

// auth0 + react + twilio

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import logger from 'koa-pino-logger'
import { AppContext } from './types'
import { authRouter, otpRouter } from './routes/'

firebase.initializeApp(config.get('firebase'))
const app = new Koa<AppContext>()

app.use(logger())
app.use(cors())
app.use(bodyParser())
app.use(helmet())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.use(otpRouter.routes())
app.use(otpRouter.allowedMethods())
