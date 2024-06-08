<script>
    import Logo from "$lib/Components/logo.svelte";
    import { goto } from "$app/navigation";
    import { afterUpdate } from "svelte";
    import { name } from "$lib/stores";
    import { Splide, SplideSlide } from "@splidejs/svelte-splide";
    import "@splidejs/svelte-splide/css";

    const options = {
        //rewind: true,
        type: "loop",
        autoplay: true,
        perPage: 4,
        perMove: 1,
        interval: 2600,
        speed: 600,
        gap: "1rem",
        breakpoints: {
            1500: {
                perPage: 4,
            },
            1200: {
                perPage: 3,
            },
            800: {
                perPage: 2,
            },
        },
        arrows: false,
        pagination: false,
        easing: "linear",
    };

    afterUpdate(() => {
        $name = localStorage.getItem("name");
    });
</script>

<svelte:head>
    <title>Home | ThinkTeacher</title>
    <meta
        name="description"
        content="ThinkTeacher is an online portal dedicated to the inspiring teachers of South Africa, providing access to benefit options, educational opportunities 
                and nurturing networks. ThinkTeacher's vision is to empower teachers to thrive in their role as innovative and sustainable change agents in and for South Africa."
    />
</svelte:head>


<header id="banner">
    <!-- Three words under each other, first is benefits, next support and then care nice and big and to the left -->
    <section id="banner-words">
        <h2>
            <span class="eh eh-b">benefits</span>
            <span class="eh eh-s">support</span>
            <span class="eh eh-c">care</span>
        </h2>
        <p class="eh-sml">by teachers for teachers</p>
    </section>
</header>
<!-- <div class="banner-all">
    <div class="bg-overlay" />
    <div class="bg-banner text-center">
        <Logo />
    </div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path
            class=""
            fill="var(--bg-banner)"
            d="M421.9,6.5c22.6-2.5,51.5,0.4,75.5,5.3c23.6,4.9,70.9,23.5,100.5,35.7c75.8,32.2,133.7,44.5,192.6,49.7
        c23.6,2.1,48.7,3.5,103.4-2.5c54.7-6,106.2-25.6,106.2-25.6V0H0v30.3c0,0,72,32.6,158.4,30.5c39.2-0.7,92.8-6.7,134-22.4
        c21.2-8.1,52.2-18.2,79.7-24.2C399.3,7.9,411.6,7.5,421.9,6.5z"
        />
    </svg>
</div> -->

<div class="container text-center mt-5">
    <div class="row">
        <div class="col-sm-12 col-md-6 d-flex bg-blue text-white rounded-3 px-3 py-1">
            <p class="fs-4 lh-base my-auto text-justify">
                Teacher wellbeing is a positive emotional state that combines the personal needs and
                expectations of both learners and their teachers. Teacher wellbeing and job
                satisfaction strongly influence teacher behaviour and are positively related to
                school and classroom climate and pupil achievement.
            </p>
        </div>
        <div class="col-sm-12 col-md-6">
            <img
                class="img-fluid rounded"
                style="max-height: 300px;"
                src="https://res.cloudinary.com/splyce/image/upload/v1668242850/ThinkTeacher/teachers6_lh2k7r.webp"
                alt="img"
            />
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
            <img
                class="img-fluid rounded"
                style="max-height: 300px;"
                src="https://res.cloudinary.com/splyce/image/upload/v1668244333/ThinkTeacher/teachers4_new_q5ujfl.webp"
                alt="img"
            />
        </div>
        <div class="col-sm-12 col-md-6 d-flex bg-gold text-white rounded-3 px-3 py-1">
            <p class="fs-4 lh-base my-auto text-justify">
                Teacher wellbeing has a significant impact on schools, teachers and students. Many
                of the negative effects of low wellbeing are well publicised, with stress or burnout
                being linked to attrition and the resulting teacher shortages worldwide. This has
                led to calls for teacher wellbeing to be taken seriously for the long-term
                sustainability of the profession.
            </p>
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-sm-12 col-md-6 d-flex bg-blue text-white rounded-3 px-3 py-1">
            <p class="fs-4 lh-base my-auto text-justify">
                When schools prioritise teacher wellbeing and help to ensure that teachers can
                flourish, this promotes better classroom climates and enables high quality teaching
                that leads to success for students, and consequently the school.
            </p>
        </div>
        <div class="col-sm-12 col-md-6">
            <img
                class="img-fluid rounded"
                style="max-height: 300px;"
                src="https://res.cloudinary.com/splyce/image/upload/v1669199557/ThinkTeacher/teachers_8_enc0ld.jpg"
                alt="img"
            />
        </div>
    </div>

    <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
            <img
                class="img-fluid rounded"
                style="max-height: 300px;"
                src="https://res.cloudinary.com/splyce/image/upload/v1668244333/ThinkTeacher/teachers7_new_zcr0hp.webp"
                alt="img"
            />
        </div>
        <div class="col-sm-12 col-md-6 d-flex bg-gold text-white rounded-3 px-3 py-1">
            <p class="fs-4 lh-base my-auto text-justify">
                Looking after your teachers’ wellbeing is one of the most important things you can
                do as a school community. The success of your school is dependent on the quality of
                instruction delivered by your teachers to your students; their wellbeing is crucial
                to ensuring that their teaching skills are effective and of a high quality.
            </p>
        </div>
    </div>
    <p class="fs-4 text-blue mt-4">
        <span class="think">think</span>teacher - by teachers for teachers.
    </p>
