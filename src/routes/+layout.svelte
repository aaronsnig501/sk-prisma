<script lang="ts">
  import '@picocss/pico'
  import { browser } from "$app/environment"
  import "$lib/i18n"
  import { locale, waitLocale } from "svelte-i18n"
  import type { LayoutLoad } from "./$types"
  import { _, locales, isLoading } from "svelte-i18n"

  let userLanguage: string = "en"

  function handleLocaleChange(event: any) {
    event.preventDefault();
    userLanguage = event?.target?.value
    $locale = userLanguage
  }

  export const load: LayoutLoad = async () => {
    if (browser) {
      locale.set(window.navigator.language)
    }
    await waitLocale()
  };
</script>

{#if !$isLoading}
<div class="container">
  <nav>
    <ul>
      <li><strong><a href="/">Articles</a></strong></li>
    </ul>

    <ul>
      <li>
        <select {userLanguage} on:change={handleLocaleChange}>
          {#each $locales as locale, i}
            <option value={locale}>{locale.toUpperCase()}</option>
          {/each}
        </select>
      </li>
    </ul>
    
  </nav>

  <slot />
</div>
{:else}
Please wait...
{/if}