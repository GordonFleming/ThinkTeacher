<script>
    import { onMount } from 'svelte'
    import { name, surname } from '$lib/stores'

    let load = false
    onMount(() =>{  
        $name = localStorage.getItem("name");
        $surname = localStorage.getItem("surname");
        load = true
	})
</script>

{#if load}
    <div class="container mt-4">
        <img class="img-fluid" src="https://cdn.statically.io/og/Coming%20soon:%20{$name}%20{$surname}.jpg" alt="custom">
    </div>
{/if}
