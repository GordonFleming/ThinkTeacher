<script>
    import Icon from "$lib/Icons/icon.svelte";
    import { arrowLeft } from "$lib/Icons/icons";
    // import SvelteMarkdown from "svelte-markdown";

    export let data;
    let { post } = data;
    let date;
    let publish;
    let source;

    date = new Date(post.published_at);
    publish = date.toLocaleString("en-ZA", { month: "long", day: "2-digit", year: "numeric" });
    source = post.content;
</script>

<svelte:window />

<svelte:head>
    <title>{post.title}</title>
</svelte:head>

<div class="container">
    <a sveltekit:prefetch href="/news"><Icon data={arrowLeft} scale="3" fill="#4F5D89" /></a>
    <h1 class="text-center mb-4" style="margin-top: 0;">{post.title}</h1>
    <div class="text-center">
        <div class="responsive-iframe-container">
            <iframe src={post.pdf.url} title={post.title} class="responsive-iframe" />
        </div>
    </div>

    <time datetime={publish}>{publish}</time>

    <!-- <div id="mark-down">
        <SvelteMarkdown {source} />
    </div> -->
</div>

<style>
    .responsive-iframe-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 100%;
    }
    .responsive-iframe {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    h1 {
        color: var(--logo-gold);
    }
    time {
        color: #fff;
    }
    .container {
        border-radius: 20px;
    }
    @media screen and (max-width: 1000px) {
        .container {
            padding: 1rem;
        }
    }

    @media screen and (min-width: 999px) {
        .container {
            padding: 5rem;
        }
    }
</style>
