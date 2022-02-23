<script>
    import Carousel from '@beyonk/svelte-carousel'

    export let webinarData
</script>

<div class="container">
    <div class="row grey-grad big-gap">
        <h2 class="text-center text-blue">Webinars</h2>
        
        <Carousel autoplay={2600} perPage={{1000: 3, 500: 1 }} dots={false}>
            {#each webinarData as webinar}
                <div class="p-2">
                    <div class="frame-wrapper">
                        <iframe src="{webinar.link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            {/each}
        </Carousel>
            
        
    </div>
</div>

<style>
    iframe{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        padding: 5px;

    }
    .frame-wrapper{
        position: relative;
        background-color: var(--logo-grey);
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 3px solid var(--logo-gold);

        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
</style>