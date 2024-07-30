<script>
  import { enhance } from "$app/forms"
  import { _ } from "svelte-i18n"
</script>

<div>
  <h2>{$_("register.h2")}</h2>

  <form method="post" use:enhance>
    <div>
      <label for="email">{$_("register.form.email.label")}</label>
      <input type="email" name="email" />
    </div>
    <div>
      <label for="password">{$_("register.form.password.label")}</label>
      <input type="password" name="password" />
    </div>
    <p>{$_("register.form.p.signin")} <a href="/auth/login">{$_("register.form.p.link")}</a></p>
    <button>{$_("register.form.button.text")}</button>
  </form>
</div>
