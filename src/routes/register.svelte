<script>
    import axios from 'axios'
    import Icon from 'svelte-awesome'
    import { arrowLeft } from 'svelte-awesome/icons'
	import { sgKey } from '$lib/env.js'

    let username, email, password
    let msg, errorMsg
    let registerNext = false
    let firstName, lastName, idNum, altMail, cell, eduPhase, qualification, sace, workplace
    let userObj
    
    async function registerUser(){
        await axios
        .post('http://localhost:1337/auth/local/register', {
            username: username,
            email: email,
            password: password,
        })
        .then(response => {
            console.log('User profile', response.data.user)
            msg = response.data.user.username + ", you have been successfully registered with ThinkTeacher!"
            userObj = response.data.user
            document.getElementById("register").reset()
        })
        .catch(error => {
            console.log('An error occurred:', error.response)
            errorMsg = error.response.data.message[0].messages[0].message
        })

        await axios
        .post('http://localhost:1337/user-infos', {
            firstName: firstName,
            lastName: lastName,
            idNum: idNum,
            altMail: altMail,
            cell: cell,
            eduPhase: eduPhase,
            qualification: qualification,
            sace: sace,
            workplace: workplace,
            user: userObj,
        })
        .catch(error => {
            console.log('An error occurred:', error.response)
        })

        await axios
        .put('https://sendgrid.com/v3/marketing/contacts', {
                    "list_ids": ["57df636d-5399-423f-bf72-35424b5644b5"],
                    "contacts": [{"email":email}]},
                { headers: { Authorization: `Bearer ${sgKey}`}
        })
        .catch((error) => {
            console.error(error)
        })
    }
</script>

<svelte:head>
	<title>Register</title>
</svelte:head>

<section class="vh-50 gradient-custom container">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                {#if registerNext}
                    <i style="padding-top: 1.8rem; padding-left: 1.8rem;" on:click={() => registerNext = false}><Icon data={ arrowLeft } scale="1.8"/></i>
                {/if}
                <div class="card-body p-md-3 p-lg-4 text-center">
                <div class="mb-md-3 mt-md-2">
                    <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                    {#if errorMsg}
                        <h4 class="error-col">{errorMsg}</h4>
                    {:else if msg}
                        <h4 class="success-col">{msg}</h4>
                    {/if}
                    
                    <form id="register">
                        {#if !registerNext}
                            <p class="text-white-50 mb-3">Please enter your email and password</p>
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

                            <button class="btn btn-outline-light btn-lg px-4" on:click|preventDefault={() => registerNext = true}>Next</button>

                        {:else}
                            
                            <div class="row">
                                <div class="col-sm-12 col-md-6">
                                    <label class="form-label" for="name">First Name</label>
                                    <input type="text" name="username" id="name" class="form-control form-control-lg" placeholder="First Name" bind:value={firstName} required />
                                </div>
                                <div class="col-sm-12 col-md-6">
                                    <label class="form-label" for="surname">Surname</label>
                                    <input type="text" name="surname" id="surname" class="form-control form-control-lg" placeholder="Surname" bind:value={lastName} required />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="idNum">ID Number</label>
                                    <input type="number" name="idNumber" id="idNum" class="form-control form-control-lg" placeholder="ID number" bind:value={idNum} min="0" max="9999999999999" required />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="cell">Cell Number</label>
                                    <input type="tel" name="cell" id="cell" class="form-control form-control-lg" placeholder="Cell number" bind:value={cell} min="0" max="9999999999999" required />
                                </div>
                                <div class="col-12 mt-3">
                                    <label class="form-label" for="eduPhase">Education Phase</label>
                                    <select class="form-select" id="eduPhase" aria-label="Education Phase" bind:value={eduPhase} required>
                                        <option selected>choose phase</option>
                                        <option value="early_childhood_development">Early Childhood Development</option>
                                        <option value="foundation_phase">Foundation Phase</option>
                                        <option value="intermediate_phase">Intermediate Phase</option>
                                        <option value="senior_phase">Senior Phase</option>
                                        <option value="further_education">Further Education</option>
                                        <option value="training_phase">Training Phase</option>
                                    </select>
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="sace">SACE Number</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="number" name="sace" id="sace" class="form-control form-control-lg" placeholder="SACE number" bind:value={sace} min="0" max="999999999" />
                                </div>
                                <div class="col-sm-12 col-md-6 mt-3">
                                    <label class="form-label" for="qual">Qualification</label><small class="text-danger">&nbsp;&nbsp;&nbsp;&nbsp;*optional</small>
                                    <input type="text" name="qual" id="qual" class="form-control form-control-lg" placeholder="Qualification" bind:value={qualification} />
                                </div>
                            </div>
                            <button class="btn btn-outline-light btn-lg px-4 mt-4" type="submit" on:click|preventDefault={registerUser}>Register</button>
                        {/if}
                    </form>

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

<style>
    i{
        cursor: pointer;
    }
</style>