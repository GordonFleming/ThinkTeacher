<script>
    import axios from 'axios';
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let email, res = false
    let errorMsg
    function resendMail(){
        axios
        .post(`${API_URL}/auth/send-email-confirmation`, {
            email: email,
        })
        .then(response => {
            res = true
            console.log('Your user received an email');
            document.getElementById("Email").value = ""
        })
        .catch(error => {
            console.error('An error occurred:', error.response);
            document.getElementById("Email").value = ""
            errorMsg = error.response.data.message.replace("."," ")
        });
    }
</script>

<section class="vh-50 gradient-custom container mt-4 mb-4">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-md-4 p-lg-5 text-center">
                    <h2 class="fw-bold mb-2 text-uppercase">Resend confirmation</h2>
                    <p class="text-white-50 mb-3">Please enter your email you wish to confirm</p>

                    {#if errorMsg != undefined || errorMsg === ""}
                        <h4 class="error-col">{errorMsg}</h4>
                    {/if}

                    {#if res}
                        <h4 class="success-col">Sent!</h4>
                    {/if}
    
                    <div class="form-outline form-white mb-4">
                        <label class="form-label" for="Email">Email</label>
                        <input type="email" id="Email" class="form-control form-control-lg" placeholder="Enter email" bind:value={email} required />
                    </div>
    
                    <button class="btn btn-outline-light btn-lg px-4" type="submit" on:click|preventDefault={resendMail}>Submit</button>
                    <p class="mt-4 fs-5">If you are still not receiving your confirmation email, please contact: <strong><a href="/contact-us">Zani</a></strong></p>
                    <p class="mb-0">Want to login now? <a href="/login" class="text-white-50 fw-bold">Login</a></p>
                </div>
            </div>
            </div>
        </div>
    </div>
</section>