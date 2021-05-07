import axios from 'axios'
import qs from 'qs'

export async function authorize (
  clientId: string,
  redirectUrl: string
): Promise<any> {
  const params = {
    response_type: 'code',
    redirect_uri: redirectUrl,
    client_id: clientId
  }
  const queryString = qs.stringify(params)
  const response = await axios.get(
		`https://zoom.us/oauth/authorize?${queryString}`
  )
  return response.data
}
