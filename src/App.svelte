<script>
  import SvelteRouter from "svelte-router";
  import routes from "./route.js";

  function create(node) {
    const router = new SvelteRouter({
      target: node,
      mode: "history",
      routes
    });
  }
</script>

<style>

</style>

<div id="outer-container">
  <section id="upper-section" />
  <section id="main-section">
    <div use:create />
  </section>
  <section id="bottom-section" />
</div>
