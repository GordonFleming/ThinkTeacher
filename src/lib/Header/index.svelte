<script>
    import { onMount } from 'svelte';

    onMount(() => {
        document.querySelector('.third-button').addEventListener('click', function () {

        document.querySelector('.animated-icon3').classList.toggle('open');
        });
	});
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid justify-content-center">
        <a class="navbar-brand hidden-md" href="/">Think Teacher</a>
        <button class="navbar-toggler third-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <div class="animated-icon3"><span></span><span></span><span></span></div>
        </button>
        <div class="collapse navbar-collapse" id="navbar">
            <ul class="navbar-nav nav-fill me-auto w-100">
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" sveltekit:prefetch href="/about">About</a>
                </li>
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" sveltekit:prefetch href="/membership">Membership</a>
                </li>
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" sveltekit:prefetch href="/blog">Blog</a>
                </li>
                <a class="navbar-brand" sveltekit:prefetch href="/">
                    <img src="https://tirqswyaxhrjnlhdstky.supabase.co/storage/v1/object/sign/thinkteacher/Favicon.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0aGlua3RlYWNoZXIvRmF2aWNvbi5wbmciLCJpYXQiOjE2MjU1Nzc1MDEsImV4cCI6MTk0MDkzNzUwMX0.awqc470jnyg9IidstlVNYoFdUNmYY6jFbJcHvNm8Nxg" alt="ThinkTeacher logo" width="100" height="100">
                </a>
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" href="/login">Login</a>
                </li>
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" href="/register">Register</a>
                </li>
                <li class="nav-item pt-lg-3">
                    <a style="width: 10vw;" class="nav-link fromLeft" href="/contact-us">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>

    @media screen and (min-width: 992px) {
        li {
            font-size: 1.3em;
            font-weight: 500;
        }
        a {
            display: inline-block;
            line-height: 2.8rem;
            width: auto;
        }
        a:after {
            display:block;
            content: '';
            border-bottom: solid 3px var(--logo-blue);
            transform: scaleX(0);  
            transition: transform 250ms ease-in-out;
        }
        a.fromLeft:after{ transform-origin: 100% 50%; }
        a.fromLeft:hover:after{ transform: scaleX(1); transform-origin:   0% 50%; }
        
        .hidden-md {
            display: none;
        }
    }

    @media screen and (max-width: 992px) {
        img {
            max-width: 80px;
            height: auto;
        }
        a {
            font-size: 1.2em;
            display: inline-block;
            line-height: 3rem;
            width: auto;
            text-align: center;
        }
        li {
            text-align: center;
        }
    }

    nav {
        border-bottom: var(--logo-orange) 2px solid;
    }
</style>
