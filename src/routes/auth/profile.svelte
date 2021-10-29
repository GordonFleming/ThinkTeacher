<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'
    import {name} from '$lib/stores'
    import { browserSet } from '$lib/re_utils'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true

    let username, email, id

    onMount(async() =>{
        const res = await axios.get(`${API_URL}/users/me`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt"),
            },
        }).catch(function (error) {
            console.log('Error', error.message);
            goto("/login")
        });
        user = res.data
        loading = false
        username=user.username
        email=user.email
        id=user.id
    })

    async function updateUser(){
        await axios.put(`${API_URL}/users/${id}`,{
                username: username,
                email: email,
            },
            { headers: { Authorization: 'Bearer ' + localStorage.getItem("jwt"),} }
        ).then(response => {
            console.log('reponse: ', response)
            msg = "Success!"
            $name = username
            browserSet("name", $name)
        })
        .catch((error) => {
            console.error("eee", error.response.data.message[0].messages[0].message.replace("."," "))
            errorMsg = error.response.data.message[0].messages[0].message.replace("."," ")
        })
    }

    let errorMsg, msg
	let user
</script>

<svelte:head>
	<title>ThinkTeacher Profile</title>
</svelte:head>


{#if loading}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
    </div>
{:else}
    <section class="vh-50 gradient-custom container mt-4 mb-4">
        <h3>Hi, <strong>{username}</strong> here you will be able to update your personal details.</h3>
        <h4>Your ThinkTeacher Number: <span class="text-logo-gold">{user.ttCode}</span></h4>
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">           
                    <div class="card-body p-md-3 p-lg-4 text-center">
                    <div class="mb-md-3 mt-md-2">
                        {#if errorMsg}
                            <h4 class="error-col">{errorMsg}</h4>
                        {:else if msg}
                            <h4 class="success-col">{msg}</h4>
                        {/if}
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Username">Username</label>
                        <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder={user.username} bind:value={username} required />
                    </div>
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Email">Email</label>
                        <input type="email" id="Email" class="form-control form-control-lg" placeholder={user.email} bind:value={email} required />
                    </div>
                </div>
                <button class="btn btn-outline-light btn-lg px-4 mt-2" type="submit" on:click|preventDefault={updateUser}>Update</button>
            </div>
        </div>
    </section>         
{/if}
<style>

</style>
