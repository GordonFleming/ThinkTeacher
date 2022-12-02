<script>
    import Icon from "$lib/Icons/icon.svelte";
    import { arrowLeft } from "$lib/Icons/icons";

    export let data;
    let { person } = data;
    console.log(person);
</script>

<svelte:head>
    <title>{person.name} | ThinkTeacher</title>
    <meta name="description" content="Read more about {person.name}" />
</svelte:head>

<div class="container mt-4 mb-5">
    <button class="btn btn-link" on:click={() => history.back()}>
        <Icon data={arrowLeft} scale="3" fill="#4F5D89" />
    </button>

    <div class="row text-center">
        <div class="col-sm-12 col-md-6">
            <img class="img-fluid mb-2" src={person.img_url} alt={person.name} />
        </div>
        <div class="col-sm-12 col-md-6">
            <h2 class="mt-3">{person.name}</h2>
            <h5>{person.qualifications}</h5>
            <p>{person.description}</p>
        </div>
    </div>
</div>

<style>
    p {
        font-size: 1.2em;
        text-align: justify;
    }
    img {
        max-height: 400px;
        width: auto;
        border-radius: 20px;
    }
    h2 {
        color: var(--logo-grey);
    }
    h5 {
        color: var(--logo-gold);
    }
</style>
