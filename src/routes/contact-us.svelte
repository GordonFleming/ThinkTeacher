<svelte:head>
	<title>Contact</title>
</svelte:head>

<section class="vh-50 gradient-custom">
    <div class="py-3 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
                <div class="card-body p-md-4 p-lg-5 text-center">
                    <h2 class="fw-bold mb-2 text-uppercase">Contact</h2>
                    <p class="text-white-50 mb-3">Please feel free to contact us.</p>

    
                    <div class="form-outline form-white mb-2">
                        <label class="form-label" for="Name">Name</label>
                        <input type="text" id="Name" class="form-control form-control-lg" placeholder="Enter your name" required />
                    </div>
                    <div class="form-outline form-white mb-4">
                        <label class="form-label" for="Email">Email</label>
                        <input type="email" id="Email" class="form-control form-control-lg" placeholder="Enter your email" required />
                    </div>
                    <div class="form-outline form-white mb-4">
                        <label class="form-label" for="Message">Email</label>
                        <textarea id="Message" name="message" class="form-control" rows="8" placeholder="Enter your message" required></textarea>
                    </div>

                    <button class="btn btn-outline-light btn-lg px-4" type="submit">Submit</button>
    
                </div>
            </div>
            </div>
        </div>
    </div>
</section>