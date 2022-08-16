

<script>
	import Icon from "$lib/Icons/icon.svelte";
	import { send } from "$lib/Icons/icons";
	import { API_URL } from "$lib/env.js";
	import axios from "axios";
	import { Jumper } from "svelte-loading-spinners";

	let name, email, subject, message;
	let loading = false;

	async function submitForm() {
		loading = true;
		await axios
			.post(`${API_URL}/contacts`, {
				name: name,
				email: email,
				subject: subject,
				message: message,
			})
			.then((response) => {
				msg = name + ", you have successfully made contact with ThinkTeacher.";
				console.log(response);
				loading = false;
				document.getElementById("contact").reset();
			})
			.catch((error) => {
				console.log("An error occurred:", error);
				// errorMsg = error.response.data.message[0];
			});
	}

	let msg, errorMsg;
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Contact ThinkTeacher here!" />
</svelte:head>

<div class="container mt-4 mb-5">
	<section class="vh-50 gradient-custom">
		<div class="py-3 h-100">
			<div class="row d-flex justify-content-center align-items-center h-100">
				<div class="col-12 col-md-8 col-lg-6 col-xl-6">
					<div class="card bg-dark text-white" style="border-radius: 1rem;">
						<div class="card-body p-md-4 p-lg-5 text-center">
							<h2 class="fw-bold mb-2 text-uppercase">Contact</h2>
							<p class="text-white-50 mb-3">Please feel free to contact us.</p>

							{#if errorMsg}
								<h4 class="error-col">{errorMsg}</h4>
							{:else if msg}
								<h4 class="success-col">{msg}</h4>
							{/if}

							<form id="contact">
								<div class="form-outline form-white mb-2">
									<label class="form-label" for="Name">Name</label>
									<input
										type="text"
										name="Name"
										id="Name"
										class="form-control form-control-lg"
										placeholder="Enter your name"
										required
										bind:value={name}
									/>
								</div>
								<div class="form-outline form-white mb-4">
									<label class="form-label" for="Email">Email</label>
									<input
										type="email"
										id="Email"
										class="form-control form-control-lg"
										placeholder="Enter your email"
										required
										bind:value={email}
									/>
								</div>
								<div class="form-outline form-white mb-2">
									<label class="form-label" for="Subject">Subject</label>
									<input
										type="text"
										name="subject"
										id="Subject"
										class="form-control form-control-lg"
										placeholder="Enter your subject"
										required
										bind:value={subject}
									/>
								</div>
								<div class="form-outline form-white mb-4">
									<label class="form-label" for="Message">Message</label>
									<textarea
										id="Message"
										name="message"
										class="form-control"
										rows="8"
										placeholder="Enter your message"
										required
										bind:value={message}
									/>
								</div>

								{#if loading}
									<div class="d-flex justify-content-center mt-5">
										<Jumper
											size="150"
											color="#5C677D"
											unit="px"
											duration="1s"
										/>
									</div>
								{/if}

								<button
									class="btn btn-outline-light btn-lg px-4"
									type="submit"
									on:click|preventDefault={submitForm}>Submit</button
								>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<div class="row justify-content-center text-center grey-grad mt-5">
		<h2 class="mb-4">Contact Details:</h2>
		<!-- <div class="col-md-4 col-sm-12">
            <h4>Tel: <span class="text-logo-gold"><a href="tel:089161561561">00000000000</a></span></h4><i class="fas fa-paper-plane"></i><Icon data={phone} scale="3" class="text-blue"/>
        </div> -->
		<div class="col-md-4 col-sm-12">
			<h4>
				Email: <span class="text-logo-gold"
					><a href="mailto:zani@thinkteacher.co.za">zani@thinkteacher.co.za</a></span
				>
			</h4>
			<a href="mailto:zani@thinkteacher.co.za"
				><Icon data={send} scale="6" fill="#4F5D89" /></a
			>
		</div>
	</div>
</div>
