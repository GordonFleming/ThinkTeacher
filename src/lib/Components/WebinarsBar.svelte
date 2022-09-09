<script>
    import Carousel from "@beyonk/svelte-carousel";

    const webinarData = [
        {
            title: "An Educational Journey with Dale Jackson",
            link: "https://youtube.com/embed/hQRyEkx_J94",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/media/edu_webinar_903fd2c4cb.webp",
        },
        {
            title: "Stress management with Libby Edmonds",
            link: "https://youtube.com/embed/wQN6VKoDkgc",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/media/management_webinar_3218ba2050.webp",
        },
        {
            title: "Holistic wellness with Claudia Pescivolo",
            link: "https://youtube.com/embed/OSDx62h6Gpk",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/media/wellness_webinar_2d54de6811.webp",
        },
        {
            title: "The big interview with Kim Hatchuel ",
            link: "https://youtube.com/embed/HDQXwqzEA5U",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/media/hatchul_webinar_30ba04ddf9.webp",
        },
        {
            title: "Building resilience with Kim Forbes",
            link: "https://www.youtube.com/embed/dFSZPxwBTGc",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/media/kim_webinar_fb2c5a6298.webp",
        },
    ];
</script>

<div class="container">
    <div class="row grey-grad big-gap">
        <h2 class="text-center text-blue">Webinars</h2>

        <Carousel duration={800} autoplay={2600} perPage={{ 1000: 3, 500: 1 }} dots={false}>
            {#each webinarData as webinar}
                <div class="p-2">
                    <div class="frame-wrapper">
                        <a href={webinar.link} target="_blank"
                            ><img
                                class="img-fluid p-1"
                                src={webinar.img}
                                alt="webinar Thumbnail"
                            /></a
                        >
                        <p class="text-white p-1">
                            {webinar.title}
                        </p>
                    </div>
                </div>
            {/each}
        </Carousel>
    </div>
</div>

<style>
    .frame-wrapper {
        background-color: var(--logo-grey);
        width: 100%;
        height: 100%;
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
    }
    img:hover {
        filter: opacity(75%);
    }
</style>
