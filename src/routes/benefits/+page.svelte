<script>
    import Title from "$lib/Components/Title.svelte";

    export let data;

    let { benefits } = data;
</script>

<svelte:head>
    <title>Benefits</title>
    <meta name="description" content="View the many ThinkTeacher's great benefits!" />
</svelte:head>

<div class="container mb-5">
    <Title title={"benefits"} />

    <div class="row text-center justify-content-center">
        <h5 class="mb-5">
            Click on a benefit below to see what our partners can offer you as a ThinkTeacher member
        </h5>
        {#each benefits as benefit}
            <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
                <a href="benefits/{benefit.attributes.name}">
                    <div class="placeholder">
                        <img
                            class="img-fluid offer offer-img"
                            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/well_being_a72b443d32.webp"
                            alt="well being"
                        />
                    </div>
                </a>
                <h3 class="text-lowercase mt-3 text-blue">
                    <span class="text-logo-gold">think</span>{benefit.attributes.name.replace(
                        "_",
                        ""
                    )}
                </h3>
            </div>
        {/each}
    </div>
</div>

<!-- <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/well_being_a72b443d32.webp"
                alt="well being"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Wellbeing
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/travel_dedeab0486.webp"
                alt="travel"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Travel
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/health_d3dd30eed4.webp"
                alt="medical aid"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>MedicalAid
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/insurance_65016c0e82.webp"
                alt="invest"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Finance
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/legal_9c79c917bb.webp"
                alt="legal"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Legal
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/courses_d4d4152811.webp"
                alt="courses"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Courses
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/bookstore_2e3811bf76.webp"
                alt="books"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>BookStore
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/kia_car_2cea78c493.webp"
                alt="cars"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Wheels
    </h3>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/connectivity_5c27d7e7c1.webp"
                alt="Connect"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Connect
    </h3>
    <h5 class="text-blue">coming soon</h5>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/business_coach_443e1401ca.webp"
                alt="Connect"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Business
    </h3>
    <h5 class="text-blue">coming soon</h5>
</div>
<div class="col-sm-12 col-md-6 col-lg-4 mb-4">
    <a href="/benefits">
        <div class="placeholder">
            <img
                class="img-fluid offer offer-img"
                src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/jobs_7cacf0d38d.webp"
                alt="Connect"
            />
        </div>
    </a>
    <h3 class="text-lowercase mt-3 text-blue">
        <span class="text-logo-gold">think</span>Jobs
    </h3>
    <h5 class="text-blue">coming soon</h5>
</div> -->
