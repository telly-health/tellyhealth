import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import { AppContext } from './types.js'
import { config } from './config.js'
import { router as userRouter } from './user/index.js'

const app = new Koa<AppContext>()

app.use(cors())
app.use(bodyParser())
app.use(helmet())

app.use(userRouter.routes()).use(userRouter.allowedMethods())

const port = config.get('server.port')
if (port != null) {
  app.listen(port, () => {
    console.log('telly-health API has started on port', port)
  })
}
