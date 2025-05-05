<svelte:head>
    <title>Schools | ThinkTeacher</title>
</svelte:head>

<div class="container py-5">
    <section class="container py-3">
        <!-- Main content -->
        <div class="text-center pb-4">
            <p class="fs-3 pb-3 lead">
                Empower your school community with the right support and the right educators — all
                through <span class="text-primary fw-bold">ThinkTeacher</span>.
            </p>

            <!-- Divider -->
            <div class="row mb-4">
                <div class="col-4 mx-auto">
                    <hr class="border-2 opacity-75" />
                </div>
            </div>

            <h2 class="fs-3 fw-bold mb-4 text-primary">
                ThinkTeacher for Schools: Connecting You with Top Teaching Talent
            </h2>

            <div class="row justify-content-center">
                <div class="col-lg-10">
                    <div class="card shadow-sm border-0 bg-light">
                        <div class="card-body p-4">
                            <p class="fs-4 mb-0">
                                Subscribing schools gain exclusive access to a dynamic database of
                                <strong class="text-primary">SACE-registered educators</strong>
                                —including teachers seeking locum work, mentorship opportunities, permanent
                                posts, and internships.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Bottom divider -->
        <div class="row mb-4">
            <div class="col-4 mx-auto">
                <hr class="border-2 opacity-75" />
            </div>
        </div>
    </section>

    <h2 class="text-center mb-4">School Sign-up Tiers</h2>
    <div class="row g-4">
        <!-- Tier 1 -->
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-header bg-blue text-center">
                    <h4 class="my-1 text-white">Tier 1</h4>
                    <p>R4 500 per annum</p>
                </div>
                <div class="card-body">
                    <ul class="tick-list">
                        <li>
                            Access to a database of retired SACE-registered teachers for locum
                            positions
                        </li>
                        <li>Wellbeing benefits for school staff</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Tier 2 -->
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-header bg-blue text-center">
                    <h4 class="my-1 text-white">Tier 2</h4>
                    <p>R14 000 per annum</p>
                </div>
                <div class="card-body">
                    <p class="text-black">Includes all <strong>Tier 1</strong> benefits, plus:</p>
                    <ul class="tick-list">
                        <li>
                            Access to a database of newly qualified teachers for internships and
                            full-time positions
                        </li>
                        <li>Access to endorsed professional development courses for your staff</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Tier 3 -->
        <div class="col-md-4">
            <div class="card h-100">
                <div class="card-header bg-blue text-center">
                    <h4 class="my-1 text-white">Tier 3</h4>
                    <p>R35 000 per annum</p>
                </div>
                <div class="card-body">
                    <p class="text-black">
                        Includes all <strong>Tier 1 and 2</strong> benefits, plus:
                    </p>
                    <ul class="tick-list">
                        <li>Personalised mentorship for new staff by retired master teachers</li>
                        <li>Leadership and management mentorship for school leaders</li>
                        <li>
                            Access to a geo-referenced feeder area management tool to support
                            strategic planning
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .tick-list {
        list-style: none;
        padding-left: 1.2em;
        color: #000;
        line-height: 1.6;
    }
    .tick-list li::before {
        content: "✔";
        color: var(--logo-gold);
        font-weight: bold;
        display: inline-block;
        width: 1em;
        margin-left: -1.2em;
        margin-top: 1rem;
    }
    .text-primary {
        color: var(--logo-blue) !important;
    }
</style>