</div>

<div class="container mt-4 mb-5">
    {#if !$name}
        <div class="row mt-5">
            <div class="row justify-content-center">
                <h4 class="text-center fs-1 mb-4 col-md-6">
                    once-off fee, for life-long membership
                </h4>
            </div>
            <div class="col-sm-12 col-lg-4">
                <h4 class="fs-1 mt-2 text-center">
                    Actively teaching <strong>R360</strong>
                </h4>
            </div>
            <div class="col-sm-12 col-lg-4 mt-sm-4 text-center">
                <button
                    class="btn btn-lg bg-gold shadow-lg cta"
                    style="width: 300px;"
                    on:click={() => goto("/register")}
                    ><h4 style="color: black;">Become a member!</h4></button
                >
            </div>
            <div class="col-sm-12 col-lg-4">
                <h4 class="fs-1 mt-2 text-center">
                    Students and retired teachers <strong>R120</strong>
                </h4>
            </div>
            <h4 class="mt-5 text-center">Corporate sponsor a school and gift membership</h4>
        </div>
    {/if}

    <!-- Carousel of Webinars -->
    <!-- <WebinarsBar /> -->

    <div class="row grey-grad big-gap">
        <h2>Benefit Details:</h2>
        <div class="col-md-6 col-sm-12 benefit-list">
            <ul>
                <li class=" fw-bold">
                    Macmillan Teacher Campus: discounted courses from Early Learning to FET phase
                </li>
                <li class=" fw-bold">
                    Alexander Forbes Membership Scheme with a range of discounted products, and
                    access to dedicated financial advisors
                </li>
                <!-- <li class=" fw-bold">
                    Nedbank financial assistance, with the Karri School App and a range of financial
                    banking products for teachers
                </li> -->
                <li class=" fw-bold">
                    Kia Motors Membership Scheme, offering vehicles at cost plus 2% including a
                    five- year unlimited mileage warranty with financing through MFC
                </li>
                <li class=" fw-bold">
                    Legal advice and access to dedicated lawyers with Stephen May Attorney-at-Law
                </li>
            </ul>
        </div>
        <div class="col-md-6 col-sm-12 benefit-list">
            <ul>
                <li class=" fw-bold">
                    Cirrus Travel: specialised and discounted travel packages designed for teachers
                    during school holidays
                </li>
                <li class=" fw-bold">Exclusive Books (EB) book club</li>
                <li class=" fw-bold">
                    Wellbeing platform for life coaching, nutritional advice, bereavement and trauma
                    counselling
                </li>
                <li class=" fw-bold">
                    Regular webinars on a range of topics of interest to teachers
                </li>
                <li class=" fw-bold">Monthly newsletters with the latest ThinkTeacher benefits</li>
                <!-- <li class="list-group-item">
					More partners join us monthly to support the most noble of professions,
					teaching!
				</li> -->
            </ul>
        </div>
    </div>

    <div class="container text-center mb-4 grey-grad big-gap">
        <h2 class="mb-4">
            Why you should become a <span class="text-logo-gold">think</span>teacher member
        </h2>

        <!-- svelte-ignore a11y-media-has-caption -->
        <video controls playsinline>
            <source
                src="https://res.cloudinary.com/splyce/video/upload/v1662746574/ThinkTeacher/THINK_TEACHER__WHO_we_are_and_WHAT_we_do_ahyxiz.mp4#t=3"
                type="video/mp4"
            />
        </video>
    </div>

    <div class="row mt-5 big-gap justify-content-center p-3 logo-box">
        <Splide {options} aria-label="partners carousel">
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid mt-3"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_ROARRR_d380578528_f8a05a6049.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_Cirrus_Image_2_70004a2daf_8d211bdd99.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid mt-3"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_alex_forbes_62be1d48f7_3cfd9bd8c3.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_SGM_Logo_b251d32022_ac78ee1ee9.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_MTC_New_Logo_large_7ae60c9ecf_3e8f419fa5.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_exclusivebooks_779996b0af_dd9c921c21.jpeg"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid mt-3"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_kia_logo_16b0a03857_c412c2856c.webp"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za:443/strapi/cms/computer_Mania_ebec9c2f87.png"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
            <SplideSlide>
                <div class="slide-content">
                    <img
                        class="logo img-fluid"
                        src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/thumbnail_TTN_Medium_584ecd4de8.png"
                        alt="partner"
                    />
                </div>
            </SplideSlide>
        </Splide>
    </div>
</div>

<style>
    h2 {
        color: var(--logo-grey);
        font-size: 2.4em;
        text-align: center;
    }
    .benefit-list ul li {
        font-size: 1.3em;
        position: relative;
        padding: 1rem 0.3rem;
        color: #212529;
        text-decoration: none;
        background-color: transparent;
        border: 0 solid rgba(255, 255, 255, 0.2);
    }
    .benefit-list ul {
        /* list-style: square outside; */

        list-style-image: url("https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/m_favicon_08702889be_d8548d4c57.png");
    }
    /*
    .banner-all {
        position: relative;
    }
    .bg-banner {
        background-color: var(--bg-banner);
        height: 400px;
        padding-top: 5rem;
    }
    @media screen and (min-width: 1000px) {
        .bg-overlay {
            background-image: url("/shape-overly.png");
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
            opacity: 0.15;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            position: absolute;
        }
    }

    @media screen and (max-width: 1000px) {
        .bg-banner {
            height: 200px;
            padding-top: 2rem;
        }
    } */

    .btn-lg {
        padding: 2rem 1rem 1rem 1rem;
    }
    .logo {
        max-height: 120px;
        width: auto;
        /* -webkit-filter: grayscale(100%); */
        /* filter: grayscale(100%); */
    }
    .logo-box {
        border: var(--logo-gold) 3px solid;
        border-radius: 2px;
    }

    #banner {
        min-height: 65vh;
        width: 100%;
        background-image: url("https://res.cloudinary.com/splyce/image/upload/e_contrast:20/v1679424133/ThinkTeacher/banner_latest_new_x2lawp.webp");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-bottom: 5px solid var(--logo-grey);
        display: flex;
        flex-direction: column;
        padding: 0;
    }
    #banner h2 {
        line-height: 1.2;
    }
    #banner-words {
        padding: 20vh 8vw 14vh;
    }
    @media (max-width: 32em) {
        #banner-words {
            padding: 15vh 6vw 8vh;
        }
        .eh {
            max-width: 80%;
        }
    }
    @media (max-width: 60em) {
        .eh {
            font-size: 3.2rem !important;
        }
    }      
    .eh {
        display: block;
        font-size: 6rem;
        text-transform: uppercase;
        color: rgb(0, 0, 0);
        letter-spacing: 0.04rem;
        font-weight: 700;
        text-align: left;
        /* white glow */
        text-shadow: 1px 1px white;
    }
    .eh-b {
        color: var(--logo-gold);
        font-weight: 700;
        font-family: 'Exo', sans-serif;
    }
    .eh-s {
        color: var(--logo-grey);
        font-weight: 600;
        font-family: 'Exo', sans-serif;
    }
    .eh-c {
        color: #CACFD9;
        font-weight: 400;
        font-family: 'Exo', sans-serif;
    }
    .eh-sml {
        font-weight: 500;
        font-size: 1rem;
        color: rgb(254, 254, 254);
        opacity: 0.5;
        margin: 1.5rem 0px 3rem;
    }
</style>
