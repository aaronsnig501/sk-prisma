import { browser } from "$app/environment"
import { derived } from "svelte/store"
import { init, register, locale } from "svelte-i18n"

const defaultLocale = "en"

register("en", () => import("./lang/en.json"))
register("pt", () => import("./lang/pt.json"))

init({
  fallbackLocale: defaultLocale,
  initialLocale: browser ? window.navigator.language : defaultLocale
})

export const isLocaleLoaded = derived(locale, ($locale) => typeof $locale === "string")