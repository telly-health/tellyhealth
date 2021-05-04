import axios, { AxiosResponse } from 'axios'
import qs from 'qs'
import { ZoomTokenResponse } from './access_token'

export async function refreshToken(
	clientId: string,
	clientSecret: string,
	refreshToken: string
): Promise<ZoomTokenResponse> {
	const params = qs.stringify({
		grant_type: 'refresh_token',
		refresh_token: refreshToken,
	})

	const authorization = Buffer.from(
		`${clientId}:${clientSecret}`,
		'base64'
	).toString()
	const options = {
		headers: {
			Authorization: `Basic ${authorization}`,
		},
	}

	const response: AxiosResponse<ZoomTokenResponse> = await axios.get(
		`https://zoom.us/oauth/token?${params}`,
		options
	)

	return response.data
}
