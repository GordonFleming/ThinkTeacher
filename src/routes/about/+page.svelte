<script>
    import Icon from "$lib/Icons/icon.svelte";
    import { linkedin } from "$lib/Icons/icons";
</script>

<svelte:head>
    <title>About</title>
    <meta name="description" content="Read more about what ThinkTeacher is about." />
</svelte:head>

<h2 class="mt-5 text-blue text-center">
    Why you should become a <span class="text-logo-gold">think</span>teacher member
</h2>

<div class="container mb-4">
    <div class="row text-center mt-4 justify-content-center">
        <h3 class="read">
            ThinkTeacher is an online portal dedicated to the inspiring teachers of South Africa,
            providing access to benefit options, educational opportunities and nurturing networks.
            ThinkTeacher's vision is to empower teachers to thrive in their role as innovative and
            sustainable change agents in and for South Africa.
        </h3>
        <div class="container text-center mb-4">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video controls playsinline>
                <source
                    src="https://res.cloudinary.com/splyce/video/upload/v1662746574/ThinkTeacher/THINK_TEACHER__WHO_we_are_and_WHAT_we_do_ahyxiz.mp4#t=3"
                    type="video/mp4"
                />
            </video>
        </div>
    </div>
</div>

<!-- <div class="container">
    <div class="row mb-5">
        <div class="col-sm-12 col-md-12 col-lg-6 g-2">
            <div class="card bg-dark mb-3">
                <h3 class="card-header">Bridget Fleming</h3>
                <div class="card-body">
                    <h5 class="card-title">Founder</h5>
                    <h6 class="card-subtitle text-muted">MSc | HDE (Wits)</h6>
                </div>
                <img
                    class="d-block user-select-none img-fluid"
                    src="https://tirqswyaxhrjnlhdstky.supabase.in/storage/v1/object/sign/thinkteacher/Bio/Bridget_New.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0aGlua3RlYWNoZXIvQmlvL0JyaWRnZXRfTmV3LmpwZyIsImlhdCI6MTYzMjg0NjYwNiwiZXhwIjoxOTQ4MjA2NjA2fQ.HwyEWrK_IWIfX3zfIG4gKQMgP858eAP90cxaAAkob9k"
                    alt="profile img"
                />
                <div class="card-body">
                    <p class="card-text">
                        Bridget Fleming is a passionate advocate for teacher wellbeing. <br /><br />
                        Having taught secondary school Geography for the past 30 years, primarily in
                        the private sector, Bridget is the IEB NSC Geography Internal Moderator and the
                        founder of the Southern African Geography Teachers’ Association (SAGTA).
                        <br /><br />
                        She has authored many textbooks and digital classroom resources. She left the
                        classroom recently (where she was HOD Geography, St John’s College) to start
                        <span class="think">ThinkTeacher</span>, an organisation to support, care
                        for and arrange benefits for teachers. This has been her dream and passion
                        for many years, and she is currently gathering her team of change-agents to
                        grow human capital. In addition, she is involved with online teacher
                        training and content creation for Curro Online and DigiEd and GIS teacher
                        training for Kartoza.
                    </p>
                </div>
                <div class="card-footer text-muted">
                    <a
                        href="https://www.linkedin.com/in/bridget-fleming-a1b33551/"
                        class="card-link"><Icon data={linkedin} scale="1.8" /></a
                    >
                </div>
            </div>
        </div>

        <div class="col-sm-12 col-md-12 col-lg-6 g-2">
            <div class="card bg-dark mb-3">
                <h3 class="card-header">Zanele Masuku</h3>
                <div class="card-body">
                    <h5 class="card-title">Administration</h5>
                    <h6 class="card-subtitle text-muted">
                        Professional Dip in Business Management and Marketing | SAIM Programme in
                        Business Management | Higher Dip in Business Management and Marketing | Dip
                        in Business Management and Marketing
                    </h6>
                </div>
                <img
                    class="d-block user-select-none img-fluid"
                    src="https://tirqswyaxhrjnlhdstky.supabase.co/storage/v1/object/sign/thinkteacher/Bio/Zanele.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0aGlua3RlYWNoZXIvQmlvL1phbmVsZS5wbmciLCJpYXQiOjE2MjU3NjczNDMsImV4cCI6MTk0MTEyNzM0M30.q1H3Q_VB5zcZqso_43xwbrzEEgPTetTXKShBiPHB0kI"
                    alt="profile img"
                />
                <div class="card-body">
                    <p class="card-text">
                        Zanele Masuku started her career in the banking sector before becoming a
                        school librarian for four years. <br /><br />
                        Zanele’s love for accounting inspired her shift to being a bursar in various
                        schools. She established and ran a Homework Centre, in Manzini, Eswatini, where
                        students aged between 8 and 18 were assisted with their homework across different
                        subjects. <br /><br />
                        In addition, Zanele founded and managed a consultancy, collecting school fees
                        on behalf of schools and ensuring the financial sustainability of each institution
                        involved. <br /><br />
                        Zanele manages the administrative tasks for
                        <span class="think">ThinkTeacher</span>, ensuring that each team member can
                        operate optimally in their sector of expertise.
                    </p>
                </div>
                <div class="card-footer text-muted">
                    <a href="https://www.linkedin.com/in/zanele-portia-masuku/" class="card-link"
                        ><Icon data={linkedin} scale="1.8" /></a
                    >
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    img {
        max-width: 300px;
        height: auto;
        align-self: center;
    }
    .card-text {
        text-align: justify;
    }
    .card {
        height: 100%;
    }

    iframe {
        max-width: 800px;
        top: 0;
        left: 0;
        width: 100%;
        height: 320px;
    }
    .frame-wrapper {
        background-color: var(--logo-grey);
        width: 100%;
        height: auto;
        padding: 3%;
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
    }
</style> -->
