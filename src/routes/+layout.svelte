<script lang="ts">
  import '@picocss/pico'
  import { browser } from "$app/environment"
  import "$lib/i18n"
  import { locale, waitLocale } from "svelte-i18n"
  import type { LayoutLoad } from "./$types"
	import { isLocaleLoaded } from '$lib/i18n';
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
  {#if $isLocaleLoaded}
  <hgroup>
    <h1><a href="/">{$_("layout.hgroup.h1")}</a></h1>
    <h2>{$_("layout.hgroup.h2")}</h2>
  </hgroup>

  <select {userLanguage} on:change={handleLocaleChange}>
    {#each $locales as locale, i}
      <option value={locale}>{locale.toUpperCase()}</option>
    {/each}
  </select>
  {:else}
    <div class="container__content">Locale initializing...</div>
  {/if}

  <slot />
</div>
{:else}
Please wait...
{/if}