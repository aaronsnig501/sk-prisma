<script lang="ts">
	import type { PageData } from './$types'
  import { _ } from "svelte-i18n"

	export let data: PageData
	$: ({ article } = data)
</script>

<form action="?/updateArticle" method="POST">
	<h3>{$_("article.edit.h3")}{article.title}</h3>
	<label for="title">{$_("articles.edit.form.label.title")}</label>
	<input type="text" id="title" name="title" value={article.title} />
	<label for="title">{$_("articles.edit.form.label.content")}</label>
	<textarea id="content" name="content" rows={5} value={article.content} />
	<button type="submit">{$_("articles.edit.form.button.edit")}</button>
</form>