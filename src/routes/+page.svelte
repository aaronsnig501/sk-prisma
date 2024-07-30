<script lang="ts">
  import type { PageData } from "./$types"
  import { _ } from "svelte-i18n"

  export let data: PageData

  $: ({ articles, user } = data)

  let searchTerm = ""

  async function handleSearchTermChange() {
    const response = await fetch(`?/filterArticles&term=${searchTerm}`)
    const data = await response.json()
    articles = data
  }
</script>

<div class="grid">
  <div>
    <h2>{$_("articles.list.h2")}</h2>
    <input 
      bind:value={searchTerm} 
      on:input={handleSearchTermChange}
      type="search" 
      name="search" 
      placeholder={$_("articles.list.search.input.placeholder")}
      aria-label={$_("articles.list.search.input.aria_label")} />
    {#each articles as article}
      <article>
        <header>{article.title}</header>
        <p>{article.content}</p>
        {#if user}
        <form action="?/deleteArticle&id={article.id}" method="POST">
          <button type="submit" class="outline secondary">{$_("articles.list.article.delete_button")}</button>
          <a href="/{article.id}" role="button" class="outline contrast" style="width: 100%">
            {$_("articles.list.article.edit_button")}
          </a>
        </form>
      {/if}
      </article>
    {/each}
  </div>

  {#if user}
  <form action="?/createArticle" method="POST">
    <h3>{$_("articles.new.h3")}</h3>
    <label for="title">{$_("articles.new.form.label.title")}</label>
    <input type="text" id="title" name="title" />
    <label for="content">{$_("articles.new.form.label.content")}</label>
    <textarea id="content" name="content" rows={5} />
    <button type="submit">{$_("articles.new.form.button.create")}</button>
  </form>
  {/if}
</div>
