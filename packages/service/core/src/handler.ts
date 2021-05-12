import ServerlessHttp from 'serverless-http'
import { app } from './index.js'

export const handler = ServerlessHttp(app, {
  state: {}
})
