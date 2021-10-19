<script>

</script>

<svelte:head>
	<title>Webinars</title>
    <link rel="stylesheet" href="https://cdn.plyr.io/3.6.9/plyr.css" />
</svelte:head>

<div class="container p-5">
    <div class="row text-center justify-content-center">
        <h1 class="mb-5">Webinars</h1>
        <div class="col-lg-6 col-md-12 col-sm-12">
            <div class="frame-wrapper">
                <iframe src="https://www.youtube.com/embed/7KASmBylN4o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</div>

<style>
    iframe{
        max-width: 800px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .frame-wrapper{
        background-color: var(--logo-grey);
        width: 100%;
        height: 320px;
        padding: 2%;
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
        position: relative;
    }
</style>