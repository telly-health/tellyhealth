import * as twilio from 'twilio'
import { ServiceInstance } from 'twilio/lib/rest/verify/v2/service'

// A Twilio Service can be created on the Twilio verify console UI

export async function createService(
  client: twilio.Twilio,
  serviceName: string
): Promise<ServiceInstance> {
  return await client.verify.services.create({
    friendlyName: serviceName
  })
}
