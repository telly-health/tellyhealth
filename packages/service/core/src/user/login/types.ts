import { RouterContext } from '@koa/router'
import admin from 'firebase-admin'

export interface LoginRequest {
  email: string
  password: string
}

export interface Services {
  auth: admin.auth.Auth
}

export interface AuthenticatedUser {
  uid: string
  accessToken: string
  name: string
  phoneNumber: string
}

export interface ResponsePayload {
  message: string
  accessToken: string
}

export interface ErrorResponse {
  message: string
}

export interface StateAddons {
  user: AuthenticatedUser
}

export interface ContextAddons {
  services: Services
  request: {
    body: LoginRequest
  }
  body?: ResponsePayload | ErrorResponse
}

export type LoginContext = RouterContext<StateAddons, any>
