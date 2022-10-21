<script>
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";

    const options = {
        //rewind: true,
        type: "loop",
        autoplay: true,
        perPage: 3,
        perMove: 1,
        interval: 3000,
        speed: 800,
        gap: "1rem",
        direction: "rtl",
        breakpoints: {
            1200: {
                perPage: 2,
            },
            800: {
                perPage: 1,
            },
        },
        arrows: false,
        pagination: false,
        easing: "linear",
    };

    const webinarData = [
        {
            title: "An Educational Journey with Dale Jackson",
            link: "https://youtube.com/embed/hQRyEkx_J94",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/edu_webinar_f52625a71a.webp",
        },
        {
            title: "Stress management with Libby Edmonds",
            link: "https://youtube.com/embed/wQN6VKoDkgc",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/management_webinar_61013690bf.webp",
        },
        {
            title: "Holistic wellness with Claudia Pescivolo",
            link: "https://youtube.com/embed/OSDx62h6Gpk",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/wellness_webinar_1bba8b0866.webp",
        },
        {
            title: "The big interview with Kim Hatchuel ",
            link: "https://youtube.com/embed/HDQXwqzEA5U",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/hatchul_webinar_a9e21ad314.webp",
        },
        {
            title: "Building resilience with Kim Forbes",
            link: "https://www.youtube.com/embed/dFSZPxwBTGc",
            img: "https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/kim_webinar_2de6caf1cf.webp",
        },
    ];
</script>

<div class="container">
    <div class="row grey-grad big-gap">
        <h2 class="text-center text-blue">Webinars</h2>

        <Splide {options} aria-label="webinar carousel">
            {#each webinarData as webinar}
                <SplideSlide>
                    <div class="p-2">
                        <div class="frame-wrapper">
                            <a href={webinar.link} target="_blank" rel="noopener noreferrer">
                                <img
                                    class="img-fluid p-1"
                                    src={webinar.img}
                                    alt="webinar Thumbnail"
                                />
                            </a>
                            <p class="text-white text-start p-1">
                                {webinar.title}
                            </p>
                        </div>
                    </div>
                </SplideSlide>
            {/each}
        </Splide>
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
