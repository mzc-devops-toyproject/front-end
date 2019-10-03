<script>
  import SvelteRouter from "svelte-router";

  export let to;

  const pushUrl = event => {
    SvelteRouter.push(to);
  };
</script>

<style>
  .link {
    display: inline-block;
    cursor: pointer;
  }
</style>

<span on:click={pushUrl} class="link">
  <slot>Link</slot>
</span>
