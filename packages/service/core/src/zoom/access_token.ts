import axios, { AxiosResponse } from 'axios'

export interface ZoomAccessTokenRequest {
	grant_type: string
	code: string
	redirect_uri: string
}

export interface ZoomTokenResponse {
	access_token: string
	token_type: 'Bearer'
	refresh_token: string
	expires_in: number
	scope: string
}

export async function token(
	authorizationCode: string,
	clientId: string,
	clientSecret: string,
	redirectUrl: string
): Promise<ZoomTokenResponse> {
	const authorizationKey = Buffer.from(
		`${clientId}:${clientSecret}`,
		'base64'
	).toString()

	const options = {
		headers: {
			Authorization: `Basic ${authorizationKey}`,
		},
	}

	const body: ZoomAccessTokenRequest = {
		grant_type: 'authorization_code',
		code: authorizationCode,
		redirect_uri: redirectUrl,
	}

	const response: AxiosResponse<ZoomTokenResponse> = await axios.post(
		'https://zoom.us/oauth/token',
		body,
		options
	)

	return response.data
}
