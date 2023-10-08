<script>
    import { onMount, afterUpdate } from "svelte";
    import { name, surname, ttNum } from "$lib/stores";
    import { goto } from "$app/navigation";

    let avatar = "";
    onMount(() => {
        document.querySelector(".third-button").addEventListener("click", function () {
            document.querySelector(".animated-icon3").classList.toggle("open");
        });
        $name = localStorage.getItem("name");
        $ttNum = localStorage.getItem("ttNum");
        $surname = localStorage.getItem("surname");
        avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${
            $name
        }&size=40&backgroundColor=4F5D89&chars=1`;
    });

    afterUpdate(() => {
        $name = localStorage.getItem("name");
        $surname = localStorage.getItem("surname");
        avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${
            $name
        }&size=40&backgroundColor=4F5D89&chars=1`;
    });

    function logoutUser() {
        localStorage.clear();
        $name = null;
        mustClick();
        goto("/");
    }

    function mustClick() {
        if (window.innerWidth <= 992) {
            document.getElementById("burger").click();
        }
    }
</script>

<nav class="navbar navbar-expand-lg navbar-light sticky-top">
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
                    <a
                        class="navbar-brand"
                        data-sveltekit-preload-data
                        href="/"
                        on:click={mustClick}
                        ><img src="/thinkteacherlogo-final.png" alt="logo" width="200" /></a
                    >
                </div>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/"
                        on:click={mustClick}>Home</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/about"
                        on:click={mustClick}>About</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/partners"
                        on:click={mustClick}>Partners</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/benefits"
                        on:click={mustClick}>Benefits</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/news"
                        on:click={mustClick}>News Flash</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/webinars"
                        on:click={mustClick}>Webinars</a
                    >
                </li>
                <li class="nav-item">
                    <a
                        class="nav-link fromLeft"
                        data-sveltekit-preload-data
                        href="/contact-us"
                        on:click={mustClick}>Contact</a
                    >
                </li>
            </ul>
        </div>
        <div class="collapse navbar-collapse justify-content-end" id="navbar">
            <!-- Right elements -->
            <div class="d-flex justify-content-end align-items-center align-top">
                {#if $name}
                    <div class="mt-2">
                        <h6>
                            <span class="text-logo-gold">{$name}</span>
                            <!-- <a style="text-decoration: none;" href="/" on:click={logoutUser}>
                                <span id="logout" class="text-logo-gold">Logout</span>
                            </a> -->
                            <br />
                            <small class="text-blue" style="font-size: 0.75em;">{$ttNum}</small>
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
                                    on:click={() => {
                                        goto("/auth/profile");
                                        mustClick();
                                    }}>Profile</button
                                >
                            </li>
                            <li>
                                <button class="dropdown-item" type="button" on:click={logoutUser}
                                    >Logout</button
                                >
                            </li>
                        </ul>
                    </div>
                {:else}
                    <p>
                        <a
                            href="/login"
                            class="nav-link align-top"
                            style="color: var(--logo-gold); font-size: 1.16em;"
                            on:click={mustClick}>Login</a
                        >
                    </p>
                    <h5>/</h5>
                    <p>
                        <a
                            href="/register"
                            class="nav-link"
                            style="color: var(--logo-grey); font-size: 1.16em;"
                            on:click={mustClick}>Register</a
                        >
                    </p>
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
            line-height: 2.8rem;
        }
    }

    @media screen and (max-width: 1450px) {
        .nav-item {
            font-size: 1em;
            font-weight: 500;
        }
        .navbar-nav .nav-link {
            line-height: 2.6rem;
        }
    }

    @media screen and (max-width: 992px) {
        img {
            max-width: 80px;
            height: auto;
        }
        .navbar-nav .nav-link {
            font-size: 1.14em;
            line-height: 3rem;
            text-align: center;
        }
        .nav-item {
            text-align: center;
        }
    }
    nav {
        border-bottom: var(--logo-gold) 4px solid;
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
        color: var(--logo-grey);
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
