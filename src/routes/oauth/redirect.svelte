<script>
    import { onMount } from 'svelte'
    import axios from 'axios'
    import { prod } from '$lib/env.js'
    import { user, name, surname, id, ttNum } from '$lib/stores';
    import { goto } from '$app/navigation';
    import { Jumper } from 'svelte-loading-spinners'
    import { browserSet } from '$lib/re_utils'

    let API_URL = 'http://localhost:1337'
    if(prod === "true"){
        API_URL= "https://thinkteacher-strapi.glass.thinkteacher.co.za"
    }

    let loading = true, errMsg
    let urlParams
    let myParam, userData
    onMount(async () => {
        urlParams = new URLSearchParams(window.location.search)
        myParam = urlParams.get('access_token')
        console.log(myParam)

        const res = await axios.get(`${API_URL}/auth/google/callback?access_token=${myParam}`)
        userData = res.data
        browserSet("provider", userData.provider)
        browserSet("jwt", userData.jwt)
        $user = userData.user;

        if(!userData.idNum){
            goto('/register')
        }else if(userData.idNum){
            browserSet("name", userData.user.firstName)
            $name = userData.firstName;
            browserSet("surname", userData.user.lastName)
            $surname = userData.lastName;
            browserSet("id", userData.user.id)
            $id = userData.id
            browserSet("ttNum", userData.user.ttCode)
            $ttNum = userData.user.ttCode
            goto('/benefits')
        }else{
            errMsg = "Something went wrong..."
        }
        loading = false
	})
</script>

<div class="container mt-5 mb-5">
    <div class="row text-center justify-content-center">
        {#if loading}
            <div class="d-flex justify-content-center mt-5">
                <Jumper size="150" color="#5C677D" unit="px" duration="1s"></Jumper>
            </div>
        {/if}

        {#if errMsg}
            <h2>{errMsg}</h2>
        {/if}
    </div>
</div>