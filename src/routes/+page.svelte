<script>
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
    <section id="banner-words">
        <h2 class="header-background">
            <span class="eh"
                ><span class="text-logo-gold">think</span>teacher</span
            >
            <span class="eh"
                ><span class="text-logo-gold">think</span>school</span
            >
            <span class="eh"
                ><span class="text-logo-gold">think</span>smart</span
            >
        </h2>
    </section>
</header>

<div class="container mt-5">
    <div class="row align-items-center">
        <!-- Image Column -->
        <div class="col-md-5 mb-4 mb-md-0">
            <img
                src="https://res.cloudinary.com/splyce/image/upload/v1747250055/ThinkTeacher/Young_teacher_image_cropped_geu3yx.webp"
                class="img-fluid rounded shadow"
                alt="ThinkTeacher Network"
            />
        </div>

        <!-- Content Column -->
        <div class="col-md-7">
            <h1 class="main-heading">
                Ready for your next teaching opportunity?
            </h1>

            <div class="feature-item d-flex align-items-start">
                <div class="feature-icon">✨</div>
                <div class="feature-text">Grow your skills</div>
            </div>

            <div class="feature-item d-flex align-items-start">
                <div class="feature-icon">✨</div>
                <div class="feature-text">Build your professional profile</div>
            </div>

            <div class="feature-item d-flex align-items-start">
                <div class="feature-icon">✨</div>
                <div class="feature-text">Access exclusive benefits</div>
            </div>

            <div class="feature-item d-flex align-items-start">
                <div class="feature-icon">✨</div>
                <div class="feature-text">
                    Connect with top schools through the ThinkTeacher Network
                </div>
            </div>
        </div>
        <p class="text-center fw-bold mt-3 mb-4 fs-4">
            No cost. Just 5 minutes of your time. Join today!
        </p>

        <div class="row mt-5">
            <h2 class="mb-3 text-center">
                ThinkTeacher: Where Teachers Come First
            </h2>
            <div class="col-md-8">
                <div class="teacher-info">
                    <h4 class="text-start mb-3 text-logo-gold">
                        For Teachers at Every Stage
                    </h4>
                    <p class="fs-5">
                        From student teachers seeking placement to experienced
                        educators ready for their next chapter—ThinkTeacher
                        supports you all the way.
                    </p>

                    <h4 class="text-start mb-3 text-logo-blue mt-4">
                        Join a Network That Works for You
                    </h4>
                    <p class="fs-5">
                        Get matched with schools, access locum opportunities,
                        and connect with mentoring roles across South Africa.
                    </p>

                    <h4 class="text-start mb-3 text-logo-gold mt-4">
                        Grow Your Skills
                    </h4>
                    <p class="fs-5">
                        Enjoy exclusive webinars, expert insights, and
                        professional development designed just for educators.
                    </p>

                    <h4 class="text-start mb-3 text-logo-blue mt-4">
                        Build Your Profile, Unlock Opportunities
                    </h4>
                    <p class="fs-5">
                        Complete your ThinkTeacher profile to join our national
                        database and connect with a growing community of
                        subscribing schools.
                    </p>
                </div>
            </div>
            <div class="col-md-4 d-flex align-items-center">
                <img
                    src="https://res.cloudinary.com/splyce/image/upload/v1747254268/ThinkTeacher/tt-hp-lady-teacher_cropped_krhthn.webp"
                    alt="ThinkTeacher"
                    class="img-fluid rounded shadow"
                />
            </div>
        </div>
    </div>
</div>

