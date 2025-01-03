<script>
  import Bar from "./lib/Bar.svelte";
  import Bottom from "./lib/Bottom.svelte";
  import Library from "./lib/Library.svelte";
  import Login from "./lib/Login.svelte";

  let loggedIn = false;

</script>

<main>
{#if !loggedIn}
  <Login></Login>
{:else}
  <Bar></Bar>

  <Library></Library>

  <Bottom></Bottom>


{/if}
</main>

<style>

</style>
