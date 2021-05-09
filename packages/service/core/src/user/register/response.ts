import { User } from '../../db/models'
import { StateAddons } from '../../types'
import { RegistrationContext } from './types'

export async function response(ctx: RegistrationContext): Promise<void> {
  const emailVerificationLink = (ctx.state as StateAddons).emailVerificationLink

  const { name, email, emailVerified, phoneNumber, authUid, uid } = ctx.state
    .user as User

  ctx.body = {
    message: 'User registration sucessful',
    user: {
      name,
      email,
      emailVerificationLink,
      emailVerified,
      phoneNumber,
      uid,
      authUid
    }
  }

  ctx.status = 200
}
