import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { fail, redirect } from "@sveltejs/kit"
import { lucia } from "$lib/server/auth"

export const load: PageServerLoad = async () => {
  return {
    articles: await prisma.article.findMany({
      take: 10
    }),
  }
}

export const actions: Actions = {
  createArticle: async ({ request, locals }) => {
    const { title, content } = Object.fromEntries(await request.formData()) as {
      title: string,
      content: string
    }

    try {
      await prisma.article.create({
        data: {
          userId: locals.user.id,
          title, 
          content,
        }
      })
    } catch (err) {
      console.log(err)
      return fail(500, { message: "Could not create the article" })
    }

    return {
      status: 201,
    }
  },

  deleteArticle: async ({ url }) => {
    const id = url.searchParams.get("id")
    if (!id) {
      return fail(400, { message: "Invalid request" })
    }

    try {
      await prisma.article.delete({
        where: {
          id: Number(id)
        }
      })
    } catch (err) {
      console.log(err)
      return fail(500, {
        message: "Something went wrong deleting your article"
      })
    }
    return {
      status: 200,
    }
  },

  logout: async ({ locals, cookies }) => {
    if (!locals.session) {
      return fail(401)
    }

    await lucia.invalidateSession(locals.session.id)
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    })
    redirect(302, "/")
  }
}
