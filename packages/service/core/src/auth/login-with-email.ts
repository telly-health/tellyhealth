import { AppContext } from '../types'

const isTest = process.env.NODE_ENV === 'test'

export async function sendLoginEmail (ctx: AppContext): Promise<void> {
  const { email } = ctx.request.body
  try {
    const url = await ctx.services.auth.generateSignInWithEmailLink(email, {
      url: 'https://tellyhealth.com/verify'
    })

    // await ctx.services.sendgrid.send({
    //   from: { email: 'noreply@telly.health' },
    //   // set this to your email in the .env.test.local
    //   // this ensures that emails will be sent to your email
    //   to: { email: process.env.TEST_EMAIL as string },
    //   subject: 'Verify your email',
    //   content: [
    //     {
    //       type: 'text',
    //       value: `Welcome to telly.health, please verify your email by clicking on ${url}`
    //     }
    //   ],
    //   mailSettings: {
    //     sandboxMode: {
    //       enable: isTest
    //     }
    //   }
    // })

    if (isTest) {
      ctx.body = {
        url,
        message: 'Created an email sign in link'
      }

      ctx.status = 200
    }
  } catch (e) {
    console.error(e)

    ctx.body = {
      message: 'Could not generate email link'
    }

    ctx.status = 400
  }
}
