import { Next } from 'koa'
import { AppContext } from './types'
import axios from 'axios'

export async function errorHandler(ctx: AppContext, next: Next): Promise<void> {
  try {
    await next()
  } catch (e) {
    if (axios.isAxiosError(e) && e.response != null) {
      const { data: payload, status, statusText } = e.response
      console.error({
        payload,
        status,
        statusText
      })
    } else {
      console.error(e)
    }
  }
}
