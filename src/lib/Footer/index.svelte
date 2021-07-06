<script>
    import Icon from 'svelte-awesome';
    import { facebook, twitter, instagram, linkedin } from 'svelte-awesome/icons';

    function toTop(){
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }
</script>

<footer class="bg-dark text-center text-black mt-5">
    <div class="container-fluid p-4">
      <section class="mb-4">
        <!-- Facebook -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><Icon data={facebook} scale="1.8"/></a>  
        <!-- Twitter -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><Icon data={twitter} scale="1.8"/></a>
        <!-- Instagram -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><Icon data={instagram} scale="1.8"/></a>
        <!-- Linkedin -->
        <a class="btn btn-outline-light btn-floating m-1" href="#!" role="button"><Icon data={linkedin} scale="1.8"/></a>
      </section>
  
      <!-- Section: Text -->
      <section class="mb-4">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
          repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
          eum harum corrupti dicta, aliquam sequi voluptate quas.
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
                        <a href="#!" class="text-white">Facebook</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white">Twitter</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white">Instagram</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white">Linkedin</a>
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
                        <a href="/contact" class="text-white">Contact</a>
                    </li>
                </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
                <h5 class="text-uppercase">Legal</h5>
    
                <ul class="list-unstyled mb-0">
                    <li>
                        <a href="#!" class="text-white">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white">Link 2</a>
                    </li>
                    <li>
                        <a href="#!" class="text-white">Link 3</a>
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
    h5, p {
        color: var(--default-text);
    }
    section > .btn-outline-light{
        border-color: var(--logo-orange);
    }
</style>
