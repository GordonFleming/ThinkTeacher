<script>
    import { onMount } from 'svelte'
    import axios from 'axios'

    let password, passwordConfirmation
    let errorMsg

    let urlParams
    let myParam
    let res
    onMount(() => {
        urlParams = new URLSearchParams(window.location.search)
        myParam = urlParams.get('code')
	})

    async function resetPassword(){
        await axios
        .post('http://localhost:1337/auth/reset-password', {
            code: myParam,
            password: password,
            passwordConfirmation: passwordConfirmation,
        })
        .then(response => {
            console.log("Your password has been reset.")
            console.log(response)
        })
        .catch(error => {
            console.log('An error occurred:', error.response)
            errorMsg = error.response.data.message[0].messages[0].message

        })
    }

    // const urlParams = new URLSearchParams(window.location.search);
    // const myParam = urlParams.get('code');

    // $: console.log(errorMsg)
    // console.log('Code ', myParam)
</script>

<svelte:head>
	<title>Reset Password</title>
</svelte:head>

<section class="vh-50 gradient-custom">
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
    
                    <div class="form-outline form-white mb-2 text-left">
                        <label class="form-label" for="Password">Password</label>
                        <input type="password" id="Password" class="form-control form-control-lg" placeholder="Password" bind:value={password} required />
                    </div>      
                    <div class="form-outline form-white mb-4 text-left">
                        <label class="form-label" for="PasswordConfirm">Password Confirmation</label>
                        <input type="password" id="PasswordConfirm" class="form-control form-control-lg" placeholder="Password (again)" bind:value={passwordConfirmation} required />
                    </div>
    
                    <button class="btn btn-outline-light btn-lg px-4" type="submit" on:click|preventDefault={resetPassword}>Submit</button>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>