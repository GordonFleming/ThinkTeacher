<script>
    import { onMount } from "svelte";
    import { id } from "$lib/stores";
    import axios from "axios";
    import { API_URL, strapiKey, toastErr, toastSuc } from "$lib/env.js";
    import { toast } from "@zerodevx/svelte-toast";
    import { goto } from "$app/navigation";

    onMount(async () => {
        if ($id === undefined) {
            $id = localStorage.getItem("id");
            // logout if they're not logged in
            if ($id === null) {
                window.location.href = "/login";
            }
        }

        // read url params and display toast
        const urlParams = new URLSearchParams(window.location.search);
        const payment = urlParams.get("success");
        if (payment === "false") {
            toast.push("Payment unsuccessful", toastErr);
            window.history.replaceState({}, document.title, "/benefits");
        }
    });

    let loading = false,
        voucher = "",
        amountInCents = 36000,
        retireCheck = false;

    let refNum = Math.floor(Math.random() * 90000) + 10000;

    $: amountInRands = amountInCents / 100;

    function changePrice() {
        if (retireCheck) {
            amountInCents = 36000;
        } else {
            amountInCents = 12000;
        }
    }

    function makePayment() {
        loading = true;
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + strapiKey,
            },
        };

        axios
            .get(
                `${API_URL}/payments/yoco?amount=${amountInCents}&reference_number=${refNum}&user_id=${$id}`,
                config
            )
            .then((response) => {
                console.log("Response:", response.data);
                // Go to the Yoco payment page
                window.location.href = response.data.redirectUrl;
                // toast.push("Success, payment has been made!", toastSuc);
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.push("Something went wrong", toastErr);
            });
        setTimeout(() => {
            loading = false;
        }, 3000);
    }

    let voucherCheck = true;
    $: if (voucher.length == 8 && voucher.startsWith("TT")) {
        voucherCheck = false;
    } else {
        voucherCheck = true;
    }
    function makeVoucherPayment() {
        axios
            .post(
                `${API_URL}/payments/voucherPayment`,
                {
                    data: {
                        voucher: voucher,
                        amount_in_cents: 0,
                        description: "ThinkTeacher Lifetime Membership (voucher)",
                        reference_number: refNum,
                        users_permissions_user: $id,
                    },
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + strapiKey,
                    },
                }
            )
            .then((response) => {
                toast.push("Success, payment has been made!", toastSuc);
                voucher = "";
                goto("/benefits");
                console.log(response);
            })
            .catch((error) => {
                toast.push(error.response.data.error.message, toastErr);
                console.log("An error occurred:", error.response.data.error.message);
            });
    }
</script>

<svelte:head>
    <title>Payment | ThinkTeacher</title>
</svelte:head>

