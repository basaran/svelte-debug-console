<!------------------------------------------------- definition ----;

          ,\       Component: Debug.svelte
         \\\,_
          \` ,\    Patches default debug.js instance to mirror any
     __,.-" =__)   debug calls onto a svelte store.
   ."        )
,_/   ,    \/\_    Useful for displaying data on dashboards.
\_|    )_-\ \_-`   Exports { Debug, debugStore, storePatch}
   `-----` `--`

|-----------------------------------------------------------------┐
                                                               └-->
<script>
import { storePatch, debugStore } from "./lib";
import { onMount, onDestroy, afterUpdate } from "svelte";

let console;
/*scrollable area binding*/

export let discard = false;
/*disables modifications on destroy*/

onMount(() => {
    storePatch.enable();
});

onDestroy(() => {
    if (discard) storePatch.disable();
});

afterUpdate(() => {
    console.scrollTo(0, console.scrollHeight);
});

$: consoleDisplay = $debugStore.join("\n");
</script>

<!---------------------------------------------------------------┐
                                                              └-->
{#if false}<slot />{/if}

<section class="svelte-debug-console" id="svelte-debug-console">
    <fieldset class="console" bind:this={console}>
        <legend>console</legend>
        <div
            spellcheck="false"
            class="consoleDisplay"
            contenteditable="true"
            bind:innerHTML={consoleDisplay} />
    </fieldset>
</section>

<!---------------------------------------------------------------┐
                                                              └-->
<style>
.console {
    height: 200px;
    overflow-y: auto;
}

.consoleDisplay {
    white-space: pre-wrap;
    border: none;
    font-family: Iosevka, Monospace;
    outline: none;
    -moz-outline-style: none;
    overflow-wrap: anywhere;
}
</style>
