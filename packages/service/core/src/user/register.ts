import { Next } from 'koa'
import { ContextAddons, StateAddons } from '../types'
import {
	GeoPoint,
	MedicalPractioner,
	MedicalSpecialization,
	Role,
} from '../db/models/User'
import { RouterContext } from '@koa/router'

export interface MedicalPractionerRegistrationForm {
	name: string
	email: string
	password: string
	phoneNumber: string
	location: GeoPoint
	languages: string[]
	specialization: MedicalSpecialization
	timezone: string
}

export type IndividualRegistrationForm = Omit<
	MedicalPractionerRegistrationForm,
	'specialization'
>

export type RegistrationForm =
	| IndividualRegistrationForm
	| MedicalPractionerRegistrationForm

// There are two steps to the registration process:
// Step 1: Create Firebase User.
// Step 2: Save user to Firebase
// We can split these into two middleware (if everything works as expected)

export async function register(
	ctx: RouterContext<StateAddons, ContextAddons>,
	next: Next
) {
	const { role } = ctx.params

	if (![Role.Individual, Role.MedicalPractioner].includes(role as Role)) {
		ctx.status = 400
		ctx.body = {
			message: `${role} provided is invalid, use one of ${Role.Individual} or ${Role.MedicalPractioner}`,
		}
	}

	let specialization
	const {
		name: displayName,
		email,
		password,
		phoneNumber,
		location,
		languages,
		timezone,
	} = ctx.request.body as RegistrationForm

	const { uid: authUid, emailVerified } = await ctx.services.auth.createUser({
		displayName,
		email,
		password,
		phoneNumber,
	})

	ctx.state.user = {
		name: displayName,
		email,
		emailVerified,
		phoneNumber,
		authUid,
		location,
		languages,
		timezone,
		phoneVerified: false,
	}

	if (role === Role.MedicalPractioner) {
		;(ctx.state.user as MedicalPractioner).specialization =
			ctx.request.body.specialization
	}

	const { id } = await ctx.services.db.collection('users').add(ctx.state.user)

	ctx.state.user.uid = id

	ctx.body = {
		message: 'User registration sucessful',
		user: {
			name: displayName,
			email,
			emailVerified,
			phoneNumber,
			uid: id,
			authUid,
		},
	}

	ctx.status = 200
}
