import ServerlessHttp from 'serverless-http'
import { app } from './index'

export const handler = ServerlessHttp(app, {
  state: {}
})
