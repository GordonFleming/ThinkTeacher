<script>
	export let data;
	export let scale;
	export let fill = "currentColor";
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 320 512"
	class="icon"
	style="fill: {fill}; height: {scale}em; width: auto;">{@html data}</svg
>

<style>
	.icon:hover {
		cursor: pointer;
	}
</style>
