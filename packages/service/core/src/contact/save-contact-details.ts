import { RouterContext } from '@koa/router'
import { Next } from 'koa'
import { StateAddons, ContextAddons } from '../types'
import { ContactForm } from './types'

export async function saveContactDetails (
  ctx: RouterContext<StateAddons, ContextAddons>,
  next: Next
): Promise<void> {
  const contact = ctx.request.body as ContactForm

  try {
    const { id } = await ctx.services.db.collection('contact').add(contact)

    ctx.body = {
      id,
      message: 'Contact was saved successfully'
    }
    ctx.status = 200
  } catch (err) {
    ctx.body = err
    ctx.status = 500
  }

  await next()
}
