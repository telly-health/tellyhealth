import Koa from 'koa'
// import * as swaggerUi from 'koa2-swagger-ui'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
// import yamljs from 'yamljs'
import { AppContext } from './types'
import defaultRouter, { authRouter, otpRouter } from './routes/index'
import { config } from './config'
import { Server } from 'http'

export const app = new Koa<AppContext>()

// const { koaSwagger } = swaggerUi

// const spec = yamljs.load('./openapi.yaml')

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
app.use(authRouter.routes())
app.use(otpRouter.routes())

// app.use(
//   koaSwagger({
//     routePrefix: '/swagger', // host at /swagger instead of default /docs
//     swaggerOptions: {
//       spec // example path to json
//     }
//   })
// )

const port = config.get('server.port')
let server: Server | undefined

if (port !== null && process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    console.log('telly-health API has started on port', port)
  })
}

export default server
