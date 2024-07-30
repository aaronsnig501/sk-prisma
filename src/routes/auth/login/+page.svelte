<script>
  import { enhance } from "$app/forms"
  import { _ } from "svelte-i18n"
</script>

<div>
  <h2>{$_("login.h2")}</h2>

  <form method="post" use:enhance>
    <div>
      <label for="email">{$_("login.form.email.label")}</label>
      <input type="email" name="email" />
    </div>
    <div>
      <label for="password">{$_("login.form.password.label")}</label>
      <input type="password" name="password" />
    </div>
    <p>{$_("login.form.p.signin")} <a href="/auth/register">{$_("login.form.p.link")}</a></p>
    <button>{$_("login.form.button.text")}</button>
  </form>
</div>
