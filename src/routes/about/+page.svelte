<script>
    import Icon from "$lib/Icons/icon.svelte";
    import { linkedin } from "$lib/Icons/icons";
    import Title from "$lib/Components/Title.svelte";
</script>

<svelte:head>
    <title>About | ThinkTeacher</title>
    <meta name="description" content="Read more about what ThinkTeacher is about." />
</svelte:head>

<Title prefix={false} title={"why <span class='text-logo-gold'>think</span>teacher"} />

<div class="container mb-4">
    <div class="row text-center mt-4 justify-content-center">
        <p class="fs-3 lh-base">
            ThinkTeacher is an online portal dedicated to the inspiring teachers of South Africa,
            providing access to benefit options, educational opportunities and nurturing networks.
            Each teacher cares for a few hundred odd students or learners. If we can care for and
            promote the teaching profession, we can inspire the youth of South Africa.
        </p>
        <p class="fs-3 mt-4">
            “Education is the most powerful weapon you can use to change the world.” <br /> -
            <strong>Nelson Mandela.</strong>
        </p>
        <div class="row">
            <Title prefix={false} title={"who we are"} />

            <div class="col-sm-12 col-md-4">
                <img
                    class="img-fluid about-img"
                    src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Bridget_new_91ee1bd4f8.webp?updated_at=2022-12-02T09:25:55.009Z"
                    alt="profile_img"
                />
                <h4>Bridget Fleming</h4>
                <a
                    data-sveltekit-preload-data
                    href="/about/bridget"
                    class="btn btn-sm bg-gold shadow cta text-black">Read more</a
                >
            </div>
            <div class="col-sm-12 col-md-4">
                <img
                    class="img-fluid about-img"
                    src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Zani_new_007b9c077f.webp?updated_at=2022-12-02T09:25:54.342Z"
                    alt="profile_img"
                />
                <h4>Zanele Masuku</h4>
                <a
                    data-sveltekit-preload-data
                    href="/about/zani"
                    class="btn btn-sm bg-gold shadow cta text-black">Read more</a
                >
            </div>
            <div class="col-sm-12 col-md-4">
                <img
                    class="img-fluid about-img"
                    src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/Gillian_ef23156492.webp?updated_at=2022-12-02T09:25:54.041Z"
                    alt="profile_img"
                />
                <h4>Gillian Doig</h4>
                <a
                    data-sveltekit-preload-data
                    href="/about/gill"
                    class="btn btn-sm bg-gold shadow cta text-black">Read more</a
                >
            </div>
        </div>

        <div class="text-center mb-4 mt-5">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video controls playsinline>
                <source
                    src="https://res.cloudinary.com/splyce/video/upload/v1662746574/ThinkTeacher/THINK_TEACHER__WHO_we_are_and_WHAT_we_do_ahyxiz.mp4#t=3"
                    type="video/mp4"
                />
            </video>
            <h4>
                View the video above to learn more about <span class="text-logo-gold">think</span
                >teacher...
            </h4>
            <p class="fs-3 mt-4">
                ThinkTeacher&#39;s vision is to empower teachers to thrive in their role as
                innovative and sustainable change agents in and for South Africa.
            </p>
        </div>
    </div>
</div>

<style>
    .about-img {
        max-height: 300px;
        width: auto;
        margin-bottom: 1rem;
        border-radius: 10px;
    }
</style>
