<script>
    import axios from 'axios';

    let username, email, password;
    let errorMsg;

    function registerUser(){
        axios
        .post('http://localhost:1337/auth/local/register', {
            username: username,
            email: email,
            password: password,
        })
        .then(response => {
            // Handle success.
            console.log('Well done!');
            console.log('User profile', response.data.user);
            console.log('User token', response.data.jwt);
        })
        .catch(error => {
            // Handle error.
            console.log('An error occurred:', error.response);
            errorMsg = error.response.data.message[0].messages[0].message;
        });
    }
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section class="vh-50 gradient-custom">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-md-4 p-lg-5 text-center">
    
                <div class="mb-md-3 mt-md-2">
                    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                    <p class="text-white-50 mb-3">Please enter your email and password</p>

                    {#if errorMsg != undefined}
                        <h4 class="error-col">{errorMsg}</h4>
                    {/if}
    
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Username">Username</label>
                        <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder="Enter username" bind:value={username} required />
                    </div>
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Email">Email</label>
                        <input type="email" id="Email" class="form-control form-control-lg" placeholder="Enter email or username" bind:value={email} required />
                    </div>
                    <div class="form-outline form-white mb-4 text-left">
                        <label class="form-label" for="Password">Password</label>
                        <input type="password" id="Password" class="form-control form-control-lg" placeholder="Password" bind:value={password} required />
                    </div>
    
                    <button class="btn btn-outline-light btn-lg px-4" type="submit" on:click|preventDefault={registerUser}>Register</button>
                </div>
    
                <div>
                    <p class="mb-0">Already have an account? <a href="/login" class="text-white-50 fw-bold">Login</a></p>
                </div>
    
                </div>
            </div>
            </div>
        </div>
    </div>
</section>