import { Twilio } from 'twilio'
import { PhoneNumberInstance } from 'twilio/lib/rest/lookups/v1/phoneNumber'

export interface PhoneDetails {
	carrier: string
	countryCode: string
	nationalFormat: string
	e164Format: string
}

/** Convert an international phone number to a number formatted in the E.164 format.
 *
 * @param client {Twilio} Twilio Client
 * @param phoneNumber International phone number
 * @returns Promise<PhoneDetails> E.164 formatted number, country of origin and other details.
 */
export async function lookupPhoneNumber(
	client: Twilio,
	phoneNumber: string
): Promise<PhoneDetails> {
	const lookup: PhoneNumberInstance = await client.lookups
		.phoneNumbers(phoneNumber)
		.fetch()

	const {
		carrier,
		countryCode,
		nationalFormat,
		phoneNumber: e164Format,
	} = lookup

	const carrierName = carrier.name

	return {
		carrier: carrierName,
		countryCode,
		nationalFormat,
		e164Format,
	}
}
