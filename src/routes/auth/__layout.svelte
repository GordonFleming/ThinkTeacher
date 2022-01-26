<script>

    // __layout.reset.svelte ??

    import axios from 'axios'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { prod } from '$lib/env.js'
    import { errMsg } from '$lib/stores'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.thinkteacher.co.za"
    }

    onMount(async() =>{
        if(localStorage.getItem("jwt") && localStorage.getItem("ttNum")){
            const res = await axios.get(`${API_URL}/users/me`, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem("jwt"),
                },
            }).catch(function (error) {
                console.log(error.response.data);
                if (error.response.data.error == 'Unauthorized') {
                    goto("/login")
                    console.log("JWT token invalid: ", error.response.data.message);
                    $errMsg = "Your session expired, please login again."
                }
            });
        }else{
            goto("/login");
        }
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
