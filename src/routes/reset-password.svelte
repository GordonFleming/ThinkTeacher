<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { prod } from '$lib/env.js'
    import z from 'zxcvbn'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let password = "", passwordConfirmation
    let errorMsg

    let urlParams
    let myParam
    let res = false
    onMount(() => {
        urlParams = new URLSearchParams(window.location.search)
        myParam = urlParams.get('code')
	})

    let barCol = ""
    $: s = z(password).score > 2
    $: progress = (z(password).score/4)*100
    $: if(s){
        barCol = "bg-success"
    }else{
        barCol = "bg-danger"
    }

    async function resetPassword(){
        if(s){
            await axios
            .post(`${API_URL}/auth/reset-password`, {
                code: myParam,
                password: password,
                passwordConfirmation: passwordConfirmation,
            })
            .then(response => {
                console.log("Your password has been reset.")
                res = true
            })
            .catch(error => {
                console.log('An error occurred:', error.response)
                errorMsg = error.response.data.message[0].messages[0].message

            })
        }else{
            errorMsg = "Password not strong enough"
        }
    }
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-md-4 p-lg-5 text-center">
    
                    <h2 class="fw-bold mb-2 text-uppercase">Forgot Password</h2>
                    <p class="text-white-50 mb-3">Please enter your new password below.</p>

                    {#if errorMsg != undefined}
                        <h4 class="error-col">{errorMsg}</h4>
                    {/if}

                    {#if res}
                        <h4 class="success-col">Password Reset</h4>
                    {/if}
                    <form>
                        <div class="form-outline form-white mb-2 text-left">
                            <label class="form-label" for="Password">Password</label>
                            <input type="password" id="Password" class="form-control form-control-lg" placeholder="Password" bind:value={password} required />
                        </div>   
                        <div class="progress mt-2">
                            <div class="progress-bar {barCol}" role="progressbar" style="width: {progress}%;" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>   
                        <div class="form-outline form-white mb-4 mt-3 text-left">
                            <label class="form-label" for="PasswordConfirm">Password Confirmation</label>
                            <input type="password" id="PasswordConfirm" class="form-control form-control-lg" placeholder="Password (again)" bind:value={passwordConfirmation} required />
                        </div>
        
                        <button class="btn btn-outline-light btn-lg px-4" type="submit" on:click|preventDefault={resetPassword}>Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>