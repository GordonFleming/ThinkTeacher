<script>
    export let title;
    export let prefix = true;
</script>

<h1 class="mb-4 text-center font-exo">
    {#if prefix}
        <span class="think">think</span>teacher
    {/if}
    {@html title}
</h1>

<style>
    h1 {
        margin-top: 5rem;
    }
</style>
