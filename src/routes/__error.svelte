<script context="module">
    export function load({error, status}){
        return {
            props: {
                title: `${status}: ${error.message}`,
            }
        }
    }
</script>

<script>
    export let title;
</script>

<div class="container p-4 text-center">
    <h1>{title}</h1>
</div>