<div class="container mt-4">
    <div class="row justify-content-center">
        <div class="text-center">
            <h2 class="mb-2">Membership <span class="text-blue">Payment</span></h2>
            <h6>Pay via Voucher, Card or EFT</h6>
        </div>

        <div class="col-12 col-sm-12 col-md-8 col-lg-6">
            <div class="text-center">
                <label class="fw-bold mb-2" for="voucher"><h5>Pay with a voucher:</h5></label>
                <input
                    class="form-control mx-auto"
                    placeholder="TT000000"
                    type="text"
                    name="voucher"
                    id="voucherInput"
                    minlength="8"
                    maxlength="8"
                    bind:value={voucher}
                />
            </div>
            {#if voucherCheck && voucher.length > 0}
                <p class="text-error text-center">
                    Please enter a valid voucher code:
                    <br />Make sure there are no spaces and code starts with TT
                </p>
            {/if}

            <div class="text-center mt-3 mb-3">
                <button
                    id="pay-button"
                    class:cta={voucherCheck}
                    class="btn btn-lg shadow bg-blue"
                    on:click|preventDefault={makeVoucherPayment}
                    disabled={voucherCheck}
                >
                    PAY
                </button>
            </div>

            <div class="Sso__divider">
                <span class="Sso__dividerLine" />
                <span class="Sso__dividerText">or</span>
                <span class="Sso__dividerLine" />
            </div>

            <form id="payment-form">
                <h5 class="fw-bold text-center mt-3">Pay with Yoco:</h5>
                <p class="text-center">Card | Apple pay | EFT</p>
                <div class="form-switch mt-3 text-center">
                    <p>Are you a student or a retired teacher?</p>
                    <label for="retireCheck" class="form-check-label"
                        >{retireCheck ? "Yes" : "No"}</label
                    >
                    {#key retireCheck}
                        <input
                            class="form-check-input form-control mx-auto"
                            type="checkbox"
                            role="switch"
                            id="retireCheck"
                            on:click={changePrice}
                            bind:checked={retireCheck}
                        />
                    {/key}
                </div>
                <div class="text-center mt-3 mb-3">
                    <button
                        id="pay-button"
                        class:bg-blue={amountInRands == 360}
                        class:bg-gold={amountInRands == 120}
                        class="cta btn btn-lg shadow"
                        on:click|preventDefault={makePayment}
                    >
                        {#if loading}
                            loading...
                        {:else}
                            Pay R{amountInRands}
                        {/if}
                    </button>
                </div>
            </form>

            <div class="text-center mb-3">
                Corporate sponsorship of a school:
                <a href="mailto:zani@thinkteacher.co.za" class="btn btn-sm bg-gold">Contact Zani</a>
            </div>
        </div>
    </div>
    <hr class="rounded" />
    <div class="text-center mt-4 mb-3">
        <img
            class="img-fluid mb-3"
            id="yoco"
            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/yoco_colour_d4694a7164_83225b3216.svg"
            alt="yoco"
        /><br />
        <img
            class="img-fluid payment-logo"
            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/visa_colour_0104f4de82_1673c173d7.svg"
            alt="visa"
        />
        <img
            class="img-fluid payment-logo"
            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/mastercard_colour_446709c296_788c700d60.svg"
            alt="mastercard"
        />
        <img
            class="img-fluid payment-logo"
            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/amex_b67f69fca1.svg"
            alt="mastercard"
        />
        <img
            class="img-fluid payment-logo-eft"
            src="https://strapi-upload-s3.glass.thinkteacher.co.za/strapi/cms/eft_e96e4ee539.svg"
            alt="mastercard"
        />
    </div>
    <hr class="rounded" />
    <div class="row">
        <div class="col text-center mt-4 mb-4">
            <h5>Pay with EFT via email:</h5>
            <p>ThinkTeacher (Pty) LTD</p>
            <p>Nedbank</p>
            <p>Business account: 1217188746</p>
            <p class="text-info">
                Send proof of payment <a href="mailto:zani@thinkteacher.co.za">zani@thinkteacher</a>
            </p>
        </div>
        <div class="mb-4 text-center">
            Contact <strong><a href="mailto:zani@thinkteacher.co.za">Zani</a></strong> if you are having
            issues with payment.
        </div>
    </div>
</div>

<style>
    button {
        background-color: grey;
    }
    .bg-gold {
        background-color: var(--logo-gold);
    }
    .payment-logo {
        max-width: 70px;
        margin-right: 20px;
        margin-left: 20px;
    }
    .payment-logo-eft {
        max-width: 100px;
        width: 80px;
        margin-right: 20px;
        margin-left: 20px;
    }
    #yoco {
        max-width: 120px;
    }
    hr.rounded {
        border-top: 4px solid #bbb;
        border-radius: 3px;
        max-width: 20vw;
        margin: 0 auto;
    }
    .form-switch {
        padding-left: 0;
    }
    .form-check-input {
        /* margin: 0 auto !important; */
        background-color: var(--logo-blue);
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
    #voucherInput {
        border-color: #4f5d89;
        width: 50%;
        background-color: #4f5d895a;
        color: #000;
        font-weight: 500;
    }
</style>
