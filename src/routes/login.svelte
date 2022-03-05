<script context="module">
	export const prerender = true;
</script>

<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { goto } from '$app/navigation'
    import Icon from 'svelte-awesome'
    import { user, name, surname, id, errMsg, ttNum } from '$lib/stores'
    import { facebook, twitter, instagram } from 'svelte-awesome/icons'
    import { browserSet } from '$lib/re_utils'
    import { API_URL } from '$lib/env.js'

    let usernameEmail, password
    let errorMsg

    function logoutUser(){
        localStorage.clear()
        $name = null
    }

    onMount(() =>{
        logoutUser()
	})

    async function loginUser(){
        await axios
        .post(`${API_URL}/auth/local`, {
            identifier: usernameEmail,
            password: password,
        })
        .then(response => {
            browserSet("jwt", response.data.jwt)
            $user = response.data.user;
            browserSet("name", response.data.user.firstName)
            $name = response.data.firstName;
            browserSet("surname", response.data.user.lastName)
            $surname = response.data.lastName;
            browserSet("id", response.data.user.id)
            $id = response.data.id
            browserSet("ttNum", response.data.user.ttCode)
            $ttNum = response.data.user.ttCode
            goto('/benefits')
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

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-md-4 p-lg-4 text-center">
    
                <div class="mb-md-3 mt-md-2">
                    <h2 class="fw-bold mb-2 text-uppercase">Login</h2>

                    {#if errorMsg != undefined}
                        <h4 class="error-col">{errorMsg}</h4>
                        {#if errorMsg == "Your account email is not confirmed"}
                            <a class="fs-4" href="/confirm-email">Resend confirmation email?</a>
                        {/if}
                    {/if}

                    {#if $errMsg}
                        <h4 class="error-col">{$errMsg}</h4>
                    {/if}

                    <div class="mt-4 google-box">                      
                        <div id="google-sso" class="Sso__button Sso__googleIdButton" on:click={() => goto('https://thinkteacher-strapi.glass.thinkteacher.co.za/connect/google')}>
                            Continue with Google
                        </div>
                        <div class="Sso__divider ">
                            <span class="Sso__dividerLine"></span>
                            <span class="Sso__dividerText">or</span>
                            <span class="Sso__dividerLine"></span>
                        </div>
                    </div>
                    <p class="text-white-50 mb-3">Please enter your email and password</p>
                    <form name="login">
                        <div class="form-outline form-white mb-2 mt-3">
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

<style>
    input{
        max-width: 400px;
        margin: 0 auto;
    }
</style>