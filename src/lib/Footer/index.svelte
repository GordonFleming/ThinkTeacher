<script>
    import Icon from 'svelte-awesome'
    import { facebook, twitter, instagram, linkedin, youtubePlay, youtubeSquare } from 'svelte-awesome/icons'

    function toTop(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
</script>

<footer style="background-color: var(--default-text);" class="text-center text-black mt-5">
    <div class="container-fluid p-4">
      <section class="mb-2">
        <!-- Facebook -->
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.facebook.com/thinkteacher" target="_blank" role="button"><Icon data={facebook} scale="1.8"/></a>  
        <!-- Twitter -->
        <a class="btn btn-outline-light btn-floating m-1" href="https://twitter.com/thinkteacher_sa" target="_blank" role="button"><Icon data={twitter} scale="1.8"/></a>
        <!-- Instagram -->
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.instagram.com/thinkteacher_rsa" target="_blank" role="button"><Icon data={instagram} scale="1.8"/></a>
        <!-- Linkedin -->
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.linkedin.com/company/think-teacher" target="_blank" role="button"><Icon data={linkedin} scale="1.8"/></a>
        <!-- Youtube -->
        <a class="btn btn-outline-light btn-floating m-1" href="https://www.youtube.com/channel/UCN-byMa-sTVbwKWNkbMM9bQ" target="_blank" role="button"><Icon data={youtubeSquare} scale="1.8" /></a>
        <i class="fab fa-youtube"></i>
      </section>
  
      <!-- Section: Text -->
      <section class="mb-4">
        <p>
            ________________________________________________________
        </p>
      </section>
  
      <!-- Section: Links -->
      <section class="">
        <!--Grid row-->
        <div class="row">
          <!--Grid column-->
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Socials</h5>
    
                <ul class="list-unstyled mb-0">
                    <li>
                        <a href="https://www.facebook.com/thinkteacher" target="_blank" class="text-white">Facebook</a>
                    </li>
                    <li>
                        <a href="https://twitter.com/thinkteacher_sa" target="_blank" class="text-white">Twitter</a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/thinkteacher_rsa" target="_blank" class="text-white">Instagram</a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/company/think-teacher" target="_blank" class="text-white">Linkedin</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/channel/UCN-byMa-sTVbwKWNkbMM9bQ" target="_blank" class="text-white">YouTube</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Useful Links</h5>
    
                <ul class="list-unstyled mb-0">
                    <li>
                        <a href="/login" class="text-white">Login</a>
                    </li>
                    <li>
                        <a href="/forgot-password" class="text-white">Forgot Password</a>
                    </li>
                    <li>
                        <a href="/register" class="text-white">Register</a>
                    </li>
                    <li>
                        <a href="/contact-us" class="text-white">Contact</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Contact</h5>
    
                <ul class="list-unstyled mb-0">
                    <li>
                        <a href="mailto:zani@thinkteacher.co.za" class="text-white">zani@thinkteacher.co.za</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <button class="mt-3 btn btn-outline-light px-2" on:click={toTop}>Scroll to top</button>
            </div>
            </div>
        </section>
    </div>
  
    <!-- Copyright -->
    <div class="text-center p-2" style="background-color: var(--logo-blue);">
      © 2021 Copyright:
      <a class="text-white" href="https://thinkteacher.co.za">Think Teacher</a>
      <!-- <a class="text-white" href="https://splyce.dev">Designed: Splyce</a> -->
    </div>
</footer>

<style>
    footer{
        margin-top: auto !important;
    }
    h5, p {
        color: var(--bg-primary);
    }
    li a{
        color:var(--bg-primary) !important;
    }
    section > .btn-outline-dark{
        border-color: var(--logo-blue);
    }
</style>
