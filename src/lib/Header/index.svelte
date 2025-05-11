<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    import { logoutUser } from "$lib/utils";
    import { userState } from "$lib/stores/userState.svelte.js";

    let avatar = $state("");
    $effect(() => {
        if (userState.user) {
            avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${userState.user.firstName}&size=40&backgroundColor=4F5D89&chars=${userState.user.firstName ? 1 : 0}`;
        }
    });

    onMount(() => {
        document.querySelector(".third-button").addEventListener("click", function () {
            document.querySelector(".animated-icon3").classList.toggle("open");
        });
    });

    function mustClick() {
        if (window.innerWidth <= 992) {
            document.getElementById("burger").click();
        }
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light sticky-top pb-2">
    <div class="container-fluid">
        <button
            id="burger"
            class="navbar-toggler third-button mx-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <div class="animated-icon3"><span /><span /><span /></div>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbar">
            <ul class="navbar-nav">
                <div class="nav-img mx-auto">
                    <a class="navbar-brand" data-sveltekit-preload-data href="/" onclick={mustClick}
                        ><img src="/thinkteacherlogo-final.png" alt="logo" width="200" /></a
                    >
                </div>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/"
                        onclick={mustClick}>Home</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/schools"
                        onclick={mustClick}>Schools</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/about"
                        onclick={mustClick}>About</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/partners"
                        onclick={mustClick}>Partners</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/benefits"
                        onclick={mustClick}>Benefits</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/webinars"
                        onclick={mustClick}>Webinars</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/contact-us"
                        onclick={mustClick}>Contact</a
                    >
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbar">
            <!-- Right elements -->
            <div class="d-flex justify-content-end align-items-center">
                {#if userState.user}
                    <div class="mt-2">
                        <h6>
                            {#if !userState.user.firstName}
                                <span class="text-logo-gold">Please complete your profile</span>
                            {:else}
                                <span class="text-logo-gold">{userState.user.firstName}</span>
                            {/if}
                            <br />
                            <small class="text-blue" style="font-size: 0.75em;"
                                >{userState.user.ttCode}</small
                            >
                        </h6>
                    </div>
                    <div class="dropdown" style="margin-right: 1rem;">
                        <button
                            type="button"
                            title="Options"
                            class="clear-btn"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <img class="avatar" src={avatar} alt="avatar" />
                        </button>

                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <button
                                    class="dropdown-item"
                                    type="button"
                                    onclick={() => {
                                        goto("/auth/profile");
                                        mustClick();
                                    }}>Profile</button
                                >
                            </li>
                            <li>
                                <button class="dropdown-item" type="button" onclick={logoutUser}
                                    >Logout</button
                                >
                            </li>
                        </ul>
                    </div>
                {:else}
                    <div class="d-flex align-items-center">
                        <a
                            href="/login"
                            class="nav-link text-right"
                            style="color: var(--logo-gold); font-size: 1.16em;"
                            onclick={mustClick}>Login</a
                        >
                        <h5 class="mb-0">/</h5>
                        <a
                            href="/register"
                            class="nav-link"
                            style="color: var(--logo-blue); font-size: 1.16em;"
                            onclick={mustClick}>Create Profile</a
                        >
                    </div>
                {/if}
            </div>
        </div>
    </div>
</nav>

<style>
    @media screen and (min-width: 1450px) {
        .nav-item {
            font-size: 1.16em;
            font-weight: 500;
        }
        .nav-img {
            padding-right: 6rem;
        }
        .navbar-nav .nav-link {
            margin-right: 15px;
            margin-left: 15px;
            line-height: 2rem;
        }
    }

    @media screen and (max-width: 1450px) {
        .nav-item {
            font-size: 1em;
            font-weight: 500;
        }
        .navbar-nav .nav-link {
            line-height: 2rem;
        }
    }

    @media screen and (max-width: 992px) {
        img {
            max-width: 80px;
            height: auto;
        }
        .navbar-nav .nav-link {
            font-size: 1.14em;
            line-height: 2rem;
            text-align: center;
        }
        .nav-item {
            text-align: center;
        }
    }
    nav {
        border-bottom: var(--logo-gold) 3px solid;
    }
    /* .navbar-light .navbar-nav .nav-link {
        color: #fff;
    } */
    a {
        display: inline-block;
        width: auto;
    }
    .dropdown-menu {
        background-color: #fefeff;
    }
    .dropdown-item {
        color: black;
    }
    .dropdown-item:hover {
        color: rgb(78, 75, 75);
    }
    .dropdown-item:active {
        color: #fff;
        text-decoration: none;
        background-color: #fff;
    }
    .dropdown-item:focus {
        color: rgb(92, 90, 90);
    }
    /* #logout {
        cursor: pointer;
        font-size: 1.12em;
        transition: 0.3s;
    } */
    h6 {
        color: var(--logo-blue);
        margin-right: 1rem;
    }
    /* #logout:hover {
        font-size: 1.15em;
    } */
    a:after {
        display: block;
        content: "";
        border-bottom: solid 3px var(--logo-gold);
        transform: scaleX(0);
        transition: transform 250ms ease-in-out;
    }
    a.fromLeft:after {
        transform-origin: 100% 50%;
    }
    a.fromLeft:hover:after {
        transform: scaleX(1);
        transform-origin: 0% 50%;
    }
    .avatar {
        border-radius: 40%;
        transition: 0.3s;
        border: var(--logo-gold) solid 2px;
    }
    .avatar:hover {
        border-radius: 25%;
    }
</style>
