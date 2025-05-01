<script>
    import Title from "$lib/Components/Title.svelte";
</script>

<svelte:head>
    <title>About | ThinkTeacher</title>
    <meta name="description" content="Read more about what ThinkTeacher is about." />
</svelte:head>

<Title prefix={false} title={"why <span class='text-logo-gold'>think</span>teacher"} />

<div class="container mb-4">
    <div class="row text-center mt-4 justify-content-center">
        <p class="fs-3 lh-base text-justify">
            <strong>ThinkTeacher</strong> is an online platform dedicated to growing, supporting and
            empowering educators and schools. Our platform provides access to <strong>benefits,
            educational opportunities, and professional networks</strong>. Each teacher plays a
            pivotal role in shaping hundreds of students. By investing in and uplifting the
            teaching profession and providing a georeferenced management tool to schools, we
            contribute to inspiring and equipping the next generation of South Africans.
        </p>

        <p class="fs-3 mt-4">
            “Education is the most powerful weapon you can use to change the world.” <br /> -
            <strong>Nelson Mandela.</strong>
        </p>

        <p class="fs-4 text-justify mt-4"><strong>ThinkTeacher: Supporting Teachers at Every Stage</strong></p>
        <p class="fs-4 text-justify">South Africa is home to a wealth of passionate educators—from fresh graduates
            eager to gain experience, to skilled teachers seeking new opportunities, and
            seasoned professionals ready to mentor or take on locum roles.</p>
        <p class="fs-4 text-justify">By creating a ThinkTeacher profile, educators gain access to a supportive
            community, professional development webinars, valuable resources, and a direct
            connection to our growing network of partner schools.</p>
        <p class="fs-4 text-justify"><strong>ThinkTeacher puts teachers first—because great teaching starts with great
            teachers.</strong></p>

        <div class="text-center mb-4 mt-4">
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
