<script>
    import Benefit from "$lib/Components/Benefit.svelte";
    import PartnerBenefit from "$lib/Components/PartnerBenefit.svelte";
    import Title from "$lib/Components/Title.svelte";

    export let data;
    let { packages, slug } = data;

    console.log(packages);
</script>

<svelte:head>
    <title>{slug} benefits</title>
</svelte:head>

<div class="container text-center">
    <Title title={`${slug} benefits`} />

    <div class="row mt-4 mb-5 justify-content-center">
        <Benefit benefitData={packages} />

        <PartnerBenefit partnerData={packages} />
    </div>
</div>
