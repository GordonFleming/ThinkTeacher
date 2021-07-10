<script>

    // __layout.reset.svelte ??

    import axios from 'axios';
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let name = "";
    let API_URL = 'http://localhost:1337/users/me';
    let errMsg;

    onMount(async() =>{
        const res = await axios.get(API_URL, {
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
            goto("/login");
        });

        if(localStorage.getItem("jwt")){
            name = res.data.username;
        };
    })
</script>

<div class="pt-2">
    {#if errMsg !== undefined}
        <h1>{errMsg}</h1>
        <h3>You need to <a href="/login">login</a></h3>
    {/if}

    <h3>Hello, <strong>{name}</strong> this is where all the membership content will be available.</h3>
</div>

<div class="container text-center p-3">
    <nav>
        <a href="/auth">Home</a>
        <a href="/auth/vacancies">Vacancies</a>
        <a href="/auth/profile">Profile</a>
    </nav>
    <slot />
</div>
