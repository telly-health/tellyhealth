import axios, { AxiosResponse } from 'axios'

export interface TokenRevokeResponse {
  status: string
}

export async function revokeToken (
  clientId: string,
  clientSecret: string,
  token: string
): Promise<TokenRevokeResponse> {
  const authorization = Buffer.from(
		`${clientId}:${clientSecret}`,
		'base64'
  ).toString()

  const options = {
    headers: {
      Authorization: `Basic ${authorization}`
    }
  }

  const response: AxiosResponse<TokenRevokeResponse> = await axios.get(
		`https://zoom.us/oauth/revoke?token=${token}`,
		options
  )

  return response.data
}
