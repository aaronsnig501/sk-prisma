import type { Handle, HandleServerError } from "@sveltejs/kit"
import { sequence } from "@sveltejs/kit/hooks"
import { locale } from "svelte-i18n"
import { lucia } from "$lib/server/auth"

const i18n: Handle = async({ event, resolve}) => {
  const lang = event.request.headers.get("accept-language")?.split(",")[0]

  if (lang) {
    locale.set(lang)
  }

  return resolve(event)
}

const auth: Handle = async({ event, resolve }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName)
  if (!sessionId) {
    event.locals.user = null
    event.locals.session = null
    return resolve(event)
  }

  const { session, user } = await lucia.validateSession(sessionId)
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id)
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie()
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })
  }

  event.locals.user = user
  event.locals.session = session
  return await resolve(event)
}

export const handle = sequence(i18n, auth)

export const handleError: HandleServerError = ({ error }) => {
  const message = "Error caught in [server-hooks]: " + (error as any)?.message
  console.error(message)
  return { message }
}
