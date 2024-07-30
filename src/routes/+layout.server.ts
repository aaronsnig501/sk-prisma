import { fail, redirect } from "@sveltejs/kit"
import type { PageServerLoad } from "./$types"
import { lucia } from "$lib/server/auth"

export const load: PageServerLoad = async ({ locals }) => {
  return { user: locals.user }
}
