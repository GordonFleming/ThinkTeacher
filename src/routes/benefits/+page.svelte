<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { travelScroll } from "$lib/stores";
    import Benefit from "$lib/Components/Benefit.svelte";
    import PartnerBenefit from "$lib/Components/PartnerBenefit.svelte";
    import Title from "$lib/Components/Title.svelte";
    import SvelteMarkdown from "svelte-markdown";

    let navbar, sticky;
    onMount(() => {
        //document.body.scrollTop = 0;
        function scrollBene() {
            if ($travelScroll) {
                console.log("teydbwfvelw ", $travelScroll);
                document
                    .getElementById(`${$travelScroll}`)
                    .scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }
        setTimeout(scrollBene, 150);
        navbar = document.getElementById("nav-benefits");
        sticky = navbar.offsetTop;
    });

    export let data;
    let { travel, wellbeing, health, courses, finance, legal, books, cars, business } = data;
    //cars, glasses;
</script>

<svelte:head>
    <title>Benefits</title>
    <meta name="description" content="View the many ThinkTeacher's great benefits!" />
</svelte:head>

<svelte:window
    on:scroll={() =>
        window.pageYOffset >= sticky
            ? navbar.classList.add("sticky-top")
            : navbar.classList.remove("sticky-top")}
/>

<Title title={"benefits"} />

<div class="text-center" id="nav-benefits">
    <ul class="list-inline">
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                style="border:none; background-color: transparent;"
                on:click={() =>
                    document
                        .getElementById("travel")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
                ><h4>
                    Travel <span class="text-logo-gold">-</span>
                </h4></button
            >
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("wellbeing")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Wellbeing <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("medical_aid")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Medical Aid <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("legal")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Legal <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("courses")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Courses <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("finance")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Finance <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <!-- <li class="list-inline-item"><h4 on:click={() => document.getElementById('Books').scrollIntoView({ behavior: 'smooth', block: 'start' })}>Books <span class="text-logo-gold">-</span></h4></li> -->
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("books")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Book Store <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("cars")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>
                    Cars <span class="text-logo-gold">-</span>
                </h4>
            </button>
        </li>
        <li class="list-inline-item">
            <button
                class="scrl-btn"
                on:click={() =>
                    document
                        .getElementById("glasses")
                        .scrollIntoView({ behavior: "smooth", block: "start" })}
            >
                <h4>Glasses</h4>
            </button>
        </li>
    </ul>
</div>

<div class="container text-center">
    <div class="row mt-4 mb-5 justify-content-center">
        <!-- Travel -->
        <div class="grey-grad row justify-content-center">
            <h2 id="travel" class="display-3">Travel</h2>

            <Benefit benefitData={travel} />

            <PartnerBenefit partnerData={travel} />
        </div>

        <!-- Wellbeing -->
        <div class="grey-grad row justify-content-center" id="wellbeing">
            <h2 class="display-3">Wellbeing</h2>

            <Benefit benefitData={wellbeing} />

            <PartnerBenefit partnerData={wellbeing} />
        </div>

        <!-- MedicalAid -->
        <div class="grey-grad row justify-content-center big-gap" id="medical_aid">
            <h2 class="display-3">Medical Aid</h2>

            <Benefit benefitData={health} />

            <PartnerBenefit partnerData={health} />
        </div>

        <!-- Legal -->
        <div class="grey-grad row justify-content-center big-gap" id="legal">
            <h2 class="display-3">Legal</h2>

            <Benefit benefitData={legal} />

            <PartnerBenefit partnerData={legal} />
        </div>

        <!-- Courses -->
        <div class="grey-grad row justify-content-center big-gap" id="courses">
            <h2 class="display-3">Courses</h2>

            <Benefit benefitData={courses} />

            <PartnerBenefit partnerData={courses} />
        </div>

        <!-- Finance -->
        <div class="grey-grad row justify-content-center big-gap" id="finance">
            <h2 class="display-3">Finance</h2>

            <Benefit benefitData={finance} />

            <PartnerBenefit partnerData={finance} />
            <!-- <iframe src="https://retirements.digital.alexanderforbes.co.za/introduction/2/" title="My Retirement Picture" frameborder="0"></iframe> -->
        </div>

        <!-- Book Store -->
        <div class="grey-grad row justify-content-center big-gap" id="books">
            <h2 class="display-3">Book Store</h2>
            <PartnerBenefit partnerData={books} />
        </div>
        <!-- cars -->
        <div class="grey-grad row justify-content-center big-gap" id="cars">
            <h2 class="display-3">Cars</h2>
            <Benefit benefitData={cars} />

            <PartnerBenefit partnerData={cars} />
        </div>
        <!-- Business -->
        <div class="grey-grad row justify-content-center big-gap" id="business">
            <h2 class="display-3">Business Coach</h2>
            <Benefit benefitData={business} />

            <PartnerBenefit partnerData={business} />
        </div>
        <!-- Glasses -->
        <div class="grey-grad row justify-content-center big-gap" id="glasses">
            <h2 class="display-3">Glasses</h2>
            <h4>Coming soon</h4>
        </div>
        <!-- Connect -->
        <div class="grey-grad row justify-content-center big-gap" id="connect">
            <h2 class="display-3">Connect</h2>
            <h4>Coming soon</h4>
        </div>
        <!-- Jobs -->
        <div class="grey-grad row justify-content-center big-gap" id="jobs">
            <h2 class="display-3">Jobs</h2>
            <h4>Coming soon</h4>
        </div>
    </div>
</div>

<style>
    ul li h4 {
        transition: 0.3s;
    }
    ul li h4:hover {
        cursor: pointer;
        font-size: 135%;
    }
    .scrl-btn {
        border: none;
        background-color: transparent;
    }
</style>
