export async function GET({ url }) {
  const pageSize = 10
  const term = url.searchParams.get("term")
  const pageNumber = url.searchParams.get("pageNumber")

  if (term) {
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

  if (pageNumber) {
    const articles = await prisma.article.findMany({
      skip: pageSize * Number(pageNumber),
      take: pageSize
    })

    return new Response(JSON.stringify(articles))
  }
}
