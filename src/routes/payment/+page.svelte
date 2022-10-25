<script>
    import { onMount } from "svelte";
    import { id, errMsg } from "$lib/stores";
    import axios from "axios";
    import { API_URL, yocoPubKey, strapiKey } from "$lib/env.js";
    import { Jumper } from "svelte-loading-spinners";
    import Icon from "$lib/Icons/icon.svelte";
    import { checkCircleO } from "$lib/Icons/icons";

    let sdk,
        inline,
        form,
        loading = true,
        paying = false,
        voucher,
        submitButton = true,
        amountInCents = 29000,
        successMsg,
        retireStu = false,
        inlineObj = {
            layout: "basic",
            amountInCents: amountInCents,
            currency: "ZAR",
            showErrors: true,
        };

    $: amountInRands = amountInCents / 100;

    function changePrice() {
        if (!loading) {
            if (!retireStu) {
                amountInCents = 12000;
                inlineObj.amountInCents = 12000;
                inline = sdk.inline(inlineObj);
                inline.mount("#card-frame");
            } else {
                amountInCents = 29000;
                inlineObj.amountInCents = 29000;
                inline = sdk.inline(inlineObj);
                inline.mount("#card-frame");
            }
        }
    }

    let refNum = Math.floor(Math.random() * 90000) + 10000;

    onMount(async () => {
        if ($id === undefined) {
            $id = localStorage.getItem("id");
        }

        setTimeout(() => {
            sdk = new window.YocoSDK({
                publicKey: yocoPubKey,
            });

            inline = sdk.inline(inlineObj);

            inline.mount("#card-frame");
            form = document.getElementById("payment-form");
            loading = false;
        }, 1500);
    });

    let token;
    async function makePayment() {
        submitButton = false;
        loading = true;
        inline
            .createToken()
            .then(function (result) {
                submitButton = true;
                loading = false;
                if (result.error) {
                    const errorMessage = result.error.message;
                    console.log(errorMessage);
                } else {
                    token = result;
                    paying = true;
                    console.log("card successfully tokenised: " + token.id);
                }
            })
            .catch(function (error) {
                submitButton = true;
                alert("error occured: " + error);
            });

        inline.on("card_tokenized", function (token) {
            console.log("token ", token);
            $errMsg = "";
            successMsg = undefined;
            axios
                .post(
                    `${API_URL}/payments`,
                    {
                        data: {
                            amount_in_cents: amountInCents,
                            token: token.id,
                            paid: true,
                            description: "ThinkTeacher Annual Membership (card)",
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
                    successMsg = "Success, payment has been made!";
                    console.log(response);
                    paying = false;
                })
                .catch((error) => {
                    $errMsg = error.response.data.message.error.displayMessage;
                    console.log("An error occurred:", error.response.data);
                    paying = false;
                });
            form.reset();
        });
    }

    async function makeVoucherPayment() {
        axios
            .post(
                `${API_URL}/payments`,
                {
                    data: {
                        // Extra voucher value
                        voucher: voucher,
                        amount_in_cents: amountInCents,
                        token: null,
                        paid: true,
                        description: "ThinkTeacher Annual Membership (voucher)",
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
                successMsg = "Success, payment has been made!";
                console.log(response);
                paying = false;
            })
            .catch((error) => {
                $errMsg = error.response.data.error.message;
                console.log("An error occurred:", error.response.data.error.message);
                paying = false;
            });
    }
</script>

<svelte:head>
    <title>Payment</title>
    <script src="https://js.yoco.com/sdk/v1/yoco-sdk-web.js" async defer></script>
</svelte:head>

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="text-center">
            <h2 class="mb-4">Membership <span class="text-blue">Payment</span></h2>
            <h6>Pay via EFT, Voucher or by Card payment</h6>
            <h6 class="text-logo-gold">Discounted price for teachers month!</h6>
            {#if successMsg !== undefined}
                <h4 class="success-col">{successMsg}</h4>
                <Icon data={checkCircleO} scale="8" fill="green" />
            {/if}
            {#if $errMsg !== "" && !successMsg}
                <h4 class="error-col">{$errMsg}</h4>
            {/if}

            {#if loading || paying}
                <div class="d-flex justify-content-center mt-5">
                    <Jumper size="150" color="#5C677D" unit="px" duration="1s" />
                </div>

                {#if paying}
                    <h3 class="text-center">We are busy processing your payment...</h3>
                {/if}
            {/if}
        </div>

        <div class="col-12 col-sm-12 col-md-8 col-lg-6">
            <form id="payment-form">
                <div class="form-switch mt-3 text-center">
                    <p>Are you a student or a retired teacher?</p>
                    {#if retireStu}
                        <label for="retireStu" class="form-check-label">Yes</label>
                    {:else if !retireStu}
                        <label for="retireStu" class="form-check-label">No</label>
                    {/if}
                    <input
                        class="form-check-input form-control mx-auto"
                        type="checkbox"
                        role="switch"
                        id="retireStu"
                        on:click={changePrice}
                        bind:checked={retireStu}
                    />
                </div>
                <p class="fw-bold text-center mt-3">Pay with a card:</p>
                <div id="card-frame" class="mx-auto">
                    <!-- Yoco Inline form will be added here -->
                </div>
                <div class="text-center mt-3 mb-3">
                    <button
                        id="pay-button"
                        class:bg-blue={submitButton && amountInRands == 290}
                        class:bg-gold={submitButton && amountInRands == 120}
                        class:cta={submitButton}
                        class="btn btn-lg shadow"
                        on:click|preventDefault={makePayment}
                        disabled={!submitButton}
                    >
                        PAY - R {amountInRands}
                    </button>
                </div>
            </form>

            <div class="Sso__divider ">
                <span class="Sso__dividerLine" />
                <span class="Sso__dividerText">or</span>
                <span class="Sso__dividerLine" />
            </div>

            <div class="text-center">
                <label class="fw-bold mb-2" for="voucher">Pay with a voucher:</label>
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

            <div class="text-center mt-3 mb-3">
                <button
                    id="pay-button"
                    class:cta={submitButton}
                    class="btn btn-lg shadow bg-blue"
                    on:click|preventDefault={makeVoucherPayment}
                    disabled={!submitButton}
                >
                    PAY
                </button>
            </div>

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
    </div>
    <hr class="rounded" />
    <div class="row">
        <div class="col text-center mt-4 mb-4">
            <h5>EFT details:</h5>
            <p>ThinkTeacher (Pty) LTD</p>
            <p>Nedbank</p>
            <p>Business account: 1217188746</p>
        </div>
        <div class="mb-4 text-center">
            Contact <strong><a href="mailto:zani@thinkteacher.co.za">Zani</a></strong> if you are having
            issues with payment.
        </div>
    </div>
</div>

<style>
    #card-frame {
        max-width: 550px;
    }
    button {
        background-color: grey;
    }
    .bg-gold {
        background-color: var(--logo-gold);
    }
    .payment-logo {
        max-width: 55px;
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
        background-color: var(--logo-grey);
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
