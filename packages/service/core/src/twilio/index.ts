export { createClient, createEmailClient } from './client'
export { createService } from './create-service'
export { lookupPhoneNumber } from './lookup-phone'

// TODO: remove these and use the middleware instead.
export { sendOTP, confirmOTP } from './verify-phone'

export {
	requestPhoneVerification as sendOTPMiddleware,
	confirmPhoneVerification as confirmOTPMiddleware,
} from './otp'
