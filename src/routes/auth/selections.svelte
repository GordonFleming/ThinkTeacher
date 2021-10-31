<script>
    import { onMount } from 'svelte'
    import { goto } from '$app/navigation';
    import axios from 'axios'
    import { Jumper } from 'svelte-loading-spinners'
    import { prod } from '$lib/env.js'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.splyce.dev"
    }

    let loading = true

    let forms, id = localStorage.getItem("id");
    console.log(id)

    onMount(async() =>{
        function seperateForms(item){
            if(item.custom[0].__component == 'custom-form.travel-date'){
                travel.push(item)
            }else if(item.custom[0].__component == 'custom-form.wellbeing'){
                wellbeing.push(item)
            }else{
                medical.push(item)
            }
        }

        const res = await axios.get(`${API_URL}/users/${id}`, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem("jwt"),
            },
        }).catch(function (error) {
            console.log('Error', error.message);
            goto("/login")
        });
        forms = res.data.partner_forms
        forms.forEach(seperateForms)
        console.log(forms)
        loading = false
    })

    let travel = [], medical = [], wellbeing = []
    $: console.log(travel)
</script>

<h1 class="mb-4">Selection history:</h1>

{#if loading}
    <div class="d-flex justify-content-center mt-5">
        <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
    </div>
{:else}
    <h2>Travel submissions</h2>
    {#if travel.length !== 0}
        {#each travel as trvl, index}
            <ul class="list-inline">
                <li class="list-inline-item">{index + 1}:</li>
                <li class="list-inline-item"><strong>Date:</strong> {trvl.created_at.substring(0,10)}</li>
                <li class="list-inline-item"><strong>Start Date:</strong> {trvl.custom[0].startDate}</li>
                <li class="list-inline-item"><strong>End Date:</strong> {trvl.custom[0].endDate}</li>
                <li class="list-inline-item"><strong>Type of Holiday:</strong> {trvl.custom[0].typeHoliday}</li>
                <li class="list-inline-item"><strong>Reason:</strong> {trvl.custom[0].reason}</li>
                <li class="list-inline-item"><strong>Location</strong> {trvl.custom[0].where}</li>
                <li class="list-inline-item"><strong>Adults:</strong> {trvl.custom[0].numAdults}</li>
                <li class="list-inline-item"><strong>Under 18:</strong> {trvl.custom[0].numChildren}</li>
                <li class="list-inline-item"><strong>Nationality:</strong> {trvl.custom[0].nationality}</li>
                <li class="list-inline-item"><strong>Budget:</strong> {trvl.custom[0].budget}</li>
            </ul>
        {/each}
    {:else}
        <p>You have no travel submissons.</p>
    {/if}

    <h2>Medical Aid submissions</h2>
    {#if medical.length !== 0}
        {#each medical as med, index}
            <ul class="list-inline">
                <li class="list-inline-item">{index + 1}:</li>
                <li class="list-inline-item"><strong>Date:</strong> {med.created_at.substring(0,10)}</li>
                <li class="list-inline-item"><strong>Residence:</strong> {med.custom[0].residence}</li>
                <li class="list-inline-item"><strong>Chronic:</strong> {med.custom[0].chronic}</li>
                <li class="list-inline-item"><strong>Medical Aid:</strong> {med.custom[0].mecicalAid}</li>
                <li class="list-inline-item"><strong>Gapcover:</strong> {med.custom[0].gapcover}</li>
                <li class="list-inline-item"><strong>Dependants:</strong> {med.custom[0].dependants}</li>
                <li class="list-inline-item"><strong>Scheme:</strong> {med.custom[0].scheme}</li>
            </ul>
        {/each}
    {:else}
        <p>You have no medical aid submissons.</p>
    {/if}

    <h2>Wellbeing submissions</h2>
    {#if wellbeing.length !== 0}
        {#each wellbeing as well, index}
            <ul class="list-inline">
                <li class="list-inline-item">{index + 1}:</li>
                <li class="list-inline-item"><strong>Date:</strong> {well.created_at.substring(0,10)}</li>
                <li class="list-inline-item"><strong>Bereavement:</strong> {well.custom[0].bereavement}</li>
                <li class="list-inline-item"><strong>Life Coaching:</strong> {well.custom[0].lifeCoaching}</li>
                <li class="list-inline-item"><strong>Nutrition:</strong> {well.custom[0].nutrition}</li>
                <li class="list-inline-item"><strong>Wellbeing:</strong> {well.custom[0].wellbeing}</li>
                <li class="list-inline-item"><strong>Other:</strong> {well.custom[0].other}</li>
            </ul>
        {/each}
    {:else}
        <p>You have no wellbeing submissons.</p>
    {/if}
{/if}

<style>
    .form-check-input{
        margin: 0 auto !important;
    }
    .form-check-input:checked {
        background-color: var(--logo-gold);
        border-color: var(--logo-gold);
    }
    .form-check-input:focus {
        border-color: rgba(255, 255, 255, 0.4);
        outline: 0;
        box-shadow: 0 0 0 0.25rem rgba(217, 183, 61, 0.055);
    }
</style>