// use a koa backend.

// auth0 + react + twilio

import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import { AppContext } from './types.js'
import { authRouter, otpRouter } from './routes/index.js'
import { config } from './config.js'

const app = new Koa<AppContext>()

app.use(cors())
app.use(bodyParser())
app.use(helmet())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.use(otpRouter.routes())
app.use(otpRouter.allowedMethods())

const port = config.get('server.port')
if (port) {
	app.listen(port, () => {
		console.log('telly-health API has started on port', port)
	})
}
