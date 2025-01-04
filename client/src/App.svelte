<script lang="ts">
  import { onMount } from 'svelte';
  import Login from "./lib/Login.svelte";
  import Bar from "./lib/Bar.svelte";
  import Bottom from "./lib/Bottom.svelte";
  import Library from "./lib/Library.svelte";
  import FileUpload from './lib/FileUpload.svelte';

  let loggedIn = false;

  // Function to update loggedIn state
  const setLoggedIn = (state: boolean) => {
    loggedIn = state;
  };

  // Check if there's a token in localStorage on mount
  onMount(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loggedIn = true;
    }
  });

  // TODO Now, i need a way to get the current amount of tokens that the user has, and as well as display that somehow through a reactive element, and also having middleware that will deduct an

</script>

<main>
  {#if !loggedIn}
    <Login {loggedIn} {setLoggedIn} />
  {:else}
    <Bar />
    <Library />
    <Bottom />
    <FileUpload></FileUpload>
  {/if}
</main>