<div class="container text-center mt-3">
    <div class="row mt-4">
        <div class="col-sm-12 col-md-6">
            <img
                class="img-fluid rounded"
                style="max-height: 300px;"
                src="https://res.cloudinary.com/splyce/image/upload/v1668244333/ThinkTeacher/teachers4_new_q5ujfl.webp"
                alt="img"
            />
        </div>
        <div
            class="col-sm-12 col-md-6 d-flex bg-gold text-white rounded-3 px-3 py-1"
        >
            <p class="fs-4 lh-base my-auto text-justify">
                Teacher wellbeing has a significant impact on schools, teachers
                and students. Many of the negative effects of low wellbeing are
                well publicised, with stress or burnout being linked to
                attrition and the resulting teacher shortages worldwide. This
                has led to calls for teacher wellbeing to be taken seriously for
                the long-term sustainability of the profession.
            </p>
        </div>
    </div>

    <div class="row mt-4">
        <div
            class="col-sm-12 col-md-6 d-flex bg-blue text-white rounded-3 px-3 py-1"
        >
            <p class="fs-4 lh-base my-auto text-justify">
                Looking after your teachers’ wellbeing is one of the most
                important things you can do as a school community. The success
                of your school is dependent on the quality of instruction
                delivered by your teachers to your students; their wellbeing is
                crucial to ensuring that their teaching skills are effective and
                of a high quality.
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
    <p class="fs-4 text-blue mt-4">
        <strong><span class="think">think</span>teacher</strong> - by teachers for
        teachers.
    </p>
</div>

<div class="container py-4">
    <div class="row justify-content-center mb-4">
        <div class="col-md-8">
            <div class="card shadow">
                <div class="card-header bg-blue text-white text-center">
                    <h2 class="my-2 text-white">Create Your Profile</h2>
                </div>
                <div class="card-body">
                    <ul class="fs-5 list-unstyled text-dark">
                        <li class="my-2">
                            <strong>Step 1:</strong> Create your profile (5 min).
                            Your online CV will not be disclosed publicly.
                        </li>
                        <li class="my-2">
                            <strong>Step 2:</strong> Indicate if you are interested
                            in mentoring, tutoring, internship, locum, or permanent
                            teaching positions.
                        </li>
                        <li class="my-2">
                            <strong>Step 3:</strong> We will connect your skills
                            with our partner schools.
                        </li>
                    </ul>
                    <div class="text-center pt-2">
                        <a href="/register"
                            ><button class="btn btn-outline bg-gold fw-bold"
                                >Create profile now</button
                            ></a
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container mb-5">
    <!-- Carousel of Webinars -->
    <!-- <WebinarsBar /> -->

    <!-- <div class="row grey-grad big-gap">
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
            </ul>
        </div>
    </div> -->

    <div class="container text-center mb-4 grey-grad">
        <h2 class="mb-4">
            Why you should become a <span class="text-logo-gold">think</span
            >teacher member
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
        color: var(--logo-blue);
        font-size: 2.4em;
        text-align: center;
    }
    /* .benefit-list ul li {
        font-size: 1.3em;
        position: relative;
        padding: 1rem 0.3rem;
        color: #212529;
        text-decoration: none;
        background-color: transparent;
        border: 0 solid rgba(255, 255, 255, 0.2);
    }
    .benefit-list ul {
        list-style-image: url("https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/m_favicon_08702889be_d8548d4c57.png");
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
        background-image: url("https://res.cloudinary.com/splyce/image/upload/v1744041087/ThinkTeacher/thinkteacher_header_cropped_fcccvl.webp");
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        border-bottom: 5px solid var(--logo-blue);
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
        .header-background {
            padding: 0px;
        }
    }
    @media (max-width: 60em) {
        .eh {
            font-size: 2.5rem !important;
        }
    }
    .eh {
        display: block;
        font-size: 6rem;
        text-transform: uppercase;
        letter-spacing: 0.04rem;
        font-weight: 700;
        text-align: left;
        /* white glow */
        text-shadow: 3px 0.2px 1px rgb(122, 118, 118);
        font-family: "Exo", sans-serif;
    }
    .header-background {
        background-color: rgba(240, 248, 255, 0.705);
        padding: 8px;
        border-radius: 15px;
        width: fit-content;
    }
    .eh-sml {
        font-weight: 500;
        font-size: 1rem;
        color: rgb(0, 0, 0);
        opacity: 0.9;
        margin: 1.5rem 0px 3rem;
    }

    .feature-item {
        margin-bottom: 1rem;
    }
    .feature-icon {
        margin-right: 10px;
        font-size: 1.8em;
    }
    .container {
        padding: 2rem 1rem;
    }
    .main-heading {
        font-weight: 700;
        margin-bottom: 1.5rem;
        color: #333;
    }
    .feature-text {
        font-size: 1.5rem;
        color: #555;
    }
</style>
