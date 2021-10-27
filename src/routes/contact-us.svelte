<script context="module">
	export const prerender = true
</script>

<script>
    import Icon from 'svelte-awesome'
    import { send, phone } from 'svelte-awesome/icons'
</script>

<svelte:head>
	<title>Contact</title>
</svelte:head>

<div class="container mt-5 mb-5">
    <section class="vh-50 gradient-custom">
        <div class="py-3 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                    <div class="card-body p-md-4 p-lg-5 text-center">
                        <h2 class="fw-bold mb-2 text-uppercase">Contact</h2>
                        <p class="text-white-50 mb-3">Please feel free to contact us.</p>

                        <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">

                            <p class="hidden">
                                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
                            </p>

                            <input type="hidden" name="form-name" value="contact">

                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Name">Name</label>
                                <input type="text" name="Name" id="Name" class="form-control form-control-lg" placeholder="Enter your name" required />
                            </div>
                            <div class="form-outline form-white mb-4">
                                <label class="form-label" for="Email">Email</label>
                                <input type="email" id="Email" class="form-control form-control-lg" placeholder="Enter your email" required />
                            </div>
                            <div class="form-outline form-white mb-2">
                                <label class="form-label" for="Subject">Subject</label>
                                <input type="text" name="subject" id="Subject" class="form-control form-control-lg" placeholder="Enter your subject" required />
                            </div>
                            <div class="form-outline form-white mb-4">
                                <label class="form-label" for="Message">Message</label>
                                <textarea id="Message" name="message" class="form-control" rows="8" placeholder="Enter your message" required></textarea>
                            </div>
        
                            <button class="btn btn-outline-light btn-lg px-4" type="submit">Submit</button>
                        </form>
        
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>

    <div class="row justify-content-center text-center grey-grad mt-5">
        <h2 class="mb-4">Contact Details:</h2>
        <div class="col-md-4 col-sm-12">
            <h4>Tel: <span class="text-logo-gold"><a href="tel:089161561561">00000000000</a></span></h4><i class="fas fa-paper-plane"></i><Icon data={phone} scale="3" class="text-blue"/>
        </div>
        <div class="col-md-4 col-sm-12">
            <h4>Email: <span class="text-logo-gold"><a href="mailto:zani@thinkteacher.co.za">zani@thinkteacher.co.za</a></span></h4><i class="fas fa-paper-plane"></i><Icon data={send} scale="3" class="text-blue"/>
        </div>
    </div>
</div>