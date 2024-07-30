import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { lucia } from "$lib/server/auth"

export const load: PageServerLoad = async (event) => {
  return {
    user: event.locals.user
  }
}
