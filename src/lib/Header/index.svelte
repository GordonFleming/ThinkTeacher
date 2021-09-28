<script>
    import { onMount, afterUpdate } from 'svelte'
    import {user, name} from '$lib/stores'
import { goto } from '$app/navigation';

    onMount(() =>{  
        document.querySelector('.third-button').addEventListener('click', function () {
        document.querySelector('.animated-icon3').classList.toggle('open')})
	})

    afterUpdate(() =>{
        $name = localStorage.getItem("name");
        console.log($name)
	})

    function logoutUser(){
        localStorage.clear()
        $name = null
        goto("/")
    }

</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
        <button class="navbar-toggler third-button mx-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
            <div class="animated-icon3"><span></span><span></span><span></span></div>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbar">
            <ul class="navbar-nav">
                <div class="nav-img mx-auto">
                    <a class="navbar-brand" href="/"><img src="\static\thinkteacherlogo-final.png" alt="logo" width="200" ></a>
                </div>
                <li class="nav-item">
                    <a class="nav-link fromLeft" sveltekit:prefetch href="/about">About</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fromLeft" sveltekit:prefetch href="/membership">Membership</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fromLeft" sveltekit:prefetch href="/blog">Blog</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fromLeft" href="/">Something...</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fromLeft" href="/register">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link fromLeft" href="/contact-us">Contact</a>
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbar">
                <!-- Right elements -->
                <div class="d-flex align-items-center">
                    {#if $name}
                        <h6>Welcome {$name}, <span id="logout" on:click={logoutUser}>Logout?</span></h6>
                    {:else}
                        <a href="/login" class="nav-link" style="color: #242639;">Login</a>
                    {/if}
                </div>
        </div>
    </div>
</nav>

<style>
    @media screen and (min-width: 1200px) {
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
        .nav-img{
            padding-right: 6rem;
        }
        .navbar-nav .nav-link {
            margin-right: 15px;
            margin-left: 15px;
        }
    }

    @media screen and (max-width: 1200px) {
        li {
            font-size: 1.2em;
            font-weight: 400;
        }
        a {
            display: inline-block;
            line-height: 2.5rem;
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

    #logout{
        cursor: pointer;
        font-size: 1.15em;
        transition: 0.2s;
    }
    h6{
        color: black;
    }
    #logout:hover{
        color: var(--logo-blue);
        font-size: 1.2em;
    }
</style>
