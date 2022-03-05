<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { API_URL } from '$lib/env.js'
    import {name} from '$lib/stores'
    import { browserSet } from '$lib/re_utils'
    import { fade } from 'svelte/transition';

    let loading = true

    let username, email, id
    let altMail, cell, eduPhase, qualification, sace, workplace, province
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
        eduPhase=user.eduPhase
        sace=user.sace
        cell=user.cell
        altMail=user.altMail
        qualification=user.qualification
        workplace=user.workplace
        province=user.province
        id=user.id
    })

    async function updateUser(){
        if(eduPhase=='none' || !res.test(String(email).toLowerCase())){
            errorMsg="Email not valid of education phase not selected"
        }else{
            errorMsg=null
            await axios.put(`${API_URL}/users/${id}`,{
                username: username,
                email: email,
                qualification: qualification,
                cell: cell,
                eduPhase: eduPhase,
                sace: sace,
                workplace: workplace,
                province: province,
                altMail: altMail,
            },
            { headers: { Authorization: 'Bearer ' + localStorage.getItem("jwt"),} }
            ).then(response => {
                msg = "Success!"
                setTimeout(backFalse, 2000)
                $name = username
                browserSet("name", $name)
                console.log(response)
            })
            .catch((error) => {
                console.error("eee", error.response.data.message[0].messages[0].message.replace("."," "))
                errorMsg = error.response.data.message[0].messages[0].message.replace("."," ")
            })
        }
    }

    let errorMsg, msg
    function backFalse(){
        msg = null;
    }
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
                <form id="update">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">           
                    <div class="card-body p-md-3 p-lg-4 text-center">
                    <div class="mb-md-3 mt-md-2">
                        {#if errorMsg}
                            <h4 class="error-col">{errorMsg}</h4>
                        {:else if msg}
                            <h4 transition:fade={{ duration:1000 }} class="success-col">{msg}</h4>
                        {/if}
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Username">Username</label>
                        <input type="text" name="username" id="username" class="form-control form-control-lg" placeholder={user.username} bind:value={username} required />
                    </div>
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Email">Email</label>
                        <input type="email" id="Email" class="form-control form-control-lg" placeholder={user.email} bind:value={email} required />
                    </div>
                    <div class="row">
                        <div class="col-12 mt-2">
                            <label class="form-label" for="qual">Qualification</label><small class="text-danger">
                            <input type="text" name="qual" id="qual" class="form-control form-control-lg" placeholder="Qualification" bind:value={qualification} />
                        </div>
                        <div class="col-12 mt-2">
                            <label class="form-label" for="eduPhase">Education Phase</label>
                            <select class="form-select" id="eduPhase" aria-label="Education Phase" bind:value={eduPhase} required>
                                <option value="none" selected>choose phase</option>
                                <option value="early_childhood_development">Early Childhood Development</option>
                                <option value="foundation_phase">Foundation Phase</option>
                                <option value="intermediate_phase">Intermediate Phase</option>
                                <option value="senior_phase">Senior Phase</option>
                                <option value="further_education">Further Education</option>
                                <option value="training_phase">Training Phase</option>
                            </select>
                        </div>
                        <div class="col-sm-12 col-md-6 mt-2">
                            <label class="form-label" for="sace">SACE Number</label><small class="text-danger">
                            <input type="number" name="sace" id="sace" class="form-control form-control-lg" placeholder="SACE number" bind:value={sace} min="0" max="999999999" />
                        </div>
                        <div class="col-sm-12 col-md-6 mt-2">
                            <label class="form-label" for="cell">Cell Number</label>
                            <input type="tel" name="cell" id="cell" class="form-control form-control-lg" placeholder="Cell number" bind:value={cell} min="0" max="9999999999999" required />
                        </div>
                        <div class="col-12 mt-2">
                            <label class="form-label" for="altEmail">Alternative Email</label><small class="text-danger">
                            <input type="email" id="altEmail" class="form-control form-control-lg" placeholder="alternative email" bind:value={altMail} />
                        </div>
                        <div class="col-12 mt-2">
                            <label class="form-label" for="school">School / Institution</label><small class="text-danger">
                            <input type="text" name="school" id="school" class="form-control form-control-lg" placeholder="school or institution" bind:value={workplace} />
                        </div>
                        <div class="col-12 mt-2">
                            <label class="form-label" for="province">Province</label><small class="text-danger">
                            <select class="form-select" id="province" aria-label="Province" bind:value={province}>
                                <option value="none" selected>choose province</option>
                                <option value="gauteng">Gauteng</option>
                                <option value="free_state">Free State</option>
                                <option value="western_cape">Western Cape</option>
                                <option value="north_west">North West</option>
                                <option value="northern_cape">Northern Cape</option>
                                <option value="limpopo">Limpopo</option>
                                <option value="kwazulu_natal">KwaZulu-Natal</option>
                                <option value="mpumalanga">Mpumalanga</option>
                                <option value="eastern_cape">Eastern Cape</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button class="btn btn-outline-light btn-lg px-4 mt-2" type="submit" on:click|preventDefault={updateUser}>Update</button>
                </form>
            </div>
        </div>
    </section>         
{/if}
<style>

</style>
