import { Next } from 'koa'
import { AppContext } from './types'
import axios, { AxiosError } from 'axios'

export async function errorHandler (ctx: AppContext, next: Next) {
  try {
    await next()
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const { data: payload, status, statusText } = (e).response
    }
  }
}
