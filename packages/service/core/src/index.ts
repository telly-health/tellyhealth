import Koa from 'koa'
import swaggerUi from 'koa2-swagger-ui'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import yamljs from 'yamljs'
import { AppContext } from './types.js'
import defaultRouter, {
  authRouter,
  otpRouter,
  userRouter
} from './routes/index.js'
import { config } from './config.js'

export const app = new Koa<AppContext>()

const { koaSwagger } = swaggerUi

const spec = yamljs.load('./openapi.yaml')

const UNPKG_SWAGGER_UI = 'cdnjs.cloudflare.com/ajax/libs/swagger-ui/3.46.0/'
const SELF = "'self'"

app.use(cors())
app.use(bodyParser())
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        baseUri: [SELF, UNPKG_SWAGGER_UI],
        defaultSrc: [SELF, UNPKG_SWAGGER_UI],
        styleSrc: [
          SELF,
          "'unsafe-inline'",
          UNPKG_SWAGGER_UI,
          'fonts.googleapis.com'
        ],
        fontSrc: [SELF, 'fonts.googleapis.com', 'fonts.gstatic.com'],
        scriptSrc: [SELF, "'unsafe-inline'", UNPKG_SWAGGER_UI],
        imgSrc: [SELF, 'data:', UNPKG_SWAGGER_UI]
      }
    }
  })
)

app.use(defaultRouter.routes())

app.use(userRouter.routes())
app.use(userRouter.allowedMethods())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.use(otpRouter.routes())
app.use(otpRouter.allowedMethods())

app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      spec // example path to json
    }
  })
)

const port = config.get('server.port')

// port is only configured for localhost
if (port !== null) {
  app.listen(port, () => {
    console.log('telly-health API has started on port', port)
  })
}
