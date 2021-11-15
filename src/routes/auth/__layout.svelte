<script>

    // __layout.reset.svelte ??

    import axios from 'axios'
    import { goto } from '$app/navigation'
    import { onMount } from 'svelte'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let name
    let errMsg

    onMount(async() =>{
        const res = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt"),
            },
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                errMsg = error.response.data.error + ": " + error.response.data.message
            } else {
                console.log('Error', error.message);
            }
            goto("/login")
        });

        if(localStorage.getItem("jwt")){
            name = res.data.username
        }else{
            goto("/login")
        };
    })
</script>

{#if !name}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
    </div>
    <div class="text-center mt-2">
        <h3>Checking if you are a valid member...</h3>
    </div>
{:else} 
    <div class="container text-center">
        <div class="pt-2">
            {#if errMsg !== undefined}
                <h1>{errMsg}</h1>
                <h3>You need to <a href="/login">login</a></h3>
            {/if}
        </div>
        <nav>
            <a href="/auth">Home</a>
            <a href="/auth/selections">Selections</a>
            <a href="/auth/profile">Profile</a>
        </nav>
        <slot />
    </div>
{/if}

<style>
    nav a{
        padding: 1rem;
        font-size: 1.2em;
    }
</style>
