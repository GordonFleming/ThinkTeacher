<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { goto } from '$app/navigation'
    import Icon from 'svelte-awesome'
    import { user, name, id } from '$lib/stores'
    import { facebook, twitter, instagram, linkedin } from 'svelte-awesome/icons'
    import { browserSet } from '$lib/re_utils'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let usernameEmail, password
    let errorMsg

    onMount(() =>{
        $name = localStorage.getItem("name");
        console.log($name)
	})

    function logoutUser(){
        localStorage.clear()
        $name = null
        goto("/")
    }

    async function loginUser(){
        await axios
        .post(`${API_URL}/auth/local`, {
            identifier: usernameEmail,
            password: password,
        })
        .then(response => {
            browserSet("jwt", response.data.jwt)
            $user = response.data.user;
            browserSet("name", response.data.user.username)
            $name = response.data.username;
            browserSet("id", response.data.user.id)
            $id = response.data.id
            console.log("The stored user: " + JSON.stringify($user))
            goto('/')
        })
        .catch(error => {
            console.log('An error occurred:', error.response)
            errorMsg = error.response.data.message[0].messages[0].message
        });
    }
</script>

<svelte:head>
	<title>Login</title>
</svelte:head>

{#if $name}
    <div class="container mt-5 mb-5 text-center">
        <button class="btn btn-dark btn-group-lg" on:click={logoutUser}>Please logout first</button>
    </div>
{:else}
    <section class="vh-50 gradient-custom container mt-4 mb-4">
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-4 p-lg-5 text-center">
        
                    <div class="mb-md-3 mt-md-2">
                        <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                        <p class="text-white-50 mb-3">Please enter your email and password</p>
    
                        {#if errorMsg != undefined}
                            {#if errorMsg == "Your account email is not confirmed"}
                                <a href="/confirm-email">Resend confirmation email?</a>
                            {/if}
                            <h4 class="error-col">{errorMsg}</h4>
                        {/if}
                        
                        <form name="login">
                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Email">Email</label>
                                <input type="email" id="Email" class="form-control form-control-lg" placeholder="Enter email or username" bind:value={usernameEmail} required />
                            </div>
                            <div class="form-outline form-white mb-2 text-left">
                                <label class="form-label" for="Password">Password</label>
                                <input type="password" id="Password" class="form-control form-control-lg" placeholder="Password" bind:value={password} required />
                            </div>
                            <p class="small mb-3 pb-lg-2"><a class="text-white-50" href="/forgot-password">Forgot password?</a></p>
            
                            <button class="btn btn-outline-light btn-lg px-4" type="submit" on:click|preventDefault={loginUser}>Login</button>
                        </form>
                    
                        <div class="mt-2 pt-1">
                            <a href="https://www.facebook.com/thinkteacher" class="text-white px-2"><Icon data={facebook} scale="1.4"/></a>
                            <a href="https://twitter.com/thinkteacher_sa" class="text-white px-2"><Icon data={twitter} scale="1.4"/></a>
                            <a href="https://www.instagram.com/thinkteacher_rsa" class="text-white px-2"><Icon data={instagram} scale="1.4"/></a>
                        </div>
                        
                    </div>
        
                    <div>
                        <p class="mb-0">Don't have an account? <a href="/register" class="text-white-50 fw-bold">Register</a></p>
                    </div>
        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
{/if}