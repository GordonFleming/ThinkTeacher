<script>
    import Title from "$lib/Components/Title.svelte";

    export let data;
    let { webinars } = data;
    let categories = [
        ...new Set(webinars.map((w) => w.attributes.webinar_category.data.attributes.category)),
    ];

    let webCat = "none";
    function filterWebinars(cat) {
        webCat = cat;
        if (cat == "none") {
            webinars = data.webinars;
        } else {
            webinars = data.webinars.filter(
                (w) => w.attributes.webinar_category.data.attributes.category == cat
            );
        }
    }

    function srcDocz(embLink, title) {
        return `<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,
            span{position:absolute;width:100%;top:0;bottom:0;margin:auto}
            span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;
                color:white;text-shadow:0 0 0.5em black}</style>
                <a href=${embLink}>
                    <img src=https://img.youtube.com/vi/yejlnoTr0Gc/hqdefault.jpg 
                    alt='${title}'><span>▶</span></a>`;
    }
</script>

<svelte:head>
    <title>Webinars | ThinkTeacher</title>
    <meta name="description" content="View the many ThinkTeacher's great webinars!" />
</svelte:head>

<div class="container mb-5 text-center justify-content-center">
    <Title title={"webinars"} />

    <div class="row ">
        <div class="col justify-content-center d-flex">
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <button
                        class:active={webCat == "none"}
                        class="nav-link text-capitalize"
                        on:click={() => filterWebinars("none")}>All</button
                    >
                </li>
                {#each categories as category}
                    <li class="nav-item">
                        <button
                            class:active={webCat == category}
                            class="nav-link text-capitalize"
                            on:click={() => filterWebinars(category)}>{category}</button
                        >
                    </li>
                {/each}
            </ul>
        </div>
    </div>

    <div class="row mt-3 text-center justify-content-center">
        {#each webinars as webinar}
            <div class="col-lg-6 col-md-12 mt-2">
                <div class="webinar-wrapper">
                    <p class="text-white fw-bold">{webinar.attributes.title}</p>
                    <div class="frame-wrapper">
                        <iframe
                            src="https://www.youtube.com/embed/{webinar.attributes.link}"
                            srcdoc={srcDocz(
                                `https://www.youtube.com/embed/${webinar.attributes.link}`,
                                webinar.attributes.title
                            )}
                            title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        />
                    </div>
                    <p class="text-white mt-2">{webinar.attributes.description}</p>
                    <p class="text-secondary">
                        {new Date(webinar.attributes.createdAt).toLocaleString("en-ZA", {
                            month: "long",
                            day: "2-digit",
                            year: "numeric",
                        })}
                    </p>
                </div>
            </div>
        {/each}
    </div>
</div>

<style>
    iframe {
        position: absolute;
        max-width: 800px;
        top: 0;
        left: 0;
        width: 100%;
        height: 320px;
    }
    p {
        text-align: justify;
    }
    .frame-wrapper {
        position: relative;
        padding-top: 56.25%; /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
        overflow: hidden;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }
    .webinar-wrapper {
        padding: 3%;
        position: relative;
        background-color: var(--logo-grey);
        border-radius: 5px;
        border: 3px solid var(--logo-gold);
        height: 100%;
    }
    .nav-tabs .nav-link:hover {
        isolation: auto;
    }
</style>
