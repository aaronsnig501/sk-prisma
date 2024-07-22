import { fail } from '@sveltejs/kit';

export async function GET({ url }) {
  const term = url.searchParams.get("term")

  const articles = await prisma.article.findMany({
    where: {
      OR: [
        { title: { contains: term }, },
        { content: { contains: term } }
      ]
    }
  })

  return new Response(JSON.stringify(articles))
}