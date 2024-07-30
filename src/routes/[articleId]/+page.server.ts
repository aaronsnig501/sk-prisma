import type { Actions, PageServerLoad } from "./$types"
import { prisma } from "$lib/server/prisma"
import { error, fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async (event) => {
	const getArticle = async () => {

		if (!event.locals.user) {
			return redirect(302, "/")
		}
		const article = await prisma.article.findUnique({
			where: { id: Number(event.params.articleId), },
		})
		if (!article) {
			throw error(404, "Article not found")
		}
		return article
	}

	return { article: await getArticle(), }
}

export const actions: Actions = {
	updateArticle: async (event) => {
		if (!event.locals.user) {
			return redirect(302, "/")
		}
		const { title, content } = Object.fromEntries(await event.request.formData()) as {
			title: string
			content: string
		}

		try {
			await prisma.article.update({
				where: { id: Number(event.params.articleId), },
				data: { title, content, },
			})
		} catch (err) {
			console.error(err)
			return fail(500, { message: "Could not update article" })
		}

		return { status: 200, }
	},
}