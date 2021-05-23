export const event = {
  body: '{"name":"Lily Farrow","email":"lil_sparrow@outlook.com","password":"a!123456","phoneNumber":"+61 491 570 158","location":{"latitude":33.8688,"longitude":151.2093},"languages":["English","French","Japanese"],"timezone":"Australia/Sydney"}',
  resource: '/auth/register/{role}',
  path: '/auth/register/{role}',
  httpMethod: 'POST',
  isBase64Encoded: false,
  pathParameters: {
    role: 'Patient'
  },
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  requestContext: {
    accountId: '123456789012',
    resourceId: '123456',
    requestId: 'c6af9ac6-7b61-11e6-9a41-93e8deadbeef',
    path: '/auth/register/{role}',
    httpMethod: 'POST',
    apiId: '1234567890',
    protocol: 'HTTP/1.1'
  }
}
