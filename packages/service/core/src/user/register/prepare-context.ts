import { Next } from "koa";
import { firebaseAdmin, firebase, sendgrid } from "../../clients";
import { RegistrationContext } from "./types";

export async function prepareContext(ctx: RegistrationContext, next: Next) {
  ctx.services = {
    auth: firebaseAdmin.auth(),
    db: firebase.firestore(),
    sendgrid
  }

  await next()
}