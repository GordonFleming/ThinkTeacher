<script>

    // __layout.reset.svelte ??

    import axios from 'axios'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'
    import { name, errMsg } from '$lib/stores'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    onMount(async() =>{
        if(localStorage.getItem("jwt")){
            const res = await axios.get(`${API_URL}/users/me`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt"),
                },
            }).catch(function (error) {
                console.log(error.response.data);
                if (error.response.data.error == 'Unauthorized') {
                    goto("/login")
                    console.log("JWT token invalid");
                    $errMsg = error.response.data.error + ": " + error.response.data.message
                }
            });
        }else{
            goto("/login");
        }

        //name = res.data.username
    })
</script>

<div class="container text-center mt-4">
    <nav>
        <a href="/auth">Home</a>
        <a href="/auth/selections">Selections</a>
        <a href="/auth/profile">Profile</a>
    </nav>
    <slot />
</div>

<style>
    nav a{
        padding: 1rem;
        font-size: 1.2em;
    }
</style>
